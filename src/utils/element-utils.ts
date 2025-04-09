
import { v4 as uuidv4 } from 'uuid';
import { FormElement } from '@/types/form';

// Get default size for element type
export const getDefaultSize = (type: string) => {
  switch (type) {
    case 'header':
      return { width: 500, height: 60 };
    case 'paragraph':
      return { width: 500, height: 100 };
    case 'text':
    case 'email':
    case 'number':
    case 'select':
      return { width: 500, height: 80 };
    case 'textarea':
      return { width: 500, height: 120 };
    case 'checkbox':
    case 'radio':
      return { width: 500, height: 50 };
    case 'file':
      return { width: 500, height: 100 };
    case 'date':
      return { width: 500, height: 80 };
    default:
      return { width: 500, height: 80 };
  }
};

// Get default content/label for element type
export const getDefaultContent = (type: string) => {
  switch (type) {
    case 'header':
      return 'Header Text';
    case 'paragraph':
      return 'This is a paragraph of text. You can edit this to add your content.';
    case 'text':
      return 'Text Field';
    case 'email':
      return 'Email Address';
    case 'number':
      return 'Number Field';
    case 'textarea':
      return 'Text Area';
    case 'checkbox':
      return 'Checkbox Option';
    case 'radio':
      return 'Radio Options';
    case 'select':
      return 'Dropdown';
    case 'file':
      return 'File Upload';
    case 'date':
      return 'Date Picker';
    default:
      return 'New Element';
  }
};

// Find a valid position to place element without overlapping
export const findValidPosition = (x: number, y: number, type: string, elements: FormElement[]) => {
  // Snap to grid - 25px
  const snappedX = Math.round(x / 25) * 25;
  const snappedY = Math.round(y / 25) * 25;
  
  // Ensure it's not too close to the edge
  const validX = Math.max(50, snappedX);
  const validY = Math.max(50, snappedY);
  
  return { x: validX, y: validY };
};

// Create a new element of the specified type
export const createNewElement = (type: string, position: { x: number, y: number }, existingElements: FormElement[]): FormElement => {
  const id = uuidv4();
  const size = getDefaultSize(type);
  const content = type === 'header' || type === 'paragraph' ? getDefaultContent(type) : undefined;
  const label = type !== 'header' && type !== 'paragraph' ? getDefaultContent(type) : undefined;
  
  // Create appropriate defaults based on element type
  return {
    id,
    type,
    position,
    size,
    content,
    label,
    placeholder: type !== 'header' && type !== 'paragraph' ? `Enter ${label?.toLowerCase()}` : undefined,
    required: false,
    disabled: false,
    groupId: null,
    helpText: type !== 'header' && type !== 'paragraph' ? 'Help text for this field' : undefined,
  };
};

// Clone an element
export const cloneElement = (element: FormElement, offsetX = 25, offsetY = 25): FormElement => {
  return {
    ...element,
    id: uuidv4(),
    position: {
      x: element.position.x + offsetX,
      y: element.position.y + offsetY
    },
    groupId: null // Remove group association when duplicating
  };
};

// Generate a group ID for multiple elements
export const generateGroupId = (): string => {
  return `group-${uuidv4().slice(0, 8)}`;
};
