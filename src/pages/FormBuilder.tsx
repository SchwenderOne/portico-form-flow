
import React, { useState, useEffect } from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import AppLayout from "@/components/layout/AppLayout";
import { FormMetadataSheet, registerFormMetadataSheetControls } from "@/components/form-builder/FormMetadataSheet";
import { FormMetadataProvider } from "@/context/FormMetadataContext";
import { BrandSettingsSheet } from "@/components/form-builder/BrandSettingsSheet";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { TeamProvider } from "@/context/TeamContext";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import { CollaborationProvider } from "@/context/CollaborationContext";

// Import the version history sheet and its controls - using ES Module imports
import VersionHistorySheet, { 
  registerVersionHistoryControls 
} from "@/components/form-builder/version-history/VersionHistorySheet";

const FormBuilder = () => {
  const [metadataSheetOpen, setMetadataSheetOpen] = useState(false);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);

  // Register controls for the metadata sheet
  useEffect(() => {
    const openSheet = () => setMetadataSheetOpen(true);
    const closeSheet = () => setMetadataSheetOpen(false);
    
    registerFormMetadataSheetControls(openSheet, closeSheet);
    
    return () => {
      registerFormMetadataSheetControls(null, null);
    };
  }, []);

  // Register controls for version history
  useEffect(() => {
    const openSheet = () => setVersionHistoryOpen(true);
    const closeSheet = () => setVersionHistoryOpen(false);
    
    // Register the version history controls using the imported function
    registerVersionHistoryControls(openSheet, closeSheet);
    
    return () => {
      registerVersionHistoryControls(null, null);
    };
  }, []);

  return (
    <AppLayout hideHeader={true}>
      <TeamProvider>
        <FormMetadataProvider>
          <BrandSettingsProvider>
            <ComplianceProvider>
              <FormCanvasProvider>
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
                  
                  <VersionHistorySheet 
                    showTrigger={false}
                    open={versionHistoryOpen}
                    onOpenChange={setVersionHistoryOpen}
                  />
                  
                  <TeamManagementSheet
                    open={teamSheetOpen}
                    onOpenChange={setTeamSheetOpen}
                  />
                </div>
              </FormCanvasProvider>
            </ComplianceProvider>
          </BrandSettingsProvider>
        </FormMetadataProvider>
      </TeamProvider>
    </AppLayout>
  );
};

export default FormBuilder;
