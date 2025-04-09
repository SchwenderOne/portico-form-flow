
import { useState } from "react";
import { FormElement } from "@/types/form";

export const useElementSelection = () => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleElementSelect = (id: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedElements(prev => 
        prev.includes(id) 
          ? prev.filter(elementId => elementId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedElements(prev => prev.includes(id) && prev.length === 1 ? [] : [id]);
    }
  };

  return {
    selectedElements,
    setSelectedElements,
    handleElementSelect
  };
};
