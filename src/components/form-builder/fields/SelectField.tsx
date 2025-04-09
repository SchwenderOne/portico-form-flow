
import React from "react";

interface SelectFieldProps {
  label: string;
  required?: boolean;
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  required, 
  options = [], 
  selectedOption, 
  onChange, 
  isEditing 
}) => {
  const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];
  const displayOptions = options.length > 0 ? options : defaultOptions;

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
      <select 
        className="border rounded-md p-2"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        disabled={isEditing}
      >
        <option disabled value="">Select an option</option>
        {displayOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
