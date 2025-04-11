
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { FormElement, FormPosition } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';
import { useElementSelection } from '@/hooks/form/useElementSelection';
import { useElementGrouping } from '@/hooks/form/useElementGrouping';
import { useElementDuplication } from '@/hooks/form/useElementDuplication';
import { useElementActions } from '@/hooks/form/useElementActions';
import { toast } from 'sonner';

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
  guideLines: { horizontal: number[]; vertical: number[] };
  distances: { horizontal: { position: number; distance: number }[]; vertical: { position: number; distance: number }[] };
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  handleElementAlign: (elementId: string, alignment: 'left' | 'center' | 'right') => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  grouping: {
    groupElements: () => void;
    ungroupElements: () => void;
  };
  addElements: (newElements: FormElement[]) => void;
  setIsDragging: (isDragging: boolean) => void;
  undoOperation: () => void;
  redoOperation: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const FormCanvasContext = createContext<FormCanvasContextType | null>(null);

export const FormCanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [showSmartGuides, setShowSmartGuides] = useState(false);
  const [guideLines, setGuideLines] = useState<{ horizontal: number[]; vertical: number[] }>({ 
    horizontal: [], 
    vertical: [] 
  });
  const [distances, setDistances] = useState<{ 
    horizontal: { position: number; distance: number }[]; 
    vertical: { position: number; distance: number }[] 
  }>({ 
    horizontal: [], 
    vertical: [] 
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Track operation history for undo/redo
  const [history, setHistory] = useState<FormElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  // Track operation in progress to avoid adding to history during undo/redo
  const isUndoRedoOperation = useRef(false);
  
  // Add elements to history when they change
  useEffect(() => {
    if (!isUndoRedoOperation.current && elements.length > 0) {
      // Add current state to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push([...elements]);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCanUndo(true);
      setCanRedo(false);
    }
  }, [elements]);
  
  // Update undo/redo availability
  useEffect(() => {
    setCanUndo(historyIndex > 0);
    setCanRedo(historyIndex < history.length - 1);
  }, [historyIndex, history]);
  
  // Undo operation
  const undoOperation = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoOperation.current = true;
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
      setTimeout(() => {
        isUndoRedoOperation.current = false;
      }, 0);
    }
  }, [historyIndex, history]);
  
  // Redo operation
  const redoOperation = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoOperation.current = true;
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
      setTimeout(() => {
        isUndoRedoOperation.current = false;
      }, 0);
    }
  }, [historyIndex, history]);
  
  // Use element selection hook
  const {
    selectedElements,
    setSelectedElements,
    handleElementSelect
  } = useElementSelection();
  
  // Use element grouping hook
  const {
    handleRequiredToggle,
    handleGroupElements,
    handleUngroupElements
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
    
    setElements(prev => {
      const element = prev.find(el => el.id === elementId);
      if (!element) return prev;
      
      const canvasWidth = 1000; // Default canvas width, should be dynamic in a real app
      
      let newX = element.position.x;
      switch (alignment) {
        case 'left':
          newX = 20;
          break;
        case 'center':
          newX = (canvasWidth - element.size.width) / 2;
          break;
        case 'right':
          newX = canvasWidth - element.size.width - 20;
          break;
      }
      
      return prev.map(el => 
        el.id === elementId ? { ...el, position: { ...el.position, x: newX } } : el
      );
    });
    
    toast.success(`Element aligned to ${alignment}`);
  }, [setElements]);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Don't trigger if user is typing in a text field
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }
    
    switch (event.key) {
      case 'Delete':
      case 'Backspace':
        if (selectedElements.length > 0) {
          selectedElements.forEach(id => handleDeleteElement(id));
          event.preventDefault();
        }
        break;
      case 'z':
        if (event.metaKey || event.ctrlKey) {
          if (event.shiftKey) {
            // Redo with Cmd/Ctrl+Shift+Z
            redoOperation();
          } else {
            // Undo with Cmd/Ctrl+Z
            undoOperation();
          }
          event.preventDefault();
        }
        break;
      case 'y':
        if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
          // Redo with Cmd/Ctrl+Y
          redoOperation();
          event.preventDefault();
        }
        break;
      case 'd':
        if (event.metaKey || event.ctrlKey) {
          // Duplicate with Cmd/Ctrl+D
          if (selectedElements.length === 1) {
            handleDuplicateElement(selectedElements[0]);
          } else if (selectedElements.length > 1) {
            handleDuplicateGroup(selectedElements);
          }
          event.preventDefault();
        }
        break;
      case 'a':
        if (event.metaKey || event.ctrlKey) {
          // Select all with Cmd/Ctrl+A
          setSelectedElements(elements.map(el => el.id));
          event.preventDefault();
        }
        break;
      case 'g':
        if (event.metaKey || event.ctrlKey) {
          if (event.shiftKey) {
            // Ungroup with Cmd/Ctrl+Shift+G
            handleUngroupElements();
          } else {
            // Group with Cmd/Ctrl+G
            handleGroupElements();
          }
          event.preventDefault();
        }
        break;
    }
  }, [
    selectedElements, 
    handleDeleteElement, 
    elements, 
    setSelectedElements, 
    handleDuplicateElement, 
    handleDuplicateGroup,
    handleGroupElements,
    handleUngroupElements,
    undoOperation,
    redoOperation
  ]);
  
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
    console.log("Adding AI elements to canvas:", newElements);
    
    if (replace) {
      setElements(newElements);
    } else {
      // Make sure elements have unique IDs
      const uniqueElements = newElements.map(el => ({
        ...el,
        id: el.id || `${el.type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      }));
      
      setElements(prev => [...prev, ...uniqueElements]);
      
      // Select the newly added elements
      setSelectedElements(uniqueElements.map(el => el.id));
      
      toast.success(`Added ${uniqueElements.length} element${uniqueElements.length !== 1 ? 's' : ''} to canvas`);
    }
  }, [setElements, setSelectedElements]);

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
    
    console.log("Adding elements to canvas:", elementsToAdd);
    setElements((prev) => [...prev, ...elementsToAdd]);
    
    // Select the newly added elements
    setSelectedElements(elementsToAdd.map(el => el.id));
    
    toast.success(`Added ${elementsToAdd.length} element${elementsToAdd.length !== 1 ? 's' : ''} to canvas`);
  }, [elements, setElements, setSelectedElements]);

  // Check for blocks from library to add when this component mounts
  useEffect(() => {
    const storedBlock = localStorage.getItem('blockToAdd');
    if (storedBlock) {
      try {
        const block = JSON.parse(storedBlock);
        
        // Create a form element from the block
        const newElement: FormElement = {
          id: `${block.id}-${Date.now()}`,
          type: block.category === 'forms' ? 'text' : 'header',
          position: { x: 100, y: 100 },
          size: { width: 500, height: block.category === 'forms' ? 80 : 60 },
          content: block.name,
          groupId: null,
          required: false
        };
        
        handleAddAIElements([newElement]);
        toast.success(`${block.name} added from Components Library`);
        
        // Clear the stored block
        localStorage.removeItem('blockToAdd');
      } catch (error) {
        console.error("Error adding block from library:", error);
      }
    }
  }, [handleAddAIElements]);

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
        setIsDragging,
        undoOperation,
        redoOperation,
        canUndo,
        canRedo
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
