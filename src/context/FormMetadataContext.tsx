
import React, { createContext, useContext, useState, useEffect } from "react";
import { FormMetadata } from "@/types/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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
  saveMetadata: () => Promise<void>;
  isLoading: boolean;
}

const FormMetadataContext = createContext<FormMetadataContextType | undefined>(undefined);

export const FormMetadataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metadata, setMetadata] = useState<FormMetadata>(() => {
    const saved = localStorage.getItem("form_metadata");
    return saved ? JSON.parse(saved) : defaultMetadata;
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Save metadata to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("form_metadata", JSON.stringify(metadata));
  }, [metadata]);

  const updateMetadata = (updates: Partial<FormMetadata>) => {
    setMetadata((prev) => {
      // Auto-update the lastEditDate whenever metadata is changed
      const now = new Date().toISOString();
      return { 
        ...prev, 
        ...updates, 
        lastEditDate: now,
        lastEditedBy: user?.email || prev.lastEditedBy 
      };
    });
  };

  const resetMetadata = () => {
    setMetadata({
      ...defaultMetadata,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastEditDate: new Date().toISOString(),
      responsiblePerson: user?.email || "Current User",
      lastEditedBy: user?.email || "Current User",
    });
  };

  const saveMetadata = async () => {
    if (!user) {
      toast.error("You must be logged in to save forms");
      return;
    }

    setIsLoading(true);
    try {
      // Check if form already exists in Supabase
      const { data: existingForm, error: fetchError } = await supabase
        .from('forms')
        .select()
        .eq('id', metadata.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Convert status from our format to Supabase format
      const status = metadata.status === 'review' ? 'draft' : metadata.status;

      if (existingForm) {
        // Update existing form
        const { error } = await supabase
          .from('forms')
          .update({
            title: metadata.name,
            description: metadata.description,
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', metadata.id);

        if (error) throw error;
      } else {
        // Create new form
        const { error } = await supabase
          .from('forms')
          .insert({
            id: metadata.id,
            title: metadata.name,
            description: metadata.description,
            status,
            created_by: user.id
          });

        if (error) throw error;
      }

      toast.success("Form metadata saved");
    } catch (error: any) {
      toast.error("Failed to save form metadata", { description: error.message });
      console.error("Error saving form metadata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormMetadataContext.Provider value={{ metadata, updateMetadata, resetMetadata, saveMetadata, isLoading }}>
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
