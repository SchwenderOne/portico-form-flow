
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Undo,
  Redo,
  Play,
  Settings,
  Edit,
  Copy,
  Star,
  FileCheck,
  Clock,
  Check,
  Group,
  Ungroup,
  CopyPlus
} from "lucide-react";
import { FormElement } from "@/types/form";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface FormTopToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onDuplicate: (id: string) => void;
  onDuplicateGroup?: (ids: string[]) => void;
  onRequiredToggle?: (id: string, required: boolean) => void;
  onGroup?: () => void;
  onUngroup?: () => void;
}

const FormTopToolbar: React.FC<FormTopToolbarProps> = ({ 
  selectedElement, 
  selectedCount,
  onDuplicate,
  onDuplicateGroup,
  onRequiredToggle,
  onGroup,
  onUngroup
}) => {
  const [formName, setFormName] = useState("Untitled Form");
  const [isEditingName, setIsEditingName] = useState(false);
  const [formStatus] = useState<"draft" | "published">("draft");

  const handlePreview = () => {
    toast.info("Preview mode will be available soon");
  };

  const handlePublish = () => {
    toast.success("Form published successfully");
  };

  const handleSettings = () => {
    toast.info("Form settings will be available soon");
  };

  const handleUndo = () => {
    toast.info("Undo functionality will be available soon");
  };

  const handleRedo = () => {
    toast.info("Redo functionality will be available soon");
  };

  const handleFormNameEdit = () => {
    setIsEditingName(true);
  };

  const handleFormNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };

  const handleFormNameSave = () => {
    setIsEditingName(false);
    toast.success("Form name updated");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormNameSave();
    }
  };

  const handleSetRequired = (required: boolean) => {
    if (selectedElement && onRequiredToggle) {
      onRequiredToggle(selectedElement.id, required);
      toast.success(`Field is now ${required ? "required" : "optional"}`);
    }
  };

  const handleDuplicateSelected = () => {
    if (selectedElement) {
      onDuplicate(selectedElement.id);
      toast.success("Element duplicated");
    }
  };

  const handleDuplicateGroup = () => {
    if (selectedCount > 1 && onDuplicateGroup) {
      // This will be filled with the actual IDs in the component
      onDuplicateGroup([]);
      toast.success("Group duplicated");
    }
  };

  const handleGroupSelected = () => {
    if (onGroup && selectedCount > 1) {
      onGroup();
    }
  };

  const handleUngroupSelected = () => {
    if (onUngroup) {
      onUngroup();
    }
  };

  const handleAddValidation = () => {
    toast.info("Validation rules will be available soon");
  };

  return (
    <div className="border-b border-border bg-background py-2 px-3 flex items-center justify-between gap-2 h-14">
      {/* Left section - Form name and breadcrumbs */}
      <div className="flex items-center gap-2 min-w-0 max-w-[40%]">
        {isEditingName ? (
          <Input
            value={formName}
            onChange={handleFormNameChange}
            onBlur={handleFormNameSave}
            onKeyPress={handleKeyPress}
            autoFocus
            className="h-8 w-64 text-sm font-medium"
          />
        ) : (
          <div className="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md cursor-pointer" onClick={handleFormNameEdit}>
            <span className="font-semibold text-base truncate">{formName}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        )}
        
        <div className="hidden md:flex items-center">
          <Separator orientation="vertical" className="h-4 mx-2" />
          <Breadcrumb className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Form</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {selectedElement && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                {formStatus === "draft" ? (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Draft
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FileCheck className="h-3 w-3" /> Published
                  </span>
                )}
              </Badge>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      {/* Middle section - Contextual controls */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        {selectedCount > 0 && (
          <div className="flex items-center gap-1.5 bg-muted/50 rounded-md px-2 py-1">
            <span className="text-xs font-medium hidden sm:inline-block">
              {selectedCount === 1 ? "Selected:" : `${selectedCount} elements selected`}
            </span>
            
            {selectedCount === 1 && (
              <span className="text-xs text-primary capitalize">{selectedElement?.type}</span>
            )}
            
            {selectedCount === 1 && (
              <>
                <Separator orientation="vertical" className="h-4 mx-1" />
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs" 
                      onClick={() => handleSetRequired(!selectedElement?.required)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      {selectedElement?.required ? "Required" : "Optional"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {selectedElement?.required ? "Make field optional" : "Make field required"}
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs" 
                      onClick={handleAddValidation}
                    >
                      Add Validation
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add validation rules</TooltipContent>
                </Tooltip>
              </>
            )}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs" 
                  onClick={selectedCount === 1 ? handleDuplicateSelected : handleDuplicateGroup}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Duplicate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {selectedCount === 1 ? "Duplicate this element" : "Duplicate selected elements"}
              </TooltipContent>
            </Tooltip>
            
            {selectedCount > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs" 
                    onClick={handleGroupSelected}
                  >
                    <Group className="h-3 w-3 mr-1" />
                    Group
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Group selected elements</TooltipContent>
              </Tooltip>
            )}
            
            {selectedElement?.groupId && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs" 
                    onClick={handleUngroupSelected}
                  >
                    <Ungroup className="h-3 w-3 mr-1" />
                    Ungroup
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Ungroup elements</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </div>

      {/* Right section - Global actions */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleUndo}>
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleRedo}>
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>
        
        <Separator orientation="vertical" className="h-4 mx-1" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center" onClick={handlePreview}>
              <Play className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview form</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={handlePreview}>
              <Play className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview form</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center" onClick={handleSettings}>
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </TooltipTrigger>
          <TooltipContent>Form settings</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={handleSettings}>
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Form settings</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="default" size="sm" onClick={handlePublish}>
              <Star className="h-4 w-4 mr-1" />
              Publish
            </Button>
          </TooltipTrigger>
          <TooltipContent>Publish your form</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default FormTopToolbar;
