
import React from "react";
import { usePorto } from "./context/PortoContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export const PortoPreview: React.FC = () => {
  const { 
    formTitle, 
    formDescription, 
    formElements, 
    togglePreviewMode,
    theme
  } = usePorto();

  // Function to render different form elements based on their type
  const renderFormElement = (element: any) => {
    switch (element.type) {
      case "header":
        return (
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.textColor }}
          >
            {element.content}
          </h2>
        );
      case "text":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            />
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              rows={4}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            />
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      case "email":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="email"
              placeholder={element.placeholder}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            />
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      case "number":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              placeholder={element.placeholder}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            />
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            >
              <option value="">Select an option</option>
              {element.options?.map((option: string, i: number) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={element.id}
                className="h-4 w-4 mr-2"
              />
              <label 
                htmlFor={element.id}
                className="text-sm font-medium"
                style={{ color: theme.textColor }}
              >
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground pl-6">{element.helpText}</p>
            )}
          </div>
        );
      case "date":
        return (
          <div className="mb-4">
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: theme.textColor }}
            >
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              style={{ 
                borderColor: `${theme.primaryColor}40`,
                borderRadius: `${theme.borderRadius}px`,
              }}
            />
            {element.helpText && (
              <p className="mt-1 text-xs text-muted-foreground">{element.helpText}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={togglePreviewMode}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
        </div>
        
        <h2 className="font-medium text-base flex items-center">
          <Eye className="h-4 w-4 mr-2" />
          Form Preview
        </h2>
        
        <div className="flex-1"></div>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div 
          className="mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-sm border"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <div className="text-center mb-6">
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textColor }}
            >
              {formTitle}
            </h1>
            {formDescription && (
              <p 
                className="text-muted-foreground mt-2"
                style={{ color: `${theme.textColor}99` }}
              >
                {formDescription}
              </p>
            )}
          </div>
          
          {formElements.length > 0 ? (
            <>
              <div className="space-y-4">
                {formElements.map((element: any) => (
                  <div key={element.id}>
                    {renderFormElement(element)}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  className="px-8"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <EyeOff className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground">No form elements yet</h3>
              <p className="text-muted-foreground mt-2">
                Return to the editor and add some elements to preview your form.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
