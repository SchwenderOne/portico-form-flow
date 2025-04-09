
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { FormElement } from "@/types/form";
import { useFormElements } from "@/hooks/use-form-elements";
import { useSmartGuides } from "../hooks/useSmartGuides";
import { GroupingProvider, useGroupingState } from "../GroupingContext";
import { KeyboardEvent } from "react";
import { toast } from "sonner";

// Define the type for our context
type FormCanvasContextType = {
  elements: FormElement[];
  selectedElements: string[];
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  isAIModalOpen: boolean;
  setIsAIModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleElementSelect: (id: string, isMultiSelect: boolean) => void;
  handleElementMove: (id: string, position: { x: number, y: number }) => void;
  handleElementMoveWithGuides: (id: string, position: { x: number, y: number }) => void;
  handleElementDrop: (type: string, position: { x: number, y: number }) => void;
  handleAddAIElements: (elements: FormElement[], replaceExisting?: boolean) => void;
  handleDeleteElement: (id: string) => void;
  handleDuplicateElement: (id: string) => void;
  handleRequiredToggle: (id: string, required: boolean) => void;
  handleCanvasClick: (e: React.MouseEvent) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  updateElement: (element: FormElement) => void;
  addElement: (element: FormElement) => void;
  handleElementAlign: (id: string, alignment: 'left' | 'center' | 'right') => void;
  showSmartGuides: boolean;
  guideLines: { horizontal: number[]; vertical: number[] };
  distances: { horizontal: { position: number; distance: number }[]; vertical: { position: number; distance: number }[] };
  grouping: {
    selectedElements: string[];
    groupElements: () => void;
    ungroupElements: () => void;
    isElementSelected: (id: string) => boolean;
    selectElements: (ids: string[], clearExisting?: boolean) => void;
    clearSelection: () => void;
  };
  handleDuplicateGroup: (ids: string[]) => void;
  handleOpenAIModal: () => void;
  undoOperation: () => void;
  redoOperation: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

// Create the context with a default undefined value
const FormCanvasContext = createContext<FormCanvasContextType | undefined>(undefined);

// Provider component
export const FormCanvasProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const {
    elements,
    setElements,
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

  // Add event listener for version restore
  useEffect(() => {
    const handleVersionRestore = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && Array.isArray(customEvent.detail.elements)) {
        setElements(customEvent.detail.elements);
        grouping.clearSelection();
        toast.success("Form version restored successfully");
      }
    };

    document.addEventListener('version-restore', handleVersionRestore);
    
    return () => {
      document.removeEventListener('version-restore', handleVersionRestore);
    };
  }, [setElements, grouping]);

  // Handle element alignment (left, center, right)
  const handleElementAlign = useCallback((id: string, alignment: 'left' | 'center' | 'right') => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    // Get the width of the canvas (for now using a fixed width, could be dynamic)
    const canvasWidth = 800; // Default canvas width
    
    // Calculate the new x position based on alignment
    let newX: number;
    
    switch (alignment) {
      case 'left':
        newX = 0;
        break;
      case 'center':
        newX = (canvasWidth - element.size.width) / 2;
        break;
      case 'right':
        newX = canvasWidth - element.size.width;
        break;
      default:
        newX = element.position.x;
    }
    
    // Update the element position
    updateElement({
      ...element,
      position: {
        ...element.position,
        x: newX
      }
    });
    
    toast.success(`Element aligned ${alignment}`);
  }, [elements, updateElement]);

  // Mock undo/redo functions until fully implemented
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const undoOperation = () => {
    toast.info("Undo functionality will be available soon");
  };

  const redoOperation = () => {
    toast.info("Redo functionality will be available soon");
  };

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undoOperation();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      redoOperation();
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

  const handleAddAIElements = (elements: FormElement[], replaceExisting = false) => {
    if (!elements || elements.length === 0) return;
    
    if (replaceExisting) {
      setElements(elements.map((element, index) => ({
        ...element,
        position: {
          x: 100,
          y: 50 + (index > 0 ? index * 100 : 0)
        }
      })));
      
      if (elements.length > 0) {
        handleElementSelect(elements[0].id, false);
      }
      
      toast.success(`Replaced with ${elements.length} new elements`);
      return;
    }
    
    const lowestElementBottom = Math.max(
      ...elements.map(el => el.position.y + el.size.height),
      50
    );
    
    let currentY = lowestElementBottom + 30;
    
    currentY = Math.round(currentY / 25) * 25;
    
    elements.forEach((element, index) => {
      const adjustedElement = {
        ...element,
        position: {
          x: 100,
          y: currentY
        }
      };
      
      addElement(adjustedElement);
      
      const elementHeight = element.size.height || 80;
      const spacing = 20;
      currentY += elementHeight + spacing;
      
      currentY = Math.round(currentY / 25) * 25;
    });
    
    if (elements.length > 0) {
      const lastElement = elements[elements.length - 1];
      handleElementSelect(lastElement.id, false);
    }
    
    toast.success(`${elements.length} elements added to canvas`);
  };

  const handleOpenAIModal = () => {
    setIsAIModalOpen(true);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      grouping.clearSelection();
    }
  };

  const contextValue: FormCanvasContextType = {
    elements,
    selectedElements,
    isDragging,
    setIsDragging,
    isDragOver,
    setIsDragOver,
    isAIModalOpen,
    setIsAIModalOpen,
    handleElementSelect,
    handleElementMove,
    handleElementMoveWithGuides,
    handleElementDrop,
    handleAddAIElements,
    handleDeleteElement,
    handleDuplicateElement,
    handleRequiredToggle,
    handleCanvasClick,
    handleKeyDown,
    updateElement,
    addElement,
    handleElementAlign,
    showSmartGuides,
    guideLines,
    distances,
    grouping,
    handleDuplicateGroup,
    handleOpenAIModal,
    undoOperation,
    redoOperation,
    canUndo,
    canRedo
  };

  return (
    <FormCanvasContext.Provider value={contextValue}>
      {children}
    </FormCanvasContext.Provider>
  );
};

export const useFormCanvas = () => {
  const context = useContext(FormCanvasContext);
  if (context === undefined) {
    throw new Error('useFormCanvas must be used within a FormCanvasProvider');
  }
  return context;
};
