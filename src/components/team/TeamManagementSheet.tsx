
import React, { useState, useRef } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useTeam } from "@/context/TeamContext";
import TeamMembersList from "./TeamMembersList";
import InviteTeamMemberForm from "./InviteTeamMemberForm";
import { toast } from "sonner";

interface TeamManagementSheetProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export function TeamManagementSheet({ 
  className, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  showTrigger = true
}: TeamManagementSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const hasShownOpenToast = useRef(false);
  
  // Determine if we're using internal or external state
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  
  const onOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    externalOnOpenChange?.(newOpen);
    
    // Show toast when opened (only once)
    if (newOpen && !hasShownOpenToast.current) {
      toast.info("Team Management Panel opened", {
        description: "Manage your team members and permissions"
      });
      hasShownOpenToast.current = true;
    }
  };

  // Reset toast flag when fully closed
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        hasShownOpenToast.current = false;
      }, 500); // Wait for animation to finish
    }
  }, [open]);

  // Register global functions to control the sheet
  React.useEffect(() => {
    const openSheet = () => setInternalOpen(true);
    const closeSheet = () => setInternalOpen(false);
    
    registerTeamManagementSheetControls(openSheet, closeSheet);
    
    return () => {
      // Clean up by setting controls to null on unmount
      registerTeamManagementSheetControls(null, null);
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={className}
          >
            <Users className="h-4 w-4 mr-2" />
            Team Management
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-md overflow-auto" side="right">
        <SheetHeader>
          <SheetTitle>Team Management</SheetTitle>
          <SheetDescription>
            Invite team members and manage permissions for collaborative work.
          </SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-130px)] overflow-y-auto px-1 py-4">
          <InviteTeamMemberForm />
          <TeamMembersList />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export a function to create and manage the sheet globally
let openTeamManagementSheet: (() => void) | null = null;
let closeTeamManagementSheet: (() => void) | null = null;

export const registerTeamManagementSheetControls = (
  open: (() => void) | null,
  close: (() => void) | null
) => {
  openTeamManagementSheet = open;
  closeTeamManagementSheet = close;
};

export const useTeamManagementSheet = () => {
  return {
    open: () => openTeamManagementSheet?.(),
    close: () => closeTeamManagementSheet?.()
  };
};
