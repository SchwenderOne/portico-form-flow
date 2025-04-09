
import React, { useState, useEffect } from "react";
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
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";

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
  
  // Determine if we're using internal or external state
  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  
  const onOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    externalOnOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (isControlled) {
      setInternalOpen(externalOpen);
    }
  }, [externalOpen, isControlled]);

  return (
    <BrandSettingsProvider>
      <Sheet open={open} onOpenChange={onOpenChange}>
        {showTrigger && (
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
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
    </BrandSettingsProvider>
  );
}

// Export a function to create and manage the sheet globally
let openBrandSettingsSheet: (() => void) | null = null;
let closeBrandSettingsSheet: (() => void) | null = null;

export const registerBrandSettingsSheetControls = (
  open: () => void,
  close: () => void
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
