
import { useState } from "react";
import { FormElement as FormElementType } from "@/types/form";
import { useToast } from "@/hooks/use-toast";

const initialElements: FormElementType[] = [
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
  const [elements, setElements] = useState<FormElementType[]>(initialElements);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const { toast } = useToast();

  const handleElementSelect = (id: string, isMultiSelect: boolean) => {
    if (isMultiSelect) {
      setSelectedElements(prev => 
        prev.includes(id) 
          ? prev.filter(elementId => elementId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedElements(prev => prev.includes(id) && prev.length === 1 ? [] : [id]);
    }
  };

  const handleElementMove = (id: string, position: { x: number, y: number }) => {
    const updatedElements = elements.map(el => {
      if (el.id === id) {
        return { ...el, position };
      }
      
      if (selectedElements.includes(id)) {
        const selectedElement = elements.find(e => e.id === id);
        if (selectedElement && el.groupId === selectedElement.groupId && el.groupId !== null) {
          return { ...el, position };
        }
      }
      
      return el;
    });
    
    setElements(updatedElements);
  };

  const handleElementDrop = (type: string, position: { x: number, y: number }) => {
    console.log(`Dropping element of type: ${type} at position:`, position);
    
    // Check for overlapping elements at the drop position
    const overlapCheck = elements.some(el => {
      const elRight = el.position.x + el.size.width;
      const elBottom = el.position.y + el.size.height;
      
      // Define a buffer zone around elements (20px)
      const buffer = 20;
      
      // Check if the new element would overlap with this existing element
      return (
        position.x < elRight + buffer &&
        position.x + 500 > el.position.x - buffer &&
        position.y < elBottom + buffer &&
        position.y + 80 > el.position.y - buffer
      );
    });
    
    // If overlapping, find a better position
    if (overlapCheck) {
      // Find the lowest element's bottom position
      const lowestElementBottom = Math.max(
        ...elements.map(el => el.position.y + el.size.height)
      );
      
      // Place the new element below all existing elements with some padding
      position = {
        x: 100, // Standard left alignment
        y: lowestElementBottom + 30 // 30px padding after the lowest element
      };
    }
    
    const newElement: FormElementType = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      size: { 
        width: 500, 
        height: type === 'header' || type === 'paragraph' ? 60 : 
                type === 'checkbox' || type === 'radio' ? 100 : 
                type === 'file' ? 120 : 80 
      },
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: type === 'file' ? 'Upload file (PDF, PNG)' : 
                   type === 'date' ? 'Select a date...' : 
                   `Enter ${type}...`,
      required: false,
      groupId: null
    };

    if (type === 'header') {
      (newElement as any).content = 'New Form Header';
    } else if (type === 'paragraph') {
      (newElement as any).content = 'Add your paragraph text here...';
    } else if (type === 'checkbox' || type === 'radio') {
      (newElement as any).options = ['Option 1', 'Option 2', 'Option 3'];
    } else if (type === 'select') {
      (newElement as any).options = ['Select an option', 'Option 1', 'Option 2', 'Option 3'];
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

    setElements(prev => [...prev, newElement]);
    setSelectedElements([newElement.id]);
    
    toast({
      title: "Element Added",
      description: `Added a new ${type} element to your form.`,
    });
  };

  const handleDeleteElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element && element.groupId) {
      const groupElements = elements.filter(el => el.groupId === element.groupId);
      if (groupElements.length > 1 && window.confirm("Delete all elements in this group?")) {
        setElements(elements.filter(el => el.groupId !== element.groupId));
        setSelectedElements([]);
      } else {
        setElements(elements.filter(el => el.id !== id));
        setSelectedElements(selectedElements.filter(elementId => elementId !== id));
      }
    } else {
      setElements(elements.filter(el => el.id !== id));
      setSelectedElements(selectedElements.filter(elementId => elementId !== id));
    }
    
    toast({
      title: "Element Deleted",
      description: "The element has been removed from your form.",
    });
  };

  const handleDuplicateElement = (id: string) => {
    const elementToDuplicate = elements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20
        },
        groupId: null // Don't keep the group when duplicating a single element
      };
      setElements([...elements, newElement]);
      setSelectedElements([newElement.id]);
      
      toast({
        title: "Element Duplicated",
        description: "A copy of the element has been created.",
      });
    }
  };

  // New function to duplicate multiple elements as a group
  const handleDuplicateGroup = (ids: string[]) => {
    const elementsToGroup = elements.filter(el => ids.includes(el.id) || selectedElements.includes(el.id));
    if (elementsToGroup.length > 0) {
      // Find the bounds of the selected elements
      const bounds = {
        minX: Math.min(...elementsToGroup.map(el => el.position.x)),
        minY: Math.min(...elementsToGroup.map(el => el.position.y))
      };
      
      // Create duplicate elements with a new groupId
      const newGroupId = `group-${Date.now()}`;
      const newElements = elementsToGroup.map(el => ({
        ...el,
        id: `${el.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        position: {
          x: el.position.x + 20, // Offset slightly
          y: el.position.y + 20
        },
        groupId: newGroupId
      }));
      
      setElements([...elements, ...newElements]);
      setSelectedElements(newElements.map(el => el.id));
      
      toast({
        title: "Group Duplicated",
        description: `Created a copy of ${newElements.length} elements.`,
      });
      
      return newElements.map(el => el.id);
    }
    return [];
  };

  const handleRequiredToggle = (id: string, required: boolean) => {
    setElements(prev => 
      prev.map(el => 
        el.id === id ? { ...el, required } : el
      )
    );
  };

  const handleGroupElements = () => {
    if (selectedElements.length < 2) {
      toast({
        title: "Cannot Group",
        description: "Select at least two elements to create a group.",
        variant: "destructive"
      });
      return;
    }

    const groupId = `group-${Date.now()}`;
    const updatedElements = elements.map(el => 
      selectedElements.includes(el.id) ? { ...el, groupId } : el
    );

    setElements(updatedElements);
    toast({
      title: "Elements Grouped",
      description: `Created a group with ${selectedElements.length} elements.`,
    });
  };

  const handleUngroupElements = () => {
    const selectedElement = elements.find(el => selectedElements.includes(el.id));
    if (!selectedElement || !selectedElement.groupId) {
      toast({
        title: "Cannot Ungroup",
        description: "Select a grouped element first.",
        variant: "destructive"
      });
      return;
    }

    const groupId = selectedElement.groupId;
    const updatedElements = elements.map(el => 
      el.groupId === groupId ? { ...el, groupId: null } : el
    );

    setElements(updatedElements);
    toast({
      title: "Group Dissolved",
      description: "The selected elements are no longer grouped.",
    });
  };

  const updateElement = (updatedElement: FormElementType) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  };

  return {
    elements,
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
    updateElement
  };
};
