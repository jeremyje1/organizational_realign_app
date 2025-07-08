import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
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
  Users, 
  Plus, 
  UserPlus, 
  Share2, 
  Calendar,
  Shield,
  Eye,
  Edit3
} from 'lucide-react';

interface Team {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
  team_members: Array<{
    user_id: string;
    role: 'admin' | 'member' | 'viewer';
    joined_at: string;
    profiles: {
      email: string;
      full_name?: string;
    };
  }>;
}

interface TeamCollaborationProps {
  assessmentId?: string;
}

export function TeamCollaboration({ assessmentId }: TeamCollaborationProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');
  const [sharePermissions, setSharePermissions] = useState<'view' | 'comment' | 'edit'>('view');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams');
      if (response.ok) {
        const data = await response.json();
        setTeams(data.teams);
      }
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    }
  };

  const createTeam = async () => {
    if (!teamName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: teamName,
          description: teamDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTeams(prev => [...prev, data.team]);
        setTeamName('');
        setTeamDescription('');
        setIsCreateTeamOpen(false);
      }
    } catch (error) {
      console.error('Failed to create team:', error);
    } finally {
      setLoading(false);
    }
  };

  const inviteToTeam = async () => {
    if (!selectedTeam || !inviteEmail.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/teams/${selectedTeam.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole,
        }),
      });

      if (response.ok) {
        setInviteEmail('');
        setIsInviteOpen(false);
        // Refresh teams to get updated member list
        fetchTeams();
      }
    } catch (error) {
      console.error('Failed to invite user:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareAssessment = async () => {
    if (!selectedTeam || !assessmentId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/assessments/${assessmentId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: selectedTeam.id,
          permissions: sharePermissions,
        }),
      });

      if (response.ok) {
        setIsShareOpen(false);
        // Show success message
      }
    } catch (error) {
      console.error('Failed to share assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4 text-red-600" />;
      case 'member': return <Users className="h-4 w-4 text-blue-600" />;
      case 'viewer': return <Eye className="h-4 w-4 text-gray-600" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Management Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Collaboration</h2>
          <p className="text-gray-600">Manage teams and share assessments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
                <DialogDescription>
                  Create a team to collaborate on assessments and share insights.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team-description">Description (Optional)</Label>
                  <Textarea
                    id="team-description"
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    placeholder="Describe the team's purpose"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={createTeam} 
                  disabled={loading || !teamName.trim()}
                >
                  {loading ? 'Creating...' : 'Create Team'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {assessmentId && (
            <>
              <Button variant="default" className="flex items-center gap-2" onClick={() => window.location.href = `/assessments/${assessmentId}/collaborate`}>
                <Edit3 className="h-4 w-4" />
                Collaborate in Real-time
              </Button>
              
              <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Assessment
                  </Button>
                </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Assessment</DialogTitle>
                  <DialogDescription>
                    Share this assessment with a team for collaboration.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Select Team</Label>
                    <Select value={selectedTeam?.id} onValueChange={(value) => {
                      const team = teams.find(t => t.id === value);
                      setSelectedTeam(team || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <Select value={sharePermissions} onValueChange={(value: any) => setSharePermissions(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="comment">View & Comment</SelectItem>
                        <SelectItem value="edit">View, Comment & Edit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={shareAssessment} 
                    disabled={loading || !selectedTeam}
                  >
                    {loading ? 'Sharing...' : 'Share Assessment'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  {team.description && (
                    <CardDescription className="mt-1">
                      {team.description}
                    </CardDescription>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTeam(team);
                    setIsInviteOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{team.team_members?.length || 0} members</span>
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>Created {new Date(team.created_at).toLocaleDateString()}</span>
                </div>

                {/* Team Members */}
                <div className="space-y-2">
                  {team.team_members?.slice(0, 3).map((member, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <span className="truncate">
                          {member.profiles.full_name || member.profiles.email}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                  {(team.team_members?.length || 0) > 3 && (
                    <div className="text-xs text-gray-500">
                      +{(team.team_members?.length || 0) - 3} more
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {teams.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
              <p className="text-gray-600 text-center mb-4">
                Create your first team to start collaborating on assessments.
              </p>
              <Button onClick={() => setIsCreateTeamOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Invite someone to join {selectedTeam?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer - Can view shared assessments</SelectItem>
                  <SelectItem value="member">Member - Can view and comment</SelectItem>
                  <SelectItem value="admin">Admin - Can manage team and assessments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={inviteToTeam} 
              disabled={loading || !inviteEmail.trim()}
            >
              {loading ? 'Inviting...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
