
import { FormElement } from "@/types/form";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// This is a mock implementation that simulates AI field generation
// In a real application, this would call an AI service
export const generateFieldSuggestions = async (
  formTitle: string,
  formDescription: string,
  additionalContext: string,
  existingElements: FormElement[]
): Promise<FormElement[]> => {
  try {
    console.log("Generating AI field suggestions for:", { 
      formTitle, 
      formDescription, 
      additionalContext,
      existingElementsCount: existingElements.length 
    });
    
    // In a production app, this would be an API call to an AI service
    // For demo purposes, we'll generate contextual suggestions based on the form title and description
    
    const suggestions: FormElement[] = [];
    const existingFieldTypes = new Set(existingElements.map(e => e.type));
    const existingLabels = new Set(existingElements.map(e => e.label?.toLowerCase()));
    
    // Simple contextual rules for different form types
    if (formTitle.toLowerCase().includes("contact") || formDescription.toLowerCase().includes("contact")) {
      if (!existingLabels.has("full name") && !existingLabels.has("name")) {
        suggestions.push(createSuggestionElement("text", "Full Name", "Please enter your full name"));
      }
      if (!existingLabels.has("email") && !existingLabels.has("email address")) {
        suggestions.push(createSuggestionElement("email", "Email Address", "Your email address for correspondence"));
      }
      if (!existingLabels.has("message") && !existingLabels.has("comments")) {
        suggestions.push(createSuggestionElement("textarea", "Message", "How can we help you?"));
      }
    }
    
    if (formTitle.toLowerCase().includes("registration") || formDescription.toLowerCase().includes("registration")) {
      if (!existingLabels.has("username")) {
        suggestions.push(createSuggestionElement("text", "Username", "Choose a unique username"));
      }
      if (!existingLabels.has("password")) {
        suggestions.push(createSuggestionElement("password", "Password", "Choose a secure password"));
      }
      if (!existingLabels.has("confirm password")) {
        suggestions.push(createSuggestionElement("password", "Confirm Password", "Confirm your password"));
      }
    }
    
    if (formTitle.toLowerCase().includes("survey") || formDescription.toLowerCase().includes("survey") || formDescription.toLowerCase().includes("feedback")) {
      if (!existingLabels.has("rating")) {
        suggestions.push(createSuggestionElement("select", "Rating", "How would you rate your experience?", undefined, ["Select a rating", "Excellent", "Good", "Average", "Poor", "Very Poor"]));
      }
      if (!existingLabels.has("feedback") && !existingLabels.has("comments")) {
        suggestions.push(createSuggestionElement("textarea", "Feedback", "Please share your thoughts with us"));
      }
    }
    
    if (formTitle.toLowerCase().includes("event") || formDescription.toLowerCase().includes("event")) {
      if (!existingLabels.has("event name") && !existingLabels.has("name")) {
        suggestions.push(createSuggestionElement("text", "Event Name", "Name of the event you're registering for"));
      }
      if (!existingLabels.has("date") && !existingLabels.has("event date")) {
        suggestions.push(createSuggestionElement("date", "Event Date", "Date of the event"));
      }
      if (!existingLabels.has("attendees") && !existingLabels.has("number of attendees")) {
        suggestions.push(createSuggestionElement("number", "Number of Attendees", "How many people will be attending?"));
      }
    }
    
    if (formTitle.toLowerCase().includes("application") || formDescription.toLowerCase().includes("application") || formDescription.toLowerCase().includes("job")) {
      if (!existingLabels.has("resume") && !existingLabels.has("cv")) {
        suggestions.push(createSuggestionElement("file", "Resume/CV", "Upload your resume or CV"));
      }
      if (!existingLabels.has("cover letter")) {
        suggestions.push(createSuggestionElement("textarea", "Cover Letter", "Tell us why you're interested in this position"));
      }
      if (!existingLabels.has("experience") && !existingLabels.has("years of experience")) {
        suggestions.push(createSuggestionElement("number", "Years of Experience", "How many years of relevant experience do you have?"));
      }
    }
    
    // Check if we have any suggestions
    if (suggestions.length === 0) {
      // If no contextual suggestions, add some general fields
      if (!existingFieldTypes.has("text")) {
        suggestions.push(createSuggestionElement("text", "Name", "Your full name"));
      }
      if (!existingFieldTypes.has("email")) {
        suggestions.push(createSuggestionElement("email", "Email Address", "Your email address"));
      }
      if (!existingFieldTypes.has("textarea")) {
        suggestions.push(createSuggestionElement("textarea", "Comments", "Additional comments or information"));
      }
    }
    
    // Simulate delay for a more realistic AI experience
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return suggestions;
    
  } catch (error) {
    console.error("Error generating field suggestions:", error);
    toast.error("Failed to generate field suggestions");
    return [];
  }
};

function createSuggestionElement(
  type: string,
  label: string,
  helpText: string,
  required: boolean = false,
  options?: string[]
): FormElement {
  const element: FormElement = {
    id: `ai-suggestion-${uuidv4()}`,
    type,
    label,
    helpText,
    required,
    position: { x: 0, y: 0 },
    size: { 
      width: 500, 
      height: type === 'textarea' ? 120 : type === 'file' ? 100 : 80 
    },
    placeholder: `Enter ${label.toLowerCase()}...`,
    groupId: null
  };
  
  if (options && (type === 'select' || type === 'radio' || type === 'checkbox')) {
    element.options = options;
  }
  
  return element;
}
