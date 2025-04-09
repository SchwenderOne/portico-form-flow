
import React, { useState, useEffect } from "react";
import { PortoHeader } from "./PortoHeader";
import { PortoSidebar } from "./PortoSidebar";
import { PortoCanvas } from "./PortoCanvas";
import { usePorto } from "./context/PortoContext";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { FormElement } from "@/types/form";
import { PortoToolbar } from "./PortoToolbar";
import { CollaboratorAvatars } from "@/context/CollaborationContext";
import { PortoPreview } from "./PortoPreview";
import { AIAssistantModal } from "@/components/porto/AIAssistantModal";
import { PortoFormTemplates } from "./PortoFormTemplates";
import { PortoSettings } from "./PortoSettings";

export const PortoEditor: React.FC = () => {
  const { 
    activeSection, 
    previewMode, 
    setFormElements, 
    formElements 
  } = usePorto();
  
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const formCanvas = useFormCanvas();

  useEffect(() => {
    // Sync form elements between contexts
    if (formCanvas.elements && formCanvas.elements.length > 0) {
      setFormElements(formCanvas.elements);
    }
  }, [formCanvas.elements, setFormElements]);

  const handleAddElement = (element: FormElement) => {
    if (formCanvas && formCanvas.addElement) {
      formCanvas.addElement(element);
    }
  };

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
      {renderActiveSection()}
      
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </div>
  );
};
