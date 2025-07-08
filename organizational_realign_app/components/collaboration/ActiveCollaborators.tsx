// components/collaboration/ActiveCollaborators.tsx
'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Users, Clock, Wifi, WifiOff } from 'lucide-react';
import { useSocket } from '@/lib/socket-client';

interface ActiveCollaboratorsProps {
  assessmentId: string;
}

interface CollaboratorUser {
  userId: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  status: 'active' | 'idle' | 'offline';
  lastActive?: string;
  cursor?: {
    x: number;
    y: number;
    section?: string;
  };
}

export function ActiveCollaborators({ assessmentId }: ActiveCollaboratorsProps) {
  const { connected, activeUsers, joinAssessment } = useSocket();

  useEffect(() => {
    // Join the assessment room when the component mounts
    if (assessmentId) {
      joinAssessment(assessmentId);
    }
  }, [assessmentId, joinAssessment]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-amber-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-5 w-5" />
            Active Collaborators
            {connected ? (
              <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                <Wifi className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                <WifiOff className="h-3 w-3" />
                Disconnected
              </Badge>
            )}
          </CardTitle>
        </div>
        <CardDescription>
          See who&apos;s currently viewing or editing this assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activeUsers.length === 0 ? (
            <div className="text-center py-3 text-sm text-gray-500">
              No active collaborators right now
            </div>
          ) : (
            activeUsers.map((user: CollaboratorUser) => (
              <div key={user.userId} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage src={user.avatarUrl || ''} alt={user.name || user.email} />
                      <AvatarFallback className="bg-primary/10">
                        {getInitials(user.name, user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div 
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white ${getStatusColor(user.status)}`}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {user.name || user.email.split('@')[0]}
                    </div>
                    {user.cursor?.section && (
                      <div className="text-xs text-gray-500">
                        Viewing: {user.cursor.section}
                      </div>
                    )}
                  </div>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'outline'} 
                        className={`${user.status === 'active' ? 'bg-green-500' : ''} px-2 py-0 h-6`}
                      >
                        {user.status === 'active' ? 'Active' : user.status === 'idle' ? 'Idle' : 'Away'}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        Last active: {user.lastActive ? new Date(user.lastActive).toLocaleTimeString() : 'Unknown'}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
