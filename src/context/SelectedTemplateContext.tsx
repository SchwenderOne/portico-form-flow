
import React, { createContext, useContext, useState } from "react";
import { templatesData } from "@/data/templates";
import { FormElement } from "@/types/form";

// Define the template structure
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  created: string;
  industry: string;
  author?: string;
  popularity?: number;
  timeEstimate?: string;
  elements?: FormElement[];
}

interface SelectedTemplateContextType {
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
}

const SelectedTemplateContext = createContext<SelectedTemplateContextType>({
  selectedTemplate: null,
  setSelectedTemplate: () => {},
});

export const useSelectedTemplate = () => useContext(SelectedTemplateContext);

export const SelectedTemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <SelectedTemplateContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </SelectedTemplateContext.Provider>
  );
};
