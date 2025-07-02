"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAnalyticsTracking = initAnalyticsTracking;
// lib/analytics-events.ts
const collaboration_tracker_1 = require("./collaboration-tracker");
/**
 * Initializes analytics tracking for real-time collaboration events
 */
function initAnalyticsTracking(socketServer) {
    // Track user presence changes
    socketServer.on('userJoined', async (data) => {
        if (!data.userId)
            return;
        await (0, collaboration_tracker_1.trackCollaborationEvent)({
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
        if (!data.userId)
            return;
        await (0, collaboration_tracker_1.trackCollaborationEvent)({
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
        var _a;
        if (!data.userId)
            return;
        await (0, collaboration_tracker_1.trackCollaborationEvent)({
            userId: data.userId,
            assessmentId: data.documentId,
            teamId: data.teamId,
            type: 'COMMENT',
            section: data.section || 'General',
            metadata: {
                commentId: data.commentId,
                replyTo: data.replyTo,
                charCount: (_a = data.text) === null || _a === void 0 ? void 0 : _a.length
            }
        });
    });
    // Track active viewing time
    socketServer.on('userActivity', async (data) => {
        if (!data.userId || data.type !== 'active')
            return;
        await (0, collaboration_tracker_1.trackCollaborationEvent)({
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
