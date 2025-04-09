
export type UserRole = 'Owner' | 'Editor' | 'Viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface InviteData {
  email: string;
  role: UserRole;
}
