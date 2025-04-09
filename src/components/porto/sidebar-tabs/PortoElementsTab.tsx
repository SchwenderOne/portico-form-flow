
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
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
  AlignLeft,
  PlusCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PortoElementsTabProps {
  onAddElement: (type: string) => void;
}

export const PortoElementsTab: React.FC<PortoElementsTabProps> = ({ onAddElement }) => {
  const basicElements = [
    { type: "text", label: "Text Field", icon: TextCursor },
    { type: "email", label: "Email Field", icon: Mail },
    { type: "number", label: "Number Field", icon: TextCursorInput },
    { type: "textarea", label: "Text Area", icon: AlignLeft },
    { type: "select", label: "Dropdown", icon: ListChecks },
    { type: "checkbox", label: "Checkbox", icon: CheckSquare },
    { type: "radio", label: "Radio Buttons", icon: CircleDot },
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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">Form Elements</h3>
        <Button size="sm" onClick={() => onAddElement("text")}>
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Field
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <TooltipProvider delayDuration={350}>
          <Accordion type="multiple" defaultValue={["basic", "layout"]}>
            <AccordionItem value="basic">
              <AccordionTrigger className="text-sm">Basic Fields</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {basicElements.map((element) => (
                    <Tooltip key={element.type}>
                      <TooltipTrigger asChild>
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, element.type)}
                          className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                          onClick={() => onAddElement(element.type)}
                        >
                          <element.icon className="h-5 w-5 mb-1" />
                          <span className="text-xs">{element.label}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Add {element.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="layout">
              <AccordionTrigger className="text-sm">Layout Elements</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {layoutElements.map((element) => (
                    <Tooltip key={element.type}>
                      <TooltipTrigger asChild>
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, element.type)}
                          className="flex flex-col items-center justify-center p-3 border border-border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                          onClick={() => onAddElement(element.type)}
                        >
                          <element.icon className="h-5 w-5 mb-1" />
                          <span className="text-xs">{element.label}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Add {element.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TooltipProvider>
      </ScrollArea>
    </div>
  );
};
