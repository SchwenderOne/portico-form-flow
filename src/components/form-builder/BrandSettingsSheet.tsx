
import React, { useState } from "react";
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
}

export function BrandSettingsSheet({ className }: BrandSettingsSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <BrandSettingsProvider>
      <Sheet open={open} onOpenChange={setOpen}>
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
