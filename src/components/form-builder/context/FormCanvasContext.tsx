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
  
  const {
    selectedElements,
    handleElementSelect
  } = useElementSelection(elements, setElements);
  
  const {
    groupElements,
    ungroupElements
  } = useElementGrouping(elements, setElements, selectedElements);
  
  const {
    handleDuplicateElement,
    handleDuplicateGroup
  } = useElementDuplication(elements, setElements, selectedElements);
  
  const {
    handleDeleteElement,
    handleRequiredToggle,
    handleElementAlign,
    handleElementDrop,
    handleElementMoveWithGuides,
    handleAddAIElements,
    handleCanvasClick,
    handleKeyDown,
    updateElement
  } = useElementActions(elements, setElements, selectedElements, setShowSmartGuides, setGuideLines, setDistances);

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
          groupElements,
          ungroupElements
        },
        addElements, // Add the new function for adding elements
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
