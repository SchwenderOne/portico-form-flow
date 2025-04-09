
import React, { useEffect, useState } from "react";
import FormElementsPanel from "./FormElementsPanel";
import FormToolbar from "./FormToolbar";
import { FormElement } from "@/types/form";
import FormTopToolbar from "./FormTopToolbar";
import AIAssistantModal from "./ai-assistant/AIAssistantModal";
import { useFormCanvas } from "./context/FormCanvasContext";
import SmartGuides from "./SmartGuides";
import { CollaboratorAvatars, EditorCursor } from "@/context/CollaborationContext";
import { useFormMetadata } from "@/context/FormMetadataContext";
import CanvasDropZone from "./canvas/CanvasDropZone";
import { toast } from "sonner";
import ElementContent from "./ElementContent";
import FloatingToolbar from "./canvas/FloatingToolbar";
import ContentEditableElement from "./ContentEditableElement";

declare global {
  interface WindowEventMap {
    'add-elements': CustomEvent<{elements: FormElement[]}>;
    'version-restore': CustomEvent<{elements: FormElement[]}>;
  }
}

const FormCanvasContent = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { metadata } = useFormMetadata();
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  
  const {
    elements,
    selectedElements,
    handleElementSelect,
    handleElementMoveWithGuides,
    handleElementDrop,
    handleAddAIElements,
    handleDeleteElement,
    handleDuplicateElement,
    handleDuplicateGroup,
    handleRequiredToggle,
    handleCanvasClick,
    handleKeyDown,
    updateElement,
    showSmartGuides,
    guideLines,
    distances,
    isDragOver,
    setIsDragOver,
    grouping: {
      groupElements,
      ungroupElements
    }
  } = useFormCanvas();

  const selectedElement = selectedElements.length === 1
    ? elements.find(el => el.id === selectedElements[0])
    : null;
  
  const handleOpenAIModal = () => {
    setIsAIModalOpen(true);
  };
  
  const handleCloseAIModal = () => {
    setIsAIModalOpen(false);
  };

  const handleDuplicateGroupWrapper = () => {
    if (selectedElements.length > 0) {
      handleDuplicateGroup(selectedElements);
      toast.success("Elements duplicated successfully");
    }
  };

  const handleRequiredToggleWrapper = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      handleRequiredToggle(id, !element.required);
      toast.success(`Field set to ${!element.required ? 'required' : 'optional'}`);
    }
  };

  const handleElementContentChange = (id: string, content: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      updateElement({
        ...element,
        content
      });
    }
  };

  useEffect(() => {
    const handleAddElementsEvent = (event: CustomEvent<{elements: FormElement[]}>) => {
      const { elements } = event.detail;
      handleAddAIElements(elements);
    };

    document.addEventListener('add-elements', handleAddElementsEvent as EventListener);
    
    // Add event listener for version restore events
    const handleVersionRestoreEvent = (event: CustomEvent<{elements: FormElement[]}>) => {
      const { elements } = event.detail;
      handleAddAIElements(elements, true); // Replace existing elements
    };
    
    document.addEventListener('version-restore', handleVersionRestoreEvent as EventListener);
    
    return () => {
      document.removeEventListener('add-elements', handleAddElementsEvent as EventListener);
      document.removeEventListener('version-restore', handleVersionRestoreEvent as EventListener);
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
        onDuplicateGroup={handleDuplicateGroupWrapper}
        onRequiredToggle={handleRequiredToggleWrapper}
        onGroup={groupElements}
        onUngroup={ungroupElements}
        onOpenAIModal={handleOpenAIModal}
        existingElements={elements}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <FormElementsPanel onElementDrop={handleElementDrop} />
        
        <CanvasDropZone
          onDrop={handleElementDrop}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          onClick={handleCanvasClick}
          existingElements={elements}
        >
          <div className="absolute top-2 right-2 z-10">
            <CollaboratorAvatars />
          </div>
          
          {showSmartGuides && (
            <SmartGuides 
              guides={guideLines} 
              distances={distances} 
            />
          )}
          
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
              } ${
                element.groupId ? 'group-element' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleElementSelect(element.id, e.shiftKey);
              }}
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className={`relative w-full h-full rounded-md border ${
                  selectedElements.includes(element.id) 
                    ? 'outline outline-2 outline-blue-500 shadow-md' 
                    : 'border-gray-300 shadow-sm'
                } ${
                  element.groupId ? 'bg-white/95' : 'bg-white'
                }`}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("elementId", element.id);
                }}
              >
                <div className="p-3 h-full overflow-auto">
                  {element.type === 'header' || element.type === 'paragraph' ? (
                    <ContentEditableElement 
                      element={element}
                      content={element.content || ''}
                      onContentChange={(content) => handleElementContentChange(element.id, content)}
                      className={element.type === 'header' ? 'text-lg font-bold' : 'text-sm'}
                    />
                  ) : (
                    <ElementContent element={element} isEditing={selectedElements.includes(element.id)} />
                  )}
                </div>
                
                {/* Show floating toolbar when the element is hovered or selected */}
                {(hoveredElement === element.id || selectedElements.includes(element.id)) && (
                  <FloatingToolbar 
                    element={element}
                    visible={true}
                    position={{ 
                      x: element.size.width / 2, 
                      y: 0 
                    }}
                    onDelete={handleDeleteElement}
                    onDuplicate={handleDuplicateElement}
                    onAlign={(id, alignment) => {
                      // Handle alignment in a future implementation
                      toast.info(`Align ${alignment} will be available soon`);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </CanvasDropZone>
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
  try {
    const { metadata } = useFormMetadata();
    return <FormCanvasContent />;
  } catch (error) {
    console.error("Error rendering FormCanvas:", error);
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Canvas Error</h2>
          <p className="text-gray-600 mb-4">
            There was a problem loading the form canvas. This is likely due to a missing context provider.
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm text-left overflow-auto max-w-md">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
        </div>
      </div>
    );
  }
};

export default FormCanvas;
