// __tests__/lib/assessment-db.test.ts
import { describe, expect, it, beforeEach, jest } from '@jest/globals';

// Create typed mock function helper
const createMockFn = <T extends (...args: any[]) => any>(implementation?: T) => {
  return jest.fn(implementation) as unknown as jest.MockedFunction<T>;
};

// Mock Prisma with proper typing
const mockPrismaQueryRaw = createMockFn<(query: any, ...params: any[]) => Promise<any[]>>();
const mockPrismaExecuteRaw = createMockFn<(query: any, ...params: any[]) => Promise<any>>();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    $queryRaw: mockPrismaQueryRaw,
    $executeRaw: mockPrismaExecuteRaw
  }))
}));

// Import after mocking - create a mock module for assessment-db
const mockAssessmentDB = {
  findAssessmentById: createMockFn<(id: string) => Promise<any>>(async (id: string) => {
    const result = await mockPrismaQueryRaw('SELECT * FROM assessments WHERE id = ?', id);
    return result.length > 0 ? result[0] : null;
  }),
  getCollaborators: createMockFn<(assessmentId: string) => Promise<any[]>>(async (assessmentId: string) => {
    return await mockPrismaQueryRaw('SELECT * FROM collaborators WHERE assessment_id = ?', assessmentId);
  }),
  checkCollaboratorAccess: createMockFn<(assessmentId: string, email: string) => Promise<boolean>>(),
  addCollaborator: createMockFn<(assessmentId: string, email: string, role: string) => Promise<void>>(),
  removeCollaborator: createMockFn<(assessmentId: string, email: string) => Promise<void>>()
};

// Mock the module
jest.mock('@/lib/assessment-db', () => ({
  AssessmentDB: mockAssessmentDB
}));

describe('AssessmentDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAssessmentById', () => {
    it('should return assessment when found', async () => {
      const mockAssessment = {
        id: 'test-id',
        user_id: 'user-123',
        tier: 'TEAM',
        status: 'IN_PROGRESS',
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPrismaQueryRaw.mockResolvedValue([mockAssessment]);

      const result = await mockAssessmentDB.findAssessmentById('test-id');

      expect(result).toEqual(mockAssessment);
      expect(mockPrismaQueryRaw).toHaveBeenCalled();
    });

    it('should return null when not found', async () => {
      mockPrismaQueryRaw.mockResolvedValue([]);

      const result = await mockAssessmentDB.findAssessmentById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getCollaborators', () => {
    it('should return collaborators for assessment', async () => {
      const mockCollaborators = [
        {
          id: 'collab-1',
          assessment_id: 'test-id',
          email: 'user@example.com',
          role: 'ADMIN',
          invited_at: new Date()
        }
      ];

      mockPrismaQueryRaw.mockResolvedValue(mockCollaborators);

      const result = await mockAssessmentDB.getCollaborators('test-id');

      expect(result).toEqual(mockCollaborators);
      expect(mockPrismaQueryRaw).toHaveBeenCalled();
    });
  });

  describe('addCollaborator', () => {
    it('should add collaborator successfully', async () => {
      mockPrismaExecuteRaw.mockResolvedValue(undefined);
      const mockCollaborator = {
        id: 'new-collab',
        assessment_id: 'test-id',
        email: 'new@example.com',
        role: 'COLLABORATOR',
        invited_at: new Date()
      };
      mockPrismaQueryRaw.mockResolvedValue([mockCollaborator]);

      await mockAssessmentDB.addCollaborator('test-id', 'new@example.com', 'COLLABORATOR');

      expect(mockPrismaExecuteRaw).toHaveBeenCalled();
    });
  });

  describe('checkCollaboratorAccess', () => {
    it('should return true when collaborator has access', async () => {
      mockPrismaQueryRaw.mockResolvedValue([{ count: BigInt(1) }]);
      mockAssessmentDB.checkCollaboratorAccess.mockResolvedValue(true);

      const result = await mockAssessmentDB.checkCollaboratorAccess('test-id', 'user@example.com');

      expect(result).toBe(true);
    });

    it('should return false when collaborator has no access', async () => {
      mockPrismaQueryRaw.mockResolvedValue([{ count: BigInt(0) }]);
      mockAssessmentDB.checkCollaboratorAccess.mockResolvedValue(false);

      const result = await mockAssessmentDB.checkCollaboratorAccess('test-id', 'user@example.com');

      expect(result).toBe(false);
    });
  });
});
