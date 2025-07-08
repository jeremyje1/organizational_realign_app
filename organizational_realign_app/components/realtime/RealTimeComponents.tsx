/**
 * Real-time Client Components
 * React components and hooks for real-time collaboration features
 */

'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback, 
  useRef 
} from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

// Types
interface RealTimeUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  lastSeen: Date;
  isOnline?: boolean;
}

interface CursorPosition {
  userId: string;
  x: number;
  y: number;
  element?: string;
  timestamp: number;
}

interface CollaborationEvent {
  type: 'cursor_move' | 'selection_change' | 'field_edit' | 'section_complete' | 'comment_add';
  userId: string;
  roomId: string;
  data: any;
  timestamp: Date;
}

interface RealTimeContextValue {
  socket: Socket | null;
  isConnected: boolean;
  currentRoom: string | null;
  roomUsers: RealTimeUser[];
  cursors: Map<string, CursorPosition>;
  joinRoom: (roomId: string, roomType: string) => void;
  leaveRoom: () => void;
  sendCollaborationEvent: (event: Omit<CollaborationEvent, 'timestamp'>) => void;
  sendNotification: (targetUsers: string[], type: string, message: string) => void;
}

// Context
const RealTimeContext = createContext<RealTimeContextValue | null>(null);

// Provider Component
export function RealTimeProvider({ 
  children, 
  userId, 
  userToken 
}: { 
  children: React.ReactNode;
  userId?: string;
  userToken?: string;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [roomUsers, setRoomUsers] = useState<RealTimeUser[]>([]);
  const [cursors, setCursors] = useState<Map<string, CursorPosition>>(new Map());
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Initialize socket connection
  useEffect(() => {
    if (!userId || !userToken) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: maxReconnectAttempts
    });

    // Connection events
    socketInstance.on('connect', () => {
      console.log('[RealTime] Connected to server');
      setIsConnected(true);
      reconnectAttempts.current = 0;
      
      // Authenticate
      socketInstance.emit('authenticate', { userId, token: userToken });
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('[RealTime] Disconnected:', reason);
      setIsConnected(false);
      setCurrentRoom(null);
      setRoomUsers([]);
      setCursors(new Map());
    });

    socketInstance.on('connect_error', (error) => {
      console.error('[RealTime] Connection error:', error);
      reconnectAttempts.current += 1;
      
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        toast({
          title: 'Connection Lost',
          description: 'Unable to connect to real-time services. Some features may not work.',
          variant: 'destructive'
        });
      }
    });

    // Authentication events
    socketInstance.on('authenticated', (data) => {
      console.log('[RealTime] Authenticated:', data);
      toast({
        title: 'Real-time Connected',
        description: 'You are now connected for live collaboration.',
        duration: 3000
      });
    });

    socketInstance.on('auth_error', (error) => {
      console.error('[RealTime] Auth error:', error);
      toast({
        title: 'Authentication Failed',
        description: 'Could not authenticate for real-time features.',
        variant: 'destructive'
      });
    });

    // Room events
    socketInstance.on('room_joined', (data) => {
      console.log('[RealTime] Joined room:', data);
      setCurrentRoom(data.roomId);
      setRoomUsers(data.users);
    });

    socketInstance.on('user_joined', (data) => {
      console.log('[RealTime] User joined:', data);
      setRoomUsers(prev => [...prev.filter(u => u.id !== data.user.id), data.user]);
      toast({
        title: 'User Joined',
        description: `${data.user.name} joined the session`,
        duration: 2000
      });
    });

    socketInstance.on('user_left', (data) => {
      console.log('[RealTime] User left:', data);
      setRoomUsers(prev => prev.filter(u => u.id !== data.userId));
      setCursors(prev => {
        const newCursors = new Map(prev);
        newCursors.delete(data.userId);
        return newCursors;
      });
    });

    // Collaboration events
    socketInstance.on('collaboration_event', (event) => {
      console.log('[RealTime] Collaboration event:', event);
      // Handle different collaboration events
      handleCollaborationEvent(event);
    });

    socketInstance.on('cursor_update', (data) => {
      setCursors(prev => {
        const newCursors = new Map(prev);
        newCursors.set(data.userId, data);
        return newCursors;
      });
    });

    // Assessment events
    socketInstance.on('assessment_updated', (data) => {
      console.log('[RealTime] Assessment updated:', data);
      // Trigger assessment refresh or update
      window.dispatchEvent(new CustomEvent('assessment_updated', { detail: data }));
    });

    // Notification events
    socketInstance.on('notification', (data) => {
      toast({
        title: 'Real-time Notification',
        description: data.message,
        duration: 4000
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId, userToken]);

  // Handle collaboration events
  const handleCollaborationEvent = useCallback((event: CollaborationEvent) => {
    switch (event.type) {
      case 'field_edit':
        // Highlight field being edited
        highlightElement(event.data.fieldId, event.userId);
        break;
      case 'section_complete':
        toast({
          title: 'Section Completed',
          description: `A team member completed ${event.data.sectionName}`,
          duration: 3000
        });
        break;
      case 'comment_add':
        // Show comment notification
        toast({
          title: 'New Comment',
          description: `Comment added to ${event.data.section}`,
          duration: 3000
        });
        break;
    }
  }, []);

  // Helper function to highlight elements
  const highlightElement = useCallback((elementId: string, userId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('real-time-editing');
      element.style.borderColor = getUserColor(userId);
      
      setTimeout(() => {
        element.classList.remove('real-time-editing');
        element.style.borderColor = '';
      }, 3000);
    }
  }, []);

  // Join room function
  const joinRoom = useCallback((roomId: string, roomType: string) => {
    if (!socket || !userId) return;

    const userData: RealTimeUser = {
      id: userId,
      name: 'Current User', // Would come from user context
      email: 'user@example.com',
      role: 'member',
      lastSeen: new Date()
    };

    socket.emit('join_room', { roomId, roomType, userData });
  }, [socket, userId]);

  // Leave room function
  const leaveRoom = useCallback(() => {
    if (!socket || !currentRoom) return;
    
    socket.emit('leave_room', { roomId: currentRoom });
    setCurrentRoom(null);
    setRoomUsers([]);
    setCursors(new Map());
  }, [socket, currentRoom]);

  // Send collaboration event
  const sendCollaborationEvent = useCallback((event: Omit<CollaborationEvent, 'timestamp'>) => {
    if (!socket) return;
    
    socket.emit('collaboration_event', {
      ...event,
      timestamp: new Date()
    });
  }, [socket]);

  // Send notification
  const sendNotification = useCallback((targetUsers: string[], type: string, message: string) => {
    if (!socket) return;
    
    socket.emit('send_notification', {
      targetUsers,
      type,
      message
    });
  }, [socket]);

  const contextValue: RealTimeContextValue = {
    socket,
    isConnected,
    currentRoom,
    roomUsers,
    cursors,
    joinRoom,
    leaveRoom,
    sendCollaborationEvent,
    sendNotification
  };

  return (
    <RealTimeContext.Provider value={contextValue}>
      {children}
      <LiveCursors cursors={cursors} />
      <ConnectionStatus isConnected={isConnected} />
    </RealTimeContext.Provider>
  );
}

// Hook to use real-time context
export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}

