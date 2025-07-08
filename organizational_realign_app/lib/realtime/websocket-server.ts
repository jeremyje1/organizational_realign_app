/**
 * Real-time WebSocket System
 * Provides comprehensive real-time features for live collaboration and updates
 */

import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { analytics } from '@/analytics/gtm-datalayer';

// Types for real-time events
export interface RealTimeUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  lastSeen: Date;
}

export interface RealTimeRoom {
  id: string;
  type: 'assessment' | 'dashboard' | 'results';
  users: Map<string, RealTimeUser>;
  metadata: Record<string, any>;
}

export interface RealTimeEvent {
  type: string;
  userId: string;
  roomId: string;
  data: any;
  timestamp: Date;
}

export interface CollaborationEvent extends RealTimeEvent {
  type: 'cursor_move' | 'selection_change' | 'field_edit' | 'section_complete' | 'comment_add';
}

export interface SystemEvent extends RealTimeEvent {
  type: 'user_join' | 'user_leave' | 'assessment_update' | 'notification' | 'sync_request';
}

// Real-time WebSocket Manager
export class RealTimeManager {
  private io: SocketIOServer;
  private rooms: Map<string, RealTimeRoom> = new Map();
  private userSockets: Map<string, Socket> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? ['https://your-domain.com'] 
          : ['http://localhost:3000', 'http://localhost:3001'],
        methods: ['GET', 'POST'],
        credentials: true
      },
      transports: ['websocket', 'polling']
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`[RealTime] User connected: ${socket.id}`);

      // Handle user authentication
      socket.on('authenticate', (data: { userId: string, token: string }) => {
        this.handleAuthentication(socket, data);
      });

      // Handle room joining
      socket.on('join_room', (data: { roomId: string, roomType: string, userData: RealTimeUser }) => {
        this.handleJoinRoom(socket, data);
      });

      // Handle room leaving
      socket.on('leave_room', (data: { roomId: string }) => {
        this.handleLeaveRoom(socket, data);
      });

      // Handle collaboration events
      socket.on('collaboration_event', (event: CollaborationEvent) => {
        this.handleCollaborationEvent(socket, event);
      });

      // Handle assessment updates
      socket.on('assessment_update', (data: { 
        assessmentId: string, 
        updates: any, 
        userId: string 
      }) => {
        this.handleAssessmentUpdate(socket, data);
      });

      // Handle live cursor movements
      socket.on('cursor_move', (data: { 
        roomId: string, 
        x: number, 
        y: number, 
        element?: string 
      }) => {
        this.handleCursorMove(socket, data);
      });

      // Handle real-time notifications
      socket.on('send_notification', (data: {
        targetUsers: string[],
        type: string,
        message: string,
        metadata?: any
      }) => {
        this.handleNotification(socket, data);
      });

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        this.handleDisconnection(socket, reason);
      });

      // Handle ping/pong for connection health
      socket.on('ping', () => {
        socket.emit('pong');
      });
    });
  }

  private async handleAuthentication(
    socket: Socket, 
    data: { userId: string, token: string }
  ): Promise<void> {
    try {
      // Verify token and get user data
      const user = await this.verifyUserToken(data.token);
      if (!user) {
        socket.emit('auth_error', { message: 'Invalid token' });
        return;
      }

      // Associate socket with user
      socket.data.user = user;
      socket.data.userId = data.userId;
      this.userSockets.set(data.userId, socket);

      socket.emit('authenticated', { user, socketId: socket.id });
      
      // Track authentication
      analytics.emitEvent('realtime_auth', {
        user_id: data.userId,
        socket_id: socket.id
      });

    } catch (error) {
      console.error('[RealTime] Authentication error:', error);
      socket.emit('auth_error', { message: 'Authentication failed' });
    }
  }

  private handleJoinRoom(
    socket: Socket, 
    data: { roomId: string, roomType: string, userData: RealTimeUser }
  ): void {
    const { roomId, roomType, userData } = data;

    // Create room if it doesn't exist
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        type: roomType as any,
        users: new Map(),
        metadata: {}
      });
    }

    const room = this.rooms.get(roomId)!;
    room.users.set(userData.id, userData);

    // Join socket room
    socket.join(roomId);
    socket.data.currentRoom = roomId;

    // Notify other users in room
    socket.to(roomId).emit('user_joined', {
      user: userData,
      roomId,
      userCount: room.users.size
    });

    // Send current room state to new user
    socket.emit('room_joined', {
      roomId,
      roomType,
      users: Array.from(room.users.values()),
      metadata: room.metadata
    });

    // Track room join
    analytics.emitEvent('realtime_room_join', {
      user_id: userData.id,
      room_id: roomId,
      room_type: roomType,
      user_count: room.users.size
    });

    console.log(`[RealTime] User ${userData.id} joined room ${roomId}`);
  }

  private handleLeaveRoom(socket: Socket, data: { roomId: string }): void {
    const { roomId } = data;
    const userId = socket.data.userId;

    if (!userId || !this.rooms.has(roomId)) return;

    const room = this.rooms.get(roomId)!;
    room.users.delete(userId);

    socket.leave(roomId);
    socket.data.currentRoom = null;

    // Notify other users
    socket.to(roomId).emit('user_left', {
      userId,
      roomId,
      userCount: room.users.size
    });

    // Clean up empty rooms
    if (room.users.size === 0) {
      this.rooms.delete(roomId);
    }

    console.log(`[RealTime] User ${userId} left room ${roomId}`);
  }

  private handleCollaborationEvent(socket: Socket, event: CollaborationEvent): void {
    const roomId = socket.data.currentRoom;
    if (!roomId) return;

    // Broadcast to other users in room
    socket.to(roomId).emit('collaboration_event', {
      ...event,
      timestamp: new Date(),
      socketId: socket.id
    });

    // Track collaboration activity
    analytics.emitEvent('realtime_collaboration', {
      user_id: event.userId,
      room_id: roomId,
      event_type: event.type,
      timestamp: new Date().toISOString()
    });
  }

  private async handleAssessmentUpdate(
    socket: Socket, 
    data: { assessmentId: string, updates: any, userId: string }
  ): Promise<void> {
    try {
      // Save updates to database
      await this.saveAssessmentUpdates(data.assessmentId, data.updates, data.userId);

      // Broadcast to room members
      const roomId = `assessment_${data.assessmentId}`;
      socket.to(roomId).emit('assessment_updated', {
        assessmentId: data.assessmentId,
        updates: data.updates,
        updatedBy: data.userId,
        timestamp: new Date()
      });

      socket.emit('assessment_update_confirmed', {
        assessmentId: data.assessmentId,
        status: 'saved'
      });

    } catch (error) {
      console.error('[RealTime] Assessment update error:', error);
      socket.emit('assessment_update_error', {
        assessmentId: data.assessmentId,
        error: 'Failed to save updates'
      });
    }
  }

  private handleCursorMove(
    socket: Socket, 
    data: { roomId: string, x: number, y: number, element?: string }
  ): void {
    const userId = socket.data.userId;
    if (!userId) return;

    // Broadcast cursor position to other users
    socket.to(data.roomId).emit('cursor_update', {
      userId,
      x: data.x,
      y: data.y,
      element: data.element,
      timestamp: Date.now()
    });
  }

  private handleNotification(
    socket: Socket,
    data: {
      targetUsers: string[],
      type: string,
      message: string,
      metadata?: any
    }
  ): void {
    const senderId = socket.data.userId;
    if (!senderId) return;

    // Send notification to target users
    data.targetUsers.forEach(userId => {
      const targetSocket = this.userSockets.get(userId);
      if (targetSocket) {
        targetSocket.emit('notification', {
          from: senderId,
          type: data.type,
          message: data.message,
          metadata: data.metadata,
          timestamp: new Date()
        });
      }
    });
  }

  private handleDisconnection(socket: Socket, reason: string): void {
    const userId = socket.data.userId;
    const roomId = socket.data.currentRoom;

    if (userId) {
      this.userSockets.delete(userId);
    }

    if (roomId && this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId)!;
      if (userId) {
        room.users.delete(userId);
      }

      // Notify room members
      socket.to(roomId).emit('user_disconnected', {
        userId,
        reason,
        userCount: room.users.size
      });

      // Clean up empty rooms
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
      }
    }

    console.log(`[RealTime] User ${userId} disconnected: ${reason}`);
  }

  // Public methods for external use
  public broadcastToRoom(roomId: string, event: string, data: any): void {
    this.io.to(roomId).emit(event, data);
  }

  public sendToUser(userId: string, event: string, data: any): void {
    const socket = this.userSockets.get(userId);
    if (socket) {
      socket.emit(event, data);
    }
  }

  public getRoomUsers(roomId: string): RealTimeUser[] {
    const room = this.rooms.get(roomId);
    return room ? Array.from(room.users.values()) : [];
  }

  public isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }

  // Private utility methods
  private async verifyUserToken(token: string): Promise<RealTimeUser | null> {
    try {
      // In a real implementation, verify JWT token and fetch user data
      // For now, return mock user data
      return {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'Test User',
        email: 'test@example.com',
        role: 'member',
        lastSeen: new Date()
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  private async saveAssessmentUpdates(
    assessmentId: string, 
    updates: any, 
    userId: string
  ): Promise<void> {
    // In a real implementation, save to database
    console.log(`[RealTime] Saving assessment updates for ${assessmentId} by ${userId}:`, updates);
  }
}

// Singleton manager instance
let realTimeManager: RealTimeManager | null = null;

export function initRealTimeManager(server: HTTPServer): RealTimeManager {
  if (!realTimeManager) {
    realTimeManager = new RealTimeManager(server);
  }
  return realTimeManager;
}

export function getRealTimeManager(): RealTimeManager | null {
  return realTimeManager;
}

// Next.js API route handler for WebSocket
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socket = res.socket as any;
  if (socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new SocketIOServer(socket.server);
    socket.server.io = io;
  }
  res.end();
}
