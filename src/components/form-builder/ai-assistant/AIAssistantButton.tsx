
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AIAssistantModal from "./AIAssistantModal";
import { FormElement } from "@/types/form";

interface AIAssistantButtonProps {
  onAddElements: (elements: FormElement[]) => void;
}

const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ onAddElements }) => {
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
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center gap-1 bg-portico-purple/5 hover:bg-portico-purple/10 text-portico-purple" 
            onClick={handleOpenModal}
          >
            <Wand2 className="h-4 w-4" />
            <span className="hidden md:inline">AI Assistant</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Generate forms with AI</TooltipContent>
      </Tooltip>

      <AIAssistantModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onAddElements={onAddElements}
      />
    </>
  );
};

export default AIAssistantButton;
