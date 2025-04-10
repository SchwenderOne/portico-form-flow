
import React, { useState } from "react";
import { usePorto } from "./context/PortoContext";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Copy, 
  Download, 
  Printer, 
  Eye, 
  Share2 
} from "lucide-react";
import { toast } from "sonner";
import { FormElement } from "@/types/form";

export const PortoPreview: React.FC = () => {
  const { formElements, formTitle, formDescription, togglePreviewMode } = usePorto();
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Preview link copied to clipboard");
  };
  
  const handleExportPDF = () => {
    toast.success("Form exported as PDF");
  };
  
  const handlePrint = () => {
    window.print();
    toast.success("Form sent to printer");
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: formTitle,
        text: formDescription,
        url: window.location.href,
      }).then(() => {
        toast.success("Form shared successfully");
      }).catch((error) => {
        toast.error("Error sharing form");
      });
    } else {
      toast.error("Web Share API not supported in this browser");
    }
  };
  
  const getViewportWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "320px";
      case "tablet":
        return "768px";
      case "desktop":
      default:
        return "100%";
    }
  };

  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case 'header':
        return <h1 className="text-2xl font-bold mb-2">{element.content}</h1>;
      case 'paragraph':
        return <p className="mb-4">{element.content}</p>;
      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'textarea':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              rows={4}
              required={element.required}
            ></textarea>
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'email':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="email"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'number':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              placeholder={element.placeholder}
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'select':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select className="w-full p-2 border rounded-md" required={element.required}>
              <option value="">{element.placeholder || "Select an option"}</option>
              {element.options?.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              )) || [
                <option key="1" value="Option 1">Option 1</option>,
                <option key="2" value="Option 2">Option 2</option>,
                <option key="3" value="Option 3">Option 3</option>
              ]}
            </select>
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={element.id}
                className="mr-2"
                required={element.required}
              />
              <label htmlFor={element.id} className="text-gray-700">
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'radio':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
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
                  <label htmlFor={`${element.id}-${index}`} className="text-gray-700">{option}</label>
                </div>
              )) || [
                <div key="1" className="flex items-center">
                  <input type="radio" id={`${element.id}-1`} name={element.id} className="mr-2" />
                  <label htmlFor={`${element.id}-1`} className="text-gray-700">Option 1</label>
                </div>,
                <div key="2" className="flex items-center">
                  <input type="radio" id={`${element.id}-2`} name={element.id} className="mr-2" />
                  <label htmlFor={`${element.id}-2`} className="text-gray-700">Option 2</label>
                </div>
              ]}
            </div>
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'date':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      case 'file':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {element.label}
              {element.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              required={element.required}
            />
            {element.helpText && (
              <p className="text-sm text-gray-500 mt-1">{element.helpText}</p>
            )}
          </div>
        );
      default:
        return <div>Unknown element type: {element.type}</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
        <Button variant="ghost" size="sm" onClick={togglePreviewMode}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Editor
        </Button>
        
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("desktop")}
            className="h-7 w-7 p-0"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "tablet" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("tablet")}
            className="h-7 w-7 p-0"
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("mobile")}
            className="h-7 w-7 p-0"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center">
        <div 
          className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300"
          style={{ 
            width: getViewportWidth(),
            maxWidth: "100%",
            margin: viewMode === "desktop" ? "0 auto" : "0",
            height: 'auto',
            minHeight: '500px'
          }}
        >
          {formElements.length > 0 ? (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">{formTitle}</h1>
              {formDescription && <p className="mb-6 text-gray-600">{formDescription}</p>}
              
              {formElements.map((element, index) => (
                <div key={element.id}>{renderFormElement(element)}</div>
              ))}
              
              <div className="mt-6">
                <Button type="submit" className="w-full">Submit</Button>
              </div>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Eye className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Form Elements</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add elements to your form in the editor to preview them here.
              </p>
              <Button onClick={togglePreviewMode}>Back to Editor</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
