
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxFieldProps {
  id: string;
  label: string;
  required?: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  isEditing: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ 
  id, 
  label, 
  required, 
  checked, 
  onCheckedChange, 
  isEditing 
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`checkbox-${id}`} 
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          disabled={isEditing}
        />
        <label 
          htmlFor={`checkbox-${id}`}
          className="text-sm font-medium cursor-pointer"
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
    </div>
  );
};

export default CheckboxField;
