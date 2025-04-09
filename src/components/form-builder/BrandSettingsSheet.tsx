
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import BrandSettingsTab from "@/components/brand-settings/BrandSettingsTab";

interface BrandSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BrandSettingsSheet: React.FC<BrandSettingsSheetProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Brand Settings</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <BrandSettingsTab />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Export the controls for opening and closing the sheet from other components
let openBrandSettingsSheet: (() => void) | null = null;
let closeBrandSettingsSheet: (() => void) | null = null;

export const registerBrandSettingsSheetControls = (
  openFn: (() => void) | null,
  closeFn: (() => void) | null
) => {
  openBrandSettingsSheet = openFn;
  closeBrandSettingsSheet = closeFn;
};

export const openBrandSettings = () => {
  if (openBrandSettingsSheet) {
    openBrandSettingsSheet();
  }
};

export const closeBrandSettings = () => {
  if (closeBrandSettingsSheet) {
    closeBrandSettingsSheet();
  }
};
