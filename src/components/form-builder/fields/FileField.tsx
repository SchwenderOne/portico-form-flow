
import React, { useState } from "react";

export interface FileFieldProps {
  label: string;
  required?: boolean;
  accept?: string;
  isEditing: boolean;
}

const FileField: React.FC<FileFieldProps> = ({ 
  label, 
  required, 
  accept = ".pdf,.png", 
  isEditing 
}) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
      console.log("Files selected:", e.target.files);
    }
  };

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
      <div className="border rounded-md p-2 bg-white">
        <input 
          type="file" 
          disabled={isEditing}
          className="w-full" 
          accept={accept}
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
};

export default FileField;
