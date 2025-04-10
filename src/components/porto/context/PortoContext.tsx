
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { FormElement } from "@/types/form";
import { toast } from "sonner";

type ThemeSettings = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
};

type BrandingSettings = {
  logo: string | null;
  showLogo: boolean;
  headerBackgroundColor: string;
  customCSS: string;
};

type PrivacySettings = {
  gdprEnabled: boolean;
  dataRetentionDays: number;
  privacyPolicyUrl: string;
  dataAnonymization: boolean;
};

type SubmissionSettings = {
  submitButtonText: string;
  redirectAfterSubmit: boolean;
  redirectUrl: string;
  showThankYouMessage: boolean;
  thankYouMessage: string;
};

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
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  branding: BrandingSettings;
  setBranding: (branding: BrandingSettings) => void;
  privacy: PrivacySettings;
  setPrivacy: (privacy: PrivacySettings) => void;
  submission: SubmissionSettings;
  setSubmission: (submission: SubmissionSettings) => void;
  exportForm: (format: 'json' | 'pdf' | 'html') => void;
  duplicateForm: () => void;
  archiveForm: () => void;
  restoreForm: () => void;
  isArchived: boolean;
  lastSaved: Date | null;
  formVersion: number;
  incrementVersion: () => void;
  isEdited: boolean;
  setIsEdited: (edited: boolean) => void;
  collaborators: string[];
  addCollaborator: (email: string) => void;
  removeCollaborator: (email: string) => void;
};

const defaultTheme: ThemeSettings = {
  primaryColor: "#8B5CF6",
  backgroundColor: "#FFFFFF",
  textColor: "#1A1F2C",
  borderRadius: "4",
  fontFamily: "Inter",
};

const defaultBranding: BrandingSettings = {
  logo: null,
  showLogo: false,
  headerBackgroundColor: "#FFFFFF",
  customCSS: "",
};

const defaultPrivacy: PrivacySettings = {
  gdprEnabled: false,
  dataRetentionDays: 90,
  privacyPolicyUrl: "",
  dataAnonymization: false,
};

const defaultSubmission: SubmissionSettings = {
  submitButtonText: "Submit",
  redirectAfterSubmit: false,
  redirectUrl: "",
  showThankYouMessage: true,
  thankYouMessage: "Thank you for your submission!",
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
  theme: defaultTheme,
  setTheme: () => {},
  branding: defaultBranding,
  setBranding: () => {},
  privacy: defaultPrivacy,
  setPrivacy: () => {},
  submission: defaultSubmission,
  setSubmission: () => {},
  exportForm: () => {},
  duplicateForm: () => {},
  archiveForm: () => {},
  restoreForm: () => {},
  isArchived: false,
  lastSaved: null,
  formVersion: 1,
  incrementVersion: () => {},
  isEdited: false,
  setIsEdited: () => {},
  collaborators: [],
  addCollaborator: () => {},
  removeCollaborator: () => {},
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
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);
  const [privacy, setPrivacy] = useState<PrivacySettings>(defaultPrivacy);
  const [submission, setSubmission] = useState<SubmissionSettings>(defaultSubmission);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formVersion, setFormVersion] = useState<number>(1);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [collaborators, setCollaborators] = useState<string[]>([]);

  // When form elements change, mark the form as edited
  useEffect(() => {
    if (formElements.length > 0) {
      setIsEdited(true);
    }
  }, [formElements]);

  const publishForm = () => {
    setIsPublished(true);
    saveForm();
    toast.success("Form published successfully!");
  };

  const unpublishForm = () => {
    setIsPublished(false);
    saveForm();
    toast.success("Form unpublished");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const saveForm = () => {
    setLastSaved(new Date());
    setIsEdited(false);
    toast.success("Form saved successfully!");
  };

  const exportForm = (format: 'json' | 'pdf' | 'html') => {
    // In a real implementation, this would handle exporting the form
    toast.success(`Form exported as ${format.toUpperCase()}`);
  };

  const duplicateForm = () => {
    // In a real implementation, this would duplicate the form
    setFormTitle(`${formTitle} (Copy)`);
    toast.success("Form duplicated successfully");
  };

  const archiveForm = () => {
    setIsArchived(true);
    toast.success("Form archived");
  };

  const restoreForm = () => {
    setIsArchived(false);
    toast.success("Form restored from archive");
  };

  const incrementVersion = () => {
    setFormVersion(prevVersion => prevVersion + 1);
  };

  const addCollaborator = (email: string) => {
    setCollaborators(prev => [...prev, email]);
    toast.success(`${email} added as collaborator`);
  };

  const removeCollaborator = (email: string) => {
    setCollaborators(prev => prev.filter(e => e !== email));
    toast.success(`${email} removed from collaborators`);
  };

  // Auto-save functionality
  useEffect(() => {
    if (isEdited) {
      const autoSaveTimer = setTimeout(() => {
        saveForm();
      }, 30000); // Auto-save after 30 seconds of changes
      
      return () => clearTimeout(autoSaveTimer);
    }
  }, [isEdited]);

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
        theme,
        setTheme,
        branding,
        setBranding,
        privacy,
        setPrivacy,
        submission,
        setSubmission,
        exportForm,
        duplicateForm,
        archiveForm,
        restoreForm,
        isArchived,
        lastSaved,
        formVersion,
        incrementVersion,
        isEdited,
        setIsEdited,
        collaborators,
        addCollaborator,
        removeCollaborator,
      }}
    >
      {children}
    </PortoContext.Provider>
  );
};

export const usePorto = () => useContext(PortoContext);
