
import React, { createContext, useContext, useState, useEffect } from "react";
import { FormMetadata } from "@/types/form";

// Default metadata
const defaultMetadata: FormMetadata = {
  id: crypto.randomUUID(),
  name: "Untitled Form",
  description: "",
  status: "draft",
  responsiblePerson: "Current User",
  lastEditedBy: "Current User",
  lastEditDate: new Date().toISOString(),
  tags: [],
  createdAt: new Date().toISOString(),
};

interface FormMetadataContextType {
  metadata: FormMetadata;
  updateMetadata: (updates: Partial<FormMetadata>) => void;
  resetMetadata: () => void;
}

const FormMetadataContext = createContext<FormMetadataContextType | undefined>(undefined);

export const FormMetadataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metadata, setMetadata] = useState<FormMetadata>(() => {
    const saved = localStorage.getItem("form_metadata");
    return saved ? JSON.parse(saved) : defaultMetadata;
  });

  // Save metadata to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("form_metadata", JSON.stringify(metadata));
  }, [metadata]);

  const updateMetadata = (updates: Partial<FormMetadata>) => {
    setMetadata((prev) => {
      // Auto-update the lastEditDate whenever metadata is changed
      const now = new Date().toISOString();
      return { ...prev, ...updates, lastEditDate: now };
    });
  };

  const resetMetadata = () => {
    setMetadata({
      ...defaultMetadata,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastEditDate: new Date().toISOString(),
    });
  };

  return (
    <FormMetadataContext.Provider value={{ metadata, updateMetadata, resetMetadata }}>
      {children}
    </FormMetadataContext.Provider>
  );
};

export const useFormMetadata = (): FormMetadataContextType => {
  const context = useContext(FormMetadataContext);
  if (!context) {
    throw new Error("useFormMetadata must be used within a FormMetadataProvider");
  }
  return context;
};
