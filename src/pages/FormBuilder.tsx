
import React, { useState } from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import AppLayout from "@/components/layout/AppLayout";
import { FormMetadataSheet, registerFormMetadataSheetControls } from "@/components/form-builder/FormMetadataSheet";

const FormBuilder = () => {
  const [metadataSheetOpen, setMetadataSheetOpen] = useState(false);

  // Register controls for the metadata sheet
  React.useEffect(() => {
    const openSheet = () => setMetadataSheetOpen(true);
    const closeSheet = () => setMetadataSheetOpen(false);
    
    registerFormMetadataSheetControls(openSheet, closeSheet);
    
    return () => {
      registerFormMetadataSheetControls(null, null);
    };
  }, []);

  return (
    <AppLayout hideHeader={true}>
      <div className="h-[calc(100vh-0px)] overflow-hidden bg-gray-100">
        <FormCanvas />
        <FormMetadataSheet 
          showTrigger={false} 
          open={metadataSheetOpen} 
          onOpenChange={setMetadataSheetOpen} 
        />
      </div>
    </AppLayout>
  );
};

export default FormBuilder;
