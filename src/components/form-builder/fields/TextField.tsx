
import React from "react";
import { Input } from "@/components/ui/input";

export interface TextFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ 
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
      <Input 
        type="text" 
        className="border rounded-md p-2" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={isEditing}
      />
    </div>
  );
};

export default TextField;
