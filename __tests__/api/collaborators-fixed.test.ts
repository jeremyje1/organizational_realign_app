// __tests__/api/collaborators-fixed.test.ts
import { describe, expect, test, beforeEach, jest, afterEach } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';

// Define interfaces for mock data since we can't import the actual types
interface MockAssessment {
  id: string;
  user_id: string;
  tier: 'INDIVIDUAL' | 'TEAM' | 'ENTERPRISE';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ANALYZED' | 'DELIVERED';
  created_at: Date;
  updated_at: Date;
}

interface MockAssessmentCollaborator {
  id: string;
  assessment_id: string;
  email: string;
  role: 'ADMIN' | 'COLLABORATOR' | 'VIEWER';
  invited_at: Date;
  joined_at: Date | null;
}

// Define return type for Supabase auth
interface SupabaseAuthResponse {
  data: { user: { id: string; email: string } | null };
  error: Error | null;
}

// Create typed mock function helper
const createMockFn = <T extends (...args: any[]) => any>(implementation?: T) => {
  return jest.fn(implementation) as unknown as jest.MockedFunction<T>;
};

// Mock external dependencies with proper typing
const mockCookies = createMockFn(() => ({
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn()
}));

const mockCreateRouteHandlerClient = createMockFn(() => mockSupabaseClient);
const mockSendCollaborationInvite = createMockFn<(email: string, assessmentId: string) => Promise<boolean>>();

// Mock Next.js modules
jest.mock('next/headers', () => ({
  cookies: mockCookies
}));

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: mockCreateRouteHandlerClient
}));

jest.mock('@/lib/email-notifications', () => ({
  sendCollaborationInvite: mockSendCollaborationInvite
}));

// Create Supabase client mock
const mockGetUser = createMockFn<() => Promise<SupabaseAuthResponse>>();
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

// Create comprehensive mock for AssessmentDB with proper types
const mockFindAssessmentById = createMockFn<(id: string) => Promise<MockAssessment | null>>();
const mockGetCollaborators = createMockFn<(assessmentId: string) => Promise<MockAssessmentCollaborator[]>>();
const mockCheckCollaboratorAccess = createMockFn<(assessmentId: string, email: string) => Promise<boolean>>();
const mockCheckCollaboratorRole = createMockFn<(assessmentId: string, email: string) => Promise<boolean>>();
const mockAddCollaborator = createMockFn<(assessmentId: string, email: string, role: string) => Promise<MockAssessmentCollaborator>>();
const mockRemoveCollaborator = createMockFn<(assessmentId: string, email: string) => Promise<void>>();

const mockAssessmentDB = {
  findAssessmentById: mockFindAssessmentById,
  getCollaborators: mockGetCollaborators,
  checkCollaboratorAccess: mockCheckCollaboratorAccess,
  checkCollaboratorRole: mockCheckCollaboratorRole,
  addCollaborator: mockAddCollaborator,
  removeCollaborator: mockRemoveCollaborator,
};

jest.mock('@/lib/assessment-db', () => ({
  AssessmentDB: mockAssessmentDB
}));

