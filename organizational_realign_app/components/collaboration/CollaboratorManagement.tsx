// components/collaboration/CollaboratorManagement.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  UserPlus, 
  Trash, 
  Mail,
  Shield,
  Eye,
  Edit,
  User
} from 'lucide-react';
import { toast } from '../ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Collaborator {
  id: string;
  email: string;
  role: 'ADMIN' | 'COLLABORATOR' | 'VIEWER';
  invited_at: string;
  joined_at?: string;
}

interface CollaboratorManagementProps {
  assessmentId: string;
  isOwner: boolean;
  userRole?: string;
}

export function CollaboratorManagement({ 
  assessmentId, 
  isOwner,
  userRole = 'VIEWER'
}: CollaboratorManagementProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'COLLABORATOR' | 'VIEWER'>('COLLABORATOR');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchCollaborators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  const fetchCollaborators = useCallback(async () => {
    setFetching(true);
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/collaborators`);
      if (response.ok) {
        const data = await response.json();
        setCollaborators(data.collaborators || []);
      } else {
        console.error('Failed to fetch collaborators');
      }
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    } finally {
      setFetching(false);
    }
  }, [assessmentId]);

  const addCollaborator = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/collaborators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Invitation sent to ${email}`,
        });
        setEmail('');
        fetchCollaborators();
        setIsDialogOpen(false);
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to add collaborator",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while adding collaborator",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeCollaborator = async (email: string) => {
    try {
      const response = await fetch(
        `/api/assessments/${assessmentId}/collaborators?email=${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Collaborator removed successfully",
        });
        fetchCollaborators();
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to remove collaborator",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while removing collaborator",
        variant: "destructive",
      });
    }
  };

  // Check if user can manage collaborators (owner or admin)
  const canManage = isOwner || userRole === 'ADMIN';

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
            <Shield className="h-3 w-3 mr-1" /> Admin
          </Badge>
        );
      case 'COLLABORATOR':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            <Edit className="h-3 w-3 mr-1" /> Collaborator
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">
            <Eye className="h-3 w-3 mr-1" /> Viewer
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Collaborators</CardTitle>
            <CardDescription>Manage who has access to this assessment</CardDescription>
          </div>
          {canManage && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Collaborator
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Collaborator</DialogTitle>
                  <DialogDescription>
                    Send an email invitation to collaborate on this assessment.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      placeholder="colleague@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={(value: any) => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin (can manage collaborators)</SelectItem>
                        <SelectItem value="COLLABORATOR">Collaborator (can edit)</SelectItem>
                        <SelectItem value="VIEWER">Viewer (read-only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={addCollaborator} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {fetching ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : collaborators.length > 0 ? (
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-200 rounded-full p-2">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium">{collaborator.email}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      {getRoleBadge(collaborator.role)}
                      {!collaborator.joined_at && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!collaborator.joined_at && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost" onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/assessment-details/${assessmentId}`);
                            toast({
                              title: "Link copied",
                              description: "Assessment link copied to clipboard",
                            });
                          }}>
                            <Mail className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy invitation link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {canManage && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeCollaborator(collaborator.email)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove collaborator</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p>No collaborators yet</p>
            <p className="text-sm">Share this assessment with your team members</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
