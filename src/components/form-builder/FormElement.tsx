
import React, { useState, useRef } from "react";
import { FormElement as FormElementType } from "@/types/form";
import { cn } from "@/lib/utils";
import { Grip, Trash2, Copy, Settings } from "lucide-react";

interface FormElementProps {
  element: FormElementType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, position: { x: number, y: number }) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  setIsDragging: (isDragging: boolean) => void;
}

const FormElement: React.FC<FormElementProps> = ({ 
  element, 
  isSelected, 
  onSelect, 
  onMove, 
  onDelete,
  onDuplicate,
  setIsDragging
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect = elementRef.current.parentElement.getBoundingClientRect();
          const x = e.clientX - parentRect.left - dragOffset.x;
          const y = e.clientY - parentRect.top - dragOffset.y;
          
          // Snap to grid (25px)
          const snappedX = Math.round(x / 25) * 25;
          const snappedY = Math.round(y / 25) * 25;
          
          onMove(element.id, { x: snappedX, y: snappedY });
        }
      };
      
      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setIsDragging(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'header':
        return (
          <h2 className="text-2xl font-bold">
            {(element as any).content || 'Header'}
          </h2>
        );
      case 'text':
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input 
              type="text" 
              className="border rounded-md p-2" 
              placeholder={element.placeholder}
              readOnly
            />
          </div>
        );
      case 'email':
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input 
              type="email" 
              className="border rounded-md p-2" 
              placeholder={element.placeholder}
              readOnly
            />
          </div>
        );
      case 'number':
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input 
              type="number" 
              className="border rounded-md p-2" 
              placeholder={element.placeholder}
              readOnly
            />
          </div>
        );
      case 'textarea':
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea 
              className="border rounded-md p-2 h-24" 
              placeholder={element.placeholder}
              readOnly
            />
          </div>
        );
      case 'select':
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className="border rounded-md p-2">
              <option disabled>Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "form-element absolute p-4 bg-white border rounded-md shadow-sm group",
        isSelected && "selected"
      )}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: isSelected ? 10 : 1
      }}
      onClick={() => onSelect(element.id)}
    >
      {renderElementContent()}
      
      {/* Drag handle */}
      <div 
        className="form-element-handle"
        onMouseDown={handleMouseDown}
      >
        <Grip className="h-3 w-3 text-muted-foreground mx-auto mt-1" />
      </div>
      
      {/* Element toolbar */}
      {isSelected && (
        <div className="form-element-toolbar visible opacity-100">
          <button 
            className="toolbar-button toolbar-button-secondary p-1"
            onClick={() => onDuplicate(element.id)}
          >
            <Copy className="h-3 w-3" />
          </button>
          <button 
            className="toolbar-button toolbar-button-secondary p-1"
            onClick={() => onSelect(element.id)}
          >
            <Settings className="h-3 w-3" />
          </button>
          <button 
            className="toolbar-button toolbar-button-secondary p-1"
            onClick={() => onDelete(element.id)}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FormElement;
