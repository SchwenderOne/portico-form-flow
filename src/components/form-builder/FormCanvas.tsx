
import React, { useEffect } from "react";
import FormElement from "./elements/FormElement";
import FormToolbar from "./FormToolbar";
import FormTopToolbar from "./FormTopToolbar";
import FormElementsPanel from "./FormElementsPanel";
import { GroupingProvider } from "./GroupingContext";
import SmartGuides from "./SmartGuides";
import CanvasDropZone from "./canvas/CanvasDropZone";
import AIAssistantModal from "./ai-assistant/AIAssistantModal";
import { FormCanvasProvider, useFormCanvas } from "./context/FormCanvasContext";
import { CollaborationProvider, useCollaboration, EditorCursor } from "@/context/CollaborationContext";
import { useFormMetadata } from "@/context/FormMetadataContext";

const FormCanvasInner = () => {
  const {
    elements,
    handleElementSelect,
    handleElementMoveWithGuides,
    handleElementDrop,
    handleDeleteElement,
    handleDuplicateElement,
    handleRequiredToggle,
    updateElement,
    handleDuplicateGroup,
    handleAddAIElements,
    handleOpenAIModal,
    handleKeyDown,
    handleCanvasClick,
    isAIModalOpen,
    setIsAIModalOpen,
    isDragOver,
    setIsDragOver,
    setIsDragging,
    showSmartGuides,
    guideLines,
    distances,
    grouping
  } = useFormCanvas();

  const { collaborators, updateCursorPosition } = useCollaboration();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.querySelector('[data-canvas-container="true"]');
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      updateCursorPosition(x, y);
    };
    
    const canvasElement = document.querySelector('[data-canvas-container="true"]');
    if (canvasElement) {
      canvasElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [updateCursorPosition]);

  const otherCollaborators = collaborators.filter(
    c => c.id !== (window as any).supabase?.auth?.currentSession?.user?.id
  );

  const handleElementSelectWrapper = (id: string) => {
    handleElementSelect(id, false);
  };

  // Adapter function to convert between the two different parameter styles
  const handlePositionChange = (id: string, x: number, y: number) => {
    handleElementMoveWithGuides(id, { x, y });
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
          onOpenAIModal={handleOpenAIModal}
          existingElements={elements}
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
              data-canvas-container="true"
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
                  onSelect={handleElementSelectWrapper}
                  onPositionChange={handlePositionChange}
                  onDelete={handleDeleteElement}
                  onDuplicate={handleDuplicateElement}
                  onResize={(id, width, height) => {
                    // Handle resize logic here if needed
                  }}
                  selected={grouping.isElementSelected(element.id)}
                />
              ))}

              {otherCollaborators.map(collaborator => (
                <EditorCursor
                  key={collaborator.id}
                  collaborator={collaborator}
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
          onAddElements={handleAddAIElements}
          existingElements={elements}
        />

        <AIAssistantModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          onAddElements={handleAddAIElements}
          existingElements={elements}
        />
      </div>
    </GroupingProvider>
  );
};

const FormCanvasContent = () => {
  const { metadata } = useFormMetadata();
  
  return (
    <CollaborationProvider formId={metadata.id}>
      <FormCanvasInner />
    </CollaborationProvider>
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
