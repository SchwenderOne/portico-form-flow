
import React, { createContext, useContext, useState, useCallback } from "react";
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
  showSmartGuides: boolean;
  guideLines: { orientation: 'horizontal' | 'vertical', position: number }[];
  distances: { elementId: string, distance: number, orientation: 'horizontal' | 'vertical' }[];
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

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      toast.info("Undo functionality will be available soon");
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      toast.info("Redo functionality will be available soon");
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
      // Replace all existing elements with the new ones
      setElements(elements.map((element, index) => ({
        ...element,
        position: {
          x: 100, // Standard left alignment
          y: 50 + (index > 0 ? index * 100 : 0) // Proper vertical spacing
        }
      })));
      
      // Select the first element in the new form
      if (elements.length > 0) {
        handleElementSelect(elements[0].id, false);
      }
      
      toast.success(`Replaced with ${elements.length} new elements`);
      return;
    }
    
    // Find the lowest position of existing elements to place new elements below
    const lowestElementBottom = Math.max(
      ...elements.map(el => el.position.y + el.size.height),
      50
    );
    
    let currentY = lowestElementBottom + 30;
    
    // Calculate proper alignment with grid
    currentY = Math.round(currentY / 25) * 25;
    
    // Add each element with proper spacing and alignment
    elements.forEach((element, index) => {
      const adjustedElement = {
        ...element,
        position: {
          x: 100, // Standard left alignment
          y: currentY
        }
      };
      
      addElement(adjustedElement);
      
      // Calculate next element position based on current element height
      const elementHeight = element.size.height || 80;
      const spacing = 20; // Default spacing between elements
      currentY += elementHeight + spacing;
      
      // Ensure alignment to grid
      currentY = Math.round(currentY / 25) * 25;
    });
    
    // Select the last added element
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

  // Create the context value
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
    showSmartGuides,
    guideLines,
    distances,
    grouping,
    handleDuplicateGroup,
    handleOpenAIModal
  };

  return (
    <FormCanvasContext.Provider value={contextValue}>
      {children}
    </FormCanvasContext.Provider>
  );
};

// Custom hook to use the form canvas context
export const useFormCanvas = () => {
  const context = useContext(FormCanvasContext);
  if (context === undefined) {
    throw new Error('useFormCanvas must be used within a FormCanvasProvider');
  }
  return context;
};
