
import React, { useState, useRef, useEffect } from "react";
import { FormElement as FormElementType } from "@/types/form";
import { cn } from "@/lib/utils";
import { Grip, Trash2, Copy, Settings, Group, Ungroup } from "lucide-react";
import { useGrouping } from "./GroupingContext";
import FloatingToolbar from "./FloatingToolbar";

interface FormElementProps {
  element: FormElementType;
  isSelected: boolean;
  onSelect: (id: string, isMultiSelect: boolean) => void;
  onMove: (id: string, position: { x: number, y: number }) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  setIsDragging: (isDragging: boolean) => void;
  allElements?: FormElementType[];
}

const FormElement: React.FC<FormElementProps> = ({ 
  element, 
  isSelected, 
  onSelect, 
  onMove, 
  onDelete,
  onDuplicate,
  setIsDragging,
  allElements = []
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const grouping = useGrouping();
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);

  // Check if this element is part of a group
  const isGrouped = element.groupId !== null;
  const isGroupSelected = isGrouped && grouping.selectedElements.some(id => {
    const selectedElement = allElements.find(el => el.id === id);
    return selectedElement && selectedElement.groupId === element.groupId;
  });

  // Find all elements in the same group
  const groupElements = isGrouped 
    ? allElements.filter(el => el.groupId === element.groupId)
    : [];

  useEffect(() => {
    // Update element rect when selected
    if (isSelected && elementRef.current) {
      setElementRect(elementRef.current.getBoundingClientRect());
    }
  }, [isSelected]);

  useEffect(() => {
    // Show floating toolbar when element is double-clicked
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current && 
        !elementRef.current.contains(event.target as Node) &&
        showFloatingToolbar
      ) {
        setShowFloatingToolbar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFloatingToolbar]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent default to stop text selection during drag
    e.preventDefault();
    
    // Detect if shift key is pressed for multi-select
    const isMultiSelect = e.shiftKey;
    onSelect(element.id, isMultiSelect);
    
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

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only show floating toolbar for text elements (header, paragraph, etc.)
    if (
      element.type === 'header' || 
      element.type === 'paragraph' || 
      element.type === 'text' || 
      element.type === 'textarea'
    ) {
      setShowFloatingToolbar(true);
      
      if (elementRef.current) {
        setElementRect(elementRef.current.getBoundingClientRect());
      }
    }
  };

  const handleBold = () => {
    console.log('Bold applied to element:', element.id);
    // Implement formatting logic here
  };

  const handleItalic = () => {
    console.log('Italic applied to element:', element.id);
    // Implement formatting logic here
  };

  const handleLink = () => {
    console.log('Link applied to element:', element.id);
    // Implement link adding logic here
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'header':
        return (
          <h2 className="text-2xl font-bold">
            {(element as any).content || 'Header'}
          </h2>
        );
      case 'paragraph':
        return (
          <p className="text-base">
            {(element as any).content || 'Paragraph text'}
          </p>
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
        "form-element absolute p-4 bg-white border rounded-md transition-shadow",
        isSelected && "ring-2 ring-portico-purple z-10",
        isGrouped && "border-dashed",
        isGroupSelected && !isSelected && "ring-1 ring-portico-purple-light",
        hovered && !isSelected && "shadow-lg"
      )}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: isSelected ? 10 : 1
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id, e.shiftKey);
      }}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Group indicator */}
      {isGrouped && (
        <div className="absolute -top-2 -left-2 bg-portico-purple text-white text-xs px-1 rounded-sm z-20">
          Group
        </div>
      )}
      
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
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(element.id);
            }}
          >
            <Copy className="h-3 w-3" />
          </button>
          
          {grouping.selectedElements.length > 1 && (
            <button 
              className="toolbar-button toolbar-button-secondary p-1"
              onClick={(e) => {
                e.stopPropagation();
                grouping.groupElements();
              }}
            >
              <Group className="h-3 w-3" />
            </button>
          )}
          
          {isGrouped && (
            <button 
              className="toolbar-button toolbar-button-secondary p-1"
              onClick={(e) => {
                e.stopPropagation();
                grouping.ungroupElements();
              }}
            >
              <Ungroup className="h-3 w-3" />
            </button>
          )}
          
          <button 
            className="toolbar-button toolbar-button-secondary p-1"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(element.id, false);
            }}
          >
            <Settings className="h-3 w-3" />
          </button>
          
          <button 
            className="toolbar-button toolbar-button-secondary p-1"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
      
      {/* Floating toolbar */}
      {showFloatingToolbar && elementRect && (
        <FloatingToolbar
          elementId={element.id}
          elementRect={elementRect}
          onBold={handleBold}
          onItalic={handleItalic}
          onLink={handleLink}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default FormElement;
