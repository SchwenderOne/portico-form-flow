
import { FormElement } from "@/types/form";
import { generateFieldFromPrompt } from "./ai-field-generator";
import { generateFormWithOpenRouter } from "./openrouter-service";
import { fallbackGenerateForm } from "./form-generators/mock-form-generator";

// This function now uses the OpenRouter API to generate forms
export const generateFormFromPrompt = async (prompt: string): Promise<FormElement[]> => {
  try {
    // Use the OpenRouter service for form generation
    const elements = await generateFormWithOpenRouter(prompt);
    
    // If we got a valid response with elements, return them
    if (elements && elements.length > 0) {
      return elements;
    }
    
    // Fallback to the mock implementation if OpenRouter fails or returns empty
    console.log("Falling back to mock form generation");
    return fallbackGenerateForm(prompt);
  } catch (error) {
    console.error("Error in form generation:", error);
    // Fallback to mock implementation in case of errors
    return fallbackGenerateForm(prompt);
  }
};
