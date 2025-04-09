
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ 
  label, 
  required, 
  placeholder, 
  value, 
  onChange, 
  isEditing 
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label 
        className="text-sm font-medium"
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Textarea 
        className="border rounded-md p-2 h-24" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={isEditing}
      />
    </div>
  );
};

export default TextareaField;
