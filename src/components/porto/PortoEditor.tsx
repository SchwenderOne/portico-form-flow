
import React, { useState, useEffect } from "react";
import { PortoHeader } from "./PortoHeader";
import { PortoSidebar } from "./PortoSidebar";
import { PortoCanvas } from "./PortoCanvas";
import { usePorto } from "./context/PortoContext";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { AIAssistantModal } from "@/components/porto/AIAssistantModal";
import { PortoFormTemplates } from "./PortoFormTemplates";
import { PortoSettings } from "./PortoSettings";
import { PortoPreview } from "./PortoPreview";
import { CollaboratorAvatars } from "@/context/CollaborationContext";
import { toast } from "sonner";
import { PortoToolbar } from "./PortoToolbar";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

export const PortoEditor: React.FC = () => {
  const { 
    activeSection, 
    previewMode, 
    setFormElements, 
    formElements,
    isEdited,
    lastSaved,
    saveForm
  } = usePorto();
  
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const formCanvas = useFormCanvas();

  // Sync form elements between contexts
  useEffect(() => {
    // When FormCanvas has elements but Porto doesn't, update Porto
    if (formCanvas.elements && formCanvas.elements.length > 0 && 
        (!formElements || formElements.length === 0)) {
      console.log("Syncing from FormCanvas to Porto context");
      setFormElements([...formCanvas.elements]);
    }
    
    // When Porto has elements but FormCanvas doesn't, update FormCanvas
    if (formElements && formElements.length > 0 && 
        (!formCanvas.elements || formCanvas.elements.length === 0 || 
         JSON.stringify(formElements) !== JSON.stringify(formCanvas.elements))) {
      console.log("Syncing from Porto context to FormCanvas");
      formCanvas.setElements([...formElements]);
    }
  }, [formCanvas.elements, setFormElements, formElements, formCanvas]);

  // Auto-save notification
  useEffect(() => {
    if (lastSaved) {
      // Only show this once when saved changes occur
      const lastSavedTime = lastSaved.toLocaleTimeString();
      toast.info(`Changes auto-saved at ${lastSavedTime}`, {
        duration: 2000,
        id: "auto-save" // Prevents duplicate toasts
      });
    }
  }, [lastSaved]);

  // Auto-save every 30 seconds if there are unsaved changes
  useEffect(() => {
    if (isEdited) {
      const autoSaveTimer = setTimeout(() => {
        saveForm();
      }, 30000);
      
      return () => clearTimeout(autoSaveTimer);
    }
  }, [isEdited, saveForm]);

  // Prompt before leaving if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEdited) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isEdited]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save with Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveForm();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveForm]);

  const renderActiveSection = () => {
    if (previewMode) {
      return <PortoPreview />;
    }

    switch (activeSection) {
      case "templates":
        return <PortoFormTemplates />;
      case "settings":
        return <PortoSettings />;
      case "editor":
      default:
        return (
          <div className="flex flex-1 h-full overflow-hidden">
            <PortoSidebar />
            <div className="flex-1 flex flex-col relative">
              <PortoToolbar />
              <div className="flex-1 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-10">
                  <CollaboratorAvatars />
                </div>
                <PortoCanvas />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <PortoHeader onOpenAIModal={() => setIsAIModalOpen(true)} />
      <div className="flex-1 overflow-hidden">
        {renderActiveSection()}
      </div>
      
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </div>
  );
};
