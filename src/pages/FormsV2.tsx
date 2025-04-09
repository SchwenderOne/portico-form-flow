
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import FormsV2Editor from "@/components/forms-v2/FormsV2Editor";
import { CollaborationProvider } from "@/context/CollaborationContext";

const FormsV2 = () => {
  // Default form ID for collaboration
  const formId = "default-form-id";

  return (
    <AppLayout>
      <div className="h-[calc(100vh-56px)] overflow-hidden">
        <CollaborationProvider formId={formId}>
          <FormCanvasProvider>
            <FormsV2Editor />
          </FormCanvasProvider>
        </CollaborationProvider>
      </div>
    </AppLayout>
  );
};

export default FormsV2;
