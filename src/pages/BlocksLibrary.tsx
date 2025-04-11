
import React, { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { BlocksLibraryContent } from "@/components/blocks-library/BlocksLibraryContent";
import { Toaster } from "sonner";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import { FormMetadataProvider } from "@/context/FormMetadataContext";

const BlocksLibrary = () => {
  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add keyboard shortcuts if needed
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AppLayout>
      <FormMetadataProvider>
        <FormCanvasProvider>
          <div className="h-[calc(100vh-56px)] overflow-hidden">
            <BlocksLibraryContent />
            <Toaster position="top-center" />
          </div>
        </FormCanvasProvider>
      </FormMetadataProvider>
    </AppLayout>
  );
};

export default BlocksLibrary;