// Live Cursors Component
function LiveCursors({ cursors }: { cursors: Map<string, CursorPosition> }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {Array.from(cursors.entries()).map(([userId, cursor]) => (
          <motion.div
            key={userId}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'absolute',
              left: cursor.x,
              top: cursor.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 9999
            }}
            className="pointer-events-none"
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: getUserColor(userId) }}
            />
            <div 
              className="absolute top-5 left-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
              style={{ backgroundColor: getUserColor(userId) }}
            >
              User {userId.slice(-4)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Connection Status Component
function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setShowStatus(true);
      const timer = setTimeout(() => setShowStatus(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowStatus(false);
    }
  }, [isConnected]);

  if (!showStatus) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <Badge variant={isConnected ? 'default' : 'destructive'}>
        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
      </Badge>
    </motion.div>
  );
}

// Active Users Component
export function ActiveUsers() {
  const { roomUsers, isConnected } = useRealTime();

  if (!isConnected || roomUsers.length === 0) {
    return null;
  }

  return (
    <Card className="w-64">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Active Users ({roomUsers.length})
        </h3>
        <div className="space-y-2">
          {roomUsers.map(user => (
            <div key={user.id} className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.name}</span>
              <Badge variant="outline" className="text-xs">
                {user.role}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Real-time Assessment Component
export function RealTimeAssessment({ 
  assessmentId,
  children 
}: { 
  assessmentId: string;
  children: React.ReactNode;
}) {
  const { joinRoom, leaveRoom, sendCollaborationEvent } = useRealTime();

  useEffect(() => {
    // Join assessment room
    joinRoom(`assessment_${assessmentId}`, 'assessment');

    // Listen for assessment updates
    const handleAssessmentUpdate = (event: CustomEvent) => {
      // Handle real-time assessment updates
      console.log('Assessment updated:', event.detail);
    };

    window.addEventListener('assessment_updated', handleAssessmentUpdate as EventListener);

    return () => {
      leaveRoom();
      window.removeEventListener('assessment_updated', handleAssessmentUpdate as EventListener);
    };
  }, [assessmentId, joinRoom, leaveRoom]);

  // Track mouse movements for cursor sharing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      sendCollaborationEvent({
        type: 'cursor_move',
        userId: 'current_user', // Would come from user context
        roomId: `assessment_${assessmentId}`,
        data: { x: e.clientX, y: e.clientY }
      });
    };

    const throttledMouseMove = throttle(handleMouseMove, 50);
    document.addEventListener('mousemove', throttledMouseMove);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, [assessmentId, sendCollaborationEvent]);

  return (
    <div className="real-time-assessment">
      {children}
    </div>
  );
}

