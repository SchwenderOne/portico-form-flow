
import { FormElement } from "@/types/form";
import { toast } from "sonner";

// The API key should ideally be stored in a secure environment variable
const OPENROUTER_API_KEY = "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";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

export async function generateFormWithOpenRouter(prompt: string): Promise<FormElement[]> {
  try {
    console.log("Generating form with OpenRouter, prompt:", prompt);
    
    // Enhanced system prompt for form generation
    const systemPrompt = `
You are an AI assistant specialized in creating form schemas for a form builder application.
Your task is to generate form fields based on the user's request.

For each form field, provide the following information in a valid JSON format:
- type: The type of field (e.g., text, email, number, select, radio, checkbox, textarea, header, paragraph)
- label: A descriptive label for the field
- placeholder: A helpful placeholder text (if applicable)
- required: Whether the field is required (true/false)
- helpText: Additional guidance for users (if needed)
- options: An array of options for select/radio/checkbox fields (if applicable)

Output ONLY valid JSON that can be parsed directly. The JSON should be an array of form field objects.
Example format:
[
  {
    "type": "header",
    "content": "Form Title"
  },
  {
    "type": "text",
    "label": "Full Name",
    "placeholder": "Enter your full name",
    "required": true
  }
]
`;

    // Check if API key is available
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key is missing");
      throw new Error("API credentials are not configured");
    }

    console.log("Sending request to OpenRouter API...");
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin, // Required for OpenRouter
        "X-Title": "Portico Form Builder" // Identify your application
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",  // Using Mistral 7B Instruct model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a form with these requirements: ${prompt}` }
        ],
        temperature: 0.3, // Lower temperature for more consistent results
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error response:", errorData);
      throw new Error(errorData.error?.message || "Failed to connect to AI service");
    }

    const data = await response.json() as OpenRouterResponse;
    console.log("OpenRouter API response received:", data);
    
    const aiResponse = data.choices?.[0]?.message?.content || "";

    // Extract the JSON part from the response
    let jsonMatch = aiResponse.match(/\[\s*\{.*\}\s*\]/s);
    
    // If no direct match, look for JSON with backticks or code blocks
    if (!jsonMatch) {
      jsonMatch = aiResponse.match(/```(?:json)?\s*(\[\s*\{.*\}\s*\])\s*```/s);
      if (jsonMatch) {
        jsonMatch[0] = jsonMatch[1]; // Use the captured group
      }
    }
    
    if (!jsonMatch) {
      console.error("Could not parse AI response:", aiResponse);
      throw new Error("Could not parse AI response into valid form fields");
    }
    
    // Parse the JSON and convert to FormElement format
    const jsonString = jsonMatch[0].replace(/```(?:json)?|```/g, '').trim();
    console.log("Extracted JSON:", jsonString);
    
    const fields = JSON.parse(jsonString);
    console.log("Parsed fields:", fields);
    
    // Convert the AI response format to our FormElement format
    return convertToFormElements(fields);
  } catch (error) {
    console.error("OpenRouter AI form generation error:", error);
    toast.error("Failed to generate form with AI", {
      description: error instanceof Error ? error.message : "Unknown error"
    });
    return [];
  }
}

// Helper function to convert AI response to our FormElement format
function convertToFormElements(fields: any[]): FormElement[] {
  let yPosition = 50;
  
  return fields.map(field => {
    // Create a unique ID based on type and timestamp
    const id = `${field.type}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Calculate height based on field type
    let height = 80; // Default height
    if (field.type === 'header') height = 60;
    if (field.type === 'paragraph') height = 60;
    if (field.type === 'textarea') height = 120;
    if (field.type === 'checkbox' || field.type === 'radio') height = 100;
    if (field.type === 'file') height = 120;
    
    // Create the form element
    const element: FormElement = {
      id,
      type: field.type,
      position: {
        x: 100,
        y: yPosition
      },
      size: {
        width: 500,
        height
      },
      groupId: null,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required === true,
      helpText: field.helpText
    };
    
    // Add type-specific properties
    if (field.type === 'header' || field.type === 'paragraph') {
      (element as any).content = field.content || field.label || "Untitled";
    }
    
    if (field.options && ['select', 'radio', 'checkbox'].includes(field.type)) {
      (element as any).options = field.options;
    }
    
    // Update the Y position for the next element (with spacing)
    yPosition += height + 20;
    
    return element;
  });
}
