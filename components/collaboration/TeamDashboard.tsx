// components/collaboration/TeamDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  FileBarChart, 
  Bell,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { TeamCollaboration } from './TeamCollaboration';
import Link from 'next/link';

interface TeamDashboardProps {
  userId: string;
}

export function TeamDashboard({ userId: _userId }: TeamDashboardProps) {
  const [teamAssessments, setTeamAssessments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const [_teamsRes, assessmentsRes, notificationsRes] = await Promise.all([
        fetch('/api/teams'),
        fetch('/api/assessments/shared'),
        fetch('/api/notifications')
      ]);

      // const teamsData = await teamsRes.json();
      const assessmentsData = await assessmentsRes.json();
      const notificationsData = await notificationsRes.json();

      setTeamAssessments(assessmentsData.assessments || []);
      setNotifications(notificationsData.notifications || []);
    } catch (error) {
      console.error('Failed to fetch team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, icon: React.ReactNode }> = {
      'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3 mr-1" /> },
      'IN_PROGRESS': { color: 'bg-blue-100 text-blue-800', icon: <FileBarChart className="h-3 w-3 mr-1" /> },
      'COMPLETED': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      'ANALYZED': { color: 'bg-purple-100 text-purple-800', icon: <FileBarChart className="h-3 w-3 mr-1" /> },
      'DELIVERED': { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3 mr-1" /> }
    };

    const { color, icon } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="h-3 w-3 mr-1" /> };
    
    return (
      <Badge className={`flex items-center ${color}`}>
        {icon}
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Team Dashboard</h2>
        <Button asChild>
          <Link href="/teams/new">
            Create Team
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="assessments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessments">Team Assessments</TabsTrigger>
          <TabsTrigger value="teams">My Teams</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-4">
          {loading ? (
            <div className="text-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : teamAssessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamAssessments.map((assessment) => (
                <Card key={assessment.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{assessment.title || `Assessment #${assessment.id.slice(0, 8)}`}</CardTitle>
                      {getStatusBadge(assessment.status)}
                    </div>
                    <CardDescription>
                      Shared by {assessment.owner_email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex space-x-2 mb-3">
                      <Badge variant="outline" className="bg-slate-50">
                        {assessment.tier}
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50">
                        {assessment.role}
                      </Badge>
                    </div>
                    <div className="text-sm mb-2">
                      <span className="font-medium">Last updated:</span> {new Date(assessment.updated_at).toLocaleDateString()}
                    </div>
                    <div className="flex -space-x-2 overflow-hidden">
                      {assessment.collaborators?.slice(0, 3).map((collab: any, i: number) => (
                        <Avatar key={i} className="border-2 border-white w-8 h-8">
                          <AvatarFallback>{collab.email[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                      ))}
                      {assessment.collaborators?.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                          +{assessment.collaborators.length - 3}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1">
                    <Button variant="ghost" className="w-full justify-between" asChild>
                      <Link href={`/assessment/${assessment.id}`}>
                        View Assessment
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Team Assessments Yet</CardTitle>
                <CardDescription>
                  You haven&apos;t been added to any team assessments yet. Create a new assessment and share it with your team.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/assessment/new">Create New Assessment</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <TeamCollaboration />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {loading ? (
            <div className="text-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : notifications.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4 py-3 border-b last:border-0">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {notification.action && (
                        <Button variant="ghost" size="sm">
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Notifications</CardTitle>
                <CardDescription>
                  You&apos;re all caught up! No new notifications.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
