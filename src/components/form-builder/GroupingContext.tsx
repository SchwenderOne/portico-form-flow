
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GroupingContextType {
  selectedElements: string[];
  groupElements: () => void;
  ungroupElements: () => void;
  isElementSelected: (id: string) => boolean;
  selectElements: (ids: string[], clearExisting?: boolean) => void;
  clearSelection: () => void;
}

const GroupingContext = createContext<GroupingContextType>({
  selectedElements: [],
  groupElements: () => {},
  ungroupElements: () => {},
  isElementSelected: () => false,
  selectElements: () => {},
  clearSelection: () => {},
});

export const GroupingProvider: React.FC<{
  children: React.ReactNode;
  value: GroupingContextType;
}> = ({ children, value }) => {
  return (
    <GroupingContext.Provider value={value}>
      {children}
    </GroupingContext.Provider>
  );
};

export const useGrouping = () => useContext(GroupingContext);

// Helper hook to create grouping functionality
export const useGroupingState = (
  elements: any[],
  onGroup: () => void,
  onUngroup: () => void
) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const { toast } = useToast();

  const isElementSelected = (id: string) => {
    return selectedElements.includes(id);
  };

  const selectElements = (ids: string[], clearExisting = true) => {
    if (clearExisting) {
      setSelectedElements(ids);
    } else {
      setSelectedElements(prev => {
        const newSelection = [...prev];
        ids.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  const clearSelection = () => {
    setSelectedElements([]);
  };

  const groupElements = () => {
    if (selectedElements.length < 2) {
      toast({
        title: "Cannot Group",
        description: "Select at least two elements to create a group.",
        variant: "destructive"
      });
      return;
    }
    
    onGroup();
    toast({
      title: "Group Created",
      description: `Created a group with ${selectedElements.length} elements.`,
    });
  };

  const ungroupElements = () => {
    const selectedElement = elements.find(el => selectedElements.includes(el.id));
    if (!selectedElement || !selectedElement.groupId) {
      toast({
        title: "Cannot Ungroup",
        description: "Select a grouped element first.",
        variant: "destructive"
      });
      return;
    }
    
    onUngroup();
    toast({
      title: "Group Dissolved",
      description: "The selected elements are no longer grouped.",
    });
  };

  return {
    selectedElements,
    isElementSelected,
    selectElements,
    clearSelection,
    groupElements,
    ungroupElements,
  };
};

export default GroupingContext;
