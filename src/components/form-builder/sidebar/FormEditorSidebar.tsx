
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElement } from "@/types/form";
import PropertiesTab from "../toolbars/tabs/PropertiesTab";
import ValidationTab from "../toolbars/tabs/ValidationTab";
import AppearanceTab from "../toolbars/tabs/AppearanceTab";
import AIAssistTab from "../toolbars/tabs/AIAssistTab";
import SettingsTab from "../toolbars/tabs/SettingsTab";
import ComplianceTab from "../toolbars/tabs/ComplianceTab";
import { 
  Settings, 
  Wand, 
  Paintbrush, 
  ListChecks, 
  SlidersHorizontal,
  Shield,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState<string>("properties");
  const [collapsed, setCollapsed] = useState(false);
  
  if (collapsed) {
    return (
      <div className="w-10 bg-background border-l h-full flex flex-col items-center pt-4">
        <Button
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(false)}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant={activeTab === "properties" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("properties"); }}
          >
            <ListChecks className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "validation" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("validation"); }}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "appearance" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("appearance"); }}
          >
            <Paintbrush className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "ai" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("ai"); }}
          >
            <Wand className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("settings"); }}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "compliance" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("compliance"); }}
          >
            <Shield className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-background border-l h-full flex flex-col">
      <div className="flex justify-between items-center border-b px-4 h-10">
        <h3 className="text-sm font-medium">{element.type.charAt(0).toUpperCase() + element.type.slice(1)} Settings</h3>
        <Button
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="border-b px-4 bg-muted/30">
          <TabsList className="bg-transparent h-10 justify-start border-b-0">
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <ListChecks className="h-4 w-4 mr-2" />
              Props
            </TabsTrigger>
            
            <TabsTrigger
              value="validation"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Valid
            </TabsTrigger>
            
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Look
            </TabsTrigger>
            
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Wand className="h-4 w-4 mr-2" />
              AI
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties" className="m-0 h-full overflow-auto">
          <PropertiesTab element={element} onElementUpdate={onElementUpdate} />
        </TabsContent>

        <TabsContent value="validation" className="m-0 h-full overflow-auto">
          <ValidationTab element={element} onElementUpdate={onElementUpdate} />
        </TabsContent>

        <TabsContent value="appearance" className="m-0 h-full overflow-auto">
          <AppearanceTab element={element} onElementUpdate={onElementUpdate} />
        </TabsContent>

        <TabsContent value="ai" className="m-0 h-full overflow-auto">
          <AIAssistTab 
            onAddElements={onAddElements} 
            existingElements={existingElements}
          />
        </TabsContent>

        <TabsContent value="settings" className="m-0 h-full overflow-auto">
          <SettingsTab 
            element={element}
            onElementUpdate={onElementUpdate}
          />
        </TabsContent>
        
        <TabsContent value="compliance" className="m-0 h-full overflow-auto">
          <ComplianceTab 
            element={element}
            onElementUpdate={onElementUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormEditorSidebar;
