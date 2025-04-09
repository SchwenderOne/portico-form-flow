
import React, { useState, useEffect } from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import AppLayout from "@/components/layout/AppLayout";
import { FormMetadataSheet, registerFormMetadataSheetControls } from "@/components/form-builder/FormMetadataSheet";
import { FormMetadataProvider } from "@/context/FormMetadataContext";
import { BrandSettingsSheet } from "@/components/form-builder/BrandSettingsSheet";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { ComplianceProvider } from "@/context/ComplianceContext";
import VersionHistorySheet from "@/components/form-builder/version-history/VersionHistorySheet";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { TeamProvider } from "@/context/TeamContext";

const FormBuilder = () => {
  const [metadataSheetOpen, setMetadataSheetOpen] = useState(false);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);

  // Register controls for the metadata sheet
  useEffect(() => {
    const openSheet = () => setMetadataSheetOpen(true);
    const closeSheet = () => setMetadataSheetOpen(false);
    
    registerFormMetadataSheetControls(openSheet, closeSheet);
    
    return () => {
      registerFormMetadataSheetControls(null, null);
    };
  }, []);

  return (
    <AppLayout hideHeader={true}>
      <TeamProvider>
        <FormMetadataProvider>
          <BrandSettingsProvider>
            <ComplianceProvider>
              <div className="h-[calc(100vh-0px)] overflow-hidden bg-gray-100">
                <FormCanvas />
                
                <FormMetadataSheet 
                  showTrigger={false} 
                  open={metadataSheetOpen} 
                  onOpenChange={setMetadataSheetOpen} 
                />
                
                <BrandSettingsSheet 
                  open={brandSheetOpen}
                  onOpenChange={setBrandSheetOpen}
                />
                
                <VersionHistorySheet showTrigger={false} />
                
                <TeamManagementSheet
                  open={teamSheetOpen}
                  onOpenChange={setTeamSheetOpen}
                />
              </div>
            </ComplianceProvider>
          </BrandSettingsProvider>
        </FormMetadataProvider>
      </TeamProvider>
    </AppLayout>
  );
};

export default FormBuilder;
