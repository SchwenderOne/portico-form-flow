
import React, { useState } from "react";
import { usePorto } from "./context/PortoContext";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Undo, 
  Redo, 
  Eye, 
  Grid, 
  Settings, 
  Download, 
  Plus, 
  ChevronDown,
  Wand2,
  Ghost,
  FileText,
  History,
  LayoutTemplate
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface PortoHeaderProps {
  onOpenAIModal: () => void;
}

export const PortoHeader: React.FC<PortoHeaderProps> = ({ onOpenAIModal }) => {
  const { 
    formTitle, 
    setFormTitle, 
    isPublished, 
    publishForm,
    unpublishForm,
    isDarkMode,
    toggleDarkMode,
    activeSection,
    setActiveSection,
    previewMode,
    togglePreviewMode,
    saveForm,
    isEdited,
    exportForm,
    saveFormAsTemplate
  } = usePorto();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(formTitle);

  const handleTitleClick = () => {
    setTempTitle(formTitle);
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim() !== "") {
      setFormTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setIsEditingTitle(false);
      setTempTitle(formTitle);
    }
  };

  const handlePublishToggle = () => {
    if (isPublished) {
      unpublishForm();
    } else {
      publishForm();
    }
  };

  return (
    <div className="border-b h-14 px-4 flex items-center justify-between bg-background">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className={activeSection === "templates" ? "bg-accent" : ""}
          onClick={() => setActiveSection("templates")}
        >
          <LayoutTemplate className="h-4 w-4 mr-1" />
          Templates
        </Button>
        <div>
          {isEditingTitle ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTitleSave();
              }}
              className="flex items-center"
            >
              <Input
                value={tempTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="h-8 min-w-[200px] max-w-[300px]"
                maxLength={50}
              />
            </form>
          ) : (
            <h2
              className="font-medium text-lg cursor-pointer hover:underline"
              onClick={handleTitleClick}
            >
              {formTitle}
            </h2>
          )}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            {isEdited && <span className="italic">Unsaved changes</span>}
            {isPublished && (
              <Badge variant="success" className="text-[10px] h-5">
                Published
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenAIModal}
              >
                <Wand2 className="h-4 w-4 mr-1" />
                AI Assistant
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate forms with AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="ghost"
          size="sm"
          onClick={togglePreviewMode}
          className={previewMode ? "bg-accent" : ""}
        >
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveSection("settings")}
          className={activeSection === "settings" ? "bg-accent" : ""}
        >
          <Settings className="h-4 w-4 mr-1" />
          Settings
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
              <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => exportForm('json')}>
              <FileText className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportForm('pdf')}>
              <FileText className="h-4 w-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportForm('html')}>
              <FileText className="h-4 w-4 mr-2" />
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={saveFormAsTemplate}>
              <LayoutTemplate className="h-4 w-4 mr-2" />
              Save as Template
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={saveForm} size="sm" disabled={!isEdited}>
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>

        <Button 
          variant={isPublished ? "outline" : "default"} 
          size="sm" 
          onClick={handlePublishToggle}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  );
};
