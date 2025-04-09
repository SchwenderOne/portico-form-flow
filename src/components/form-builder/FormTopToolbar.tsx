
import React from "react";
import { 
  Bold, 
  Copy, 
  Send, 
  Trash, 
  Trash2, 
  Wand2, 
  GroupIcon, 
  Group, 
  Ungroup, 
  ToggleRight, 
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormElement } from "@/types/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import AIAssistantButton from "./ai-assistant/AIAssistantButton";

type FormTopToolbarProps = {
  selectedElement: FormElement | null;
  selectedCount: number;
  onDuplicate: (id: string) => void;
  onDuplicateGroup: () => void;
  onRequiredToggle: (id: string) => void;
  onGroup: () => void;
  onUngroup: () => void;
  onOpenAIModal: () => void;
  onOpenSmartSuggest: () => void;
  existingElements: FormElement[];
};

const FormTopToolbar: React.FC<FormTopToolbarProps> = ({
  selectedElement,
  selectedCount,
  onDuplicate,
  onDuplicateGroup,
  onRequiredToggle,
  onGroup,
  onUngroup,
  onOpenAIModal,
  onOpenSmartSuggest,
  existingElements
}) => {
  return (
    <TooltipProvider>
      <div className="px-4 py-2 border-b border-gray-200 flex items-center bg-white">
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenAIModal}
                className="flex items-center"
              >
                <Wand2 className="h-4 w-4 mr-1" />
                AI Assistant
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate with AI</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenSmartSuggest}
                className="flex items-center"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Smart Suggest
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyze form to suggest fields</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Separator orientation="vertical" className="mx-2 h-8" />
        
        {selectedCount === 1 && selectedElement && (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDuplicate(selectedElement.id)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate selected element</p>
              </TooltipContent>
            </Tooltip>
            
            {selectedElement.type !== 'header' && selectedElement.type !== 'paragraph' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedElement.required ? "default" : "outline"}
                    size="sm"
                    onClick={() => onRequiredToggle(selectedElement.id)}
                  >
                    <ToggleRight className="h-4 w-4 mr-1" />
                    {selectedElement.required ? "Required" : "Optional"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle required/optional</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
        
        {selectedCount > 1 && (
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDuplicateGroup}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate Group
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate selected elements</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGroup}
                >
                  <Group className="h-4 w-4 mr-1" />
                  Group
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Group selected elements</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onUngroup}
                >
                  <Ungroup className="h-4 w-4 mr-1" />
                  Ungroup
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ungroup selected elements</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
        
        <div className="ml-auto">
          <Button variant="default" size="sm">
            <Send className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FormTopToolbar;
