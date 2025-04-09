
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertiesTab from "./toolbars/tabs/PropertiesTab";
import ValidationTab from "./toolbars/tabs/ValidationTab";
import AppearanceTab from "./toolbars/tabs/AppearanceTab";
import AIAssistTab from "./toolbars/tabs/AIAssistTab";
import SettingsTab from "./toolbars/tabs/SettingsTab";
import MultipleSelectionPanel from "./toolbars/MultipleSelectionPanel";
import NoSelectionPanel from "./toolbars/NoSelectionPanel";
import { FormElement } from "@/types/form";
import { Settings, Wand, Paintbrush, ListChecks, SlidersHorizontal } from "lucide-react";

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
  onUngroup,
}) => {
  const [activeTab, setActiveTab] = useState<string>("properties");

  // Determine which panel to show based on selection state
  if (selectedCount === 0) {
    return (
      <div className="h-48 border-t bg-background flex flex-col">
        <NoSelectionPanel />
      </div>
    );
  }

  if (selectedCount > 1) {
    return (
      <div className="h-48 border-t bg-background flex flex-col">
        <MultipleSelectionPanel
          count={selectedCount}
          onGroup={onGroup}
          onUngroup={onUngroup}
        />
      </div>
    );
  }

  return (
    <div className="h-48 border-t bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="border-b px-4 bg-muted/30">
          <TabsList className="bg-transparent h-10 justify-start border-b-0">
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <ListChecks className="h-4 w-4 mr-2" />
              Properties
            </TabsTrigger>
            {selectedElement && (
              <TabsTrigger
                value="validation"
                className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Validation
              </TabsTrigger>
            )}
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Wand className="h-4 w-4 mr-2" />
              AI Assist
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-background rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties" className="m-0 h-full">
          {selectedElement && (
            <PropertiesTab
              element={selectedElement}
              onElementUpdate={onUpdate}
            />
          )}
        </TabsContent>

        <TabsContent value="validation" className="m-0 h-full">
          {selectedElement && (
            <ValidationTab
              element={selectedElement}
              onElementUpdate={onUpdate}
            />
          )}
        </TabsContent>

        <TabsContent value="appearance" className="m-0 h-full">
          {selectedElement && <AppearanceTab element={selectedElement} />}
        </TabsContent>

        <TabsContent value="ai" className="m-0 h-full">
          <AIAssistTab />
        </TabsContent>

        <TabsContent value="settings" className="m-0 h-full">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormToolbar;
