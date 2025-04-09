
import React, { useState, useEffect, useRef } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import BrandSettingsTab from "./toolbars/tabs/BrandSettingsTab";
import { BrandSettingsProvider, useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";

interface BrandSettingsSheetProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export function BrandSettingsSheet({ 
  className, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  showTrigger = true
}: BrandSettingsSheetProps) {
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
      toast.info("Brand Settings Panel opened", {
        description: "Make changes to affect the global appearance"
      });
      hasShownOpenToast.current = true;
    }
  };

  // Reset toast flag when fully closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        hasShownOpenToast.current = false;
      }, 500); // Wait for animation to finish
    }
  }, [open]);

  // Register global functions to control the sheet
  useEffect(() => {
    const openSheet = () => setInternalOpen(true);
    const closeSheet = () => setInternalOpen(false);
    
    registerBrandSettingsSheetControls(openSheet, closeSheet);
    
    return () => {
      // Clean up by setting controls to null on unmount
      registerBrandSettingsSheetControls(null, null);
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button 
            variant="brand" 
            size="sm" 
            className={className}
          >
            <Palette className="h-4 w-4 mr-2" />
            Brand Settings
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-md overflow-auto" side="right">
        <SheetHeader>
          <SheetTitle>Brand Settings</SheetTitle>
          <SheetDescription>
            Customize your form's appearance with your brand colors, typography, and identity.
          </SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-130px)] overflow-y-auto px-1 py-4">
          <BrandSettingsTab />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export a function to create and manage the sheet globally
let openBrandSettingsSheet: (() => void) | null = null;
let closeBrandSettingsSheet: (() => void) | null = null;

export const registerBrandSettingsSheetControls = (
  open: (() => void) | null,
  close: (() => void) | null
) => {
  openBrandSettingsSheet = open;
  closeBrandSettingsSheet = close;
};

export const useBrandSettingsSheet = () => {
  return {
    open: () => openBrandSettingsSheet?.(),
    close: () => closeBrandSettingsSheet?.()
  };
};
