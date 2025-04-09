import React from "react";
import { Button } from "@/components/ui/button";
import ExportFormDropdown from "./ExportFormDropdown";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Save,
  Copy, 
  History, 
  LayoutGrid, 
  Group, 
  Ungroup,
  ToggleLeft, 
  Undo, 
  Redo,
  Wand2
} from "lucide-react";
import { FormElement } from "@/types/form";
import { FormMetadataSheet, useFormMetadataSheet } from "./FormMetadataSheet";
import { toast } from "sonner";
import { useFormCanvas } from "./context/FormCanvasContext";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { saveFormState } from "@/services/forms-service";
import { openVersionHistory } from "./version-history/VersionHistorySheet";
import { useAutoSave, AutoSaveEvent } from "./hooks/useAutoSave";

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
  onOpenVersionHistory?: () => void;
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
  existingElements,
  onOpenVersionHistory
}) => {
  const { metadata, saveMetadata } = useFormMetadata();
  const { queueAutoSaveEvent } = useAutoSave({ elements: existingElements });
  const [isSaving, setIsSaving] = React.useState(false);

  const undoOperation = () => toast.info("Undo functionality will be available soon");
  const redoOperation = () => toast.info("Redo functionality will be available soon");
  const canUndo = false;
  const canRedo = false;

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveMetadata();
      await saveFormState(
        metadata.id,
        metadata.name,
        metadata.description || '',
        existingElements
      );
      queueAutoSaveEvent(AutoSaveEvent.PUBLISH);
      toast.success("Form saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save form");
    } finally {
      setIsSaving(false);
    }
  };

  const { open: openFormMetadataSheet } = useFormMetadataSheet();

  const handleOpenMetadata = () => {
    openFormMetadataSheet();
  };

  const handleHistoryClick = () => {
    if (onOpenVersionHistory) {
      onOpenVersionHistory();
    } else {
      openVersionHistory();
    }
  };

  return (
    <div className="border-b bg-background p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleOpenMetadata} className="text-xs">
          {metadata.name || "Untitled Form"}
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleHistoryClick}
              >
                <History className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Version History</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-5 border-l mx-1"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={undoOperation}
                disabled={!canUndo}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={redoOperation}
                disabled={!canRedo}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-2">
        {selectedCount === 1 && selectedElement && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDuplicate(selectedElement.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate Element</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRequiredToggle(selectedElement.id)}
                  >
                    <ToggleLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {selectedElement.required ? "Make Optional" : "Make Required"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                    className="h-8 w-8"
                    onClick={onGroup}
                  >
                    <Group className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Group Elements</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onDuplicateGroup}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate Selection</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        
        {selectedCount > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onUngroup}
                >
                  <Ungroup className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ungroup Elements</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <div className="h-5 border-l mx-1"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onOpenAIModal}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>AI Assistant</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <ExportFormDropdown formElements={existingElements} />
      </div>
      
      <FormMetadataSheet showTrigger={false} />
    </div>
  );
};

export default FormTopToolbar;
