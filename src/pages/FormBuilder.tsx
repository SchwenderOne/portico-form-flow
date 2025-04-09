
import React from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import AppLayout from "@/components/layout/AppLayout";

const FormBuilder = () => {
  return (
    <AppLayout hideHeader={true}>
      <div className="h-[calc(100vh-0px)] overflow-hidden bg-gray-100">
        <FormCanvas />
      </div>
    </AppLayout>
  );
};

export default FormBuilder;
