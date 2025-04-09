
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { 
  Box, 
  Info, 
  Check, 
  Wand2, 
  Shield, 
  Sliders, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertiesTab from "../toolbars/tabs/PropertiesTab";
import ValidationTab from "../toolbars/tabs/ValidationTab";
import AppearanceTab from "../toolbars/tabs/AppearanceTab";
import AIAssistTab from "../toolbars/tabs/AIAssistTab";
import ComplianceTab from "../toolbars/tabs/ComplianceTab";
import SettingsTab from "../toolbars/tabs/SettingsTab";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormEditorSidebarProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
  existingElements?: FormElement[];
  onAddElements?: (elements: FormElement[]) => void;
}

const FormEditorSidebar: React.FC<FormEditorSidebarProps> = ({
  element,
  onElementUpdate,
  existingElements = [],
  onAddElements
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("properties");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div className="w-10 border-l border-gray-200 bg-white flex flex-col items-center py-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mb-6"
        >
          <ChevronLeft size={18} />
        </Button>
        
        <TooltipProvider>
          <div className="flex flex-col space-y-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "properties" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("properties");
                    setIsCollapsed(false);
                  }}
                >
                  <Info size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Properties</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "validation" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("validation");
                    setIsCollapsed(false);
                  }}
                >
                  <Check size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Validation</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("appearance");
                    setIsCollapsed(false);
                  }}
                >
                  <Sliders size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Appearance</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "ai" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("ai");
                    setIsCollapsed(false);
                  }}
                >
                  <Wand2 size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>AI Assist</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "compliance" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("compliance");
                    setIsCollapsed(false);
                  }}
                >
                  <Shield size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Compliance</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  size="icon" 
                  onClick={() => {
                    setActiveTab("settings");
                    setIsCollapsed(false);
                  }}
                >
                  <Box size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="w-[300px] border-l border-gray-200 bg-white flex flex-col">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-sm font-medium">
          Edit {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
        </h3>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <ChevronRight size={18} />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-6 h-auto p-1 m-2">
          <TabsTrigger value="properties" className="p-2">
            <Info size={16} />
          </TabsTrigger>
          <TabsTrigger value="validation" className="p-2">
            <Check size={16} />
          </TabsTrigger>
          <TabsTrigger value="appearance" className="p-2">
            <Sliders size={16} />
          </TabsTrigger>
          <TabsTrigger value="ai" className="p-2">
            <Wand2 size={16} />
          </TabsTrigger>
          <TabsTrigger value="compliance" className="p-2">
            <Shield size={16} />
          </TabsTrigger>
          <TabsTrigger value="settings" className="p-2">
            <Box size={16} />
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="properties" className="m-0">
            <PropertiesTab element={element} onElementUpdate={onElementUpdate} />
          </TabsContent>
          
          <TabsContent value="validation" className="m-0">
            <ValidationTab element={element} onElementUpdate={onElementUpdate} />
          </TabsContent>
          
          <TabsContent value="appearance" className="m-0">
            <AppearanceTab element={element} onElementUpdate={onElementUpdate} />
          </TabsContent>
          
          <TabsContent value="ai" className="m-0">
            <AIAssistTab 
              onAddElements={onAddElements}
              existingElements={existingElements}
            />
          </TabsContent>
          
          <TabsContent value="compliance" className="m-0">
            <ComplianceTab element={element} onElementUpdate={onElementUpdate} />
          </TabsContent>
          
          <TabsContent value="settings" className="m-0">
            <SettingsTab element={element} onElementUpdate={onElementUpdate} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FormEditorSidebar;
