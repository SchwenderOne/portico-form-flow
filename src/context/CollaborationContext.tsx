
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormElement } from "@/types/form";

// Types for our collaboration features
export interface Collaborator {
  id: string;
  email: string;
  displayName: string;
  color: string;
  lastActive: string;
  cursorPosition?: { x: number; y: number };
  activeElementId?: string;
  isTyping?: boolean;
}

interface CollaborationContextType {
  collaborators: Collaborator[];
  activeElement: string | null;
  setActiveElement: (elementId: string | null) => void;
  updateCursorPosition: (x: number, y: number) => void;
  isElementLocked: (elementId: string) => boolean;
  getElementEditor: (elementId: string) => Collaborator | null;
  getCollaboratorsByColor: (includeCurrentUser?: boolean) => { id: string; color: string; displayName: string }[];
}

// Associate users with unique colors for collaboration visualization
const COLLABORATION_COLORS = [
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#F43F5E", // Rose
  "#06B6D4", // Cyan
  "#84CC16", // Lime
];

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const CollaborationProvider: React.FC<{ 
  children: React.ReactNode;
  formId: string;
}> = ({ children, formId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Setup realtime collaboration when the component mounts
  useEffect(() => {
    if (!user || !formId) return;
    
    // Generate a unique color for the current user
    const getUserColor = (userId: string) => {
      const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % COLLABORATION_COLORS.length;
      return COLLABORATION_COLORS[index];
    };
    
    const userColor = getUserColor(user.id);
    
    // Create a channel for this specific form
    const channel = supabase.channel(`form:${formId}`);
    
    // Set up presence tracking
    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const currentCollaborators: Collaborator[] = [];
        
        // Process all users in the channel
        Object.keys(presenceState).forEach(key => {
          const userPresence = presenceState[key][0] as any;
          if (userPresence && userPresence.user_id) {
            currentCollaborators.push({
              id: userPresence.user_id,
              email: userPresence.email || 'Unknown user',
              displayName: userPresence.display_name || 'User',
              color: userPresence.color || '#6366F1',
              lastActive: new Date().toISOString(),
              cursorPosition: userPresence.cursor_position,
              activeElementId: userPresence.active_element_id,
              isTyping: userPresence.is_typing,
            });
          }
        });
        
        setCollaborators(currentCollaborators);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        const newUser = newPresences[0] as any;
        if (newUser.user_id !== user.id) {
          toast.info(`${newUser.display_name || 'A collaborator'} joined`, {
            duration: 3000,
          });
        }
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        const leftUser = leftPresences[0] as any;
        if (leftUser.user_id !== user.id) {
          toast.info(`${leftUser.display_name || 'A collaborator'} left`, {
            duration: 3000,
          });
          
          // Update collaborators list by removing the user who left
          setCollaborators(prev => 
            prev.filter(c => c.id !== leftUser.user_id)
          );
        }
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
        
        // Get user info
        const { data: userData } = await supabase.auth.getUser();
        const { data: profileData } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', userData.user?.id)
          .single();
        
        // Track the current user's presence
        await channel.track({
          user_id: user.id,
          email: user.email,
          display_name: profileData?.display_name || user.email?.split('@')[0] || 'User',
          color: userColor,
          online_at: new Date().toISOString(),
          cursor_position: { x: 0, y: 0 },
          active_element_id: null,
          is_typing: false,
        });
      });
    
    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [user, formId]);
  
  // Update active element and broadcast to other users
  const handleSetActiveElement = (elementId: string | null) => {
    setActiveElement(elementId);
    
    if (!user || !formId) return;
    
    const channel = supabase.channel(`form:${formId}`);
    channel.track({
      user_id: user.id,
      active_element_id: elementId,
      online_at: new Date().toISOString(),
    });
  };
  
  // Update cursor position and broadcast to other users
  const updateCursorPosition = (x: number, y: number) => {
    if (!user || !formId) return;
    
    const channel = supabase.channel(`form:${formId}`);
    channel.track({
      user_id: user.id,
      cursor_position: { x, y },
      online_at: new Date().toISOString(),
    });
  };
  
  // Check if an element is being edited by another user
  const isElementLocked = (elementId: string): boolean => {
    if (!elementId) return false;
    
    return collaborators.some(
      collaborator => 
        collaborator.id !== user?.id && 
        collaborator.activeElementId === elementId
    );
  };
  
  // Get the user currently editing a specific element
  const getElementEditor = (elementId: string): Collaborator | null => {
    if (!elementId) return null;
    
    return collaborators.find(
      collaborator => collaborator.activeElementId === elementId
    ) || null;
  };
  
  // Get colors assigned to each collaborator for UI display
  const getCollaboratorsByColor = (includeCurrentUser = true): { id: string; color: string; displayName: string }[] => {
    if (includeCurrentUser) {
      return collaborators.map(c => ({
        id: c.id,
        color: c.color,
        displayName: c.displayName
      }));
    }
    
    return collaborators
      .filter(c => c.id !== user?.id)
      .map(c => ({
        id: c.id,
        color: c.color,
        displayName: c.displayName
      }));
  };
  
  return (
    <CollaborationContext.Provider 
      value={{
        collaborators,
        activeElement,
        setActiveElement: handleSetActiveElement,
        updateCursorPosition,
        isElementLocked,
        getElementEditor,
        getCollaboratorsByColor
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error("useCollaboration must be used within a CollaborationProvider");
  }
  return context;
};

// Component to display an editor's cursor
export const EditorCursor: React.FC<{
  collaborator: Collaborator;
}> = ({ collaborator }) => {
  if (!collaborator.cursorPosition) return null;
  
  return (
    <div 
      className="absolute pointer-events-none z-50"
      style={{ 
        left: collaborator.cursorPosition.x,
        top: collaborator.cursorPosition.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div 
        className="flex flex-col items-center"
        style={{ transformOrigin: 'bottom center' }}
      >
        <div 
          className="h-5 w-3 mb-1" 
          style={{ 
            backgroundColor: collaborator.color,
            clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
          }}
        />
        <div 
          className="text-xs text-white rounded-md px-2 py-1 whitespace-nowrap"
          style={{ backgroundColor: collaborator.color }}
        >
          {collaborator.displayName}
        </div>
      </div>
    </div>
  );
};

// Component to display active collaborators
export const CollaboratorAvatars: React.FC = () => {
  const { collaborators } = useCollaboration();
  const { user } = useAuth();
  
  const otherCollaborators = collaborators.filter(c => c.id !== user?.id);
  
  if (otherCollaborators.length === 0) return null;
  
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {otherCollaborators.map((collaborator) => (
        <div key={collaborator.id} className="relative">
          <Avatar className="border-2 border-background w-8 h-8">
            <AvatarFallback 
              style={{ backgroundColor: collaborator.color }}
              className="text-white text-xs"
            >
              {collaborator.displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span 
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white"
          />
        </div>
      ))}
      {otherCollaborators.length > 0 && (
        <div className="ml-2 flex items-center text-xs text-muted-foreground">
          {otherCollaborators.length === 1 ? (
            <span>{otherCollaborators[0].displayName} is editing</span>
          ) : (
            <span>{otherCollaborators.length} collaborators</span>
          )}
        </div>
      )}
    </div>
  );
};
