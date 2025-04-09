
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElement } from "@/types/form";
import { 
  Box, 
  Type, 
  Palette, 
  Settings as SettingsIcon, 
  Wand2, 
  Group
} from "lucide-react";

// Import tab components
import PropertiesTab from "./toolbars/tabs/PropertiesTab";
import ValidationTab from "./toolbars/tabs/ValidationTab";
import AppearanceTab from "./toolbars/tabs/AppearanceTab";
import SettingsTab from "./toolbars/tabs/SettingsTab";
import AIAssistTab from "./toolbars/tabs/AIAssistTab";
import GroupTab from "./toolbars/tabs/GroupTab";
import MultipleSelectionPanel from "./toolbars/MultipleSelectionPanel";
import NoSelectionPanel from "./toolbars/NoSelectionPanel";

interface FormToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onUpdate: (element: FormElement) => void;
  onGroup: () => void;
  onUngroup: () => void;
}

const FormToolbar: React.FC<FormToolbarProps> = ({ 
  selectedElement, 
  selectedCount,
  onUpdate,
  onGroup,
  onUngroup
}) => {
  // Handle multiple elements selected
  if (selectedCount > 1) {
    return <MultipleSelectionPanel selectedCount={selectedCount} onGroup={onGroup} />;
  }

  // Handle grouped element case
  if (selectedElement && selectedElement.groupId) {
    return (
      <div className="h-64 border-t border-border">
        <Tabs defaultValue="properties">
          <div className="flex items-center px-4 pt-2 border-b">
            <p className="text-sm font-medium mr-4">
              Editing: <span className="text-portico-purple">{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}</span>
              <span className="text-xs ml-2 bg-portico-purple/10 text-portico-purple px-1 rounded">Grouped</span>
            </p>
            <TabsList>
              <TabsTrigger value="properties" className="text-xs">
                <Box className="h-3 w-3 mr-1" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="group" className="text-xs">
                <Group className="h-3 w-3 mr-1" />
                Group
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="properties">
            <PropertiesTab element={selectedElement} onElementUpdate={onUpdate} />
          </TabsContent>

          <TabsContent value="group">
            <GroupTab onUngroup={onUngroup} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // No element selected
  if (!selectedElement) {
    return <NoSelectionPanel />;
  }

  // Standard case - one element selected
  return (
    <div className="h-64 border-t border-border">
      <Tabs defaultValue="properties">
        <div className="flex items-center px-4 pt-2 border-b">
          <p className="text-sm font-medium mr-4">
            Editing: <span className="text-portico-purple">{selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}</span>
          </p>
          <TabsList>
            <TabsTrigger value="properties" className="text-xs">
              <Box className="h-3 w-3 mr-1" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <SettingsIcon className="h-3 w-3 mr-1" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">
              <Wand2 className="h-3 w-3 mr-1" />
              AI Assist
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties">
          <PropertiesTab element={selectedElement} onElementUpdate={onUpdate} />
          <ValidationTab element={selectedElement} onElementUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab element={selectedElement} onElementUpdate={onUpdate} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="ai">
          <AIAssistTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormToolbar;
