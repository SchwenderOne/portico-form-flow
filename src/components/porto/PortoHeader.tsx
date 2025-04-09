
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePorto } from "./context/PortoContext";
import { 
  LayoutTemplate, 
  Settings, 
  Pencil, 
  Eye, 
  Save, 
  Globe, 
  Moon, 
  Sun,
  Wand2,
  MoreHorizontal 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
    saveForm
  } = usePorto();
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(formTitle);
  
  const handleTitleChange = () => {
    setFormTitle(tempTitle);
    setIsEditingTitle(false);
    toast.success("Form title updated");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleChange();
    } else if (e.key === "Escape") {
      setTempTitle(formTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center">
        {isEditingTitle ? (
          <div className="flex items-center">
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleChange}
              onKeyDown={handleKeyDown}
              className="w-64 h-8"
              autoFocus
            />
          </div>
        ) : (
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setIsEditingTitle(true)}
          >
            <h2 className="text-lg font-medium mr-2">{formTitle}</h2>
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="mr-4"
        >
          <TabsList>
            <TabsTrigger value="editor" className="flex items-center gap-1">
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-1">
              <LayoutTemplate className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={togglePreviewMode}
          className="flex items-center gap-1"
        >
          {previewMode ? (
            <>
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </>
          )}
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenAIModal}
          className="flex items-center gap-1"
        >
          <Wand2 className="h-4 w-4" />
          <span className="hidden sm:inline">AI Assist</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={saveForm}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={isPublished ? unpublishForm : publishForm}>
              <Globe className="h-4 w-4 mr-2" />
              {isPublished ? "Unpublish" : "Publish"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleDarkMode}>
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("Exporting form...")}>
              Export Form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
