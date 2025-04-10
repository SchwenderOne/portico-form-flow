
import React, { createContext, useState, useContext, useEffect } from "react";
import { FormElement } from "@/types/form";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

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
  // Add missing properties needed by components
  isPublished: boolean;
  publishForm: () => void;
  unpublishForm: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  exportForm: (format: 'json' | 'pdf' | 'html') => void;
  saveFormAsTemplate: () => void;
}

const PortoContext = createContext<PortoContextType | undefined>(undefined);

export const PortoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI state
  const [activeSection, setActiveSection] = useState<"editor" | "templates" | "settings">("editor");
  const [previewMode, setPreviewMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Form content state
  const [formTitle, setFormTitle] = useState(defaultFormTitle);
  const [formDescription, setFormDescription] = useState(defaultFormDescription);
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  
  // Publication state
  const [isPublished, setIsPublished] = useState(false);
  
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
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
    
    toast.success("Form saved successfully");
  };
  
  // Publish form
  const publishForm = () => {
    setIsPublished(true);
    saveForm();
    toast.success("Form published successfully");
  };
  
  // Unpublish form
  const unpublishForm = () => {
    setIsPublished(false);
    toast.info("Form unpublished");
  };
  
  // Export form to different formats
  const exportForm = (format: 'json' | 'pdf' | 'html') => {
    // In a real app, we would implement format-specific export logic
    toast.success(`Form exported as ${format.toUpperCase()}`);
  };
  
  // Save form as template
  const saveFormAsTemplate = () => {
    // In a real app, we would save this form as a template in the database
    toast.success("Form saved as template");
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
        setCurrentTemplate,
        isPublished,
        publishForm,
        unpublishForm,
        isDarkMode,
        toggleDarkMode,
        exportForm,
        saveFormAsTemplate
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
