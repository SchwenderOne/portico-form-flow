
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTeam } from "@/context/TeamContext";
import { TeamMember, UserRole } from "@/types/team";
import { UserMinus, Shield, Edit, Eye } from "lucide-react";

const getRoleBadgeColor = (role: UserRole) => {
  switch (role) {
    case "Owner":
      return "bg-orange-500";
    case "Editor":
      return "bg-blue-500";
    case "Viewer":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "Owner":
      return <Shield className="h-3 w-3" />;
    case "Editor":
      return <Edit className="h-3 w-3" />;
    case "Viewer":
      return <Eye className="h-3 w-3" />;
    default:
      return null;
  }
};

const TeamMembersList = () => {
  const { teamMembers, updateTeamMemberRole, removeTeamMember, currentUser, canManageTeam } = useTeam();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Manage your team members and their access levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canManageTeam ? (
                <>
                  <Select
                    defaultValue={member.role}
                    onValueChange={(value: UserRole) => updateTeamMemberRole(member.id, value)}
                    disabled={member.id === currentUser.id && member.role === "Owner"}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue>
                        <Badge className={`${getRoleBadgeColor(member.role)} mr-1 h-5 text-white text-xs`}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon(member.role)}
                            {member.role}
                          </span>
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Owner
                        </span>
                      </SelectItem>
                      <SelectItem value="Editor">
                        <span className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Editor
                        </span>
                      </SelectItem>
                      <SelectItem value="Viewer">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Viewer
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {member.id !== currentUser.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  )}
                </>
              ) : (
                <Badge className={`${getRoleBadgeColor(member.role)} h-5 text-white text-xs`}>
                  <span className="flex items-center gap-1">
                    {getRoleIcon(member.role)}
                    {member.role}
                  </span>
                </Badge>
              )}
            </div>
          </div>
        ))}
        {teamMembers.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No team members found. Invite someone to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMembersList;
