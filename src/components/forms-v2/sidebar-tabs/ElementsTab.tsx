
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
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
  CircleDot,
  Type,
  FolderPlus,
  Layout,
  FileImage,
  PhoneCall,
  Map,
  CreditCard,
  Stars,
  Users,
  Clock
} from "lucide-react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";

const ElementsTab = () => {
  const { handleElementDrop } = useFormCanvas();
  
  const handleAddElement = (type: string) => {
    // Add element at a default position
    handleElementDrop(type, { x: 100, y: 100 });
  };
  
  const elementCategories = [
    {
      title: "Basic Fields",
      elements: [
        { type: "text", label: "Text", icon: TextCursor },
        { type: "textarea", label: "Text Area", icon: Text },
        { type: "email", label: "Email", icon: Mail },
        { type: "number", label: "Number", icon: TextCursorInput },
        { type: "date", label: "Date", icon: Calendar },
        { type: "checkbox", label: "Checkbox", icon: CheckSquare },
        { type: "radio", label: "Radio", icon: CircleDot },
        { type: "select", label: "Dropdown", icon: ListChecks },
      ]
    },
    {
      title: "Advanced Fields",
      elements: [
        { type: "file", label: "File Upload", icon: Upload },
        { type: "phone", label: "Phone", icon: PhoneCall },
        { type: "address", label: "Address", icon: Map },
        { type: "payment", label: "Payment", icon: CreditCard },
        { type: "rating", label: "Rating", icon: Stars },
        { type: "signature", label: "Signature", icon: Users },
        { type: "time", label: "Time", icon: Clock },
      ]
    },
    {
      title: "Layout Elements",
      elements: [
        { type: "header", label: "Heading", icon: Heading1 },
        { type: "paragraph", label: "Paragraph", icon: Type },
        { type: "section", label: "Section", icon: Layout },
        { type: "image", label: "Image", icon: FileImage },
      ]
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search elements..." 
          className="pl-8 h-9"
        />
      </div>
      
      {elementCategories.map((category, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground">{category.title}</h3>
          <div className="grid grid-cols-4 gap-1.5">
            {category.elements.map((element) => (
              <Button
                key={element.type}
                variant="outline"
                size="sm"
                className="h-auto py-2 px-1.5 flex flex-col items-center justify-center gap-1.5 hover:bg-blue-50 hover:border-blue-200"
                onClick={() => handleAddElement(element.type)}
              >
                <element.icon className="h-5 w-5 text-blue-600" />
                <span className="text-[10px] font-normal text-center whitespace-normal break-words leading-tight">
                  {element.label}
                </span>
              </Button>
            ))}
          </div>
          {index < elementCategories.length - 1 && (
            <Separator className="my-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ElementsTab;
