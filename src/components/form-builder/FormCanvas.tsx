
import React, { useState } from "react";
import FormElement from "./FormElement";
import FormToolbar from "./FormToolbar";
import FormElementsPanel from "./FormElementsPanel";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FormElement as FormElementType } from "@/types/form";

const initialElements: FormElementType[] = [
  {
    id: "header-1",
    type: "header",
    content: "Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 }
  },
  {
    id: "text-1",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 }
  },
  {
    id: "email-1",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 }
  }
];

const FormCanvas = () => {
  const [elements, setElements] = useState<FormElementType[]>(initialElements);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleElementSelect = (id: string) => {
    setSelectedElement(id === selectedElement ? null : id);
  };

  const handleElementMove = (id: string, position: { x: number, y: number }) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, position } : el
    ));
  };

  const handleElementDrop = (type: string, position: { x: number, y: number }) => {
    const newElement: FormElementType = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      size: { width: 500, height: type === 'header' ? 60 : 80 },
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: `Enter ${type}...`,
      required: false
    };

    if (type === 'header') {
      (newElement as any).content = 'New Form Header';
    }

    setElements([...elements, newElement]);
    toast({
      title: "Element Added",
      description: `Added a new ${type} element to your form.`,
    });
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
    toast({
      title: "Element Deleted",
      description: "The element has been removed from your form.",
    });
  };

  const handleDuplicateElement = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        }
      };
      setElements([...elements, newElement]);
      toast({
        title: "Element Duplicated",
        description: "A copy of the element has been created.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex">
        <FormElementsPanel onElementDrop={handleElementDrop} />
        <div className="flex-1 relative overflow-auto">
          <div 
            className={cn(
              "form-canvas min-h-full w-full p-4 relative",
              isDragging && "cursor-grabbing"
            )}
          >
            {elements.map((element) => (
              <FormElement
                key={element.id}
                element={element}
                isSelected={selectedElement === element.id}
                onSelect={handleElementSelect}
                onMove={handleElementMove}
                onDelete={handleDeleteElement}
                onDuplicate={handleDuplicateElement}
                setIsDragging={setIsDragging}
              />
            ))}
          </div>
        </div>
      </div>
      <FormToolbar 
        selectedElement={selectedElement ? elements.find(el => el.id === selectedElement) : null} 
        onUpdate={(updatedElement) => {
          setElements(elements.map(el => 
            el.id === updatedElement.id ? updatedElement : el
          ));
        }}
      />
    </div>
  );
};

export default FormCanvas;
