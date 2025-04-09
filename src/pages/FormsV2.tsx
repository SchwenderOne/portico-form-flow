
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import FormsV2Editor from "@/components/forms-v2/FormsV2Editor";

const FormsV2 = () => {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-56px)] overflow-hidden">
        <FormCanvasProvider>
          <FormsV2Editor />
        </FormCanvasProvider>
      </div>
    </AppLayout>
  );
};

export default FormsV2;
