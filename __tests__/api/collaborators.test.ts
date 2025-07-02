// __tests__/api/collaborators.test.ts
import { describe, expect, it, beforeEach, jest, afterEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { GET, POST, DELETE } from '@/app/api/assessments/[assessmentId]/collaborators/route';
import { AssessmentDB } from '@/lib/assessment-db';

// Mock the necessary modules
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => ({
        data: {
          user: { id: 'test-user-id', email: 'test@example.com' }
        },
        error: null
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { email: 'test@example.com', full_name: 'Test User' }
          }))
        }))
      }))
    }))
  }))
}));

jest.mock('@/lib/assessment-db', () => ({
  AssessmentDB: {
    findAssessmentById: jest.fn(),
    getCollaborators: jest.fn(),
    checkCollaboratorAccess: jest.fn(),
    checkCollaboratorRole: jest.fn(),
    addCollaborator: jest.fn(),
    removeCollaborator: jest.fn()
  }
}));

jest.mock('@/lib/email-notifications', () => ({
  sendCollaborationInvite: jest.fn(() => Promise.resolve(true))
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));

describe('Collaborators API', () => {
  const mockAssessment = {
    id: 'test-assessment-id',
    user_id: 'test-user-id',
    tier: 'TEAM',
    status: 'IN_PROGRESS',
    created_at: new Date(),
    updated_at: new Date()
  };

  const mockCollaborators = [
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

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    (AssessmentDB.findAssessmentById as jest.Mock).mockResolvedValue(mockAssessment);
    (AssessmentDB.getCollaborators as jest.Mock).mockResolvedValue(mockCollaborators);
    (AssessmentDB.checkCollaboratorAccess as jest.Mock).mockResolvedValue(true);
    (AssessmentDB.checkCollaboratorRole as jest.Mock).mockResolvedValue(true);
    (AssessmentDB.addCollaborator as jest.Mock).mockResolvedValue({
      id: 'new-collab',
      assessment_id: 'test-assessment-id',
      email: 'new@example.com',
      role: 'COLLABORATOR',
      invited_at: new Date()
    });
    (AssessmentDB.removeCollaborator as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET handler', () => {
    it('should return collaborators for the assessment owner', async () => {
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('collaborators');
      expect(data.collaborators).toEqual(mockCollaborators);
      expect(AssessmentDB.findAssessmentById).toHaveBeenCalledWith('test-assessment-id');
      expect(AssessmentDB.getCollaborators).toHaveBeenCalledWith('test-assessment-id');
    });

    it('should return collaborators for a valid collaborator', async () => {
      // Mock a different user
      (AssessmentDB.findAssessmentById as jest.Mock).mockResolvedValueOnce({
        ...mockAssessment,
        user_id: 'different-user-id'
      });

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('collaborators');
      expect(AssessmentDB.checkCollaboratorAccess).toHaveBeenCalled();
    });

    it('should return 404 if assessment not found', async () => {
      (AssessmentDB.findAssessmentById as jest.Mock).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost/api/assessments/not-found-id/collaborators');
      const response = await GET(request, { params: { id: 'not-found-id' } });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toHaveProperty('error', 'Assessment not found');
    });
  });

  describe('POST handler', () => {
    it('should add a collaborator successfully', async () => {
      const requestBody = {
        email: 'new@example.com',
        role: 'COLLABORATOR'
      };

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });

      const response = await POST(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('collaborator');
      expect(AssessmentDB.addCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'new@example.com',
        'COLLABORATOR'
      );
    });

    it('should return 403 if user is not authorized to add collaborators', async () => {
      // Mock a different user and not admin
      (AssessmentDB.findAssessmentById as jest.Mock).mockResolvedValueOnce({
        ...mockAssessment,
        user_id: 'different-user-id'
      });
      (AssessmentDB.checkCollaboratorRole as jest.Mock).mockResolvedValueOnce(false);

      const requestBody = {
        email: 'new@example.com',
        role: 'COLLABORATOR'
      };

      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });

      const response = await POST(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data).toHaveProperty('error', 'Only assessment owners and admins can add collaborators');
    });
  });

  describe('DELETE handler', () => {
    it('should remove a collaborator successfully', async () => {
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators?email=collaborator1%40example.com',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(AssessmentDB.removeCollaborator).toHaveBeenCalledWith(
        'test-assessment-id',
        'collaborator1@example.com'
      );
    });

    it('should return 400 if email is not provided', async () => {
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators',
        { method: 'DELETE' }
      );

      const response = await DELETE(request, { params: { id: 'test-assessment-id' } });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error', 'Collaborator email is required');
    });
  });
});
