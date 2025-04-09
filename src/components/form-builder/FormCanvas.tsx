
import React, { useEffect, useState } from "react";
import FormElementsPanel from "./FormElementsPanel";
import FormToolbar from "./FormToolbar";
import { FormElement } from "@/types/form";
import FormTopToolbar from "./FormTopToolbar";
import AIAssistantModal from "./ai-assistant/AIAssistantModal";
import { FormCanvasProvider, useFormCanvas } from "./context/FormCanvasContext";
import SmartGuides from "./SmartGuides";
import { CollaboratorAvatars, EditorCursor, CollaborationProvider } from "@/context/CollaborationContext";
import VersionHistorySheet, { registerVersionHistoryControls } from "./version-history/VersionHistorySheet";
import { useFormMetadata } from "@/context/FormMetadataContext";

declare global {
  interface WindowEventMap {
    'add-elements': CustomEvent<{elements: FormElement[]}>;
  }
}

const FormCanvasContent = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
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
    }
  };

  const handleRequiredToggleWrapper = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      handleRequiredToggle(id, !element.required);
    }
  };

  useEffect(() => {
    registerVersionHistoryControls(
      () => setIsVersionHistoryOpen(true),
      () => setIsVersionHistoryOpen(false)
    );
  }, []);

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
        onDuplicateGroup={handleDuplicateGroupWrapper}
        onRequiredToggle={handleRequiredToggleWrapper}
        onGroup={groupElements}
        onUngroup={ungroupElements}
        onOpenAIModal={handleOpenAIModal}
        existingElements={elements}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <FormElementsPanel onElementDrop={handleElementDrop} />
        
        <div className="flex-1 overflow-auto bg-gray-100 relative" onClick={handleCanvasClick}>
          <div className="absolute top-2 right-2 z-10">
            <CollaboratorAvatars />
          </div>
          
          <div 
            className="min-h-full w-full relative p-6" 
            style={{ 
              minHeight: '1200px',
              backgroundSize: '25px 25px',
              backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
            }}
          >
            {showSmartGuides && (
              <SmartGuides guides={guideLines} distances={distances} />
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
      
      <VersionHistorySheet 
        open={isVersionHistoryOpen}
        onOpenChange={setIsVersionHistoryOpen}
        showTrigger={false}
      />
    </div>
  );
};

const FormCanvas = () => {
  const { metadata } = useFormMetadata();
  
  return (
    <CollaborationProvider formId={metadata?.id || 'new-form'}>
      <FormCanvasProvider>
        <FormCanvasContent />
      </FormCanvasProvider>
    </CollaborationProvider>
  );
};

export default FormCanvas;
