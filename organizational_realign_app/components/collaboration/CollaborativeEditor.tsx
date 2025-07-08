// components/collaboration/CollaborativeEditor.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSocket } from '@/lib/socket-client';
import { Badge } from '../ui/badge';
import { Loader2, Save, Wifi, WifiOff, Users, History } from 'lucide-react';

interface CollaborativeEditorProps {
  assessmentId: string;
  section: string;
  initialContent?: string;
  readOnly?: boolean;
  onSave?: (content: string) => Promise<void>;
}

interface EditorCursor {
  userId: string;
  email: string;
  name?: string;
  position: {
    x: number;
    y: number;
  };
}

export function CollaborativeEditor({
  assessmentId,
  section,
  initialContent = '',
  readOnly = false,
  onSave,
}: CollaborativeEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [cursors, setCursors] = useState<EditorCursor[]>([]);
  const [lastEdit, setLastEdit] = useState<{ editor?: string; timestamp?: string }>({});
  const [_version, setVersion] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { socket, connected, joinAssessment, sendEdit, sendCursorPosition } = useSocket();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (assessmentId && section) {
      joinAssessment(assessmentId);
    }
    
    if (!socket) return;
    
    // Listen for edits from other users
    const handleEdit = (data: any) => {
      // Only update if this edit is for our current section
      if (data.section === section) {
        setContent(data.data.content);
        setVersion(data.version);
        setLastEdit({
          editor: data.editor?.name || data.editor?.email || 'Unknown user',
          timestamp: data.timestamp
        });
      }
    };
    
    // Listen for cursor updates from other users
    const handleCursorUpdate = (data: any) => {
      if (data.cursor?.section === section) {
        setCursors(prev => {
          // Remove the existing cursor for this user if it exists
          const filtered = prev.filter(c => c.userId !== data.userId);
          // Add the updated cursor
          return [...filtered, {
            userId: data.userId,
            email: data.email,
            name: data.name,
            position: {
              x: data.cursor.x,
              y: data.cursor.y
            }
          }];
        });
      } else {
        // If the user moved to another section, remove their cursor
        setCursors(prev => prev.filter(c => c.userId !== data.userId));
      }
    };
    
    // Listen for users leaving
    const handleUserLeft = (data: any) => {
      setCursors(prev => prev.filter(c => c.userId !== data.userId));
    };
    
    socket.on('assessment-edited', handleEdit);
    socket.on('cursor-update', handleCursorUpdate);
    socket.on('user-left', handleUserLeft);
    
    return () => {
      socket.off('assessment-edited', handleEdit);
      socket.off('cursor-update', handleCursorUpdate);
      socket.off('user-left', handleUserLeft);
    };
  }, [socket, assessmentId, section, joinAssessment]);

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasChanges(true);
  };

  // Handle cursor movement
  const handleCursorMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return;
    
    const rect = textareaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    sendCursorPosition(assessmentId, { x: relativeX, y: relativeY }, section);
  };

  // Handle saving content
  const handleSave = async () => {
    if (!onSave || saving) return;
    
    setSaving(true);
    try {
      await onSave(content);
      
      // Broadcast the edit to other users
      sendEdit(assessmentId, section, { content });
      setVersion(prev => prev + 1);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save content:', error);
    } finally {
      setSaving(false);
    }
  };

  // Render cursor indicators for other users
  const renderCursors = () => {
    if (!textareaRef.current) return null;
    
    const textareaRect = textareaRef.current.getBoundingClientRect();
    
    return cursors.map((cursor) => {
      // Ensure cursor is within bounds
      const x = Math.min(Math.max(cursor.position.x, 0), textareaRect.width);
      const y = Math.min(Math.max(cursor.position.y, 0), textareaRect.height);
      
      return (
        <div
          key={cursor.userId}
          className="absolute pointer-events-none"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            zIndex: 10
          }}
        >
          <div className="relative">
            <div 
              className="w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-70"
            />
            <div 
              className="absolute top-4 left-0 bg-blue-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
            >
              {cursor.name || cursor.email.split('@')[0]}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              {section}
              {connected ? (
                <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                  <Wifi className="h-3 w-3" />
                  Collaborative
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                  <WifiOff className="h-3 w-3" />
                  Local Only
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {cursors.length > 0 && (
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Users className="h-3 w-3" />
                  {cursors.length} user{cursors.length !== 1 ? 's' : ''} viewing this section
                </div>
              )}
              {lastEdit.editor && (
                <div className="flex items-center gap-1 text-xs mt-1">
                  <History className="h-3 w-3" />
                  Last edited by {lastEdit.editor} {lastEdit.timestamp && new Date(lastEdit.timestamp).toLocaleString()}
                </div>
              )}
            </CardDescription>
          </div>
          
          {!readOnly && (
            <Button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              size="sm"
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onMouseMove={handleCursorMove}
            disabled={readOnly}
            placeholder={`Write your ${section} content here...`}
            className="min-h-[200px] resize-y font-mono"
          />
          {renderCursors()}
        </div>
      </CardContent>
    </Card>
  );
}
