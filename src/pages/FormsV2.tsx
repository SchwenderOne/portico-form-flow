
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import FormBuilder from "./FormBuilder";

const FormsV2 = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Forms V2</h1>
          <p className="text-muted-foreground">Create and manage your forms with our enhanced form builder.</p>
        </div>
        <FormBuilder />
      </div>
    </AppLayout>
  );
};

export default FormsV2;
