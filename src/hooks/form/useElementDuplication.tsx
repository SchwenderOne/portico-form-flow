
import { useCallback } from "react";
import { FormElement } from "@/types/form";
import { useToast } from "@/hooks/use-toast";

export const useElementDuplication = (
  elements: FormElement[],
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>,
  setSelectedElements: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { toast } = useToast();

  const handleDuplicateElement = useCallback((id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        },
        groupId: null // Don't keep the group when duplicating a single element
      };
      setElements([...elements, newElement]);
      setSelectedElements([newElement.id]);
      
      toast({
        title: "Element Duplicated",
        description: "A copy of the element has been created.",
      });
    }
  }, [elements, setElements, setSelectedElements, toast]);

  const handleDuplicateGroup = useCallback((ids: string[]) => {
    const elementsToGroup = elements.filter(el => ids.includes(el.id) || ids.some(id => el.id === id));
    if (elementsToGroup.length > 0) {
      // Create duplicate elements with a new groupId
      const newGroupId = `group-${Date.now()}`;
      const newElements = elementsToGroup.map(el => ({
        ...el,
        id: `${el.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        position: {
          x: el.position.x + 20, // Offset slightly
          y: el.position.y + 20
        },
        groupId: newGroupId
      }));
      
      setElements([...elements, ...newElements]);
      setSelectedElements(newElements.map(el => el.id));
      
      toast({
        title: "Group Duplicated",
        description: `Created a copy of ${newElements.length} elements.`,
      });
      
      return newElements.map(el => el.id);
    }
    return [];
  }, [elements, setElements, setSelectedElements, toast]);

  return {
    handleDuplicateElement,
    handleDuplicateGroup
  };
};
