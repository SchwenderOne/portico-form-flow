
import { FormElement } from "@/types/form";

// This is a mock implementation of AI field generation
// In a real application, this would connect to an AI service
export const generateFieldFromPrompt = async (prompt: string): Promise<FormElement> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Pattern matching for common field types based on the prompt
  let fieldType = "text";
  let fieldLabel = "";
  let fieldPlaceholder = "";
  let fieldRequired = false;
  let fieldHelpText = "";
  let fieldOptions: string[] = [];
  let fieldValidation = undefined;
  
  // Extract likely field label from prompt
  if (lowerPrompt.includes("field for")) {
    const match = prompt.match(/field for\s+([^,\.]+)/i);
    if (match && match[1]) {
      fieldLabel = match[1].trim();
      // Capitalize first letter
      fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1);
    }
  } else if (lowerPrompt.includes("add a")) {
    const match = prompt.match(/add a\s+([^,\.]+)/i);
    if (match && match[1]) {
      fieldLabel = match[1].trim();
      // Capitalize first letter
      fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1);
    }
  }
  
  // If no label was extracted, use a generic one
  if (!fieldLabel) {
    fieldLabel = "New Field";
  }
  
  // Determine field type based on prompt keywords
  if (lowerPrompt.includes("email")) {
    fieldType = "email";
    fieldPlaceholder = "Enter your email address";
    fieldValidation = {
      type: "email",
      message: "Please enter a valid email address"
    };
  } else if (lowerPrompt.includes("password")) {
    fieldType = "password";
    fieldPlaceholder = "Enter a secure password";
  } else if (lowerPrompt.includes("phone")) {
    fieldType = "tel";
    fieldPlaceholder = "Enter your phone number";
  } else if (lowerPrompt.includes("date") || lowerPrompt.includes("birthday")) {
    fieldType = "date";
    fieldPlaceholder = "Select a date";
  } else if (lowerPrompt.includes("checkbox") || lowerPrompt.includes("agree") || lowerPrompt.includes("accept")) {
    fieldType = "checkbox";
    if (lowerPrompt.includes("terms")) {
      fieldLabel = "I agree to the terms and conditions";
    }
  } else if (lowerPrompt.includes("dropdown") || lowerPrompt.includes("select")) {
    fieldType = "select";
    fieldPlaceholder = "Select an option";
    
    // Try to extract options from the prompt
    if (lowerPrompt.includes("options:")) {
      const optionsMatch = lowerPrompt.match(/options:\s*([^\.]+)/i);
      if (optionsMatch && optionsMatch[1]) {
        fieldOptions = optionsMatch[1].split(',').map(opt => opt.trim());
      }
    }
    
    // Default options if none specified
    if (fieldOptions.length === 0) {
      fieldOptions = ["Option 1", "Option 2", "Option 3"];
    }
  } else if (lowerPrompt.includes("textarea") || lowerPrompt.includes("comments") || lowerPrompt.includes("feedback") || lowerPrompt.includes("description")) {
    fieldType = "textarea";
    fieldPlaceholder = "Enter your comments here...";
  } else if (lowerPrompt.includes("number") || lowerPrompt.includes("age") || lowerPrompt.includes("quantity")) {
    fieldType = "number";
    fieldPlaceholder = "Enter a number";
    
    if (lowerPrompt.includes("age")) {
      fieldLabel = "Age";
      fieldPlaceholder = "Enter your age";
      fieldValidation = {
        type: "number",
        min: 0,
        max: 120
      };
    }
  } else if (lowerPrompt.includes("file") || lowerPrompt.includes("upload")) {
    fieldType = "file";
    fieldPlaceholder = "Select a file to upload";
    
    if (lowerPrompt.includes("image") || lowerPrompt.includes("photo")) {
      fieldLabel = fieldLabel || "Upload Image";
      fieldHelpText = "Upload an image file (JPEG, PNG, GIF)";
    } else if (lowerPrompt.includes("document") || lowerPrompt.includes("pdf")) {
      fieldLabel = fieldLabel || "Upload Document";
      fieldHelpText = "Upload a document file (PDF, DOC, DOCX)";
    }
  } else if (lowerPrompt.includes("radio") || lowerPrompt.includes("choice")) {
    fieldType = "radio";
    
    // Try to extract options from the prompt
    if (lowerPrompt.includes("options:")) {
      const optionsMatch = lowerPrompt.match(/options:\s*([^\.]+)/i);
      if (optionsMatch && optionsMatch[1]) {
        fieldOptions = optionsMatch[1].split(',').map(opt => opt.trim());
      }
    }
    
    // Default options if none specified
    if (fieldOptions.length === 0) {
      fieldOptions = ["Option 1", "Option 2", "Option 3"];
    }
  } else if (lowerPrompt.includes("rating") || lowerPrompt.includes("star")) {
    fieldType = "radio";
    fieldLabel = fieldLabel || "Rating";
    
    if (lowerPrompt.includes("5-star") || lowerPrompt.includes("5 star")) {
      fieldOptions = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
    } else if (lowerPrompt.includes("10")) {
      fieldOptions = Array.from({length: 10}, (_, i) => `${i+1}`);
    } else {
      fieldOptions = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
    }
  } else if (lowerPrompt.includes("header") || lowerPrompt.includes("title")) {
    fieldType = "header";
    fieldLabel = fieldLabel || "Section Header";
  } else if (lowerPrompt.includes("paragraph")) {
    fieldType = "paragraph";
    fieldLabel = "Information Text";
  }
  
  // Determine if field should be required
  if (lowerPrompt.includes("required") || lowerPrompt.includes("mandatory") || lowerPrompt.includes("must")) {
    fieldRequired = true;
  }
  
  // Extract help text if mentioned
  if (lowerPrompt.includes("help text:")) {
    const helpTextMatch = prompt.match(/help text:\s*([^\.]+)/i);
    if (helpTextMatch && helpTextMatch[1]) {
      fieldHelpText = helpTextMatch[1].trim();
    }
  }
  
  // Create the form element object
  const newElement: FormElement = {
    id: `${fieldType}-${Date.now()}`,
    type: fieldType,
    position: {
      x: 100,
      y: 100 // This will be adjusted when adding to canvas
    },
    size: { 
      width: 500, 
      height: fieldType === 'header' || fieldType === 'paragraph' ? 60 : 
              fieldType === 'checkbox' || fieldType === 'radio' ? 100 : 
              fieldType === 'file' ? 120 : 80 
    },
    label: fieldLabel,
    placeholder: fieldPlaceholder,
    required: fieldRequired,
    groupId: null,
    helpText: fieldHelpText || undefined
  };
  
  // Add type-specific properties
  if (fieldType === 'header' || fieldType === 'paragraph') {
    (newElement as any).content = fieldType === 'header' ? fieldLabel : "Add explanatory text here...";
  }
  
  if (fieldOptions.length > 0 && (fieldType === 'select' || fieldType === 'checkbox' || fieldType === 'radio')) {
    (newElement as any).options = fieldOptions;
  }
  
  if (fieldValidation) {
    newElement.validation = fieldValidation;
  }
  
  return newElement;
};
