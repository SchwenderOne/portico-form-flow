
import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface ValidationErrorMessageProps {
  message: string;
  fieldName?: string;
  onDismiss?: () => void;
}

const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = ({
  message,
  fieldName,
  onDismiss
}) => {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };
  
  return (
    <div className="bg-destructive/10 border border-destructive text-destructive px-3 py-2 rounded-md mt-1 flex items-start">
      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
      <div className="flex-1 text-sm">
        {fieldName ? (
          <span className="font-medium">{fieldName}: </span>
        ) : null}
        {message}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-2 p-0.5 rounded-full hover:bg-destructive/20"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

// Helper function to show validation errors in toast notifications
export const showValidationError = (
  message: string,
  fieldName?: string
) => {
  toast.error(fieldName ? `${fieldName}: ${message}` : message, {
    description: "Please correct this before continuing",
    duration: 5000,
  });
};

export default ValidationErrorMessage;
