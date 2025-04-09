
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutGrid, 
  Layers, 
  Palette, 
  Settings,
  FileText,
  ShieldCheck,
  History,
  GanttChart,
  Wand2,
  Check
} from "lucide-react";
import ElementsTab from "./sidebar-tabs/ElementsTab";
import StructureTab from "./sidebar-tabs/StructureTab";
import ThemeTab from "./sidebar-tabs/ThemeTab";
import SettingsTab from "./sidebar-tabs/SettingsTab";
import MetadataTab from "./sidebar-tabs/MetadataTab";
import ComplianceTab from "./sidebar-tabs/ComplianceTab";
import HistoryTab from "./sidebar-tabs/HistoryTab";
import LogicTab from "./sidebar-tabs/LogicTab";
import AITab from "./sidebar-tabs/AITab";
import ValidationTab from "./sidebar-tabs/ValidationTab";

interface FormsV2SidebarProps {
  currentTab: string;
  onTabChange: (value: string) => void;
}

const FormsV2Sidebar = ({ currentTab, onTabChange }: FormsV2SidebarProps) => {
  return (
    <div className="w-72 border-r bg-white h-full flex flex-col overflow-hidden">
      <Tabs 
        value={currentTab} 
        onValueChange={onTabChange}
        className="flex flex-col h-full"
      >
        <div className="border-b">
          <TabsList className="w-full h-12 bg-transparent rounded-none justify-between p-1">
            <TabsTrigger 
              value="elements" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="Form Elements"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">Elements</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="structure" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="Form Structure"
            >
              <Layers className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">Structure</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="theme" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="Theme & Styling"
            >
              <Palette className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">Theme</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="logic" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="Form Logic"
            >
              <GanttChart className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">Logic</span>
            </TabsTrigger>

            <TabsTrigger 
              value="validation" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="Validation Rules"
            >
              <Check className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">Validate</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="ai" 
              className="flex flex-col h-10 w-10 p-0 data-[state=active]:bg-blue-50"
              title="AI Assistant"
            >
              <Wand2 className="h-4 w-4" />
              <span className="text-[9px] mt-0.5">AI</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="border-b p-2 bg-gray-50">
          <TabsList className="grid grid-cols-4 h-8 bg-gray-100">
            <TabsTrigger value="metadata" className="text-xs py-0">
              <FileText className="h-3 w-3 mr-1" />
              Info
            </TabsTrigger>
            
            <TabsTrigger value="settings" className="text-xs py-0">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </TabsTrigger>
            
            <TabsTrigger value="compliance" className="text-xs py-0">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Comply
            </TabsTrigger>
            
            <TabsTrigger value="history" className="text-xs py-0">
              <History className="h-3 w-3 mr-1" />
              History
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <TabsContent value="elements" className="p-2 m-0">
              <ElementsTab />
            </TabsContent>
            
            <TabsContent value="structure" className="p-2 m-0">
              <StructureTab />
            </TabsContent>
            
            <TabsContent value="theme" className="p-2 m-0">
              <ThemeTab />
            </TabsContent>
            
            <TabsContent value="settings" className="p-2 m-0">
              <SettingsTab />
            </TabsContent>
            
            <TabsContent value="metadata" className="p-2 m-0">
              <MetadataTab />
            </TabsContent>
            
            <TabsContent value="compliance" className="p-2 m-0">
              <ComplianceTab />
            </TabsContent>
            
            <TabsContent value="history" className="p-2 m-0">
              <HistoryTab />
            </TabsContent>
            
            <TabsContent value="logic" className="p-2 m-0">
              <LogicTab />
            </TabsContent>
            
            <TabsContent value="ai" className="p-2 m-0">
              <AITab />
            </TabsContent>
            
            <TabsContent value="validation" className="p-2 m-0">
              <ValidationTab />
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
};

export default FormsV2Sidebar;
