
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

// New function to generate field suggestions based on form context
export const generateFieldSuggestions = async (
  formTitle: string,
  formDescription: string,
  additionalContext: string,
  existingElements: FormElement[]
): Promise<FormElement[]> => {
  try {
    // Extract existing field names and types for context
    const existingFieldInfo = existingElements
      .filter(e => e.type !== 'header' && e.type !== 'paragraph')
      .map(e => `${e.label || ''} (${e.type})`)
      .join(', ');
    
    // Build a prompt for the AI
    const prompt = `
      Generate relevant form fields for a form with:
      Title: "${formTitle}"
      Description: "${formDescription}"
      Additional context: "${additionalContext}"
      
      The form already has these fields: ${existingFieldInfo || 'none yet'}
      
      Suggest additional fields that would make this a more complete form.
    `;
    
    // Try to use OpenRouter first
    try {
      const suggestions = await generateFormWithOpenRouter(prompt);
      
      if (suggestions && suggestions.length > 0) {
        // Filter out duplicates based on label or similar fields
        return filterDuplicateSuggestions(suggestions, existingElements);
      }
    } catch (error) {
      console.error("Error using OpenRouter for suggestions:", error);
    }
    
    // Fall back to mock suggestions if OpenRouter fails
    const mockSuggestions = generateMockSuggestions(formTitle, formDescription, existingElements);
    return filterDuplicateSuggestions(mockSuggestions, existingElements);
  } catch (error) {
    console.error("Error generating field suggestions:", error);
    return [];
  }
};

// Helper function to filter out suggestions that duplicate existing fields
const filterDuplicateSuggestions = (
  suggestions: FormElement[],
  existingElements: FormElement[]
): FormElement[] => {
  const existingLabels = new Set(
    existingElements
      .filter(e => e.label)
      .map(e => e.label?.toLowerCase())
  );
  
  return suggestions.filter(suggestion => {
    // Skip if no label (unlikely but possible)
    if (!suggestion.label) return false;
    
    // Check for exact label match
    if (existingLabels.has(suggestion.label.toLowerCase())) return false;
    
    // Check for similar labels (e.g., "Email" vs "Email Address")
    for (const existingLabel of existingLabels) {
      if (existingLabel && suggestion.label.toLowerCase().includes(existingLabel)) return false;
      if (existingLabel && existingLabel.includes(suggestion.label.toLowerCase())) return false;
    }
    
    return true;
  });
};

