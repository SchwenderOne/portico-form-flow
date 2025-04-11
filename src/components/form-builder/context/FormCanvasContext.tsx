
import React, { createContext, useContext, useReducer, useState, useCallback, useEffect } from 'react';
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
  handleElementDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleElementMoveWithGuides: (elementId: string, newPosition: FormPosition) => void;
  handleDeleteElement: () => void;
  handleDuplicateElement: () => void;
  handleRequiredToggle: (elementId: string, required: boolean) => void;
  handleDuplicateGroup: (groupIds: string[]) => void;
  updateElement: (element: FormElement) => void;
  showSmartGuides: boolean;
  guideLines: { x: number; y: number }[];
  distances: { x: number; y: number }[];
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  handleElementAlign: (alignment: 'left' | 'center' | 'right') => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  grouping: {
    groupElements: () => void;
    ungroupElements: () => void;
  };
  addElements: (newElements: FormElement[]) => void;
}

export const FormCanvasContext = createContext<any>(null);

export const FormCanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{ x: number; y: number }[]>([]);
  const [distances, setDistances] = useState<{ x: number; y: number }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Fix: Pass no arguments to useElementSelection
  const {
    selectedElements,
    setSelectedElements,
    handleElementSelect
  } = useElementSelection();
  
  // Fix: Pass required parameters to useElementGrouping
  const {
    handleGroupElements,
    handleUngroupElements,
    handleRequiredToggle
  } = useElementGrouping(elements, setElements, selectedElements);
  
  // Fix: Pass correct parameters to useElementDuplication
  const {
    handleDuplicateElement,
    handleDuplicateGroup
  } = useElementDuplication(elements, setElements, setSelectedElements);
  
  // Create additional handlers needed for the context
  const handleCanvasClick = useCallback(() => {
    setSelectedElements([]);
  }, [setSelectedElements]);
  
  const handleElementAlign = useCallback((alignment: 'left' | 'center' | 'right') => {
    // Implementation for element alignment
    console.log(`Aligning selected elements to ${alignment}`);
  }, []);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Implementation for key down events
    console.log('Key pressed:', event.key);
  }, []);
  
  const handleElementMoveWithGuides = useCallback((elementId: string, newPosition: FormPosition) => {
    // Implementation for moving elements with guides
    setElements(prev => 
      prev.map(el => 
        el.id === elementId ? { ...el, position: newPosition } : el
      )
    );
  }, [setElements]);
  
  const handleAddAIElements = useCallback((newElements: FormElement[], replace: boolean = false) => {
    if (replace) {
      setElements(newElements);
    } else {
      setElements(prev => [...prev, ...newElements]);
    }
  }, [setElements]);

  // Get element actions from the hook with consistent parameter order
  const {
    updateElement,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement,
    alignElement
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
        addElements
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
