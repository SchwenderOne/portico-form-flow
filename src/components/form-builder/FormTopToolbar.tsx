import React from "react";
import { 
  Copy, 
  Trash, 
  Group, 
  Ungroup, 
  Wand2,
  CheckCircle, 
  Circle,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormElement } from "@/types/form";
import { Separator } from "@/components/ui/separator";

interface FormTopToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onDuplicate: (id: string) => void;
  onDuplicateGroup: (ids: string[]) => void;
  onRequiredToggle: (id: string, required: boolean) => void;
  onGroup: () => void;
  onUngroup: () => void;
  onOpenAIModal: () => void;
  existingElements?: FormElement[];
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
  const isFieldSelected = selectedElement && selectedElement.type !== 'header' && selectedElement.type !== 'paragraph';
  const isTextOrHeader = selectedElement && (selectedElement.type === 'text' || selectedElement.type === 'header');

  return (
    <div className="p-2 border-b bg-background flex justify-between items-center">
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onOpenAIModal} className="text-portico-purple">
                <Wand2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI Form Generator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Separator orientation="vertical" className="mx-2 h-6" />
        
        <div className="text-sm text-muted-foreground px-2">
          <LayoutGrid className="h-4 w-4 inline-block mr-1" />
          <span className="hidden md:inline">Drag elements from the left panel to the canvas</span>
          <span className="md:hidden">Form Builder</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        {selectedCount === 1 && selectedElement && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDuplicate(selectedElement.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate Element (Ctrl+D)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {isFieldSelected && 'required' in selectedElement && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onRequiredToggle(
                        selectedElement.id, 
                        !('required' in selectedElement && selectedElement.required)
                      )}
                    >
                      {('required' in selectedElement && selectedElement.required) ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{('required' in selectedElement && selectedElement.required) ? 'Make Optional' : 'Make Required'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}
        
        {selectedCount > 1 && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDuplicateGroup([])}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate Group (Ctrl+D)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={onGroup}
                  >
                    <Group className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Group Elements (Ctrl+G)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={onUngroup}
                  >
                    <Ungroup className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ungroup Elements (Ctrl+Shift+G)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default FormTopToolbar;
