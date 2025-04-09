
import { FormElement } from "@/types/form";
import { Validation } from "@/types/validation";
import { toast } from "sonner";

// Settings
let smartDefaultsEnabled = true;

// Toggle Smart Defaults
export const toggleSmartDefaults = (enabled: boolean) => {
  smartDefaultsEnabled = enabled;
  return smartDefaultsEnabled;
};

// Get Smart Defaults status
export const getSmartDefaultsStatus = () => {
  return smartDefaultsEnabled;
};

// Get intelligent label based on previous element
export const getSmartLabel = (
  type: string,
  existingElements: FormElement[],
  position: { x: number; y: number }
): string => {
  if (!smartDefaultsEnabled) {
    return getBasicLabel(type);
  }

  // Find the closest element above this position
  const elementsAbove = existingElements.filter(
    (el) => el.position.y < position.y
  );

  if (elementsAbove.length === 0) {
    return getBasicLabel(type);
  }

  // Sort by Y position to find the closest one
  const closestElement = elementsAbove.sort(
    (a, b) => b.position.y - a.position.y
  )[0];

  // Generate contextual label based on closest element
  if (closestElement.type === "text" && closestElement.label?.includes("Name")) {
    return type === "email"
      ? "Email Address"
      : type === "text"
      ? "Additional Information"
      : type === "textarea"
      ? "Comments"
      : getBasicLabel(type);
  }

  if (closestElement.type === "email") {
    return type === "text"
      ? "Phone Number"
      : type === "textarea"
      ? "Message"
      : getBasicLabel(type);
  }

  if (closestElement.label?.toLowerCase().includes("address")) {
    return type === "text"
      ? "City"
      : type === "textarea"
      ? "Address Details"
      : getBasicLabel(type);
  }

  // Default fallback
  return getBasicLabel(type);
};

// Get basic default label based on field type
const getBasicLabel = (type: string): string => {
  switch (type) {
    case "text":
      return "Text Field";
    case "email":
      return "Email Address";
    case "number":
      return "Number";
    case "textarea":
      return "Comments";
    case "checkbox":
      return "I agree to the terms";
    case "radio":
      return "Select an option";
    case "select":
      return "Choose from list";
    case "date":
      return "Date";
    case "file":
      return "Upload File";
    case "header":
      return "Form Header";
    case "paragraph":
      return "Information";
    default:
      return `${type.charAt(0).toUpperCase() + type.slice(1)} Field`;
  }
};

// Get smart placeholder based on field type
export const getSmartPlaceholder = (type: string): string => {
  if (!smartDefaultsEnabled) {
    return "";
  }

  switch (type) {
    case "text":
      return "Enter your response";
    case "email":
      return "example@domain.com";
    case "number":
      return "Enter a number";
    case "textarea":
      return "Enter your comments here...";
    case "date":
      return "Select a date...";
    case "file":
      return "Upload file (PDF, PNG)";
    case "select":
      return "Select an option";
    default:
      return "";
  }
};

// Get smart validation based on field type
export const getSmartValidation = (type: string): Validation | undefined => {
  if (!smartDefaultsEnabled) {
    return undefined;
  }

  switch (type) {
    case "email":
      return {
        type: "email",
        message: "Please enter a valid email address",
      };
    case "number":
      return {
        type: "number",
        min: 0,
        max: 100,
        message: "Please enter a number between 0 and 100",
      };
    case "text":
      return {
        type: "length",
        minLength: 2,
        maxLength: 100,
        message: "Text must be between 2 and 100 characters",
      };
    default:
      return undefined;
  }
};

// Get smart options for select/radio/checkbox fields
export const getSmartOptions = (type: string): string[] | undefined => {
  if (!smartDefaultsEnabled) {
    return undefined;
  }
  
  switch (type) {
    case "select":
    case "radio":
      return ["Yes", "No", "Maybe"];
    case "checkbox":
      return ["Option 1", "Option 2", "Option 3"];
    default:
      return undefined;
  }
};

// Notify user about smart defaults being applied
export const notifySmartDefaults = (type: string) => {
  if (smartDefaultsEnabled) {
    toast.success(`Smart defaults applied for ${type} field`, {
      description: "Default values have been intelligently set",
      action: {
        label: "Undo",
        onClick: () => {
          toast.info("Undo functionality will be available in the next update");
        },
      },
      duration: 3000,
    });
  }
};
