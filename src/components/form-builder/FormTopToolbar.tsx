
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormElement } from "@/types/form";
import {
  Copy,
  CopyPlus,
  Group,
  Ungroup,
  ToggleRight,
  History,
  Wand2
} from "lucide-react";
import SuggestFieldsButton from "./SuggestFieldsButton";
import { openVersionHistory } from "./version-history/VersionHistorySheet";
import { openFormMetadataSheet } from "./FormMetadataSheet";

interface FormTopToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onDuplicate: (id: string) => void;
  onDuplicateGroup: () => void;
  onRequiredToggle: (id: string) => void;
  onGroup: () => void;
  onUngroup: () => void;
  onOpenAIModal: () => void;
  existingElements: FormElement[];
}

const FormTopToolbar: React.FC<FormTopToolbarProps> = ({
  selectedElement,
  selectedCount,
  onDuplicate,
  onDuplicateGroup,
  onRequiredToggle,
  onGroup,
  onUngroup,
  onOpenAIModal,
  existingElements
}) => {
  return (
    <div className="border-b bg-background h-12 flex items-center px-4 justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => openFormMetadataSheet()}
        >
          Form Settings
        </Button>
      </div>
      
      <div className="flex items-center gap-1">
        {selectedCount === 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(selectedElement!.id)}
              className="gap-1.5"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden md:inline">Duplicate</span>
            </Button>
            
            {selectedElement && 'required' in selectedElement && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRequiredToggle(selectedElement.id)}
                className={`gap-1.5 ${selectedElement.required ? 'text-red-500' : ''}`}
              >
                <ToggleRight className="h-4 w-4" />
                <span className="hidden md:inline">
                  {selectedElement.required ? 'Required' : 'Optional'}
                </span>
              </Button>
            )}
          </>
        )}
        
        {selectedCount > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDuplicateGroup}
              className="gap-1.5"
            >
              <CopyPlus className="h-4 w-4" />
              <span className="hidden md:inline">Duplicate Group</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onGroup}
              className="gap-1.5"
            >
              <Group className="h-4 w-4" />
              <span className="hidden md:inline">Group</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onUngroup}
              className="gap-1.5"
            >
              <Ungroup className="h-4 w-4" />
              <span className="hidden md:inline">Ungroup</span>
            </Button>
          </>
        )}
        
        {selectedCount === 0 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openVersionHistory()}
              className="gap-1.5"
            >
              <History className="h-4 w-4" />
              <span className="hidden md:inline">Version History</span>
            </Button>
            
            <SuggestFieldsButton 
              onAddElements={(elements) => {
                const event = new CustomEvent('add-elements', { 
                  detail: { elements } 
                });
                document.dispatchEvent(event);
              }}
              existingElements={existingElements}
            />
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenAIModal}
              className="text-portico-purple hover:text-portico-purple/80 hover:bg-portico-purple/10 gap-1.5"
            >
              <Wand2 className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormTopToolbar;
