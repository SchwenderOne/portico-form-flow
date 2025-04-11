
import { useState, useCallback } from "react";

export const useElementSelection = () => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleElementSelect = useCallback((id: string, isMultiSelect: boolean = false) => {
    if (isMultiSelect) {
      setSelectedElements(prev => 
        prev.includes(id) 
          ? prev.filter(elementId => elementId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedElements(prev => prev.includes(id) && prev.length === 1 ? [] : [id]);
    }
  }, []);

  return {
    selectedElements,
    setSelectedElements,
    handleElementSelect
  };
};
