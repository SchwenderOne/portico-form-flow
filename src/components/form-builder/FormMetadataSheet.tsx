
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import MetadataTab from "@/components/form-builder/toolbars/tabs/MetadataTab";

interface FormMetadataSheetProps {
  className?: string;
  showTrigger?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FormMetadataSheet({
  className,
  showTrigger = true,
  open,
  onOpenChange,
}: FormMetadataSheetProps) {
  const isControlled = open !== undefined;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <FileText className="h-4 w-4 mr-2" />
            Form Metadata
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Form Metadata</SheetTitle>
          <SheetDescription>
            Manage global information about your form project
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <MetadataTab />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export control functions for the sheet
let openFormMetadataSheet: (() => void) | null = null;
let closeFormMetadataSheet: (() => void) | null = null;

export const registerFormMetadataSheetControls = (
  open: (() => void) | null,
  close: (() => void) | null
) => {
  openFormMetadataSheet = open;
  closeFormMetadataSheet = close;
};

export const useFormMetadataSheet = () => {
  return {
    open: () => openFormMetadataSheet?.(),
    close: () => closeFormMetadataSheet?.(),
  };
};
