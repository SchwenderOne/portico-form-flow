import { FormElement } from "@/types/form";
import { 
  getSmartLabel, 
  getSmartPlaceholder, 
  getSmartValidation, 
  getSmartOptions, 
  notifySmartDefaults 
} from "./smart-defaults";

/**
 * Finds a valid position for a new element that doesn't overlap with existing elements
 */
export const findValidPosition = (
  x: number, 
  y: number, 
  elementType: string,
  existingElements: FormElement[]
): { x: number, y: number } => {
  // Default dimensions based on element type
  const width = 500;
  const height = elementType === 'header' || elementType === 'paragraph' ? 60 : 
               elementType === 'checkbox' ? 50 : 
               elementType === 'file' ? 120 : 80;
  
  // Check if the position would cause an overlap
  const wouldOverlap = existingElements.some(element => {
    const elemRight = element.position.x + element.size.width;
    const elemBottom = element.position.y + element.size.height;
    
    const newElemRight = x + width;
    const newElemBottom = y + height;
    
    // Check if rectangles overlap
    return !(
      x >= elemRight || // New element is to the right of existing element
      newElemRight <= element.position.x || // New element is to the left of existing element
      y >= elemBottom || // New element is below existing element
      newElemBottom <= element.position.y // New element is above existing element
    );
  });
  
  if (!wouldOverlap) {
    return { x, y }; // Original position is valid
  }
  
  // Try to find a vertical position below all existing elements
  const lowestElement = existingElements.reduce((lowest, current) => {
    const currentBottom = current.position.y + current.size.height;
    return currentBottom > lowest ? currentBottom : lowest;
  }, 0);
  
  // Find the most common x alignment among existing elements
  const xPositions = existingElements.map(el => el.position.x);
  const mostCommonX = xPositions.length > 0 ? 
    xPositions.sort((a, b) => 
      xPositions.filter(v => v === a).length - xPositions.filter(v => v === b).length
    ).pop() : 
    x;
  
  // Add spacing and return the new position
  return { 
    x: mostCommonX || x, 
    y: lowestElement + 25 // Add 25px spacing
  };
};

/**
 * Creates a new element with default properties based on element type
 */
export const createNewElement = (
  type: string,
  position: { x: number, y: number },
  existingElements: FormElement[] = []
): FormElement => {
  // Get smart defaults based on field type and context
  const smartLabel = getSmartLabel(type, existingElements, position);
  const smartPlaceholder = getSmartPlaceholder(type);
  const smartValidation = getSmartValidation(type);
  const smartOptions = getSmartOptions(type);
  
  // Notify user about smart defaults being applied
  notifySmartDefaults(type);
  
  const newElement: FormElement = {
    id: `${type}-${Date.now()}`,
    type,
    position,
    size: { 
      width: 500, 
      height: type === 'header' || type === 'paragraph' ? 60 : 
              type === 'checkbox' || type === 'radio' ? 100 : 
              type === 'file' ? 120 : 80 
    },
    label: smartLabel,
    placeholder: smartPlaceholder,
    required: false,
    groupId: null,
    validation: smartValidation
  };

  // Add specific properties based on element type
  if (type === 'header') {
    (newElement as any).content = 'New Form Header';
  } else if (type === 'paragraph') {
    (newElement as any).content = 'Add your paragraph text here...';
  } else if (type === 'checkbox' || type === 'radio') {
    (newElement as any).options = smartOptions || ['Option 1', 'Option 2', 'Option 3'];
  } else if (type === 'select') {
    (newElement as any).options = smartOptions || ['Select an option', 'Option 1', 'Option 2', 'Option 3'];
  } else if (type === 'date') {
    (newElement as any).value = null;
  } else if (type === 'file') {
    (newElement as any).accept = '.pdf,.png';
    (newElement as any).maxSize = 5;
  } else if (type === 'email') {
    newElement.label = 'Email Address';
    newElement.placeholder = 'example@domain.com';
    newElement.validation = { 
      type: 'email',
      message: 'Please enter a valid email address'
    };
  } else if (type === 'number') {
    newElement.label = 'Number';
    newElement.placeholder = 'Enter a number';
    newElement.validation = {
      type: 'number',
      min: 0,
      max: 100
    };
  }

  return newElement;
};
