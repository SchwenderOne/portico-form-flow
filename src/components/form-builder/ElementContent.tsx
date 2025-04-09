
import React from "react";
import { FormElement } from "@/types/form";

interface ElementContentProps {
  element: FormElement;
}

const ElementContent: React.FC<ElementContentProps> = ({ element }) => {
  switch (element.type) {
    case 'header':
      return (
        <h2 className="text-2xl font-bold">
          {(element as any).content || 'Header'}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="text-base">
          {(element as any).content || 'Paragraph text'}
        </p>
      );
    case 'text':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium">
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
          <label className="text-sm font-medium">
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input 
            type="email" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            readOnly
          />
        </div>
      );
    case 'number':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <label className="text-sm font-medium">
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
          <label className="text-sm font-medium">
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
          <label className="text-sm font-medium">
            {element.label}
            {element.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select className="border rounded-md p-2">
            <option disabled>Select an option</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      );
    default:
      return <div>Unknown element type</div>;
  }
};

export default ElementContent;
