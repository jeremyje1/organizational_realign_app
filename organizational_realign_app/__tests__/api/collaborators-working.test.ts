// __tests__/api/collaborators-working.test.ts
import { describe, expect, test, beforeEach, jest, afterEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Type definitions
interface MockAuthUser {
  id: string;
  email: string;
}

interface MockAuthResponse {
  data: { user: MockAuthUser | null };
  error: Error | null;
}

interface MockAssessment {
  id: string;
  user_id: string;
  tier: 'INDIVIDUAL' | 'TEAM' | 'ENTERPRISE';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ANALYZED' | 'DELIVERED';
  created_at: Date;
  updated_at: Date;
}

interface MockCollaborator {
  id: string;
  assessment_id: string;
  email: string;
  role: 'ADMIN' | 'COLLABORATOR' | 'VIEWER';
  invited_at: Date;
  joined_at: Date | null;
}

// Create typed mock functions
const createMockFn = <T extends (...args: any[]) => any>(implementation?: T) => {
  return jest.fn(implementation) as unknown as jest.MockedFunction<T>;
};

// Mock external dependencies
const mockCookies = createMockFn(() => ({
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn()
}));

jest.mock('next/headers', () => ({
  cookies: mockCookies
}));

// Create Supabase mocks with proper typing
const mockGetUser = createMockFn<() => Promise<MockAuthResponse>>();
const mockSupabaseClient = {
  auth: {
    getUser: mockGetUser
  },
  from: createMockFn(() => ({
    select: createMockFn(() => ({
      eq: createMockFn(() => ({
        single: createMockFn(() => ({
          data: { email: 'test@example.com', full_name: 'Test User' }
        }))
      }))
    }))
  }))
};

const mockCreateRouteHandlerClient = createMockFn<(options: { cookies: any }) => typeof mockSupabaseClient>(
  () => mockSupabaseClient
);

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: mockCreateRouteHandlerClient
}));

// Create AssessmentDB mocks with proper typing
const mockFindAssessmentById = createMockFn<(id: string) => Promise<MockAssessment | null>>();
const mockGetCollaborators = createMockFn<(assessmentId: string) => Promise<MockCollaborator[]>>();
const mockCheckCollaboratorAccess = createMockFn<(assessmentId: string, email: string) => Promise<boolean>>();
const mockCheckCollaboratorRole = createMockFn<(assessmentId: string, email: string, role: string) => Promise<boolean>>();
const mockAddCollaborator = createMockFn<(assessmentId: string, email: string, role: string) => Promise<MockCollaborator>>();
const mockRemoveCollaborator = createMockFn<(assessmentId: string, email: string) => Promise<void>>();

const mockAssessmentDB = {
  findAssessmentById: mockFindAssessmentById,
  getCollaborators: mockGetCollaborators,
  checkCollaboratorAccess: mockCheckCollaboratorAccess,
  checkCollaboratorRole: mockCheckCollaboratorRole,
  addCollaborator: mockAddCollaborator,
  removeCollaborator: mockRemoveCollaborator
};

jest.mock('@/lib/assessment-db', () => ({
  AssessmentDB: mockAssessmentDB
}));

// Mock email notifications
const mockSendCollaborationInvite = createMockFn<(email: string, assessmentId: string) => Promise<boolean>>();

jest.mock('@/lib/email-notifications', () => ({
  sendCollaborationInvite: mockSendCollaborationInvite
}));

