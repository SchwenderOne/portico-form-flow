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

  const grouping = useGroupingState(
    elements,
    handleGroupElements,
    handleUngroupElements
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      toast.info("Undo functionality will be available soon");
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      toast.info("Redo functionality will be available soon");
    }
    
    if ((e.key === 'Delete' || e.key === 'Backspace') && grouping.selectedElements.length > 0) {
      e.preventDefault();
      grouping.selectedElements.forEach(id => handleDeleteElement(id));
      grouping.clearSelection();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      if (grouping.selectedElements.length === 1) {
        handleDuplicateElement(grouping.selectedElements[0]);
      } else if (grouping.selectedElements.length > 1) {
        handleDuplicateGroup(grouping.selectedElements);
        toast.success("Group duplicated successfully");
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
      e.preventDefault();
      if (grouping.selectedElements.length > 1) {
        grouping.groupElements();
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'g') {
      e.preventDefault();
      grouping.ungroupElements();
    }
  }, [grouping, handleDeleteElement, handleDuplicateElement, handleDuplicateGroup]);

  const handleElementMoveWithGuides = (id: string, position: { x: number, y: number }) => {
    calculateSmartGuides(id, position);
    const nudgedPosition = autoNudgePosition(id, position);
    handleElementMove(id, nudgedPosition);
  };

  const handleAddAIElements = (elements: FormElementType[]) => {
    if (!elements || elements.length === 0) return;
    
    const lowestElementBottom = Math.max(
      ...elements.map(el => el.position.y + el.size.height),
      50
    );
    
    let currentY = lowestElementBottom + 30;
    
    elements.forEach(element => {
      const adjustedElement = {
        ...element,
        position: {
          x: 100,
          y: currentY
        }
      };
      
      addElement(adjustedElement);
      
      currentY += adjustedElement.size.height + 20;
    });
    
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      handleElementSelect(lastElement.id, false);
    }
    
    toast.success(`${elements.length} elements added to canvas`);
  };

  useEffect(() => {
    grouping.selectElements(selectedElements, true);
  }, [selectedElements]);

  const handleSelect = (id: string, isMultiSelect: boolean) => {
    handleElementSelect(id, isMultiSelect);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
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
        tabIndex={0}
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
          onAddElements={handleAddAIElements}
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
