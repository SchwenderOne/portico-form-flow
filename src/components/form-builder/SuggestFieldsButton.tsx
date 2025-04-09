
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";
import SuggestFieldsModal from "./ai-assistant/SuggestFieldsModal";
import { FormElement } from "@/types/form";
import { useFormMetadata } from "@/context/FormMetadataContext";

interface SuggestFieldsButtonProps {
  onAddElements: (elements: FormElement[]) => void;
  existingElements: FormElement[];
}

const SuggestFieldsButton: React.FC<SuggestFieldsButtonProps> = ({
  onAddElements,
  existingElements
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { metadata } = useFormMetadata();

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant="ghost"
        size="sm"
        className="text-portico-purple hover:text-portico-purple/80 hover:bg-portico-purple/10 gap-1.5"
      >
        <LightbulbIcon className="h-4 w-4" />
        <span className="hidden md:inline">Suggest Fields</span>
      </Button>
      
      <SuggestFieldsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddElements={onAddElements}
        existingElements={existingElements}
        formMetadata={{ 
          name: metadata?.name || "Form", 
          description: metadata?.description || "" 
        }}
      />
    </>
  );
};

export default SuggestFieldsButton;
