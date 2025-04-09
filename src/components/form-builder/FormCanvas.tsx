
import React, { useState, useEffect } from "react";
import FormElement from "./elements/FormElement";
import FormToolbar from "./FormToolbar";
import FormTopToolbar from "./FormTopToolbar";
import FormElementsPanel from "./FormElementsPanel";
import { GroupingProvider, useGroupingState } from "./GroupingContext";
import SmartGuides from "./SmartGuides";
import CanvasDropZone from "./canvas/CanvasDropZone";
import { useFormElements } from "@/hooks/use-form-elements";
import { useSmartGuides } from "./hooks/useSmartGuides";
import { toast } from "sonner";
import { KeyboardEvent, useCallback } from "react";
import { FormElement as FormElementType } from "@/types/form";

const FormCanvas = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const {
    elements,
    selectedElements,
    handleElementSelect,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement,
    handleDuplicateElement,
    handleRequiredToggle,
    handleGroupElements,
    handleUngroupElements,
    handleDuplicateGroup,
    updateElement,
    addElement
  } = useFormElements();

  const {
    showSmartGuides,
    guideLines,
    distances,
    calculateSmartGuides,
    autoNudgePosition
  } = useSmartGuides(elements, isDragging);

  // Enhanced grouping functionality
  const grouping = useGroupingState(
    elements,
    handleGroupElements,
    handleUngroupElements
  );

  // Handle keyboard shortcuts for undo/redo
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    // Ctrl+Z or Cmd+Z for Undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      toast.info("Undo functionality will be available soon");
    }
    
    // Ctrl+Shift+Z or Cmd+Shift+Z for Redo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      toast.info("Redo functionality will be available soon");
    }
    
    // Delete or Backspace to delete selected elements
    if ((e.key === 'Delete' || e.key === 'Backspace') && grouping.selectedElements.length > 0) {
      e.preventDefault();
      grouping.selectedElements.forEach(id => handleDeleteElement(id));
      grouping.clearSelection();
    }
    
    // Ctrl+D or Cmd+D for Duplicate
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      if (grouping.selectedElements.length === 1) {
        handleDuplicateElement(grouping.selectedElements[0]);
      } else if (grouping.selectedElements.length > 1) {
        handleDuplicateGroup(grouping.selectedElements);
        toast.success("Group duplicated successfully");
      }
    }
    
    // Ctrl+G or Cmd+G for Group
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
      e.preventDefault();
      if (grouping.selectedElements.length > 1) {
        grouping.groupElements();
      }
    }
    
    // Ctrl+Shift+G or Cmd+Shift+G for Ungroup
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'g') {
      e.preventDefault();
      grouping.ungroupElements();
    }
  }, [grouping, handleDeleteElement, handleDuplicateElement, handleDuplicateGroup]);

  // Handler to update the smart guides when an element is being moved with snapping
  const handleElementMoveWithGuides = (id: string, position: { x: number, y: number }) => {
    // First calculate the smart guides
    calculateSmartGuides(id, position);
    
    // Then apply auto-nudging for snapping
    const nudgedPosition = autoNudgePosition(id, position);
    
    // Apply the move with the potentially nudged position
    handleElementMove(id, nudgedPosition);
  };

  // Handler for adding AI-generated elements
  const handleAddAIElement = (element: FormElementType) => {
    // Find a good position for the new element (below existing elements)
    const lowestElementBottom = Math.max(
      ...elements.map(el => el.position.y + el.size.height),
      50 // Default starting height if no elements
    );
    
    // Create a copy of the element with the adjusted position
    const adjustedElement = {
      ...element,
      position: {
        x: 100, // Standard left alignment
        y: lowestElementBottom + 30 // 30px padding after the lowest element
      }
    };
    
    // Add the element to the canvas
    addElement(adjustedElement);
    
    // Select the new element
    handleElementSelect(adjustedElement.id, false);
  };

  // Sync the element selection between our form elements hook and grouping context
  useEffect(() => {
    grouping.selectElements(selectedElements, true);
  }, [selectedElements]);

  const handleSelect = (id: string, isMultiSelect: boolean) => {
    handleElementSelect(id, isMultiSelect);
  };

  // Handle canvas click to clear selection when clicking on empty space
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear if clicking directly on canvas, not on elements
    if (e.target === e.currentTarget) {
      grouping.clearSelection();
    }
  };

  return (
    <GroupingProvider value={{ 
      selectedElements: grouping.selectedElements,
      groupElements: grouping.groupElements,
      ungroupElements: grouping.ungroupElements,
      isElementSelected: grouping.isElementSelected,
      selectElements: grouping.selectElements,
      clearSelection: grouping.clearSelection
    }}>
      <div 
        className="flex flex-col h-full" 
        onKeyDown={handleKeyDown} 
        tabIndex={0} // Make the div focusable to capture keyboard events
      >
        <FormTopToolbar 
          selectedElement={grouping.selectedElements.length === 1 
            ? elements.find(el => el.id === grouping.selectedElements[0]) || null 
            : null
          }
          selectedCount={grouping.selectedElements.length}
          onDuplicate={handleDuplicateElement}
          onDuplicateGroup={handleDuplicateGroup}
          onRequiredToggle={handleRequiredToggle}
          onGroup={grouping.groupElements}
          onUngroup={grouping.ungroupElements}
        />
        <div className="flex-1 flex">
          <FormElementsPanel onElementDrop={handleElementDrop} />
          <div className="flex-1 relative overflow-auto">
            <CanvasDropZone 
              onDrop={handleElementDrop}
              isDragOver={isDragOver}
              setIsDragOver={setIsDragOver}
              onClick={handleCanvasClick}
              existingElements={elements}
            >
              {showSmartGuides && 
                <SmartGuides 
                  guides={guideLines} 
                  distances={distances} 
                />
              }
              
              {elements.map((element) => (
                <FormElement
                  key={element.id}
                  element={element}
                  isSelected={grouping.isElementSelected(element.id)}
                  onSelect={handleSelect}
                  onMove={handleElementMoveWithGuides}
                  onDelete={handleDeleteElement}
                  onDuplicate={handleDuplicateElement}
                  setIsDragging={setIsDragging}
                  allElements={elements}
                />
              ))}
            </CanvasDropZone>
          </div>
        </div>
        <FormToolbar 
          selectedElement={grouping.selectedElements.length === 1 
            ? elements.find(el => el.id === grouping.selectedElements[0]) || null
            : null
          } 
          selectedCount={grouping.selectedElements.length}
          onUpdate={updateElement}
          onGroup={grouping.groupElements}
          onUngroup={grouping.ungroupElements}
          onAddElement={handleAddAIElement}
        />
      </div>
    </GroupingProvider>
  );
};

export default FormCanvas;
