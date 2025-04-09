
import React, { createContext, useContext, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Collaborator {
  id: string;
  displayName: string;
  avatarUrl?: string;
  color: string;
  isActive: boolean;
  lastSeen?: Date;
}

interface CursorPosition {
  x: number;
  y: number;
}

interface CollaborationContextType {
  collaborators: Collaborator[];
  activeElement: string | null;
  setActiveElement: (elementId: string | null) => void;
  isElementLocked: (elementId: string) => boolean;
  getElementEditor: (elementId: string) => Collaborator | null;
  addCollaborator: (collaborator: Collaborator) => void;
  removeCollaborator: (id: string) => void;
  updateCursorPosition: (id: string, position: CursorPosition) => void;
  cursors: Record<string, CursorPosition>;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

interface CollaborationProviderProps {
  children: React.ReactNode;
  formId: string;
}

// Sample collaborators for demonstration
const sampleCollaborators: Collaborator[] = [
  {
    id: "user-1",
    displayName: "Alex Smith",
    avatarUrl: "",
    color: "#9b87f5",
    isActive: true,
  },
  {
    id: "user-2",
    displayName: "Jamie Doe",
    avatarUrl: "",
    color: "#4ADE80",
    isActive: true,
  },
];

export const CollaborationProvider: React.FC<CollaborationProviderProps> = ({ children, formId }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(sampleCollaborators);
  const [activeElements, setActiveElements] = useState<Record<string, string>>({});
  const [cursors, setCursors] = useState<Record<string, CursorPosition>>({});

  // Mock subscribing to a collaboration channel
  useEffect(() => {
    console.info("Successfully subscribed to global channel");
    
    // In a real implementation, we would connect to a WebSocket or Supabase Realtime
    
    return () => {
      console.info("Unsubscribed from collaboration channel");
    };
  }, [formId]);

  const setActiveElement = (elementId: string | null) => {
    if (elementId) {
      // In a real implementation, this would broadcast to other users
      setActiveElements(prev => ({
        ...prev,
        [elementId]: "user-1" // Current user's ID
      }));
    } else {
      // Remove any elements this user was editing
      setActiveElements(prev => {
        const newActiveElements = { ...prev };
        Object.keys(newActiveElements).forEach(key => {
          if (newActiveElements[key] === "user-1") {
            delete newActiveElements[key];
          }
        });
        return newActiveElements;
      });
    }
  };

  const isElementLocked = (elementId: string) => {
    return activeElements[elementId] !== undefined && activeElements[elementId] !== "user-1";
  };

  const getElementEditor = (elementId: string) => {
    const editorId = activeElements[elementId];
    if (!editorId) return null;
    return collaborators.find(c => c.id === editorId) || null;
  };

  const addCollaborator = (collaborator: Collaborator) => {
    setCollaborators(prev => [...prev, collaborator]);
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
  };

  const updateCursorPosition = (id: string, position: CursorPosition) => {
    setCursors(prev => ({
      ...prev,
      [id]: position
    }));
  };

  return (
    <CollaborationContext.Provider
      value={{
        collaborators,
        activeElement: null, // This will be set by the element being edited
        setActiveElement,
        isElementLocked,
        getElementEditor,
        addCollaborator,
        removeCollaborator,
        updateCursorPosition,
        cursors
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (context === undefined) {
    throw new Error("useCollaboration must be used within a CollaborationProvider");
  }
  return context;
};

// Export individual components for easier imports
export const CollaboratorAvatars: React.FC = () => {
  const { collaborators } = useCollaboration();

  if (collaborators.length === 0) {
    return null;
  }

  return (
    <div className="flex -space-x-2 rtl:space-x-reverse">
      {collaborators
        .filter(c => c.isActive)
        .map(collaborator => (
          <Avatar key={collaborator.id} className="w-8 h-8 border-2 border-white">
            {collaborator.avatarUrl ? (
              <AvatarImage src={collaborator.avatarUrl} alt={collaborator.displayName} />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: collaborator.color }}
                className="text-white text-xs"
              >
                {collaborator.displayName
                  .split(' ')
                  .map(name => name[0])
                  .join('')}
              </AvatarFallback>
            )}
          </Avatar>
        ))}
    </div>
  );
};

export const EditorCursor: React.FC<{ userId: string }> = ({ userId }) => {
  const { cursors, collaborators } = useCollaboration();
  const cursorPosition = cursors[userId];
  const collaborator = collaborators.find(c => c.id === userId);

  if (!cursorPosition || !collaborator) {
    return null;
  }

  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transition: 'transform 0.1s ease'
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ color: collaborator.color }}
      >
        <path
          d="M5 2L19 12L5 22V2Z"
          fill="currentColor"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      <div
        className="absolute left-6 top-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
        style={{ backgroundColor: collaborator.color }}
      >
        {collaborator.displayName}
      </div>
    </div>
  );
};