// Mock implementation for field suggestions when API is unavailable
const generateMockSuggestions = (
  formTitle: string,
  formDescription: string,
  existingElements: FormElement[]
): FormElement[] => {
  const lowerTitle = formTitle.toLowerCase();
  const lowerDescription = formDescription.toLowerCase();
  const suggestions: FormElement[] = [];
  
  // Already used field types
  const usedTypes = new Set(existingElements.map(e => e.type));
  
  // Check if a field with similar label already exists
  const hasField = (label: string): boolean => {
    const lowerLabel = label.toLowerCase();
    return existingElements.some(e => 
      e.label && e.label.toLowerCase().includes(lowerLabel)
    );
  };
  
  // Common field suggestions based on form type
  if (
    lowerTitle.includes('contact') || 
    lowerDescription.includes('contact') ||
    lowerTitle.includes('reach') ||
    lowerDescription.includes('get in touch')
  ) {
    if (!hasField('name') && !hasField('full name')) {
      suggestions.push(createSuggestion('text', 'Full Name', 'Enter your full name', true));
    }
    if (!hasField('email') && !hasField('mail')) {
      suggestions.push(createSuggestion('email', 'Email Address', 'Enter your email address', true));
    }
    if (!hasField('phone') && !hasField('number')) {
      suggestions.push(createSuggestion('phone', 'Phone Number', 'Enter your phone number', false));
    }
    if (!hasField('message')) {
      suggestions.push(createSuggestion('textarea', 'Message', 'Enter your message here...', true));
    }
  }
  
  if (
    lowerTitle.includes('registration') || 
    lowerTitle.includes('signup') ||
    lowerDescription.includes('account')
  ) {
    if (!hasField('name') && !hasField('full name')) {
      suggestions.push(createSuggestion('text', 'Full Name', 'Enter your full name', true));
    }
    if (!hasField('email') && !hasField('mail')) {
      suggestions.push(createSuggestion('email', 'Email Address', 'Enter your email address', true));
    }
    if (!hasField('password')) {
      suggestions.push(createSuggestion('password', 'Password', 'Create a secure password', true));
    }
    if (!hasField('confirm') && !hasField('verification')) {
      suggestions.push(createSuggestion('password', 'Confirm Password', 'Confirm your password', true));
    }
  }
  
  if (
    lowerTitle.includes('feedback') || 
    lowerTitle.includes('survey') ||
    lowerDescription.includes('opinion') ||
    lowerDescription.includes('feedback')
  ) {
    if (!hasField('rating') && !hasField('score')) {
      suggestions.push(createSuggestion('radio', 'Rating', undefined, true, ['1 - Poor', '2 - Fair', '3 - Good', '4 - Very Good', '5 - Excellent']));
    }
    if (!hasField('recommend')) {
      suggestions.push(createSuggestion('radio', 'Would you recommend us?', undefined, false, ['Yes, definitely', 'Maybe', 'No']));
    }
    if (!hasField('comments') && !hasField('feedback') && !usedTypes.has('textarea')) {
      suggestions.push(createSuggestion('textarea', 'Additional Comments', 'Share your thoughts...', false));
    }
  }
  
  if (
    lowerTitle.includes('event') || 
    lowerDescription.includes('event') ||
    lowerTitle.includes('rsvp')
  ) {
    if (!hasField('name') && !hasField('full name')) {
      suggestions.push(createSuggestion('text', 'Full Name', 'Enter your full name', true));
    }
    if (!hasField('email') && !hasField('mail')) {
      suggestions.push(createSuggestion('email', 'Email Address', 'Enter your email address', true));
    }
    if (!hasField('attend') && !hasField('attending')) {
      suggestions.push(createSuggestion('radio', 'Will you attend?', undefined, true, ['Yes', 'No', 'Maybe']));
    }
    if (!hasField('guest') && !hasField('additional')) {
      suggestions.push(createSuggestion('number', 'Number of Guests', 'How many guests will accompany you?', false));
    }
    if (!hasField('diet') && !hasField('dietary') && !hasField('food')) {
      suggestions.push(createSuggestion('textarea', 'Dietary Requirements', 'Let us know about any dietary restrictions', false));
    }
  }
  
  if (
    lowerTitle.includes('job') || 
    lowerTitle.includes('application') ||
    lowerTitle.includes('career') ||
    lowerDescription.includes('resume')
  ) {
    if (!hasField('name') && !hasField('full name')) {
      suggestions.push(createSuggestion('text', 'Full Name', 'Enter your full name', true));
    }
    if (!hasField('email') && !hasField('mail')) {
      suggestions.push(createSuggestion('email', 'Email Address', 'Enter your email address', true));
    }
    if (!hasField('phone') && !hasField('number')) {
      suggestions.push(createSuggestion('phone', 'Phone Number', 'Enter your phone number', true));
    }
    if (!hasField('resume') && !hasField('cv')) {
      suggestions.push(createSuggestion('file', 'Resume/CV', 'Upload your resume (PDF preferred)', true));
    }
    if (!hasField('experience') && !hasField('years')) {
      suggestions.push(createSuggestion('select', 'Years of Experience', 'Select your experience level', false, [
        'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', 'More than 10 years'
      ]));
    }
  }
  
  // Generic suggestions if nothing specific was found or few suggestions
  if (suggestions.length < 2) {
    if (!hasField('name') && !hasField('full name')) {
      suggestions.push(createSuggestion('text', 'Full Name', 'Enter your full name', true));
    }
    if (!hasField('email') && !hasField('mail')) {
      suggestions.push(createSuggestion('email', 'Email Address', 'Enter your email address', true));
    }
  }
  
  return suggestions;
};

// Helper to create a suggestion with default values
const createSuggestion = (
  type: string,
  label: string,
  placeholder?: string,
  required?: boolean,
  options?: string[]
): FormElement => {
  const suggestion: FormElement = {
    id: `suggestion-${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    type,
    label,
    placeholder,
    required: required || false,
    position: { x: 100, y: 100 },
    size: { 
      width: 500, 
      height: type === 'header' || type === 'paragraph' ? 60 : 
              type === 'checkbox' || type === 'radio' ? 100 : 
              type === 'textarea' ? 120 :
              type === 'file' ? 120 : 80 
    },
    groupId: null,
    helpText: getHelpTextForType(type, label)
  };
  
  if (options && ['select', 'radio', 'checkbox'].includes(type)) {
    (suggestion as any).options = options;
  }
  
  return suggestion;
};

// Generate helpful help text based on field type
const getHelpTextForType = (type: string, label: string): string | undefined => {
  switch (type) {
    case 'email':
      return 'Please enter a valid email address';
    case 'password':
      return 'Use at least 8 characters with a mix of letters, numbers, and symbols';
    case 'file':
      return 'Accepted formats: PDF, DOC, DOCX (Max 5MB)';
    case 'phone':
      return 'Enter your phone number with country code if applicable';
    case 'date':
      return 'Select a date from the calendar';
    default:
      return undefined;
  }
};
