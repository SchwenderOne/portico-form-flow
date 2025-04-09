
import React from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { Button } from "@/components/ui/button";
import { usePorto } from "./context/PortoContext";
import { toast } from "sonner";
import { FormElement } from "@/types/form";

export const PortoPreview: React.FC = () => {
  const { elements } = useFormCanvas();
  const { formTitle, formDescription } = usePorto();

  const sortedElements = [...elements].sort((a, b) => {
    return a.position.y - b.position.y;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Form submitted successfully!");
  };

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case "header":
        return <h2 className="text-xl font-bold mb-4">{element.content || element.label}</h2>;
      
      case "paragraph":
        return <p className="mb-4">{element.content}</p>;
      
      case "text":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "email":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "number":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "textarea":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md min-h-[100px]"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "checkbox":
        return (
          <div className="mb-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id={element.id}
                className="mt-1 mr-2"
                required={element.required}
              />
              <label htmlFor={element.id} className="text-sm">
                {element.label} {element.required && <span className="text-red-500">*</span>}
              </label>
            </div>
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "select":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <select
              className="w-full p-2 border rounded-md"
              required={element.required}
            >
              <option value="">{element.placeholder || "Select an option"}</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "date":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "file":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      case "radio":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${element.id}-${index}`}
                    name={element.id}
                    value={option}
                    className="mr-2"
                    required={element.required}
                  />
                  <label htmlFor={`${element.id}-${index}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
            {element.helpText && <p className="text-xs text-gray-500 mt-1">{element.helpText}</p>}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gray-100 p-4 overflow-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{formTitle}</h1>
          <p className="text-gray-600">{formDescription}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {sortedElements.map(element => (
            <div key={element.id}>
              {renderFormElement(element)}
            </div>
          ))}
          
          {elements.length > 0 && (
            <div className="mt-6">
              <Button type="submit">Submit</Button>
            </div>
          )}
          
          {elements.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>No form elements added yet.</p>
              <p className="text-sm">Exit preview mode to add elements.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
