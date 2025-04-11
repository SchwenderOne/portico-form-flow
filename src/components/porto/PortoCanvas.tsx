
import React, { useEffect, useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { usePorto } from "./context/PortoContext";
import { FormElement } from "@/types/form";
import ElementContent from "../form-builder/ElementContent";
import ContentEditableElement from "../form-builder/ContentEditableElement";
import SmartGuides from "../form-builder/SmartGuides";
import { toast } from "sonner";

export const PortoCanvas: React.FC = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const { 
    elements, 
    selectedElements, 
    handleElementSelect, 
    handleElementMoveWithGuides,
    handleDeleteElement,
    handleCanvasClick,
    handleElementDrop,
    updateElement,
    showSmartGuides,
    guideLines,
    distances,
    isDragOver,
    setIsDragOver
  } = useFormCanvas();
  
  const { previewMode, useGrid, gridSize, canvasScale } = usePorto();
  
  const handleElementContentChange = (id: string, content: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      updateElement({
        ...element,
        content
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Delete selected elements with Delete or Backspace
    if ((e.key === "Delete" || e.key === "Backspace") && selectedElements.length > 0) {
      e.preventDefault();
      
      if (selectedElements.length === 1) {
        handleDeleteElement(selectedElements[0]);
        toast.success("Element deleted");
      } else {
        // Delete multiple elements
        selectedElements.forEach(id => {
          handleDeleteElement(id);
        });
        toast.success(`${selectedElements.length} elements deleted`);
      }
    }
  };
  
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      // Delete key functionality
      if ((e.key === "Delete" || e.key === "Backspace") && 
          selectedElements.length > 0 && 
          !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as Element)?.tagName)) {
        e.preventDefault();
        
        if (selectedElements.length === 1) {
          handleDeleteElement(selectedElements[0]);
          toast.success("Element deleted");
        } else {
          // Delete multiple elements
          selectedElements.forEach(id => {
            handleDeleteElement(id);
          });
          toast.success(`${selectedElements.length} elements deleted`);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [selectedElements, handleDeleteElement]);
  
  return (
    <div 
      className="h-full w-full overflow-auto relative bg-gray-50"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div 
        className={`min-h-full min-w-full relative ${useGrid ? "bg-grid" : ""}`}
        style={{ 
          backgroundSize: `${gridSize * canvasScale}px ${gridSize * canvasScale}px`,
          transform: `scale(${canvasScale})`,
          transformOrigin: "0 0"
        }}
        onClick={handleCanvasClick}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isDragOver) setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (isDragOver) setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          
          const type = e.dataTransfer.getData("elementType");
          const action = e.dataTransfer.getData("action");
          const elementId = e.dataTransfer.getData("elementId");
          
          if (action === "move" && elementId) {
            // Moving existing element, handled by the element's own drag events
            return;
          }
          
          if (type) {
            const canvasRect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - canvasRect.left) / canvasScale;
            const y = (e.clientY - canvasRect.top) / canvasScale;
            
            // Snap to grid if enabled
            const position = {
              x: useGrid ? Math.round(x / gridSize) * gridSize : x,
              y: useGrid ? Math.round(y / gridSize) * gridSize : y
            };
            
            handleElementDrop(type, position);
            toast.success(`Added ${type} element`);
          }
        }}
      >
        {showSmartGuides && (
          <SmartGuides 
            guides={guideLines} 
            distances={distances} 
          />
        )}
        
        {elements.map((element: FormElement) => (
          <div
            key={element.id}
            style={{
              position: 'absolute',
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              width: `${element.size.width}px`,
              height: `${element.size.height}px`,
            }}
            className={`element-container transition-transform ${
              selectedElements.includes(element.id) ? 'selected-element' : ''
            } ${
              element.groupId ? 'group-element' : ''
            }`}
            onClick={(e) => {
              if (!previewMode) {
                e.stopPropagation();
                handleElementSelect(element.id, e.shiftKey);
              }
            }}
            onMouseEnter={() => setHoveredElement(element.id)}
            onMouseLeave={() => setHoveredElement(null)}
            draggable={!previewMode}
            onDragStart={(e) => {
              if (previewMode) {
                e.preventDefault();
                return;
              }
              e.dataTransfer.setData("elementId", element.id);
              e.dataTransfer.setData("action", "move");
              
              // Create a transparent drag image
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
                selectedElements.includes(element.id) && !previewMode
                  ? 'outline outline-2 outline-blue-500 shadow-md'
                  : previewMode ? 'border-transparent shadow-none' : 'border-gray-300 shadow-sm'
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
                    readOnly={previewMode}
                  />
                ) : (
                  <ElementContent 
                    element={element} 
                    isEditing={selectedElements.includes(element.id) && !previewMode} 
                    isPreview={previewMode}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
