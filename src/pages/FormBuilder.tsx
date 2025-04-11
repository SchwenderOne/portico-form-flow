import React, { useState, useEffect } from "react";
import FormCanvas from "@/components/form-builder/FormCanvas";
import { FormMetadataSheet, registerFormMetadataSheetControls } from "@/components/form-builder/FormMetadataSheet";
import { FormMetadataProvider } from "@/context/FormMetadataContext";
import { BrandSettingsSheet, registerBrandSettingsSheetControls } from "@/components/form-builder/BrandSettingsSheet";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { TeamProvider } from "@/context/TeamContext";
import { FormCanvasProvider, useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { CollaborationProvider } from "@/context/CollaborationContext";
import { useSelectedTemplate } from "@/context/SelectedTemplateContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";

// Import the version history sheet and its controls using ES Module imports
import VersionHistorySheet, { 
  registerVersionHistoryControls 
} from "@/components/form-builder/version-history/VersionHistorySheet";

const FormBuilder = () => {
  const [metadataSheetOpen, setMetadataSheetOpen] = useState(false);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  
  // Default form ID for collaboration - in a real app this would come from the URL or state management
  const formId = "default-form-id";

  // Register controls for the metadata sheet
  useEffect(() => {
    const openSheet = () => setMetadataSheetOpen(true);
    const closeSheet = () => setMetadataSheetOpen(false);
    
    registerFormMetadataSheetControls(openSheet, closeSheet);
    
    return () => {
      registerFormMetadataSheetControls(null, null);
    };
  }, []);

  // Register controls for brand settings sheet
  useEffect(() => {
    const openSheet = () => setBrandSheetOpen(true);
    const closeSheet = () => setBrandSheetOpen(false);
    
    registerBrandSettingsSheetControls(openSheet, closeSheet);
    
    return () => {
      registerBrandSettingsSheetControls(null, null);
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
    <ErrorBoundary>
      <TeamProvider>
        <FormMetadataProvider>
          <BrandSettingsProvider>
            <ComplianceProvider>
              <CollaborationProvider formId={formId}>
                <FormCanvasProvider>
                  <TemplateFormLoader />
                  <div className="h-[calc(100vh-56px)] overflow-hidden bg-gray-100">
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
              </CollaborationProvider>
            </ComplianceProvider>
          </BrandSettingsProvider>
        </FormMetadataProvider>
      </TeamProvider>
    </ErrorBoundary>
  );
};

// Separate component to load template elements
const TemplateFormLoader = () => {
  const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();
  const formCanvas = useFormCanvas();
  const { toast } = useToast();
  
  // Effect to load template elements when the form builder loads
  useEffect(() => {
    if (selectedTemplate && selectedTemplate.elements && selectedTemplate.elements.length > 0) {
      console.log("Loading template elements:", selectedTemplate.elements);
      
      try {
        // Deep clone the elements to avoid reference issues
        const templateElements = JSON.parse(JSON.stringify(selectedTemplate.elements));
        
        // Replace current elements with template elements
        formCanvas.setElements(templateElements);
        
        // Show success toast
        toast({
          title: "Template Loaded",
          description: `${selectedTemplate.title} template has been loaded successfully.`,
        });
        
        console.log("Template elements loaded successfully");
      } catch (error) {
        console.error("Error loading template elements:", error);
        toast({
          title: "Error",
          description: "Failed to load template. Please try again.",
          variant: "destructive"
        });
      } finally {
        // Clear the selected template to avoid reloading on component re-renders
        setSelectedTemplate(null);
      }
    }
  }, [selectedTemplate, formCanvas, setSelectedTemplate, toast]);
  
  return null;
};

export default FormBuilder;
