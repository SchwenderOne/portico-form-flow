
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SidebarSection from "./SidebarSection";
import {
  Text,
  ListChecks,
  Mail,
  Calendar,
  Upload,
  TextCursorInput,
  Heading1,
  TextCursor,
  CheckSquare,
  RadioButton,
  Type,
  FolderPlus,
  X,
  PlusCircle,
  AlignLeft
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface FormElementsPanelProps {
  onElementDrop: (type: string, position: { x: number, y: number }) => void;
}

const FormElementsPanel: React.FC<FormElementsPanelProps> = ({ onElementDrop }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const basicElements = [
    { type: "text", label: "Text Field", icon: TextCursor },
    { type: "email", label: "Email Field", icon: Mail },
    { type: "number", label: "Number Field", icon: TextCursorInput },
    { type: "textarea", label: "Text Area", icon: AlignLeft },
    { type: "select", label: "Dropdown", icon: ListChecks },
    { type: "checkbox", label: "Checkbox", icon: CheckSquare },
    { type: "radio", label: "Radio Buttons", icon: RadioButton },
    { type: "date", label: "Date Picker", icon: Calendar },
    { type: "file", label: "File Upload", icon: Upload },
  ];

  const layoutElements = [
    { type: "header", label: "Heading", icon: Heading1 },
    { type: "paragraph", label: "Paragraph", icon: Type },
  ];

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("elementType", type);
    e.dataTransfer.effectAllowed = "copy";
    
    // Customize the drag image
    const dragImage = document.createElement("div");
    dragImage.style.width = "200px";
    dragImage.style.height = "50px";
    dragImage.style.backgroundColor = "#e5deff";
    dragImage.style.border = "2px dashed #8b5cf6";
    dragImage.style.borderRadius = "4px";
    dragImage.style.display = "flex";
    dragImage.style.alignItems = "center";
    dragImage.style.justifyContent = "center";
    dragImage.style.color = "#8b5cf6";
    dragImage.style.fontWeight = "bold";
    dragImage.textContent = `Add ${type} field`;
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 100, 25);
    
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleAddElement = (type: string) => {
    // Add element to canvas at default position
    onElementDrop(type, { x: 100, y: 100 });
    toast.success(`Added ${type} element to form`);
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-72 bg-background border-r h-full overflow-hidden flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Form Elements</h2>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button size="sm" className="h-8">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Field
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add Field to Form</DrawerTitle>
              <DrawerDescription>
                Select a field type to add to your form
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">Basic Fields</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {basicElements.map((element) => (
                  <Button
                    key={element.type}
                    variant="outline"
                    className="flex flex-col h-24 p-2 gap-1 justify-center items-center text-xs"
                    onClick={() => handleAddElement(element.type)}
                  >
                    <element.icon className="h-6 w-6 mb-1" />
                    {element.label}
                  </Button>
                ))}
              </div>
              <h3 className="text-sm font-medium mb-2">Layout Elements</h3>
              <div className="grid grid-cols-3 gap-2">
                {layoutElements.map((element) => (
                  <Button
                    key={element.type}
                    variant="outline"
                    className="flex flex-col h-24 p-2 gap-1 justify-center items-center text-xs"
                    onClick={() => handleAddElement(element.type)}
                  >
                    <element.icon className="h-6 w-6 mb-1" />
                    {element.label}
                  </Button>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="p-3">
          <TooltipProvider delayDuration={350}>
            <SidebarSection title="Basic Fields">
              <div className="grid grid-cols-2 gap-2">
                {basicElements.map((element) => (
                  <Tooltip key={element.type}>
                    <TooltipTrigger asChild>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, element.type)}
                        className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                      >
                        <element.icon className="h-5 w-5 mb-1" />
                        <span className="text-xs">{element.label}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Drag to add {element.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </SidebarSection>

            <SidebarSection title="Layout Elements">
              <div className="grid grid-cols-2 gap-2">
                {layoutElements.map((element) => (
                  <Tooltip key={element.type}>
                    <TooltipTrigger asChild>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, element.type)}
                        className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                      >
                        <element.icon className="h-5 w-5 mb-1" />
                        <span className="text-xs">{element.label}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Drag to add {element.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </SidebarSection>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormElementsPanel;
