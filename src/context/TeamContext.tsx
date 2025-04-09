
import React, { createContext, useContext, useState, useEffect } from "react";
import { TeamMember, UserRole, InviteData } from "@/types/team";
import { toast } from "sonner";

// Generate a random ID for demo purposes
const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock data for the current user and initial team
const currentUser: TeamMember = {
  id: generateId(),
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Owner",
};

const initialTeamMembers: TeamMember[] = [
  currentUser,
  {
    id: generateId(),
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Editor",
  },
];

interface TeamContextType {
  currentUser: TeamMember;
  teamMembers: TeamMember[];
  inviteTeamMember: (data: InviteData) => Promise<void>;
  updateTeamMemberRole: (memberId: string, newRole: UserRole) => Promise<void>;
  removeTeamMember: (memberId: string) => Promise<void>;
  canManageTeam: boolean;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  
  // Check if current user can manage team (Owner)
  const canManageTeam = currentUser.role === 'Owner';

  const inviteTeamMember = async (data: InviteData) => {
    // In a real app, this would send an API request
    // For demo, we'll just add the user to our local state
    
    // Check if email already exists
    if (teamMembers.some(member => member.email === data.email)) {
      toast.error("This email has already been invited");
      return;
    }
    
    const newMember: TeamMember = {
      id: generateId(),
      name: data.email.split('@')[0], // Extract name from email for demo
      email: data.email,
      role: data.role,
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    toast.success(`Invitation sent to ${data.email}`, {
      description: `They will have ${data.role} access when they join.`,
    });
  };

  const updateTeamMemberRole = async (memberId: string, newRole: UserRole) => {
    // Prevent changing Owner's role (for demo simplicity)
    if (memberId === currentUser.id && currentUser.role === 'Owner') {
      toast.error("You cannot change the Owner's role");
      return;
    }
    
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      toast.success(`${member.name}'s role updated to ${newRole}`);
    }
  };

  const removeTeamMember = async (memberId: string) => {
    // Prevent removing Owner (for demo simplicity)
    if (memberId === currentUser.id && currentUser.role === 'Owner') {
      toast.error("You cannot remove the Owner from the team");
      return;
    }
    
    const memberToRemove = teamMembers.find(m => m.id === memberId);
    
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    
    if (memberToRemove) {
      toast.success(`${memberToRemove.name} has been removed from the team`);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        currentUser,
        teamMembers,
        inviteTeamMember,
        updateTeamMemberRole,
        removeTeamMember,
        canManageTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
};
