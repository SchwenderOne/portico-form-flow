
import React, { useState } from "react";
import { 
  Type, 
  Mail, 
  Hash, 
  AlignLeft, 
  List, 
  CheckSquare, 
  Calendar, 
  Upload, 
  Image, 
  Layout,
  FileText,
  AlertCircle,
  Heading,
  Text,
  ListOrdered,
  Menu,
  GripVertical,
  Radio,
  Phone,
  Search,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarSection from "./SidebarSection";

interface FormElementsPanelProps {
  onElementDrop: (type: string, position: { x: number, y: number }) => void;
}

// Group elements by categories
const formFields = [
  { type: "text", name: "Text Input", icon: Type },
  { type: "email", name: "Email", icon: Mail },
  { type: "phone", name: "Phone", icon: Phone },
  { type: "number", name: "Number", icon: Hash },
  { type: "textarea", name: "Text Area", icon: AlignLeft },
  { type: "select", name: "Dropdown", icon: List },
  { type: "checkbox", name: "Checkbox", icon: CheckSquare },
  { type: "radio", name: "Radio Group", icon: Radio },
  { type: "date", name: "Date Picker", icon: Calendar },
];

const textElements = [
  { type: "header", name: "Header", icon: Heading },
  { type: "paragraph", name: "Paragraph", icon: Text },
  { type: "list", name: "Bullet List", icon: ListOrdered },
];

const advancedElements = [
  { type: "file", name: "File Upload", icon: Upload },
  { type: "image", name: "Image", icon: Image },
  { type: "section", name: "Section", icon: Layout },
  { type: "signature", name: "Signature", icon: FileText },
  { type: "disclaimer", name: "Disclaimer", icon: AlertCircle },
];

const FormElementsPanel: React.FC<FormElementsPanelProps> = ({ onElementDrop }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("elementType", type);
    // Add a drag image for better visual feedback
    const dragImage = document.createElement('div');
    dragImage.style.width = '100px';
    dragImage.style.height = '30px';
    dragImage.style.backgroundColor = 'rgba(155, 135, 245, 0.2)';
    dragImage.style.borderRadius = '4px';
    dragImage.style.border = '1px dashed #9b87f5';
    dragImage.style.display = 'none';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 15);
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  // Filter elements based on search term
  const filterElements = (elements: any[]) => {
    if (!searchTerm) return elements;
    return elements.filter(el => 
      el.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      el.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderElementCards = (elements: any[]) => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {filterElements(elements).map((element) => (
          <div
            key={element.type}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-md border border-dashed cursor-grab bg-white",
              "hover:border-portico-purple hover:bg-portico-purple/5 transition-colors relative group"
            )}
            draggable
            onDragStart={(e) => handleDragStart(e, element.type)}
          >
            <GripVertical className="h-3 w-3 absolute top-1 left-1 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            <element.icon className="h-5 w-5 text-portico-purple mb-1" />
            <span className="text-xs font-medium">{element.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-64 border-r border-border bg-gray-50 flex flex-col h-full">
      <div className="p-3 border-b border-border bg-white sticky top-0 z-10 space-y-3">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          <span>New Field</span>
        </Button>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-2 top-[50%] transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search fields" 
            className="pl-8 h-8 bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <SidebarSection 
          title="Form Fields" 
          icon={<Menu className="h-4 w-4" />}
          defaultOpen={true}
        >
          {renderElementCards(formFields)}
        </SidebarSection>
        
        <SidebarSection 
          title="Text Elements" 
          icon={<FileText className="h-4 w-4" />}
        >
          {renderElementCards(textElements)}
        </SidebarSection>
        
        <SidebarSection 
          title="Advanced" 
          icon={<AlertCircle className="h-4 w-4" />}
        >
          {renderElementCards(advancedElements)}
        </SidebarSection>
      </ScrollArea>
    </div>
  );
};

export default FormElementsPanel;
