
import React, { useState } from "react";
import FormElement from "./FormElement";
import FormToolbar from "./FormToolbar";
import FormTopToolbar from "./FormTopToolbar";
import FormElementsPanel from "./FormElementsPanel";
import { GroupingProvider } from "./GroupingContext";
import SmartGuides from "./SmartGuides";
import CanvasDropZone from "./CanvasDropZone";
import { useFormElements } from "./hooks/useFormElements";
import { useSmartGuides } from "./hooks/useSmartGuides";

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
    updateElement
  } = useFormElements();

  const {
    showSmartGuides,
    guideLines,
    calculateSmartGuides
  } = useSmartGuides(elements, isDragging);

  // Handler to update the smart guides when an element is being moved
  const handleElementMoveWithGuides = (id: string, position: { x: number, y: number }) => {
    handleElementMove(id, position);
    if (isDragging) {
      calculateSmartGuides(id, position);
    }
  };

  return (
    <GroupingProvider value={{ 
      selectedElements, 
      groupElements: handleGroupElements, 
      ungroupElements: handleUngroupElements 
    }}>
      <div className="flex flex-col h-full">
        <FormTopToolbar 
          selectedElement={selectedElements.length === 1 
            ? elements.find(el => el.id === selectedElements[0]) || null 
            : null
          }
          onDuplicate={handleDuplicateElement}
          onRequiredToggle={handleRequiredToggle}
        />
        <div className="flex-1 flex">
          <FormElementsPanel onElementDrop={handleElementDrop} />
          <div className="flex-1 relative overflow-auto">
            <CanvasDropZone 
              onDrop={handleElementDrop}
              isDragOver={isDragOver}
              setIsDragOver={setIsDragOver}
            >
              {showSmartGuides && <SmartGuides guides={guideLines} />}
              
              {elements.map((element) => (
                <FormElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElements.includes(element.id)}
                  onSelect={(id, multiSelect) => handleElementSelect(id, multiSelect)}
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
          selectedElement={selectedElements.length === 1 
            ? elements.find(el => el.id === selectedElements[0]) || null
            : null
          } 
          onUpdate={updateElement}
          selectedCount={selectedElements.length}
          onGroup={handleGroupElements}
          onUngroup={handleUngroupElements}
        />
      </div>
    </GroupingProvider>
  );
};

export default FormCanvas;
