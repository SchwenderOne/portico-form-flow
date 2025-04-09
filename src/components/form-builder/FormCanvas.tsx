
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

declare global {
  interface WindowEventMap {
    'add-elements': CustomEvent<{elements: FormElement[]}>;
    'version-restore': CustomEvent<{elements: FormElement[]}>;
  }
}

const FormCanvasContent = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { metadata } = useFormMetadata();
  
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
            >
              <div 
                className={`relative w-full h-full rounded-md border ${
                  selectedElements.includes(element.id) 
                    ? 'outline outline-2 outline-blue-500 shadow-md' 
                    : 'border-gray-300 shadow-sm'
                } ${
                  element.groupId ? 'bg-white/95' : 'bg-white'
                }`}
              >
                <div className="p-3 h-full">
                  <div className="flex flex-col h-full">
                    <div className="font-medium text-sm mb-1">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</div>
                    {element.label && <div className="text-sm text-gray-700">{element.label}</div>}
                    {element.content && <div className="mt-1 text-xs text-gray-600">{element.content}</div>}
                    {element.required && (
                      <div className="absolute top-1 right-1 bg-red-100 text-red-600 text-xs px-1 rounded">Required</div>
                    )}
                    {element.groupId && (
                      <div className="absolute bottom-1 left-1 bg-blue-100 text-blue-600 text-xs px-1 rounded">Grouped</div>
                    )}
                  </div>
                </div>
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
