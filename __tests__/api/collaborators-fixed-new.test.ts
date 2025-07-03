// __tests__/api/collaborators-fixed-new.test.ts
import { NextRequest } from 'next/server';

// Mock all external dependencies
// ------------------------------

// Mock Next.js headers
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn()
  })
}));

// Define test data
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com'
};

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

// Create Supabase client mock
const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(() => Promise.resolve({
      data: { user: mockUser },
      error: null
    }))
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({
          data: { full_name: 'Test User' }
        }))
      }))
    }))
  }))
} as any;

// Mock the createRouteHandlerClient function
const mockCreateRouteHandlerClient = jest.fn(() => mockSupabaseClient);

// Mock Supabase module
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: mockCreateRouteHandlerClient
}));

// Mock AssessmentDB
const mockAssessmentDB = {
  findAssessmentById: jest.fn(),
  getCollaborators: jest.fn(),
  checkCollaboratorAccess: jest.fn(),
  checkCollaboratorRole: jest.fn(),
  addCollaborator: jest.fn(),
  removeCollaborator: jest.fn()
};

jest.mock('../../lib/assessment-db', () => ({
  AssessmentDB: mockAssessmentDB
}));

// Mock email notifications
jest.mock('@/lib/email-notifications', () => ({
  sendCollaborationInvite: jest.fn(() => Promise.resolve(true))
}));

describe('Collaborators API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset Supabase mock
    mockCreateRouteHandlerClient.mockReturnValue(mockSupabaseClient);
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });
    
    // Setup default mock implementations
    mockAssessmentDB.findAssessmentById.mockResolvedValue(mockAssessment);
    mockAssessmentDB.getCollaborators.mockResolvedValue(mockCollaborators);
    mockAssessmentDB.checkCollaboratorAccess.mockResolvedValue(true);
    mockAssessmentDB.checkCollaboratorRole.mockResolvedValue(true);
    mockAssessmentDB.addCollaborator.mockResolvedValue({
      id: 'new-collab',
      assessment_id: 'test-assessment-id',
      email: 'new@example.com',
      role: 'COLLABORATOR',
      invited_at: new Date()
    });
    mockAssessmentDB.removeCollaborator.mockResolvedValue(undefined);
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  describe('Route Import', () => {
    test('should be able to import route handlers', async () => {
      // Import the route handlers
      const routeModule = await import('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      expect(routeModule).toBeDefined();
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
      // Import the GET handler
      const { GET } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('collaborators');
      expect(data.collaborators).toHaveLength(2);
      expect(data.collaborators[0]).toMatchObject({
        id: 'collab1',
        assessment_id: 'test-assessment-id',
        email: 'collaborator1@example.com',
        role: 'ADMIN'
      });
      expect(data.collaborators[1]).toMatchObject({
        id: 'collab2',
        assessment_id: 'test-assessment-id',
        email: 'collaborator2@example.com',
        role: 'VIEWER',
        joined_at: null
      });
      expect(mockAssessmentDB.findAssessmentById).toHaveBeenCalledWith('test-assessment-id');
      expect(mockAssessmentDB.getCollaborators).toHaveBeenCalledWith('test-assessment-id');
    });
    
    test('should return 401 if user is not authenticated', async () => {
      // Mock authentication failure
      (mockSupabaseClient.auth.getUser as jest.Mock).mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Unauthorized' }
      });
      
      const { GET } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/test-assessment-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Unauthorized');
    });
    
    test('should return 404 if assessment not found', async () => {
      mockAssessmentDB.findAssessmentById.mockResolvedValueOnce(null);
      
      const { GET } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest('http://localhost/api/assessments/not-found-id/collaborators');
      const response = await GET(request, { params: { assessmentId: 'not-found-id' } });
      
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Assessment not found');
    });
  });
  
  describe('POST /api/assessments/[assessmentId]/collaborators', () => {
    test('should add a collaborator successfully', async () => {
      const { POST } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
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
  });
  
  describe('DELETE /api/assessments/[assessmentId]/collaborators', () => {
    test('should remove a collaborator successfully', async () => {
      const { DELETE } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
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
    
    test('should return 400 if email is not provided', async () => {
      const { DELETE } = require('../../app/api/assessments/[assessmentId]/collaborators/route');
      
      const request = new NextRequest(
        'http://localhost/api/assessments/test-assessment-id/collaborators',
        { method: 'DELETE' }
      );
      
      const response = await DELETE(request, { params: { assessmentId: 'test-assessment-id' } });
      
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data).toHaveProperty('error', 'Collaborator email is required');
    });
  });
});