describe('Collaborators API Routes', () => {
  // Mock data
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com'
  };

  const mockAssessment: MockAssessment = {
    id: 'test-assessment-id',
    user_id: 'test-user-id',
    tier: 'TEAM',
    status: 'IN_PROGRESS',
    created_at: new Date(),
    updated_at: new Date()
  };

  const mockCollaborators: MockAssessmentCollaborator[] = [
    {
      id: 'collab1',
      assessment_id: 'test-assessment-id',
      email: 'collaborator1@example.com',
      role: 'ADMIN',
      invited_at: new Date(),
      joined_at: new Date()
    },
    {
      id: 'collab2',
      assessment_id: 'test-assessment-id',
      email: 'collaborator2@example.com',
      role: 'VIEWER',
      invited_at: new Date(),
      joined_at: null
    }
  ];

  // Mock Supabase client
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default successful responses for mocks
    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    mockCreateRouteHandlerClient.mockReturnValue(mockSupabaseClient);
    mockSendCollaborationInvite.mockResolvedValue(true);

    // Setup AssessmentDB mocks
    mockFindAssessmentById.mockResolvedValue(mockAssessment);
    mockGetCollaborators.mockResolvedValue(mockCollaborators);
    mockCheckCollaboratorAccess.mockResolvedValue(true);
    mockCheckCollaboratorRole.mockResolvedValue(true);
    mockAddCollaborator.mockResolvedValue({
      id: 'new-collab',
      assessment_id: 'test-assessment-id',
      email: 'new@example.com',
      role: 'COLLABORATOR',
      invited_at: new Date(),
      joined_at: null
    });
    mockRemoveCollaborator.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/assessments/[assessmentId]/collaborators', () => {
    test('should return collaborators for assessment owner', async () => {
      // Import the GET handler dynamically to avoid module resolution issues
      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('collaborators');
      expect(data.collaborators).toEqual(mockCollaborators);
      expect(mockAssessmentDB.findAssessmentById).toHaveBeenCalledWith('test-assessment-id');
      expect(mockAssessmentDB.getCollaborators).toHaveBeenCalledWith('test-assessment-id');
    });

    test('should return 401 if user is not authenticated', async () => {
      // Mock authentication failure
      mockSupabaseClient.auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: new Error('Unauthorized')
      });

      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Unauthorized');
    });

    test('should return 404 if assessment not found', async () => {
      mockAssessmentDB.findAssessmentById.mockResolvedValueOnce(null);

      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/not-found-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'not-found-id' } });
      
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Assessment not found');
    });

    test('should check collaborator access for non-owners', async () => {
      // Mock different user
      const differentAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      mockAssessmentDB.findAssessmentById.mockResolvedValueOnce(differentAssessment);

      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      expect(mockAssessmentDB.checkCollaboratorAccess).toHaveBeenCalledWith('test-assessment-id', mockUser.email);
    });
  });

  describe('POST /api/assessments/[assessmentId]/collaborators', () => {
    test('should add collaborator successfully', async () => {
      const { POST } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
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
      expect(mockAssessmentDB.addCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'new@example.com',
        'COLLABORATOR'
      );
    });

    test('should return 403 if user is not authorized to add collaborators', async () => {
      // Mock non-owner user without admin privileges
      const differentAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      mockAssessmentDB.findAssessmentById.mockResolvedValueOnce(differentAssessment);
      mockAssessmentDB.checkCollaboratorRole.mockResolvedValueOnce(false);

      const { POST } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
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
      expect(data).toHaveProperty('error', 'Only assessment owners and admins can add collaborators');
    });

    test('should return 400 for invalid request body', async () => {
      const { POST } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
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
  });

  describe('DELETE /api/assessments/[assessmentId]/collaborators', () => {
    test('should remove collaborator successfully', async () => {
      const { DELETE } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators?email=collaborator1%40example.com',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('success', true);
      expect(mockAssessmentDB.removeCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'collaborator1@example.com'
      );
    });

    test('should return 400 if email parameter is missing', async () => {
      const { DELETE } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Collaborator email is required');
    });

    test('should return 403 if user is not authorized to remove collaborators', async () => {
      // Mock non-owner user without admin privileges
      const differentAssessment = {
        ...mockAssessment,
        user_id: 'different-user-id'
      };
      mockAssessmentDB.findAssessmentById.mockResolvedValueOnce(differentAssessment);
      mockAssessmentDB.checkCollaboratorRole.mockResolvedValueOnce(false);

      const { DELETE } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      
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

  describe('Error handling', () => {
    test('should handle database errors gracefully', async () => {
      mockAssessmentDB.findAssessmentById.mockRejectedValueOnce(new Error('Database error'));

      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Internal server error');
    });

    test('should handle Supabase errors gracefully', async () => {
      mockSupabaseClient.auth.getUser.mockRejectedValueOnce(new Error('Auth service error'));

      const { GET } = require('../app/api/assessments/[assessmentId]/collaborators/route');
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Internal server error');
    });
  });
});
