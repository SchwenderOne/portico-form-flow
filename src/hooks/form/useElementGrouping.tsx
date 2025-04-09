
import { useCallback } from "react";
import { FormElement } from "@/types/form";
import { useToast } from "@/hooks/use-toast";

export const useElementGrouping = (
  elements: FormElement[],
  setElements: React.Dispatch<React.SetStateAction<FormElement[]>>,
  selectedElements: string[]
) => {
  const { toast } = useToast();

  const handleRequiredToggle = useCallback((id: string, required: boolean) => {
    setElements(prev => 
      prev.map(el => 
        el.id === id ? { ...el, required } : el
      )
    );
  }, [setElements]);

  const handleGroupElements = useCallback(() => {
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
  }, [elements, selectedElements, setElements, toast]);

  const handleUngroupElements = useCallback(() => {
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
  }, [elements, selectedElements, setElements, toast]);

  return {
    handleRequiredToggle,
    handleGroupElements,
    handleUngroupElements
  };
};
