
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElement } from "@/types/form";
import { ChevronRight, ListChecks, SlidersHorizontal, Paintbrush } from "lucide-react";
import PropertiesTab from "@/components/form-builder/toolbars/tabs/PropertiesTab";
import ValidationTab from "@/components/form-builder/toolbars/tabs/ValidationTab";
import AppearanceTab from "@/components/form-builder/toolbars/tabs/AppearanceTab";

interface PortoElementEditorProps {
  element: FormElement;
  onClose: () => void;
  onUpdate: (element: FormElement) => void;
}

export const PortoElementEditor: React.FC<PortoElementEditorProps> = ({
  element,
  onClose,
  onUpdate
}) => {
  const [activeTab, setActiveTab] = useState<string>("properties");

  return (
    <div className="w-80 bg-background border-l h-full flex flex-col">
      <div className="flex justify-between items-center border-b px-4 h-12">
        <h3 className="text-sm font-medium">{element.type.charAt(0).toUpperCase() + element.type.slice(1)} Properties</h3>
        <Button
          variant="ghost" 
          size="icon" 
          onClick={onClose}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b">
          <TabsList className="w-full">
            <TabsTrigger value="properties" className="flex-1">
              <ListChecks className="h-4 w-4 mr-2" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex-1">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1">
              <Paintbrush className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties" className="flex-1 overflow-auto p-0">
          <PropertiesTab element={element} onElementUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="validation" className="flex-1 overflow-auto p-0">
          <ValidationTab element={element} onElementUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="appearance" className="flex-1 overflow-auto p-0">
          <AppearanceTab element={element} onElementUpdate={onUpdate} />
        </TabsContent>
      </Tabs>
      
      <div className="border-t p-4">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};
