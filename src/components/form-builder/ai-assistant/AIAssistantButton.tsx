
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AIAssistantModal from "./AIAssistantModal";
import { FormElement } from "@/types/form";

interface AIAssistantButtonProps {
  onAddElements?: (elements: FormElement[]) => void;
  existingElements?: FormElement[];
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ 
  onAddElements = () => {}, 
  existingElements = [],
  size = "default",
  variant = "default"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            className="text-sm flex items-center gap-1 bg-portico-purple/5 hover:bg-portico-purple/10 text-portico-purple" 
            onClick={handleOpenModal}
          >
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Generate forms with AI</TooltipContent>
      </Tooltip>

      <AIAssistantModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onAddElements={onAddElements}
        existingElements={existingElements}
      />
    </>
  );
};

export default AIAssistantButton;
