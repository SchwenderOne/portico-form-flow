
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { BlocksLibraryContent } from "@/components/blocks-library/BlocksLibraryContent";
import { Toaster } from "sonner";

const BlocksLibrary = () => {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-56px)] overflow-hidden">
        <BlocksLibraryContent />
        <Toaster position="top-center" />
      </div>
    </AppLayout>
  );
};

export default BlocksLibrary;
