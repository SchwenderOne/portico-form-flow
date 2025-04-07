
import React from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import AppLayout from "@/components/layout/AppLayout";

const FormBuilder = () => {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-64px)]">
        <FormCanvas />
      </div>
    </AppLayout>
  );
};

export default FormBuilder;
