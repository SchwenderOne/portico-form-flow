
import React from "react";
import { 
  Type, 
  Mail, 
  Hash, 
  AlignLeft, 
  List, 
  CheckSquare, 
  Calendar, 
  Upload, 
  Image 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormElementsPanelProps {
  onElementDrop: (type: string, position: { x: number, y: number }) => void;
}

const elements = [
  { type: "header", name: "Header", icon: Type },
  { type: "text", name: "Text Input", icon: Type },
  { type: "email", name: "Email", icon: Mail },
  { type: "number", name: "Number", icon: Hash },
  { type: "textarea", name: "Text Area", icon: AlignLeft },
  { type: "select", name: "Dropdown", icon: List },
  { type: "checkbox", name: "Checkbox", icon: CheckSquare },
  { type: "date", name: "Date Picker", icon: Calendar },
  { type: "file", name: "File Upload", icon: Upload },
  { type: "image", name: "Image", icon: Image },
];

const FormElementsPanel: React.FC<FormElementsPanelProps> = ({ onElementDrop }) => {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("elementType", type);
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    const targetCanvas = (e.target as HTMLElement).closest(".form-canvas");
    if (targetCanvas) {
      const canvasRect = targetCanvas.getBoundingClientRect();
      const x = Math.round((e.clientX - canvasRect.left) / 25) * 25;
      const y = Math.round((e.clientY - canvasRect.top) / 25) * 25;
      onElementDrop(type, { x, y });
    }
  };

  return (
    <div className="w-64 border-r border-border">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Form Elements</h2>
        <p className="text-xs text-muted-foreground mt-1">Drag elements onto the canvas</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {elements.map((element) => (
            <div
              key={element.type}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md border border-dashed cursor-grab",
                "hover:border-portico-purple hover:bg-portico-purple/5 transition-colors"
              )}
              draggable
              onDragStart={(e) => handleDragStart(e, element.type)}
              onDragEnd={(e) => handleDrop(e, element.type)}
            >
              <element.icon className="h-5 w-5 text-portico-purple mb-1" />
              <span className="text-xs font-medium">{element.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormElementsPanel;
