
import { FormElement } from "@/types/form";
import { generateFieldFromPrompt } from "./ai-field-generator";

// This is a mock implementation for generating a complete form from a prompt
export const generateFormFromPrompt = async (prompt: string): Promise<FormElement[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerPrompt = prompt.toLowerCase();
  const elements: FormElement[] = [];
  let yPosition = 50;
  
  // 1. Start with a header
  const headerElement: FormElement = {
    id: `header-${Date.now()}`,
    type: "header",
    position: { x: 100, y: yPosition },
    size: { width: 500, height: 60 },
    groupId: null,
    content: extractFormTitle(prompt)
  };
  elements.push(headerElement);
  yPosition += headerElement.size.height + 20;
  
  // 2. Add a description paragraph if relevant
  if (shouldAddDescription(prompt)) {
    const paragraphElement: FormElement = {
      id: `paragraph-${Date.now()}`,
      type: "paragraph",
      position: { x: 100, y: yPosition },
      size: { width: 500, height: 60 },
      groupId: null,
      content: generateFormDescription(prompt)
    };
    elements.push(paragraphElement);
    yPosition += paragraphElement.size.height + 30;
  }
  
  // 3. Generate form fields based on prompt analysis
  const fieldTypes = analyzePromptForFields(prompt);
  
  for (const fieldType of fieldTypes) {
    // Use the existing field generator with context-specific prompts
    const field = await generateFieldFromPrompt(`Add a ${fieldType.label} field`);
    
    // Customize the field further based on contextual information
    if (fieldType.customization) {
      Object.assign(field, fieldType.customization);
    }
    
    // Update position for proper layout
    field.position = { x: 100, y: yPosition };
    
    // Add to elements array
    elements.push(field);
    
    // Update Y position for next element
    yPosition += field.size.height + 20;
  }
  
  return elements;
};

// Helper function to extract a title from the prompt
function extractFormTitle(prompt: string): string {
  // Search for keywords that indicate what type of form this is
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("contact")) return "Contact Form";
  if (lowerPrompt.includes("feedback") || lowerPrompt.includes("survey")) return "Feedback Form";
  if (lowerPrompt.includes("registration")) return "Registration Form";
  if (lowerPrompt.includes("application")) return "Application Form";
  if (lowerPrompt.includes("subscribe") || lowerPrompt.includes("newsletter")) return "Subscription Form";
  if (lowerPrompt.includes("event")) return "Event Registration";
  if (lowerPrompt.includes("customer")) return "Customer Information";
  if (lowerPrompt.includes("booking") || lowerPrompt.includes("reservation")) return "Booking Form";
  
  // Default for unrecognized form types
  return "New Form";
}

// Helper function to determine if we should add a description paragraph
function shouldAddDescription(prompt: string): boolean {
  const complexity = prompt.split(" ").length;
  return complexity > 8; // Only add descriptions for more complex prompts
}

// Helper function to generate a form description
function generateFormDescription(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("feedback")) {
    return "We value your feedback. Please take a moment to share your thoughts with us.";
  }
  
  if (lowerPrompt.includes("application")) {
    return "Complete the following information to submit your application.";
  }
  
  if (lowerPrompt.includes("registration")) {
    return "Please fill out this form to complete your registration.";
  }
  
  if (lowerPrompt.includes("contact")) {
    return "Fill out this form and we'll get back to you as soon as possible.";
  }
  
  if (lowerPrompt.includes("event")) {
    return "Register for our upcoming event by providing your information below.";
  }
  
  // Default description
  return "Please fill out the form below.";
}

// Helper function to analyze the prompt and determine what fields should be included
function analyzePromptForFields(prompt: string): Array<{
  type: string;
  label: string;
  customization?: Partial<FormElement>;
}> {
  const lowerPrompt = prompt.toLowerCase();
  const fields = [];
  
  // Common patterns for fields that might be mentioned in the prompt
  const fieldPatterns = [
    { keywords: ["name", "full name"], type: "text", label: "name" },
    { keywords: ["email", "e-mail", "mail"], type: "email", label: "email" },
    { keywords: ["phone", "telephone", "contact number", "mobile"], type: "tel", label: "phone" },
    { keywords: ["address", "location"], type: "textarea", label: "address" },
    { keywords: ["comment", "feedback", "message", "additional information"], type: "textarea", label: "comments" },
    { keywords: ["date", "birth", "dob"], type: "date", label: "date" },
    { keywords: ["rating", "stars", "score"], type: "radio", label: "rating" },
    { keywords: ["gender"], type: "radio", label: "gender" },
    { keywords: ["select", "choose", "option", "dropdown"], type: "select", label: "options" },
    { keywords: ["file", "upload", "attachment", "document"], type: "file", label: "upload" },
    { keywords: ["checkbox", "agree", "terms", "consent"], type: "checkbox", label: "agreement" },
    { keywords: ["number", "quantity", "amount"], type: "number", label: "number" }
  ];
  
  // Check for presence of specific field patterns
  for (const pattern of fieldPatterns) {
    if (pattern.keywords.some(keyword => lowerPrompt.includes(keyword))) {
      fields.push({
        type: pattern.type,
        label: pattern.label
      });
    }
  }
  
  // If we detect a contact form, ensure it has the essential fields
  if (lowerPrompt.includes("contact") && fields.length < 3) {
    const hasName = fields.some(f => f.label === "name");
    const hasEmail = fields.some(f => f.label === "email");
    const hasMessage = fields.some(f => f.label === "comments");
    
    if (!hasName) fields.push({ type: "text", label: "name" });
    if (!hasEmail) fields.push({ type: "email", label: "email" });
    if (!hasMessage) fields.push({ type: "textarea", label: "comments" });
  }
  
  // If we detect a feedback form, ensure it has rating and comment fields
  if (lowerPrompt.includes("feedback") || lowerPrompt.includes("survey")) {
    const hasRating = fields.some(f => f.label === "rating");
    const hasComments = fields.some(f => f.label === "comments");
    
    if (!hasRating) {
      fields.push({ 
        type: "radio", 
        label: "rating",
        customization: {
          label: "How would you rate your experience?",
          options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"]
        }
      });
    }
    
    if (!hasComments) {
      fields.push({ 
        type: "textarea", 
        label: "comments",
        customization: {
          label: "Additional Comments",
          placeholder: "Please share any additional feedback here..."
        }
      });
    }
  }
  
  // If form is empty (no fields detected), add some default fields
  if (fields.length === 0) {
    fields.push({ type: "text", label: "name" });
    fields.push({ type: "email", label: "email" });
    fields.push({ type: "textarea", label: "comments" });
  }
  
  return fields;
}
