
import React, { useState, useRef } from "react";
import { FormElement as FormElementType } from "@/types/form";
import { cn } from "@/lib/utils";
import { useGrouping } from "../GroupingContext";
import FloatingToolbar from "../FloatingToolbar";
import TextSelectionToolbar from "../toolbars/TextSelectionToolbar";
import ElementContent from "../ElementContent";
import ElementToolbar from "../toolbars/ElementToolbar";
import ElementDragHandle from "./ElementDragHandle";
import { useElementEditor } from "@/hooks/useElementEditor";

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
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const grouping = useGrouping();
  
  const {
    isEditing,
    elementRect,
    elementRef,
    isTextSelected,
    selectionRect,
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleUnderline,
    handleLink,
    getSelectedText,
    setIsEditing,
    saveChanges
  } = useElementEditor(element.id);

  const isGrouped = element.groupId !== null;
  const isGroupSelected = isGrouped && grouping.selectedElements.some(id => {
    const selectedElement = allElements.find(el => el.id === id);
    return selectedElement && selectedElement.groupId === element.groupId;
  });

  const groupElements = isGrouped 
    ? allElements.filter(el => el.groupId === element.groupId)
    : [];

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isEditing) return;

    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).tagName === 'LABEL'
    ) {
      return;
    }
    
    const isMultiSelect = e.shiftKey;
    onSelect(element.id, isMultiSelect);
    
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      setIsDraggingElement(true);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect = elementRef.current.parentElement.getBoundingClientRect();
          const x = e.clientX - parentRect.left - dragOffset.x;
          const y = e.clientY - parentRect.top - dragOffset.y;
          
          const snappedX = Math.round(x / 25) * 25;
          const snappedY = Math.round(y / 25) * 25;
          
          onMove(element.id, { x: snappedX, y: snappedY });
          
          if (isGrouped) {
            const groupMates = allElements.filter(el => 
              el.groupId === element.groupId && el.id !== element.id
            );
            
            groupMates.forEach(groupEl => {
              const offsetX = groupEl.position.x - element.position.x;
              const offsetY = groupEl.position.y - element.position.y;
              onMove(groupEl.id, { 
                x: snappedX + offsetX, 
                y: snappedY + offsetY 
              });
            });
          }
        }
      };
      
      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setIsDragging(false);
        setIsDraggingElement(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const canShowFloatingToolbar = 
    element.type === 'header' || 
    element.type === 'paragraph' || 
    element.type === 'text' || 
    element.type === 'textarea' || 
    element.type === 'email' || 
    element.type === 'number' || 
    element.type === 'select';

  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).tagName === 'LABEL'
    ) {
      return;
    }
    
    if (!isEditing) {
      onSelect(element.id, e.shiftKey);
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        "form-element absolute p-4 bg-white border rounded-md transition-all",
        isSelected && "ring-2 ring-portico-purple z-10",
        isGrouped && "border-dashed border-portico-purple-light",
        isGroupSelected && !isSelected && "ring-1 ring-portico-purple-light",
        hovered && !isSelected && "shadow-lg",
        isDraggingElement && "opacity-90 shadow-xl scale-[1.01] z-20",
        isEditing && "editing"
      )}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: isSelected ? 10 : (isDraggingElement ? 20 : 1),
        transitionProperty: "transform, opacity, box-shadow",
        transitionDuration: "0.1s",
      }}
      onClick={handleElementClick}
      onDoubleClick={canShowFloatingToolbar ? handleDoubleClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isGrouped && (
        <div className="absolute -top-2 -left-2 bg-portico-purple text-white text-xs px-1 rounded-sm z-20">
          Group
        </div>
      )}
      
      <ElementContent element={element} isEditing={isEditing} />
      
      {(!isEditing && (hovered || isSelected)) && 
        <ElementDragHandle onMouseDown={handleMouseDown} />
      }
      
      {isSelected && !isEditing && (
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
      
      {isEditing && elementRect && (
        <FloatingToolbar
          elementId={element.id}
          elementRect={elementRect}
          onBold={handleBold}
          onItalic={handleItalic}
          onLink={handleLink}
          onDuplicate={() => onDuplicate(element.id)}
          onDelete={() => onDelete(element.id)}
        />
      )}
      
      {isEditing && isTextSelected && selectionRect && (
        <TextSelectionToolbar
          selectionRect={selectionRect}
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          onLink={handleLink}
          selectedText={getSelectedText()}
        />
      )}
    </div>
  );
};

export default FormElement;
