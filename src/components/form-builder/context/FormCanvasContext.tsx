
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FormElement, FormPosition } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';
import { useElementSelection } from '@/hooks/form/useElementSelection';
import { useElementGrouping } from '@/hooks/form/useElementGrouping';
import { useElementDuplication } from '@/hooks/form/useElementDuplication';
import { useElementActions } from '@/hooks/form/useElementActions';

interface FormCanvasContextType {
  elements: FormElement[];
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
  selectedElements: string[];
  handleElementSelect: (elementId: string, shiftKey?: boolean) => void;
  handleAddAIElements: (newElements: FormElement[], replace?: boolean) => void;
  handleCanvasClick: () => void;
  handleElementDrop: (event: React.DragEvent<HTMLDivElement> | string, position?: FormPosition) => void;
  handleElementMoveWithGuides: (elementId: string, newPosition: FormPosition) => void;
  handleDeleteElement: (elementId?: string) => void;
  handleDuplicateElement: (elementId?: string) => void;
  handleRequiredToggle: (elementId: string, required: boolean) => void;
  handleDuplicateGroup: (groupIds: string[]) => void;
  updateElement: (element: FormElement) => void;
  showSmartGuides: boolean;
  guideLines: { x: number; y: number }[];
  distances: { x: number; y: number }[];
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  handleElementAlign: (elementId: string, alignment: 'left' | 'center' | 'right') => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  grouping: {
    groupElements: () => void;
    ungroupElements: () => void;
  };
  addElements: (newElements: FormElement[]) => void;
  setIsDragging?: (isDragging: boolean) => void;
  undoOperation?: () => void;
  redoOperation?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const FormCanvasContext = createContext<FormCanvasContextType | null>(null);

export const FormCanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{ x: number; y: number }[]>([]);
  const [distances, setDistances] = useState<{ x: number; y: number }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use element selection hook
  const {
    selectedElements,
    setSelectedElements,
    handleElementSelect
  } = useElementSelection();
  
  // Use element grouping hook
  const {
    handleGroupElements,
    handleUngroupElements,
    handleRequiredToggle
  } = useElementGrouping(elements, setElements, selectedElements);
  
  // Use element duplication hook
  const {
    handleDuplicateElement,
    handleDuplicateGroup
  } = useElementDuplication(elements, setElements, setSelectedElements);
  
  // Handle canvas click to deselect elements
  const handleCanvasClick = useCallback(() => {
    setSelectedElements([]);
  }, [setSelectedElements]);
  
  // Handle element alignment
  const handleElementAlign = useCallback((elementId: string, alignment: 'left' | 'center' | 'right') => {
    console.log(`Aligning element ${elementId} to ${alignment}`);
    // Implementation would adjust the element position based on alignment
  }, []);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('Key pressed:', event.key);
    // Implement keyboard shortcuts (delete, duplicate, etc.)
  }, []);
  
  // Handle moving elements with guides
  const handleElementMoveWithGuides = useCallback((elementId: string, newPosition: FormPosition) => {
    setElements(prev => 
      prev.map(el => 
        el.id === elementId ? { ...el, position: newPosition } : el
      )
    );
  }, [setElements]);
  
  // Handle adding AI-generated elements
  const handleAddAIElements = useCallback((newElements: FormElement[], replace: boolean = false) => {
    if (replace) {
      setElements(newElements);
    } else {
      setElements(prev => [...prev, ...newElements]);
    }
  }, [setElements]);

  // Get element actions from the hook
  const {
    updateElement,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement
  } = useElementActions(elements, setElements, selectedElements, setSelectedElements);

  // Add elements to the canvas (for template field selection)
  const addElements = useCallback((newElements: FormElement[]) => {
    // Get max y position to position new elements below existing ones
    const maxY = elements.reduce((max, el) => 
      Math.max(max, el.position.y + el.size.height), 0);
    
    // Add 20px spacing
    const startY = maxY > 0 ? maxY + 20 : 100;
    
    // Assign new positions and IDs to avoid conflicts
    const elementsToAdd = newElements.map((element, index) => {
      // Create a new ID for the element
      const newId = `${element.type}-${uuidv4().substring(0, 8)}`;
      
      // Update groupId references if element is part of a group
      let newGroupId = element.groupId;
      if (element.groupId) {
        // Create a mapping of old group IDs to new ones
        const groupMapping = newElements.reduce((acc, el) => {
          if (el.groupId && !acc[el.groupId]) {
            acc[el.groupId] = `group-${uuidv4().substring(0, 8)}`;
          }
          return acc;
        }, {} as Record<string, string>);
        
        newGroupId = element.groupId ? groupMapping[element.groupId] : null;
      }
      
      return {
        ...element,
        id: newId,
        groupId: newGroupId,
        position: {
          x: element.position.x,
          y: startY + (index * 100) // Stack elements vertically
        }
      };
    });
    
    setElements((prev) => [...prev, ...elementsToAdd]);
  }, [elements, setElements]);

  return (
    <FormCanvasContext.Provider
      value={{
        elements,
        setElements,
        selectedElements,
        handleElementSelect,
        handleAddAIElements,
        handleCanvasClick,
        handleElementDrop,
        handleElementMoveWithGuides,
        handleDeleteElement,
        handleDuplicateElement,
        handleRequiredToggle,
        handleDuplicateGroup,
        updateElement,
        showSmartGuides,
        guideLines,
        distances,
        isDragOver,
        setIsDragOver,
        handleElementAlign,
        handleKeyDown,
        grouping: {
          groupElements: handleGroupElements,
          ungroupElements: handleUngroupElements
        },
        addElements,
        setIsDragging: setIsDragging ? setIsDragging : undefined,
        undoOperation: undefined, // Implement if needed
        redoOperation: undefined, // Implement if needed
        canUndo: false, // Implement if needed
        canRedo: false  // Implement if needed
      }}
    >
      {children}
    </FormCanvasContext.Provider>
  );
};

export const useFormCanvas = () => {
  const context = useContext(FormCanvasContext);
  if (!context) {
    throw new Error('useFormCanvas must be used within a FormCanvasProvider');
  }
  return context;
};
