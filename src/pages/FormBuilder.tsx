
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
import AppLayout from "@/components/layout/AppLayout";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormElement } from "@/types/form";

// Import the version history sheet and its controls using ES Module imports
import VersionHistorySheet, { 
  registerVersionHistoryControls 
} from "@/components/form-builder/version-history/VersionHistorySheet";

const FormBuilder = () => {
  const [metadataSheetOpen, setMetadataSheetOpen] = useState(false);
  const [brandSheetOpen, setBrandSheetOpen] = useState(false);
  const [teamSheetOpen, setTeamSheetOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
  
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
    <AppLayout>
      <ErrorBoundary>
        <TeamProvider>
          <FormMetadataProvider>
            <BrandSettingsProvider>
              <ComplianceProvider>
                <CollaborationProvider formId={formId}>
                  <FormCanvasProvider>
                    {mode === 'field-selection' ? (
                      <FieldSelectionHandler />
                    ) : (
                      <TemplateFormLoader />
                    )}
                    
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
    </AppLayout>
  );
};

// Component to handle field selection mode
const FieldSelectionHandler = () => {
  const { selectedTemplate, setSelectedTemplate } = useSelectedTemplate();
  const formCanvas = useFormCanvas();
  const { toast } = useToast();
  const [isFieldSelectionOpen, setIsFieldSelectionOpen] = useState(true);
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    if (selectedTemplate && selectedTemplate.elements) {
      // Initialize selected fields state
      const initialSelectedState = selectedTemplate.elements.reduce((acc, element) => {
        acc[element.id] = false;
        return acc;
      }, {} as Record<string, boolean>);
      
      setSelectedFields(initialSelectedState);
    }
  }, [selectedTemplate]);
  
  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };
  
  const handleSelectAll = () => {
    const allSelected = Object.values(selectedFields).every(selected => selected);
    
    const newSelectedState = Object.keys(selectedFields).reduce((acc, fieldId) => {
      acc[fieldId] = !allSelected;
      return acc;
    }, {} as Record<string, boolean>);
    
    setSelectedFields(newSelectedState);
  };
  
  const handleAddSelectedFields = () => {
    if (!selectedTemplate || !selectedTemplate.elements) return;
    
    try {
      // Get only the selected elements
      const elementsToAdd = selectedTemplate.elements.filter(
        element => selectedFields[element.id]
      );
      
      if (elementsToAdd.length === 0) {
        toast({
          title: "No Fields Selected",
          description: "Please select at least one field to add.",
          variant: "destructive"
        });
        return;
      }
      
      // Deep clone to avoid reference issues
      const clonedElements = JSON.parse(JSON.stringify(elementsToAdd));
      
      // Add selected elements to the canvas
      formCanvas.addElements(clonedElements);
      
      // Show success toast
      toast({
        title: "Fields Added",
        description: `${elementsToAdd.length} fields have been added to your form.`,
      });
      
      // Close the selection dialog
      setIsFieldSelectionOpen(false);
      
      // Clear the selected template
      setSelectedTemplate(null);
      
      // Remove the query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (error) {
      console.error("Error adding selected fields:", error);
      toast({
        title: "Error",
        description: "Failed to add the selected fields. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (!selectedTemplate || !selectedTemplate.elements) {
    return null;
  }
  
  return (
    <Dialog open={isFieldSelectionOpen} onOpenChange={(open) => {
      // If user tries to close, warn them they'll lose their selection
      if (!open) {
        if (Object.values(selectedFields).some(selected => selected)) {
          if (window.confirm("Are you sure you want to cancel? Your field selection will be lost.")) {
            setIsFieldSelectionOpen(false);
            setSelectedTemplate(null);
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } else {
          setIsFieldSelectionOpen(false);
          setSelectedTemplate(null);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Fields to Add</DialogTitle>
          <DialogDescription>
            Choose fields from "{selectedTemplate.title}" to add to your current form
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 mt-4 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSelectAll}
            >
              {Object.values(selectedFields).every(selected => selected) 
                ? "Deselect All" 
                : "Select All"}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {Object.values(selectedFields).filter(selected => selected).length} of {Object.keys(selectedFields).length} selected
            </div>
          </div>
          
          <ScrollArea className="h-[400px] border rounded-md bg-slate-50 w-full">
            <div className="p-4 space-y-4">
              {selectedTemplate.elements.map((element: FormElement) => (
                <div key={element.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-100">
                  <Checkbox 
                    id={`field-${element.id}`}
                    checked={selectedFields[element.id] || false}
                    onCheckedChange={() => handleFieldToggle(element.id)}
                  />
                  
                  <div className="flex-1">
                    <label 
                      htmlFor={`field-${element.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {element.type === "header" ? element.content : element.label}
                      <span className="ml-2 text-xs text-muted-foreground capitalize">
                        ({element.type})
                      </span>
                    </label>
                    
                    {element.type !== "header" && element.type !== "paragraph" && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {element.placeholder || element.description || `${element.type} field`}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsFieldSelectionOpen(false);
              setSelectedTemplate(null);
              window.history.replaceState({}, document.title, window.location.pathname);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddSelectedFields}>
            Add Selected Fields
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component to load template elements when creating a new form
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
