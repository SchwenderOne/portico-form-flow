
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FormElement } from "@/types/form";
import { toast } from "sonner";

type PortoContextType = {
  formTitle: string;
  setFormTitle: (title: string) => void;
  formDescription: string;
  setFormDescription: (description: string) => void;
  isPublished: boolean;
  publishForm: () => void;
  unpublishForm: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  previewMode: boolean;
  togglePreviewMode: () => void;
  saveForm: () => void;
  formElements: FormElement[];
  setFormElements: (elements: FormElement[]) => void;
  currentTemplate: string | null;
  setCurrentTemplate: (templateId: string | null) => void;
};

const defaultContext: PortoContextType = {
  formTitle: "Untitled Form",
  setFormTitle: () => {},
  formDescription: "This is a form description",
  setFormDescription: () => {},
  isPublished: false,
  publishForm: () => {},
  unpublishForm: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  activeSection: "editor",
  setActiveSection: () => {},
  previewMode: false,
  togglePreviewMode: () => {},
  saveForm: () => {},
  formElements: [],
  setFormElements: () => {},
  currentTemplate: null,
  setCurrentTemplate: () => {},
};

const PortoContext = createContext<PortoContextType>(defaultContext);

export const PortoProvider = ({ children }: { children: ReactNode }) => {
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("This is a form description");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("editor");
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);

  const publishForm = () => {
    setIsPublished(true);
    toast.success("Form published successfully!");
  };

  const unpublishForm = () => {
    setIsPublished(false);
    toast.success("Form unpublished");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const saveForm = () => {
    toast.success("Form saved successfully!");
  };

  return (
    <PortoContext.Provider
      value={{
        formTitle,
        setFormTitle,
        formDescription,
        setFormDescription,
        isPublished,
        publishForm,
        unpublishForm,
        isDarkMode,
        toggleDarkMode,
        activeSection,
        setActiveSection,
        previewMode,
        togglePreviewMode,
        saveForm,
        formElements,
        setFormElements,
        currentTemplate,
        setCurrentTemplate,
      }}
    >
      {children}
    </PortoContext.Provider>
  );
};

export const usePorto = () => useContext(PortoContext);
