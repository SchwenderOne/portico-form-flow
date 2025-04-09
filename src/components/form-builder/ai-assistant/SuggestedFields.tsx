
import React from "react";
import { Button } from "@/components/ui/button";
import { FormElement } from "@/types/form";
import { LightbulbIcon, Check, X, CheckCheck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SuggestedFieldsProps {
  suggestions: FormElement[];
  onAcceptSuggestion: (suggestion: FormElement) => void;
  onRejectSuggestion: (suggestionId: string) => void;
  onAcceptAll: () => void;
  onDismissAll: () => void;
}

const SuggestedFields: React.FC<SuggestedFieldsProps> = ({
  suggestions,
  onAcceptSuggestion,
  onRejectSuggestion,
  onAcceptAll,
  onDismissAll,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm font-medium text-portico-purple">
          <LightbulbIcon className="h-4 w-4 mr-2" />
          <span>{suggestions.length} AI Suggested Fields</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center"
            onClick={onAcceptAll}
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Accept All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center"
            onClick={onDismissAll}
          >
            <XCircle className="h-3 w-3 mr-1" />
            Dismiss All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-3 border border-dashed border-gray-300 rounded-md bg-gray-50 relative group"
          >
            <div className="absolute -top-2 left-3 bg-gray-50 px-1 text-xs text-gray-500 flex items-center">
              <LightbulbIcon className="h-3 w-3 mr-1 text-portico-purple" />
              <span>Suggested by AI</span>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{suggestion.label}</div>
                <div className="text-xs text-gray-500">
                  {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)} field
                  {suggestion.required && " (required)"}
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-green-50 hover:text-green-600"
                  onClick={() => onAcceptSuggestion(suggestion)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                  onClick={() => onRejectSuggestion(suggestion.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {suggestion.helpText && (
              <div className="mt-1 text-xs text-gray-500">
                {suggestion.helpText}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedFields;
