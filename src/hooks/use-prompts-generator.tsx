
import { useState } from "react";
import { FormElement } from "@/types/form";
import { generateFormFromPrompt } from "@/services/ai-form-generator";

export const usePromptsGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateForm = async (prompt: string): Promise<FormElement[]> => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return [];
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const generatedElements = await generateFormFromPrompt(prompt);
      return generatedElements;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate form";
      setError(errorMessage);
      console.error("Error generating form:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    generateForm,
    loading,
    error,
    setError
  };
};
