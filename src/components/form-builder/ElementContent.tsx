
import React from "react";
import { FormElement } from "@/types/form";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

interface ElementContentProps {
  element: FormElement;
  isEditing?: boolean;
}

const ElementContent: React.FC<ElementContentProps> = ({ element, isEditing = false }) => {
  // For text-based elements, we'll make them contenteditable when in editing mode
  const makeEditable = (type: string) => {
    return ['header', 'paragraph', 'text', 'textarea'].includes(type) && isEditing;
  };

  const contentEditable = makeEditable(element.type);

  switch (element.type) {
    case 'header':
      return (
        <h2 
          className="text-2xl font-bold"
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
        >
          {(element as any).content || 'Header'}
        </h2>
      );
    case 'paragraph':
      return (
        <p 
          className="text-base"
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
        >
          {(element as any).content || 'Paragraph text'}
        </p>
      );
    case 'text':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input 
            type="text" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            readOnly
          />
        </div>
      );
    case 'email':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input 
            type="email" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            readOnly
          />
          {!isEditing && <div className="text-xs text-muted-foreground">Validates email format automatically</div>}
        </div>
      );
    case 'number':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input 
            type="number" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            readOnly
          />
        </div>
      );
    case 'textarea':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea 
            className="border rounded-md p-2 h-24" 
            placeholder={element.placeholder}
            readOnly
          />
        </div>
      );
    case 'select':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select className="border rounded-md p-2">
            <option disabled>Select an option</option>
            {element.options?.map((option, index) => (
              <option key={index}>{option}</option>
            )) || (
              <>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </>
            )}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center space-x-2">
            <Checkbox id={`checkbox-${element.id}`} />
            <label 
              htmlFor={`checkbox-${element.id}`}
              className="text-sm font-medium cursor-pointer"
              contentEditable={contentEditable}
              suppressContentEditableWarning={true}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        </div>
      );
    case 'date':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="border rounded-md p-2 bg-white">
            <div className="text-muted-foreground cursor-pointer">
              {(element as any).value ? format((element as any).value, 'PP') : 'Select a date...'}
            </div>
          </div>
        </div>
      );
    case 'file':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label 
            className="text-sm font-medium"
            contentEditable={contentEditable}
            suppressContentEditableWarning={true}
          >
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="border rounded-md p-2 bg-white">
            <input type="file" disabled className="w-full" />
          </div>
          {!isEditing && <div className="text-xs text-muted-foreground">Accepts PDF, PNG files only</div>}
        </div>
      );
    default:
      return <div>Unknown element type</div>;
  }
};

export default ElementContent;
