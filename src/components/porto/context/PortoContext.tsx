
import React, { createContext, useState, useContext, useEffect } from "react";
import { FormElement } from "@/types/form";
import { v4 as uuidv4 } from "uuid";

// Default form data
const defaultFormTitle = "Untitled Form";
const defaultFormDescription = "Please fill out this form";

// Default theme
const defaultTheme = {
  primaryColor: "#9b87f5",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  borderRadius: 8,
};

interface PortoContextType {
  activeSection: "editor" | "templates" | "settings";
  setActiveSection: (section: "editor" | "templates" | "settings") => void;
  previewMode: boolean;
  togglePreviewMode: () => void;
  formTitle: string;
  setFormTitle: (title: string) => void;
  formDescription: string;
  setFormDescription: (description: string) => void;
  formElements: FormElement[];
  setFormElements: (elements: FormElement[]) => void;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
  };
  setTheme: (theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
  }) => void;
  isEdited: boolean;
  lastSaved: Date | null;
  saveForm: () => void;
  currentTemplate: string | null;
  setCurrentTemplate: (templateId: string | null) => void;
}

const PortoContext = createContext<PortoContextType | undefined>(undefined);

export const PortoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI state
  const [activeSection, setActiveSection] = useState<"editor" | "templates" | "settings">("editor");
  const [previewMode, setPreviewMode] = useState(false);
  
  // Form content state
  const [formTitle, setFormTitle] = useState(defaultFormTitle);
  const [formDescription, setFormDescription] = useState(defaultFormDescription);
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  
  // Theme state
  const [theme, setTheme] = useState(defaultTheme);
  
  // Editing state
  const [isEdited, setIsEdited] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Track changes to mark form as edited
  useEffect(() => {
    if (formElements.length > 0) {
      setIsEdited(true);
    }
  }, [formElements, formTitle, formDescription, theme]);
  
  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };
  
  // Save form
  const saveForm = () => {
    setIsEdited(false);
    setLastSaved(new Date());
    
    // In a real app, we would save to backend here
    console.log("Form saved:", {
      title: formTitle,
      description: formDescription,
      elements: formElements,
      theme,
      templateId: currentTemplate
    });
  };
  
  return (
    <PortoContext.Provider
      value={{
        activeSection,
        setActiveSection,
        previewMode,
        togglePreviewMode,
        formTitle,
        setFormTitle,
        formDescription,
        setFormDescription,
        formElements,
        setFormElements,
        theme,
        setTheme,
        isEdited,
        lastSaved,
        saveForm,
        currentTemplate,
        setCurrentTemplate
      }}
    >
      {children}
    </PortoContext.Provider>
  );
};

export const usePorto = (): PortoContextType => {
  const context = useContext(PortoContext);
  
  if (context === undefined) {
    throw new Error("usePorto must be used within a PortoProvider");
  }
  
  return context;
};
