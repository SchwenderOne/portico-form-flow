
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FormElement } from "@/types/form";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { 
  PlusCircle, 
  LayoutGrid, 
  Paintbrush, 
  Wand, 
  Settings,
  TextCursor,
  Mail,
  Calendar,
  CheckSquare,
  CircleDot,
  ListChecks,
  Upload,
  Heading1,
  TextCursorInput,
  Type,
  ChevronLeft,
  ChevronRight,
  AlignLeft
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PortoElementsTab } from "./sidebar-tabs/PortoElementsTab";
import { PortoThemeTab } from "./sidebar-tabs/PortoThemeTab";
import { PortoAITab } from "./sidebar-tabs/PortoAITab";
import { PortoSettingsTab } from "./sidebar-tabs/PortoSettingsTab";

export const PortoSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("elements");
  const [collapsed, setCollapsed] = useState(false);
  const { handleElementDrop } = useFormCanvas();

  const handleAddElement = (type: string) => {
    // Add element to canvas at default position
    handleElementDrop(type, { x: 100, y: 100 });
    toast.success(`Added ${type} element to form`);
  };

  if (collapsed) {
    return (
      <div className="w-10 bg-background border-r h-full flex flex-col items-center pt-4">
        <Button
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(false)}
          className="mb-4"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant={activeTab === "elements" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("elements"); }}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={activeTab === "theme" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => { setCollapsed(false); setActiveTab("theme"); }}
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
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-background border-r h-full flex flex-col">
      <div className="flex justify-between items-center border-b px-4 py-2">
        <h3 className="text-sm font-medium">Porto Form Builder</h3>
        <Button
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(true)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b bg-muted/30">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="elements" className="flex-1">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Elements
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex-1">
              <Paintbrush className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex-1">
              <Wand className="h-4 w-4 mr-2" />
              AI
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="elements" className="p-0 m-0 h-full">
            <PortoElementsTab onAddElement={handleAddElement} />
          </TabsContent>

          <TabsContent value="theme" className="p-0 m-0 h-full">
            <PortoThemeTab />
          </TabsContent>

          <TabsContent value="ai" className="p-0 m-0 h-full">
            <PortoAITab />
          </TabsContent>

          <TabsContent value="settings" className="p-0 m-0 h-full">
            <PortoSettingsTab />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
