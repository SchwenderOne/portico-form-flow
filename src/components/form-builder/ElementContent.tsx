
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ElementContentProps {
  element: FormElement;
  isEditing?: boolean;
}

const ElementContent: React.FC<ElementContentProps> = ({ element, isEditing = false }) => {
  // Add state for form elements
  const [value, setValue] = useState<string>((element as any).value || "");
  const [checked, setChecked] = useState<boolean>((element as any).checked || false);
  const [date, setDate] = useState<Date | undefined>((element as any).value);
  const [selectedOption, setSelectedOption] = useState<string>((element as any).selectedOption || "");
  const [files, setFiles] = useState<FileList | null>(null);

  // For text-based elements, we'll make them contenteditable when in editing mode
  const makeEditable = (type: string) => {
    return ['header', 'paragraph', 'text', 'textarea'].includes(type) && isEditing;
  };

  const contentEditable = makeEditable(element.type);

  // Handler for file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
      console.log("Files selected:", e.target.files);
    }
  };

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
          <Input 
            type="text" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={isEditing} // Only readonly when editing the label
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
          <Input 
            type="email" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={isEditing} // Only readonly when editing the label
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
          <Input 
            type="number" 
            className="border rounded-md p-2" 
            placeholder={element.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={isEditing}
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
          <Textarea 
            className="border rounded-md p-2 h-24" 
            placeholder={element.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={isEditing}
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
          <select 
            className="border rounded-md p-2"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={isEditing}
          >
            <option disabled value="">Select an option</option>
            {element.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            )) || (
              <>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </>
            )}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={`checkbox-${element.id}`} 
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked as boolean)}
              disabled={isEditing}
            />
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
          {isEditing ? (
            <div className="border rounded-md p-2 bg-white">
              <div className="text-muted-foreground cursor-pointer">
                {date ? format(date, 'PP') : 'Select a date...'}
              </div>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="date"
                className="w-full cursor-pointer"
                value={date ? format(date, 'yyyy-MM-dd') : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    setDate(new Date(e.target.value));
                  }
                }}
              />
            </div>
          )}
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
            <input 
              type="file" 
              disabled={isEditing}
              className="w-full" 
              accept={(element as any).accept || ".pdf,.png"}
              onChange={handleFileChange}
            />
          </div>
          {files && files.length > 0 && (
            <div className="text-xs text-green-600 font-medium">
              File selected: {files[0].name}
            </div>
          )}
          {!isEditing && <div className="text-xs text-muted-foreground">Accepts PDF, PNG files only</div>}
        </div>
      );
    default:
      return <div>Unknown element type</div>;
  }
};

export default ElementContent;
