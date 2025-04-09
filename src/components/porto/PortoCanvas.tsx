
import React, { useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { FormElement } from "@/types/form";
import ElementContent from "@/components/form-builder/ElementContent";
import ContentEditableElement from "@/components/form-builder/ContentEditableElement";
import { CollaboratorAvatars } from "@/context/CollaborationContext";
import SmartGuides from "@/components/form-builder/SmartGuides";
import { PortoElementEditor } from "./PortoElementEditor";

export const PortoCanvas: React.FC = () => {
  const {
    elements,
    selectedElements,
    handleElementSelect,
    handleElementMoveWithGuides,
    handleCanvasClick,
    updateElement,
    showSmartGuides,
    guideLines,
    distances,
    setIsDragOver
  } = useFormCanvas();

  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<FormElement | null>(null);

  const handleElementContentChange = (id: string, content: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      updateElement({
        ...element,
        content
      });
    }
  };

  const handleEditElement = (element: FormElement) => {
    setEditingElement(element);
  };
  
  const handleCloseEditor = () => {
    setEditingElement(null);
  };

  // Handle dropping elements onto the canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Get element type from dataTransfer
    const elementType = e.dataTransfer.getData("elementType");
    const elementId = e.dataTransfer.getData("elementId");
    const action = e.dataTransfer.getData("action");
    
    // Get drop position relative to canvas
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    if (action === "move" && elementId) {
      // Handle moving existing element
      handleElementMoveWithGuides(elementId, { x, y });
    } else if (elementType) {
      // Handle adding new element
      const { handleElementDrop } = useFormCanvas();
      handleElementDrop(elementType, { x, y });
    }
  };

  return (
    <div className="h-full flex overflow-hidden relative">
      <div 
        className="flex-1 bg-gray-100 p-4 overflow-auto relative"
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className="w-full min-h-[1200px] bg-white rounded-lg shadow-sm relative mx-auto"
          style={{ maxWidth: "800px" }}
        >
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
                zIndex: selectedElements.includes(element.id) ? 10 : 1
              }}
              className={`element-container ${
                selectedElements.includes(element.id) ? 'selected-element' : ''
              } ${
                element.groupId ? 'group-element' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleElementSelect(element.id, e.shiftKey);
                
                // If double click, open element editor
                if (e.detail === 2) {
                  handleEditElement(element);
                }
              }}
              onMouseEnter={() => setHoveredElement(element.id)}
              onMouseLeave={() => setHoveredElement(null)}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("elementId", element.id);
                e.dataTransfer.setData("action", "move");
                // Add a drag image
                const dragImage = document.createElement('div');
                dragImage.style.width = `${element.size.width}px`;
                dragImage.style.height = `${element.size.height}px`;
                dragImage.style.backgroundColor = 'transparent';
                document.body.appendChild(dragImage);
                e.dataTransfer.setDragImage(dragImage, 0, 0);
                setTimeout(() => document.body.removeChild(dragImage), 0);
              }}
            >
              <div 
                className={`relative w-full h-full rounded-md border ${
                  selectedElements.includes(element.id) 
                    ? 'outline outline-2 outline-blue-500 shadow-md' 
                    : hoveredElement === element.id
                      ? 'border-blue-300 shadow-sm'
                      : 'border-gray-200 shadow-sm'
                } ${
                  element.groupId ? 'bg-white/95' : 'bg-white'
                }`}
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
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {editingElement && (
        <PortoElementEditor 
          element={editingElement}
          onClose={handleCloseEditor}
          onUpdate={updateElement}
        />
      )}
    </div>
  );
};
