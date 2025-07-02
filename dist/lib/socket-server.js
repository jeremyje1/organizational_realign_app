"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
exports.setupSocketServer = setupSocketServer;
exports.initSocketServer = initSocketServer;
const socket_io_1 = require("socket.io");
const socket_middleware_1 = require("./socket-middleware");
const analytics_events_1 = require("./analytics-events");
const events_1 = require("events");
// Socket Server class with EventEmitter for analytics tracking
class SocketServer extends events_1.EventEmitter {
    constructor(io) {
        super();
        this.io = io;
    }
}
exports.SocketServer = SocketServer;
// Setup function for initializing the socket server
function setupSocketServer(io) {
    const socketServer = new SocketServer(io);
    // Initialize analytics tracking
    (0, analytics_events_1.initAnalyticsTracking)(socketServer);
    return socketServer;
}
// Track active users by assessment
const activeAssessments = new Map();
// Track socket to user mapping
const socketToUser = new Map();
// Event emitter for analytics tracking
class SocketServer extends events_1.EventEmitter {
    constructor(io) {
        super();
        this.io = io;
    }
}
exports.SocketServer = SocketServer;
// Global instance
let socketServer;
function initSocketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.NEXT_PUBLIC_APP_URL || 'https://app.northpathstrategies.org',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        path: '/api/socket',
    });
    // Authentication middleware
    io.use(socket_middleware_1.authenticateSocket);
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        // Handle user joining an assessment
        socket.on('join-assessment', ({ assessmentId, user }) => {
            console.log(`User ${user.email} joined assessment ${assessmentId}`);
            // Add socket to room for this assessment
            socket.join(`assessment:${assessmentId}`);
            // Track user in this assessment
            if (!activeAssessments.has(assessmentId)) {
                activeAssessments.set(assessmentId, new Map());
            }
            const assessmentUsers = activeAssessments.get(assessmentId);
            assessmentUsers.set(user.id, {
                userId: user.id,
                email: user.email,
                name: user.name,
                lastActive: new Date(),
                status: 'active',
            });
            // Store socket to user mapping for disconnect handling
            socketToUser.set(socket.id, { userId: user.id, assessmentId });
            // Notify all users in the assessment about the new user
            io.to(`assessment:${assessmentId}`).emit('user-joined', {
                userId: user.id,
                email: user.email,
                name: user.name,
                status: 'active',
            });
            // Send the current active users list to the newly joined user
            const activeUsers = Array.from(assessmentUsers.values());
            socket.emit('active-users', activeUsers);
        });
        // Handle user leaving an assessment
        socket.on('leave-assessment', ({ assessmentId, userId }) => {
            handleUserLeaving(socket.id, assessmentId, userId);
        });
        // Handle cursor movement for collaborative editing
        socket.on('cursor-move', ({ assessmentId, position, section }) => {
            const userInfo = socketToUser.get(socket.id);
            if (!userInfo)
                return;
            const { userId } = userInfo;
            const users = activeAssessments.get(assessmentId);
            if (!users)
                return;
            const user = users.get(userId);
            if (!user)
                return;
            // Update user cursor position
            user.cursor = { x: position.x, y: position.y, section };
            user.lastActive = new Date();
            users.set(userId, user);
            // Broadcast cursor position to other users in the assessment
            socket.to(`assessment:${assessmentId}`).emit('cursor-update', {
                userId,
                email: user.email,
                name: user.name,
                cursor: user.cursor,
            });
        });
        // Handle user status updates
        socket.on('status-change', ({ assessmentId, status }) => {
            const userInfo = socketToUser.get(socket.id);
            if (!userInfo)
                return;
            const { userId } = userInfo;
            const users = activeAssessments.get(assessmentId);
            if (!users)
                return;
            const user = users.get(userId);
            if (!user)
                return;
            // Update user status
            user.status = status;
            user.lastActive = new Date();
            users.set(userId, user);
            // Broadcast status update to other users in the assessment
            socket.to(`assessment:${assessmentId}`).emit('user-status-change', {
                userId,
                status,
            });
        });
        // Handle real-time comment creation
        socket.on('comment-add', ({ assessmentId, comment }) => {
            // Broadcast the new comment to all users in the assessment
            io.to(`assessment:${assessmentId}`).emit('comment-added', comment);
        });
        // Handle real-time assessment edits
        socket.on('assessment-edit', async ({ assessmentId, section, data, version }) => {
            var _a;
            const userInfo = socketToUser.get(socket.id);
            if (!userInfo)
                return;
            const { userId } = userInfo;
            try {
                // Store the edit in the database for persistence
                // This is a simplified version - in production you'd want to handle conflicts
                const timestamp = new Date().toISOString();
                // Update the assessment version in the database
                // This would typically be done through a database transaction
                // to ensure data consistency
                // Broadcast the edit to all users in the assessment
                io.to(`assessment:${assessmentId}`).emit('assessment-edited', {
                    userId,
                    section,
                    data,
                    version,
                    timestamp,
                    editor: socket.data.user ? {
                        id: socket.data.user.id,
                        email: socket.data.user.email,
                        name: (_a = socket.data.user.user_metadata) === null || _a === void 0 ? void 0 : _a.name
                    } : undefined
                });
            }
            catch (error) {
                console.error('Error saving assessment edit:', error);
                socket.emit('edit-error', {
                    message: 'Failed to save edit',
                    section,
                    timestamp: new Date().toISOString()
                });
            }
        });
        // Handle disconnections
        socket.on('disconnect', () => {
            const userInfo = socketToUser.get(socket.id);
            if (userInfo) {
                const { userId, assessmentId } = userInfo;
                handleUserLeaving(socket.id, assessmentId, userId);
            }
            console.log('Client disconnected:', socket.id);
        });
    });
    // Store globally for access in other parts of the app
    global.io = io;
    // Create socket server event emitter
    socketServer = new SocketServer(io);
    // Initialize analytics tracking
    (0, analytics_events_1.initAnalyticsTracking)(socketServer);
    console.log('Socket server initialized with analytics tracking');
    return io;
}
// Helper function to handle a user leaving
function handleUserLeaving(socketId, assessmentId, userId) {
    const users = activeAssessments.get(assessmentId);
    if (users) {
        users.delete(userId);
        if (users.size === 0) {
            activeAssessments.delete(assessmentId);
        }
    }
    socketToUser.delete(socketId);
    // Notify others that user has left
    const io = global.io;
    if (io) {
        io.to(`assessment:${assessmentId}`).emit('user-left', { userId });
    }
}
// For scheduled cleanups of idle users
setInterval(() => {
    const now = new Date();
    activeAssessments.forEach((users, assessmentId) => {
        users.forEach((user, userId) => {
            const idleTimeMs = now.getTime() - user.lastActive.getTime();
            // If user has been idle for more than 30 minutes, set them as offline
            if (idleTimeMs > 30 * 60 * 1000 && user.status !== 'offline') {
                user.status = 'offline';
                users.set(userId, user);
                // Notify users about status change
                const io = global.io;
                if (io) {
                    io.to(`assessment:${assessmentId}`).emit('user-status-change', {
                        userId,
                        status: 'offline',
                    });
                }
            }
            // If idle for more than 5 minutes, set as idle
            else if (idleTimeMs > 5 * 60 * 1000 && user.status === 'active') {
                user.status = 'idle';
                users.set(userId, user);
                // Notify users about status change
                const io = global.io;
                if (io) {
                    io.to(`assessment:${assessmentId}`).emit('user-status-change', {
                        userId,
                        status: 'idle',
                    });
                }
            }
        });
    });
}, 60 * 1000); // Check every minute