describe('Collaborators API Routes (Working Version)', () => {
  // Test data
  const mockUser: MockAuthUser = {
    id: 'test-user-id',
    email: 'test@example.com'
  };

  const mockAssessment: MockAssessment = {
    id: 'test-assessment-id',
    user_id: 'test-user-id',
    tier: 'TEAM',
    status: 'IN_PROGRESS',
    created_at: new Date('2025-01-01'),
    updated_at: new Date('2025-01-02')
  };

  const mockCollaborators: MockCollaborator[] = [
    {
      id: 'collab1',
      assessment_id: 'test-assessment-id',
      email: 'collaborator1@example.com',
      role: 'ADMIN',
      invited_at: new Date('2025-01-01'),
      joined_at: new Date('2025-01-01')
    },
    {
      id: 'collab2',
      assessment_id: 'test-assessment-id',
      email: 'collaborator2@example.com',
      role: 'VIEWER',
      invited_at: new Date('2025-01-01'),
      joined_at: null
    }
  ];

  const newCollaborator: MockCollaborator = {
    id: 'new-collab',
    assessment_id: 'test-assessment-id',
    email: 'new@example.com',
    role: 'COLLABORATOR',
    invited_at: new Date('2025-01-03'),
    joined_at: null
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default successful responses
    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    mockFindAssessmentById.mockResolvedValue(mockAssessment);
    mockGetCollaborators.mockResolvedValue(mockCollaborators);
    mockCheckCollaboratorAccess.mockResolvedValue(true);
    mockCheckCollaboratorRole.mockResolvedValue(true);
    mockAddCollaborator.mockResolvedValue(newCollaborator);
    mockRemoveCollaborator.mockResolvedValue(undefined);
    mockSendCollaborationInvite.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Route Import and Module Resolution', () => {
    test('should be able to import route handlers', async () => {
      // Test that we can import the route handlers without module resolution errors
      const routeModule = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      expect(routeModule.GET).toBeDefined();
      expect(routeModule.POST).toBeDefined();
      expect(routeModule.DELETE).toBeDefined();
      expect(typeof routeModule.GET).toBe('function');
      expect(typeof routeModule.POST).toBe('function');
      expect(typeof routeModule.DELETE).toBe('function');
    });
  });

  describe('GET /api/assessments/[assessmentId]/collaborators', () => {
    test('should return collaborators for assessment owner', async () => {
      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('collaborators');
      expect(Array.isArray(data.collaborators)).toBe(true);
      
      // Verify the correct methods were called
      expect(mockGetUser).toHaveBeenCalled();
      expect(mockFindAssessmentById).toHaveBeenCalledWith('test-assessment-id');
      expect(mockGetCollaborators).toHaveBeenCalledWith('test-assessment-id');
    });

    test('should handle authentication failure', async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: new Error('Unauthorized')
      });

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Unauthorized');
    });

    test('should handle assessment not found', async () => {
      mockFindAssessmentById.mockResolvedValueOnce(null);

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/not-found-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'not-found-id' } });
      
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Assessment not found');
    });

    test('should check collaborator access for non-owners', async () => {
      const differentOwnerAssessment: MockAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      
      mockFindAssessmentById.mockResolvedValueOnce(differentOwnerAssessment);

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      expect(mockCheckCollaboratorAccess).toHaveBeenCalledWith('test-assessment-id', mockUser.email);
    });

    test('should deny access for unauthorized users', async () => {
      const differentOwnerAssessment: MockAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      
      mockFindAssessmentById.mockResolvedValueOnce(differentOwnerAssessment);
      mockCheckCollaboratorAccess.mockResolvedValueOnce(false);

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Unauthorized');
    });
  });

  describe('POST /api/assessments/[assessmentId]/collaborators', () => {
    test('should add collaborator successfully', async () => {
      const { POST } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const requestBody = {
        email: 'new@example.com',
        role: 'COLLABORATOR'
      };

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await POST(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('collaborator');
      
      expect(mockAddCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'new@example.com',
        'COLLABORATOR'
      );
    });

    test('should validate request body', async () => {
      const { POST } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const invalidRequestBody = {
        email: 'invalid-email',
        role: 'INVALID_ROLE'
      };

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: JSON.stringify(invalidRequestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await POST(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });

    test('should check authorization for adding collaborators', async () => {
      const differentOwnerAssessment: MockAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      
      mockFindAssessmentById.mockResolvedValueOnce(differentOwnerAssessment);
      mockCheckCollaboratorRole.mockResolvedValueOnce(false);

      const { POST } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const requestBody = {
        email: 'new@example.com',
        role: 'COLLABORATOR'
      };

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await POST(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data).toHaveProperty('error');
      expect(mockCheckCollaboratorRole).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/assessments/[assessmentId]/collaborators', () => {
    test('should remove collaborator successfully', async () => {
      const { DELETE } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators?email=collaborator1%40example.com',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('success', true);
      
      expect(mockRemoveCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'collaborator1@example.com'
      );
    });

    test('should require email parameter', async () => {
      const { DELETE } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Collaborator email is required');
    });

    test('should check authorization for removing collaborators', async () => {
      const differentOwnerAssessment: MockAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      
      mockFindAssessmentById.mockResolvedValueOnce(differentOwnerAssessment);
      mockCheckCollaboratorRole.mockResolvedValueOnce(false);

      const { DELETE } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators?email=collaborator1%40example.com',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data).toHaveProperty('error');
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors gracefully', async () => {
      mockFindAssessmentById.mockRejectedValueOnce(new Error('Database connection failed'));

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Internal server error');
    });

    test('should handle auth service errors gracefully', async () => {
      mockGetUser.mockRejectedValueOnce(new Error('Auth service unavailable'));

      const { GET } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Internal server error');
    });

    test('should handle malformed request body', async () => {
      const { POST } = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = await POST(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Internal server error');
    });
  });

  describe('Mock Verification', () => {
    test('should verify all mocks are properly typed and functional', () => {
      // Verify that our mocks are properly typed and can be called
      expect(mockGetUser).toBeDefined();
      expect(mockFindAssessmentById).toBeDefined();
      expect(mockGetCollaborators).toBeDefined();
      expect(mockCheckCollaboratorAccess).toBeDefined();
      expect(mockCheckCollaboratorRole).toBeDefined();
      expect(mockAddCollaborator).toBeDefined();
      expect(mockRemoveCollaborator).toBeDefined();
      expect(mockSendCollaborationInvite).toBeDefined();

      // Verify they're Jest mock functions
      expect(jest.isMockFunction(mockGetUser)).toBe(true);
      expect(jest.isMockFunction(mockFindAssessmentById)).toBe(true);
      expect(jest.isMockFunction(mockGetCollaborators)).toBe(true);
      expect(jest.isMockFunction(mockCheckCollaboratorAccess)).toBe(true);
      expect(jest.isMockFunction(mockCheckCollaboratorRole)).toBe(true);
      expect(jest.isMockFunction(mockAddCollaborator)).toBe(true);
      expect(jest.isMockFunction(mockRemoveCollaborator)).toBe(true);
      expect(jest.isMockFunction(mockSendCollaborationInvite)).toBe(true);
    });
  });
});
