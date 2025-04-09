
import React, { createContext, useContext } from "react";

interface GroupingContextType {
  selectedElements: string[];
  groupElements: () => void;
  ungroupElements: () => void;
}

const GroupingContext = createContext<GroupingContextType>({
  selectedElements: [],
  groupElements: () => {},
  ungroupElements: () => {},
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

export default GroupingContext;
