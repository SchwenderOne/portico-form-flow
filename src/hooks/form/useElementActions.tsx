
import { useCallback } from "react";
import { FormElement } from "@/types/form";
import { useToast } from "@/hooks/use-toast";
import { findValidPosition, createNewElement } from "@/utils/element-utils";

export const useElementActions = (
  elements: FormElement[],
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>,
  selectedElements: string[],
  setSelectedElements: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { toast } = useToast();

  const updateElement = useCallback((updatedElement: FormElement) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  }, [elements, setElements]);

  const handleElementMove = useCallback((id: string, position: { x: number, y: number }) => {
    const updatedElements = elements.map(el => {
      if (el.id === id) {
        return { ...el, position };
      }
      
      if (selectedElements.includes(id)) {
        const selectedElement = elements.find(e => e.id === id);
        if (selectedElement && el.groupId === selectedElement.groupId && el.groupId !== null) {
          return { ...el, position };
        }
      }
      
      return el;
    });
    
    setElements(updatedElements);
  }, [elements, selectedElements, setElements]);

  const handleElementDrop = useCallback((type: string, position: { x: number, y: number }) => {
    console.log(`Dropping element of type: ${type} at position:`, position);
    
    // Find a valid position that doesn't overlap with existing elements
    const validPosition = findValidPosition(position.x, position.y, type, elements);
    
    // Create the new element with appropriate defaults
    const newElement = createNewElement(type, validPosition);

    setElements(prev => [...prev, newElement]);
    setSelectedElements([newElement.id]);
    
    toast({
      title: "Element Added",
      description: `Added a new ${type} element to your form.`,
    });
  }, [elements, setElements, setSelectedElements, toast]);

  const handleDeleteElement = useCallback((id: string) => {
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
  }, [elements, selectedElements, setElements, setSelectedElements, toast]);

  return {
    updateElement,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement
  };
};
