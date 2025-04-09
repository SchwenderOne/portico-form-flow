
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { usePromptsGenerator } from "../../../hooks/use-prompts-generator";
import { FormElement } from "@/types/form";
import InsertionModeModal from "./InsertionModeModal";
import ExamplePrompts from "./components/ExamplePrompts";
import PromptHistory from "./components/PromptHistory";
import PromptInput from "./components/PromptInput";
import PromptTabs from "./components/PromptTabs";
import { usePromptHistory } from "./hooks/usePromptHistory";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElements: (elements: FormElement[], replaceExisting?: boolean) => void;
  existingElements: FormElement[];
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onAddElements,
  existingElements
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [showInsertionModal, setShowInsertionModal] = useState<boolean>(false);
  const [generatedElements, setGeneratedElements] = useState<FormElement[]>([]);
  
  const {
    generateForm,
    loading,
    error
  } = usePromptsGenerator();
  
  const {
    prompts,
    addPrompt,
    deletePrompt,
    toggleFavorite,
    activeTab,
    setActiveTab,
    historyCount,
    favoritesCount
  } = usePromptHistory();

  const handleGenerateForm = async () => {
    if (!prompt.trim()) return;
    
    try {
      // Add the prompt to history
      addPrompt(prompt);
      
      // Generate elements
      const elements = await generateForm(prompt);
      
      // If we have existing elements, ask where to insert new ones
      if (existingElements.length > 0) {
        setGeneratedElements(elements);
        setShowInsertionModal(true);
      } else {
        // If no existing elements, just add the new ones
        onAddElements(elements);
        onClose();
      }
    } catch (error) {
      console.error("Error generating form:", error);
    }
  };

  const handleInsertionDecision = (shouldReplace: boolean) => {
    onAddElements(generatedElements, shouldReplace);
    setShowInsertionModal(false);
    onClose();
  };
  
  const handleReusePrompt = (text: string) => {
    setPrompt(text);
  };
  
  const handleEditPrompt = (text: string) => {
    setPrompt(text);
  };
  
  const handleSelectExample = (example: string) => {
    setPrompt(example);
  };

  // Cancel the insertion modal
  const handleCancelInsertion = () => {
    setShowInsertionModal(false);
  };

  // Close both modals
  const handleCloseAll = () => {
    setShowInsertionModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>AI Form Generator</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <ExamplePrompts onSelectExample={handleSelectExample} />

            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerateForm}
              isLoading={loading}
            />
            
            {error && (
              <div className="text-destructive text-sm mt-2">
                Error: {error}
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <PromptTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                historyCount={historyCount}
                favoritesCount={favoritesCount}
              />
              
              <PromptHistory
                prompts={prompts}
                onReusePrompt={handleReusePrompt}
                onEditPrompt={handleEditPrompt}
                onDeletePrompt={deletePrompt}
                onToggleFavorite={toggleFavorite}
                activeTab={activeTab}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modal for asking if new elements should replace existing ones */}
      <InsertionModeModal
        isOpen={showInsertionModal}
        onClose={handleCancelInsertion}
        onSelection={handleInsertionDecision}
        elementsCount={generatedElements.length}
      />
    </>
  );
};

export default AIAssistantModal;
