
import React from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export interface DateFieldProps {
  label: string;
  required?: boolean;
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  isEditing: boolean;
}

const DateField: React.FC<DateFieldProps> = ({ 
  label, 
  required, 
  date, 
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
                onChange(new Date(e.target.value));
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateField;
