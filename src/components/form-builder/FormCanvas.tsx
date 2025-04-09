import React, { useEffect, useState } from "react";
import FormElementsPanel from "./FormElementsPanel";
import FormToolbar from "./FormToolbar";
import { FormElement } from "@/types/form";
import FormTopToolbar from "./FormTopToolbar";
import AIAssistantModal from "./ai-assistant/AIAssistantModal";
import { FormCanvasProvider, useFormCanvas } from "./context/FormCanvasContext";

// Add this line to keep TypeScript happy about the CustomEvent
declare global {
  interface WindowEventMap {
    'add-elements': CustomEvent<{elements: FormElement[]}>;
  }
}

const FormCanvasContent = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const {
    elements,
    selectedElements,
    handleElementSelect,
    handleElementMoveWithGuides,
    handleElementDrop,
    handleAddAIElements,
    handleDeleteElement,
    handleDuplicateElement,
    handleDuplicateGroup: duplicateGroup,
    handleRequiredToggle,
    handleCanvasClick,
    handleKeyDown,
    updateElement,
    grouping: {
      groupElements,
      ungroupElements
    }
  } = useFormCanvas();

  // Get the first selected element for properties panel
  const selectedElement = selectedElements.length === 1
    ? elements.find(el => el.id === selectedElements[0])
    : null;
  
  const handleOpenAIModal = () => {
    setIsAIModalOpen(true);
  };
  
  const handleCloseAIModal = () => {
    setIsAIModalOpen(false);
  };

  // Listen for the add-elements event
  useEffect(() => {
    const handleAddElementsEvent = (event: CustomEvent<{elements: FormElement[]}>) => {
      const { elements } = event.detail;
      handleAddAIElements(elements);
    };

    document.addEventListener('add-elements', handleAddElementsEvent as EventListener);
    
    return () => {
      document.removeEventListener('add-elements', handleAddElementsEvent as EventListener);
    };
  }, [handleAddAIElements]);

  return (
    <div 
      className="flex flex-col h-full"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <FormTopToolbar
        selectedElement={selectedElement}
        selectedCount={selectedElements.length}
        onDuplicate={handleDuplicateElement}
        onDuplicateGroup={duplicateGroup}
        onRequiredToggle={handleRequiredToggle}
        onGroup={groupElements}
        onUngroup={ungroupElements}
        onOpenAIModal={handleOpenAIModal}
        existingElements={elements}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <FormElementsPanel onElementDrop={handleElementDrop} />
        
        <div className="flex-1 overflow-auto bg-gray-100" onClick={handleCanvasClick}>
          <div 
            className="min-h-full w-full relative p-6" 
            style={{ minHeight: '1200px' }}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                style={{
                  position: 'absolute',
                  left: `${element.position.x}px`,
                  top: `${element.position.y}px`,
                  width: `${element.size.width}px`,
                  height: `${element.size.height}px`,
                }}
                className={`element-container ${
                  selectedElements.includes(element.id) ? 'selected-element' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleElementSelect(element.id, e.shiftKey);
                }}
              >
                <div 
                  className={`relative w-full h-full ${
                    selectedElements.includes(element.id) 
                      ? 'outline outline-2 outline-blue-500' 
                      : ''
                  }`}
                >
                  {/* Element content would go here */}
                  <div className="p-2">
                    <div className="font-bold">{element.type}</div>
                    {element.label && <div>{element.label}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <FormToolbar
        selectedElement={selectedElement}
        selectedCount={selectedElements.length}
        onUpdate={updateElement}
        onGroup={groupElements}
        onUngroup={ungroupElements}
        onAddElements={handleAddAIElements}
        existingElements={elements}
      />
      
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={handleCloseAIModal}
        onAddElements={handleAddAIElements}
        existingElements={elements}
      />
    </div>
  );
};

const FormCanvas = () => {
  return (
    <FormCanvasProvider>
      <FormCanvasContent />
    </FormCanvasProvider>
  );
};

export default FormCanvas;
