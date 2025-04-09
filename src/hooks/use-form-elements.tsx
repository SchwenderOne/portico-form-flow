
import { useState } from "react";
import { FormElement } from "@/types/form";
import { useElementSelection } from "./form/useElementSelection";
import { useElementActions } from "./form/useElementActions";
import { useElementDuplication } from "./form/useElementDuplication";
import { useElementGrouping } from "./form/useElementGrouping";

// Initial sample elements for the form
const initialElements: FormElement[] = [
  {
    id: "header-1",
    type: "header",
    content: "Registration Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "text-1",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null,
    helpText: "Please enter your legal full name as it appears on your ID"
  },
  {
    id: "email-1",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 230 },
    size: { width: 500, height: 80 },
    groupId: null,
    validation: {
      type: "email",
      message: "Please enter a valid email address"
    }
  }
];

export const useFormElements = () => {
  // State for form elements
  const [elements, setElements] = useState<FormElement[]>(initialElements);
  
  // Element selection hook
  const { 
    selectedElements, 
    setSelectedElements, 
    handleElementSelect 
  } = useElementSelection();
  
  // Element actions hook
  const { 
    updateElement, 
    handleElementMove, 
    handleElementDrop,
    handleDeleteElement 
  } = useElementActions(elements, setElements, selectedElements, setSelectedElements);
  
  // Element duplication hook
  const { 
    handleDuplicateElement, 
    handleDuplicateGroup 
  } = useElementDuplication(elements, setElements, setSelectedElements);
  
  // Element grouping hook
  const { 
    handleRequiredToggle, 
    handleGroupElements, 
    handleUngroupElements 
  } = useElementGrouping(elements, setElements, selectedElements);
  
  // Add a new element directly (for AI-generated elements)
  const addElement = (element: FormElement) => {
    setElements(prev => [...prev, element]);
    setSelectedElements([element.id]);
  };
  
  // Add multiple elements to the canvas (for AI-generated forms)
  const addMultipleElements = (newElements: FormElement[]) => {
    if (newElements.length === 0) return;
    
    setElements(prev => [...prev, ...newElements]);
    
    // Select the first element of the newly added elements
    setSelectedElements([newElements[0].id]);
  };

  return {
    elements,
    setElements,
    selectedElements,
    handleElementSelect,
    handleElementMove,
    handleElementDrop,
    handleDeleteElement,
    handleDuplicateElement,
    handleDuplicateGroup,
    handleRequiredToggle,
    handleGroupElements,
    handleUngroupElements,
    updateElement,
    addElement,
    addMultipleElements
  };
};