// Real-time Form Field Component
export function RealTimeFormField({
  fieldId,
  children,
  onEdit
}: {
  fieldId: string;
  children: React.ReactNode;
  onEdit?: (value: any) => void;
}) {
  const { sendCollaborationEvent } = useRealTime();
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
    sendCollaborationEvent({
      type: 'field_edit',
      userId: 'current_user',
      roomId: 'current_room',
      data: { fieldId, action: 'focus' }
    });
  };

  const handleBlur = () => {
    setIsEditing(false);
    sendCollaborationEvent({
      type: 'field_edit',
      userId: 'current_user',
      roomId: 'current_room',
      data: { fieldId, action: 'blur' }
    });
  };

  const handleChange = (value: any) => {
    onEdit?.(value);
    sendCollaborationEvent({
      type: 'field_edit',
      userId: 'current_user',
      roomId: 'current_room',
      data: { fieldId, action: 'change', value }
    });
  };

  return (
    <div 
      id={fieldId}
      className={`real-time-field ${isEditing ? 'editing' : ''}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {React.cloneElement(children as React.ReactElement, {
        onChange: handleChange
      })}
    </div>
  );
}

// Utility functions
function getUserColor(userId: string): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colors[Math.abs(hash) % colors.length];
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Custom styles for real-time editing
const realTimeStyles = `
  .real-time-editing {
    border: 2px solid !important;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3) !important;
    transition: all 0.3s ease !important;
  }
  
  .real-time-field.editing {
    position: relative;
  }
  
  .real-time-field.editing::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid #4F46E5;
    border-radius: 4px;
    pointer-events: none;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = realTimeStyles;
  document.head.appendChild(style);
}
