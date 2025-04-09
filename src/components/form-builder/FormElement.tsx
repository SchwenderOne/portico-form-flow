
import React, { useState, useEffect } from "react";
import { FormElement as FormElementType } from "@/types/form";
import { cn } from "@/lib/utils";
import { useGrouping } from "./GroupingContext";
import FloatingToolbar from "./FloatingToolbar";
import ElementContent from "./ElementContent";
import ElementToolbar from "./ElementToolbar";
import ElementDragHandle from "./ElementDragHandle";
import { useElementEditor } from "./useElementEditor";

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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const grouping = useGrouping();
  
  const {
    isEditing,
    elementRect,
    elementRef,
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleLink
  } = useElementEditor(element.id);

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
      const rect = elementRef.current.getBoundingClientRect();
      // This will help position the floating toolbar
    }
  }, [isSelected]);

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

  // Determine if this element can show the floating toolbar
  const canShowFloatingToolbar = 
    element.type === 'header' || 
    element.type === 'paragraph' || 
    element.type === 'text' || 
    element.type === 'textarea';

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
      onDoubleClick={canShowFloatingToolbar ? handleDoubleClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Group indicator */}
      {isGrouped && (
        <div className="absolute -top-2 -left-2 bg-portico-purple text-white text-xs px-1 rounded-sm z-20">
          Group
        </div>
      )}
      
      <ElementContent element={element} />
      
      <ElementDragHandle onMouseDown={handleMouseDown} />
      
      {/* Element toolbar */}
      {isSelected && (
        <ElementToolbar 
          elementId={element.id}
          isGrouped={isGrouped}
          multipleSelected={grouping.selectedElements.length > 1}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onSelect={onSelect}
          onGroup={grouping.groupElements}
          onUngroup={grouping.ungroupElements}
        />
      )}
      
      {/* Floating toolbar */}
      {isEditing && elementRect && (
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
