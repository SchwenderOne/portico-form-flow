
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import { CollaborationProvider } from "@/context/CollaborationContext";
import { PortoEditor } from "@/components/porto/PortoEditor";
import { PortoProvider } from "@/components/porto/context/PortoContext";

const Porto = () => {
  // Default form ID for collaboration
  const formId = "porto-form-id";

  return (
    <AppLayout>
      <div className="h-[calc(100vh-56px)] overflow-hidden">
        <PortoProvider>
          <CollaborationProvider formId={formId}>
            <FormCanvasProvider>
              <PortoEditor />
            </FormCanvasProvider>
          </CollaborationProvider>
        </PortoProvider>
      </div>
    </AppLayout>
  );
};

export default Porto;
