
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  AlignLeft,
  Type,
} from "lucide-react";

interface PortoElementsTabProps {
  onAddElement: (type: string) => void;
}

export const PortoElementsTab: React.FC<PortoElementsTabProps> = ({ onAddElement }) => {
  const basicElements = [
    { type: "text", label: "Text Input", icon: TextCursor },
    { type: "email", label: "Email Input", icon: Mail },
    { type: "number", label: "Number Input", icon: TextCursorInput },
    { type: "textarea", label: "Text Area", icon: AlignLeft },
    { type: "select", label: "Dropdown", icon: ListChecks },
    { type: "checkbox", label: "Checkbox", icon: CheckSquare },
    { type: "radio", label: "Radio Button", icon: CircleDot },
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
  };

  return (
    <div className="p-4 h-full">
      <Accordion type="single" collapsible defaultValue="basic-fields" className="w-full">
        <AccordionItem value="basic-fields">
          <AccordionTrigger className="text-sm font-medium">Basic Fields</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-auto max-h-[400px]">
              <div className="grid grid-cols-2 gap-2 p-1">
                <TooltipProvider>
                  {basicElements.map((element) => (
                    <Tooltip key={element.type}>
                      <TooltipTrigger asChild>
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, element.type)}
                          className="flex flex-col items-center justify-center p-3 border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                          onClick={() => onAddElement(element.type)}
                        >
                          <element.icon className="h-5 w-5 mb-1" />
                          <span className="text-xs">{element.label}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Drag to add {element.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="layout-elements">
          <AccordionTrigger className="text-sm font-medium">Layout Elements</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 p-1">
              <TooltipProvider>
                {layoutElements.map((element) => (
                  <Tooltip key={element.type}>
                    <TooltipTrigger asChild>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, element.type)}
                        className="flex flex-col items-center justify-center p-3 border rounded-md hover:bg-accent hover:border-primary/50 transition-colors cursor-grab"
                        onClick={() => onAddElement(element.type)}
                      >
                        <element.icon className="h-5 w-5 mb-1" />
                        <span className="text-xs">{element.label}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Drag to add {element.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
