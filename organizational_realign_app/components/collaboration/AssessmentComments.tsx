'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Reply, 
  MoreVertical,
  Calendar,
  Wifi,
  WifiOff
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useSocket } from '@/lib/socket-client';

interface Comment {
  id: string;
  assessment_id: string;
  user_id: string;
  content: string;
  section?: string;
  created_at: string;
  profiles: {
    email: string;
    full_name?: string;
  };
}

interface AssessmentCommentsProps {
  assessmentId: string;
  section?: string;
  isReadOnly?: boolean;
}

export function AssessmentComments({ assessmentId, section, isReadOnly: _isReadOnly = false }: AssessmentCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { socket, connected, joinAssessment, sendComment } = useSocket();
  
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  }, [assessmentId]);

  useEffect(() => {
    fetchComments();
    
    // Join the assessment room when component mounts
    if (assessmentId) {
      joinAssessment(assessmentId);
    }
    
    // Set up socket listeners for real-time comments
    if (socket) {
      const handleNewComment = (comment: Comment) => {
        // Only add the comment if it's for the current section or if no section filter is applied
        if (!section || comment.section === section) {
          setComments(prev => {
            // Check if we already have this comment (to avoid duplicates)
            if (prev.some(c => c.id === comment.id)) {
              return prev;
            }
            return [...prev, comment];
          });
        }
      };
      
      socket.on('comment-added', handleNewComment);
      
      return () => {
        socket.off('comment-added', handleNewComment);
      };
    }
  }, [assessmentId, fetchComments, joinAssessment, section, socket]);

  const submitComment = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          section,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const comment = data.comment;
        
        // Add to local state
        setComments(prev => [...prev, comment]);
        setNewComment('');
        
        // Broadcast to other users via socket
        sendComment(assessmentId, comment);
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredComments = section 
    ? comments.filter(comment => comment.section === section)
    : comments;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments {section && `- ${section}`}
              {connected ? (
                <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                  <Wifi className="h-3 w-3" />
                  Real-time
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                  <WifiOff className="h-3 w-3" />
                  Offline
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Collaborate with your team on this assessment
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Comment Form */}
        <div className="space-y-3">
          <Textarea
            placeholder={`Add a comment${section ? ` about ${section}` : ''}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {section && (
                <Badge variant="outline" className="mr-2">
                  {section}
                </Badge>
              )}
              Comments are visible to all team members with access to this assessment
            </div>
            <Button 
              onClick={submitComment} 
              disabled={submitting || !newComment.trim()}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4 border-t pt-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading comments...
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
              <p className="text-gray-600">
                Start the conversation by adding the first comment.
              </p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">
                    {getInitials(comment.profiles.full_name, comment.profiles.email)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {comment.profiles.full_name || comment.profiles.email}
                        </span>
                        {comment.section && (
                          <Badge variant="outline" className="text-xs">
                            {comment.section}
                          </Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(comment.created_at)}
                    </div>
                    <Button variant="outline" className="h-auto p-0 text-xs">
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredComments.length > 0 && (
          <div className="text-center pt-4 border-t">
            <Button variant="outline">
              Load More Comments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
