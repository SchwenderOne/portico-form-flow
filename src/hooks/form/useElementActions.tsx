
import { useCallback } from "react";
import { FormElement } from "@/types/form";
import { useToast } from "@/hooks/use-toast";
import { findValidPosition, createNewElement } from "@/utils/element-utils";
import { toast } from "sonner";

export const useElementActions = (
  elements: FormElement[],
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>,
  selectedElements: string[],
  setSelectedElements: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { toast: useToastHook } = useToast();

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
          // Move all elements in the same group
          return { ...el, position };
        }
      }
      
      return el;
    });
    
    setElements(updatedElements);
  }, [elements, selectedElements, setElements]);

  const handleElementDrop = useCallback((type: string, position: { x: number, y: number }) => {
    console.log(`Dropping element of type: ${type} at position:`, position);
    
    const validPosition = findValidPosition(position.x, position.y, type, elements);
    
    const newElement = createNewElement(type, validPosition, elements);

    setElements(prev => [...prev, newElement]);
    setSelectedElements([newElement.id]);
    
    toast.success(`Added a new ${type} element to your form`, {
      duration: 2000,
    });
  }, [elements, setElements, setSelectedElements]);

  const handleDeleteElement = useCallback((id: string) => {
    const element = elements.find(el => el.id === id);
    if (element && element.groupId) {
      const groupElements = elements.filter(el => el.groupId === element.groupId);
      if (groupElements.length > 1 && window.confirm("Delete all elements in this group?")) {
        setElements(elements.filter(el => el.groupId !== element.groupId));
        setSelectedElements([]);
        toast.success("Group deleted", { duration: 2000 });
      } else {
        setElements(elements.filter(el => el.id !== id));
        setSelectedElements(selectedElements.filter(elementId => elementId !== id));
        toast.success("Element deleted", { duration: 2000 });
      }
    } else {
      setElements(elements.filter(el => el.id !== id));
      setSelectedElements(selectedElements.filter(elementId => elementId !== id));
      toast.success("Element deleted", { duration: 2000 });
    }
  }, [elements, selectedElements, setElements, setSelectedElements]);

  const alignElement = useCallback((id: string, alignment: 'left' | 'center' | 'right') => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    // For now, just show a toast. In a full implementation,
    // we would adjust the element's position based on the alignment
    toast.info(`${alignment} alignment will be available soon`);
  }, [elements]);

  return {
    updateElement,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement,
    alignElement
  };
};
