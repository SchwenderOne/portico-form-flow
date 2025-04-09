
import React, { useState, useRef, useEffect } from "react";
import FormElement from "./FormElement";
import FormToolbar from "./FormToolbar";
import FormTopToolbar from "./FormTopToolbar";
import FormElementsPanel from "./FormElementsPanel";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FormElement as FormElementType } from "@/types/form";
import { GroupingProvider } from "./GroupingContext";
import SmartGuides from "./SmartGuides";

const initialElements: FormElementType[] = [
  {
    id: "header-1",
    type: "header",
    content: "Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "text-1",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  },
  {
    id: "email-1",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null
  }
];

const FormCanvas = () => {
  const [elements, setElements] = useState<FormElementType[]>(initialElements);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{horizontal: number[], vertical: number[]}>({
    horizontal: [],
    vertical: []
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleElementSelect = (id: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedElements(prev => 
        prev.includes(id) 
          ? prev.filter(elementId => elementId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedElements(prev => prev.includes(id) && prev.length === 1 ? [] : [id]);
    }
  };

  const handleElementMove = (id: string, position: { x: number, y: number }) => {
    // Update the element position
    const updatedElements = elements.map(el => {
      if (el.id === id) {
        return { ...el, position };
      }
      
      // If this element is part of a group that's being moved, also move it
      if (selectedElements.includes(id)) {
        const selectedElement = elements.find(e => e.id === id);
        if (selectedElement && el.groupId === selectedElement.groupId && el.groupId !== null) {
          return { ...el, position };
        }
      }
      
      return el;
    });
    
    setElements(updatedElements);
    
    // Calculate potential guide lines during movement
    if (isDragging) {
      calculateSmartGuides(id, position);
    }
  };

  const calculateSmartGuides = (movingId: string, position: { x: number, y: number }) => {
    const movingElement = elements.find(el => el.id === movingId);
    if (!movingElement) return;
    
    const horizontalGuides: number[] = [];
    const verticalGuides: number[] = [];
    
    // Calculate center and edges of moving element
    const movingLeft = position.x;
    const movingRight = position.x + movingElement.size.width;
    const movingTop = position.y;
    const movingBottom = position.y + movingElement.size.height;
    const movingCenterX = position.x + movingElement.size.width / 2;
    const movingCenterY = position.y + movingElement.size.height / 2;
    
    // Check alignment with other elements
    elements.forEach(el => {
      if (el.id === movingId) return;
      
      const elLeft = el.position.x;
      const elRight = el.position.x + el.size.width;
      const elTop = el.position.y;
      const elBottom = el.position.y + el.size.height;
      const elCenterX = el.position.x + el.size.width / 2;
      const elCenterY = el.position.y + el.size.height / 2;
      
      // Horizontal alignment (top, center, bottom)
      if (Math.abs(movingTop - elTop) < 10) horizontalGuides.push(elTop);
      if (Math.abs(movingCenterY - elCenterY) < 10) horizontalGuides.push(elCenterY);
      if (Math.abs(movingBottom - elBottom) < 10) horizontalGuides.push(elBottom);
      
      // Vertical alignment (left, center, right)
      if (Math.abs(movingLeft - elLeft) < 10) verticalGuides.push(elLeft);
      if (Math.abs(movingCenterX - elCenterX) < 10) verticalGuides.push(elCenterX);
      if (Math.abs(movingRight - elRight) < 10) verticalGuides.push(elRight);
    });
    
    setGuideLines({ horizontal: horizontalGuides, vertical: verticalGuides });
    setShowSmartGuides(horizontalGuides.length > 0 || verticalGuides.length > 0);
  };

  const handleElementDrop = (type: string, position: { x: number, y: number }) => {
    console.log(`Dropping element of type: ${type} at position:`, position);
    
    // Create new element based on type
    const newElement: FormElementType = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      size: { width: 500, height: type === 'header' || type === 'paragraph' ? 60 : 80 },
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: `Enter ${type}...`,
      required: false,
      groupId: null
    };

    // Special handling for certain element types
    if (type === 'header') {
      (newElement as any).content = 'New Form Header';
    } else if (type === 'paragraph') {
      (newElement as any).content = 'Add your paragraph text here...';
    } else if (type === 'checkbox' || type === 'radio') {
      (newElement as any).options = ['Option 1', 'Option 2', 'Option 3'];
    } else if (type === 'select') {
      (newElement as any).options = ['Select an option', 'Option 1', 'Option 2', 'Option 3'];
    }

    setElements(prev => [...prev, newElement]);
    setSelectedElements([newElement.id]);
    
    toast({
      title: "Element Added",
      description: `Added a new ${type} element to your form.`,
    });
  };

  const handleDeleteElement = (id: string) => {
    // If element is part of a group, ask if user wants to delete the whole group
    const element = elements.find(el => el.id === id);
    if (element && element.groupId) {
      const groupElements = elements.filter(el => el.groupId === element.groupId);
      if (groupElements.length > 1 && window.confirm("Delete all elements in this group?")) {
        setElements(elements.filter(el => el.groupId !== element.groupId));
        setSelectedElements([]);
      } else {
        setElements(elements.filter(el => el.id !== id));
        setSelectedElements(selectedElements.filter(elementId => elementId !== id));
      }
    } else {
      setElements(elements.filter(el => el.id !== id));
      setSelectedElements(selectedElements.filter(elementId => elementId !== id));
    }
    
    toast({
      title: "Element Deleted",
      description: "The element has been removed from your form.",
    });
  };

  const handleDuplicateElement = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        },
        groupId: null // Reset group ID for the duplicate
      };
      setElements([...elements, newElement]);
      setSelectedElements([newElement.id]);
      
      toast({
        title: "Element Duplicated",
        description: "A copy of the element has been created.",
      });
    }
  };

  const handleRequiredToggle = (id: string, required: boolean) => {
    setElements(prev => 
      prev.map(el => 
        el.id === id ? { ...el, required } : el
      )
    );
  };

  const handleGroupElements = () => {
    if (selectedElements.length < 2) {
      toast({
        title: "Cannot Group",
        description: "Select at least two elements to create a group.",
        variant: "destructive"
      });
      return;
    }

    const groupId = `group-${Date.now()}`;
    const updatedElements = elements.map(el => 
      selectedElements.includes(el.id) ? { ...el, groupId } : el
    );

    setElements(updatedElements);
    toast({
      title: "Elements Grouped",
      description: `Created a group with ${selectedElements.length} elements.`,
    });
  };

  const handleUngroupElements = () => {
    // Find the group ID of the first selected element
    const selectedElement = elements.find(el => selectedElements.includes(el.id));
    if (!selectedElement || !selectedElement.groupId) {
      toast({
        title: "Cannot Ungroup",
        description: "Select a grouped element first.",
        variant: "destructive"
      });
      return;
    }

    const groupId = selectedElement.groupId;
    const updatedElements = elements.map(el => 
      el.groupId === groupId ? { ...el, groupId: null } : el
    );

    setElements(updatedElements);
    toast({
      title: "Group Dissolved",
      description: "The selected elements are no longer grouped.",
    });
  };

  // Handle the drop event on the canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const elementType = e.dataTransfer.getData("elementType");
    console.log("Drop event detected with element type:", elementType);
    
    if (!elementType || !canvasRef.current) {
      console.log("Missing element type or canvas ref");
      return;
    }
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    // Calculate position relative to the canvas and snap to grid
    const x = Math.round((e.clientX - canvasRect.left) / 25) * 25;
    const y = Math.round((e.clientY - canvasRect.top) / 25) * 25;
    
    console.log("Calculated position:", { x, y });
    handleElementDrop(elementType, { x, y });
  };

  // Handle dragover to allow dropping
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
    // Change the cursor to indicate droppable area
    e.dataTransfer.dropEffect = "copy";
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Clear smart guides when dragging stops
  useEffect(() => {
    if (!isDragging) {
      setShowSmartGuides(false);
      setGuideLines({ horizontal: [], vertical: [] });
    }
  }, [isDragging]);

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
            <div 
              ref={canvasRef}
              className={cn(
                "form-canvas min-h-full w-full p-4 relative bg-white",
                isDragging && "cursor-grabbing",
                isDragOver && "bg-portico-purple/5 outline-dashed outline-2 outline-portico-purple/30"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {showSmartGuides && <SmartGuides guides={guideLines} />}
              
              {elements.map((element) => (
                <FormElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElements.includes(element.id)}
                  onSelect={(id, multiSelect) => handleElementSelect(id, multiSelect)}
                  onMove={handleElementMove}
                  onDelete={handleDeleteElement}
                  onDuplicate={handleDuplicateElement}
                  setIsDragging={setIsDragging}
                  allElements={elements}
                />
              ))}
            </div>
          </div>
        </div>
        <FormToolbar 
          selectedElement={selectedElements.length === 1 
            ? elements.find(el => el.id === selectedElements[0]) || null
            : null
          } 
          onUpdate={(updatedElement) => {
            setElements(elements.map(el => 
              el.id === updatedElement.id ? updatedElement : el
            ));
          }}
          selectedCount={selectedElements.length}
          onGroup={handleGroupElements}
          onUngroup={handleUngroupElements}
        />
      </div>
    </GroupingProvider>
  );
};

export default FormCanvas;
