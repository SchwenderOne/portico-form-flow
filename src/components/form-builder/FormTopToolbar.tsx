
import React from "react";
import {
  Undo2,
  Redo2,
  Save,
  Eye,
  MoreHorizontal,
  Share2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AIAssistantButton from "./ai-assistant/AIAssistantButton";
import { FormElement } from "@/types/form";
import { FormMetadataSheet } from "./FormMetadataSheet";
import { useFormMetadata } from "@/context/FormMetadataContext";
import ExportFormDropdown from "./ExportFormDropdown";
import { saveFormState } from "@/services/forms-service";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface FormTopToolbarProps {
  onPreview?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  // Add the missing props that FormCanvas is trying to pass
  selectedElement?: FormElement | null;
  selectedCount?: number;
  onDuplicate?: (id: string) => void;
  onDuplicateGroup?: (ids: string[]) => void;
  onRequiredToggle?: (id: string, required: boolean) => void;
  onGroup?: () => void;
  onUngroup?: () => void;
  onOpenAIModal?: () => void;
  existingElements?: FormElement[];
}

const FormTopToolbar: React.FC<FormTopToolbarProps> = ({
  onPreview = () => {},
  onUndo = () => {},
  onRedo = () => {},
  canUndo = false,
  canRedo = false,
  // Add defaults for new props
  selectedElement = null,
  selectedCount = 0,
  onDuplicate = () => {},
  onDuplicateGroup = () => {},
  onRequiredToggle = () => {},
  onGroup = () => {},
  onUngroup = () => {},
  onOpenAIModal = () => {},
  existingElements = []
}) => {
  const { metadata, saveMetadata, isLoading } = useFormMetadata();
  const { user } = useAuth();
  
  const handleSaveForm = async () => {
    if (!user) {
      toast.error("You must be logged in to save forms");
      return;
    }
    
    try {
      // First save metadata
      await saveMetadata();
      
      // Then save form elements if we have any
      if (existingElements.length > 0) {
        await saveFormState(
          metadata.id, 
          metadata.name, 
          metadata.description || '', 
          existingElements
        );
      }
      
      toast.success("Form saved successfully");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };
  
  return (
    <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndo}
                disabled={!canUndo}
                className="h-8 w-8"
              >
                <Undo2 className="h-4 w-4" />
                <span className="sr-only">Undo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRedo}
                disabled={!canRedo}
                className="h-8 w-8"
              >
                <Redo2 className="h-4 w-4" />
                <span className="sr-only">Redo</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center ml-4">
          <span className="font-semibold text-lg mr-2">{metadata.name || "Untitled Form"}</span>
          <Badge variant={metadata.status === 'draft' ? 'outline' : metadata.status === 'review' ? 'secondary' : 'default'}>
            {metadata.status === 'draft' ? 'Draft' : metadata.status === 'review' ? 'In Review' : 'Published'}
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <FormMetadataSheet />
        
        <AIAssistantButton 
          onAddElements={onOpenAIModal} 
          existingElements={existingElements} 
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={onPreview}
          className="flex items-center space-x-1"
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>

        {/* Add the export dropdown here */}
        <ExportFormDropdown formElements={existingElements} />

        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>

        <Button
          variant="default"
          size="sm"
          className="bg-portico-purple hover:bg-portico-purple-dark flex items-center space-x-1"
          onClick={handleSaveForm}
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-1" />
          {isLoading ? "Saving..." : "Save"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Import Form</DropdownMenuItem>
            <DropdownMenuItem>Export Form</DropdownMenuItem>
            <DropdownMenuItem>Form Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FormTopToolbar;
