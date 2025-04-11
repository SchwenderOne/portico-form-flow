
import React from "react";
import { FormElement } from "@/types/form";

interface ElementContentProps {
  element: FormElement;
  isEditing?: boolean;
  isPreview?: boolean; // Add this prop
}

const ElementContent: React.FC<ElementContentProps> = ({ 
  element, 
  isEditing = false,
  isPreview = false // Initialize with default value
}) => {
  // Determine if we should show as readonly based on editing status or preview mode
  const readonly = isPreview || !isEditing;
  
  // Simulate form field rendering
  switch (element.type) {
    case "text":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            placeholder={element.placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "email":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="email"
            placeholder={element.placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "number":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="number"
            placeholder={element.placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            placeholder={element.placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows={3}
            disabled={readonly}
          ></textarea>
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            disabled={readonly}
          >
            <option value="">{element.placeholder || "Select an option"}</option>
            {(element as any).options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-2">
          <fieldset>
            <legend className="text-sm font-medium mb-2">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </legend>
            <div className="space-y-1">
              {(element as any).options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${element.id}-${index}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={readonly}
                  />
                  <label
                    htmlFor={`${element.id}-${index}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2">
          <fieldset>
            <legend className="text-sm font-medium mb-2">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </legend>
            <div className="space-y-1">
              {(element as any).options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${element.id}-${index}`}
                    name={element.id}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled={readonly}
                  />
                  <label
                    htmlFor={`${element.id}-${index}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "file":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "date":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    case "time":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {element.label} {element.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={readonly}
          />
          {element.helpText && (
            <p className="text-xs text-gray-500">{element.helpText}</p>
          )}
        </div>
      );

    default:
      return (
        <div className="bg-gray-100 p-3 rounded border border-gray-300 text-sm text-gray-500">
          Element type "{element.type}" not implemented
        </div>
      );
  }
};

export default ElementContent;
