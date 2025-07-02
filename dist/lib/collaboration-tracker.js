"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCollaborationEvent = trackCollaborationEvent;
exports.getCollaborationStats = getCollaborationStats;
// lib/collaboration-tracker.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Tracks a collaboration event for analytics purposes
 */
async function trackCollaborationEvent({ userId, assessmentId, teamId, type, section, metadata = {}, }) {
    try {
        const event = await prisma.collaborationEvent.create({
            data: {
                userId,
                assessmentId,
                teamId,
                type,
                section,
                metadata,
            },
        });
        return event;
    }
    catch (error) {
        console.error('Failed to track collaboration event:', error);
        // Don't throw - we don't want to break application flow for analytics
        return null;
    }
}
/**
 * Gets collaboration stats for a team or assessment
 */
async function getCollaborationStats(timeRange = 'week', options) {
    const { teamId, assessmentId } = options;
    if (!teamId && !assessmentId) {
        throw new Error('Either teamId or assessmentId must be provided');
    }
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    switch (timeRange) {
        case 'day':
            startDate.setDate(now.getDate() - 1);
            break;
        case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
        case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
        case 'year':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
    }
    // Get events in date range
    let events = [];
    try {
        events = await prisma.collaborationEvent.findMany({
            where: Object.assign(Object.assign(Object.assign({}, (teamId ? { teamId } : {})), (assessmentId ? { assessmentId } : {})), { createdAt: {
                    gte: startDate,
                } }),
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
    catch (error) {
        console.error('Error fetching collaboration events:', error);
        // If table doesn't exist yet or there's another database issue, return empty array
        events = [];
    }
    // Calculate basic stats
    const totalEvents = events.length;
    const eventsByType = events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
    }, {});
    return {
        totalEvents,
        eventsByType,
        events,
    };
}
