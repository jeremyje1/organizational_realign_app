// lib/analytics-events.ts
import { trackCollaborationEvent } from './collaboration-tracker';
import { SocketServer } from './socket-server';

/**
 * Initializes analytics tracking for real-time collaboration events
 */
export function initAnalyticsTracking(socketServer: SocketServer) {
  // Track user presence changes
  socketServer.on('userJoined', async (data) => {
    if (!data.userId) return;
    
    await trackCollaborationEvent({
      userId: data.userId,
      assessmentId: data.assessmentId,
      teamId: data.teamId,
      type: 'VIEW',
      section: data.section || 'General',
      metadata: {
        clientId: data.clientId,
        device: data.device
      }
    });
  });

  // Track document edits
  socketServer.on('documentEdit', async (data) => {
    if (!data.userId) return;
    
    await trackCollaborationEvent({
      userId: data.userId,
      assessmentId: data.documentId,
      teamId: data.teamId,
      type: 'EDIT',
      section: data.section || 'General',
      metadata: {
        charCount: data.charCount,
        position: data.position,
        fieldName: data.fieldName
      }
    });
  });

  // Track comments
  socketServer.on('commentAdded', async (data) => {
    if (!data.userId) return;
    
    await trackCollaborationEvent({
      userId: data.userId,
      assessmentId: data.documentId,
      teamId: data.teamId,
      type: 'COMMENT',
      section: data.section || 'General',
      metadata: {
        commentId: data.commentId,
        replyTo: data.replyTo,
        charCount: data.text?.length
      }
    });
  });

  // Track active viewing time
  socketServer.on('userActivity', async (data) => {
    if (!data.userId || data.type !== 'active') return;
    
    await trackCollaborationEvent({
      userId: data.userId,
      assessmentId: data.documentId,
      teamId: data.teamId,
      type: 'VIEW',
      section: data.section || 'General',
      metadata: {
        duration: data.duration,
        activityType: data.activityType
      }
    });
  });

  console.log('Analytics tracking initialized for real-time collaboration events');
}
