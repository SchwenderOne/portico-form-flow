
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Validation } from "@/types/validation";

interface ValidationTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const ValidationTab: React.FC<ValidationTabProps> = ({ element, onElementUpdate }) => {
  const [validationOpen, setValidationOpen] = useState(true);

  const handleValidationChange = (field: string, value: any) => {
    // If validation doesn't exist yet, create a properly typed initial validation object
    const validation = element.validation || { type: 'custom' } as Validation;
    
    // Create a new validation object with the updated field
    const updatedValidation = { ...validation, [field]: value } as Validation;
    
    // Update the element with the new validation
    const updatedElement = { 
      ...element, 
      validation: updatedValidation
    };
    
    onElementUpdate(updatedElement);
  };

  // Helper function to determine if validation is applicable for this field type
  const canHaveValidation = (type: string) => {
    return ['text', 'email', 'number', 'textarea', 'date', 'select'].includes(type);
  };

  // Get appropriate validation types based on field type
  const getValidationTypes = (type: string) => {
    switch (type) {
      case 'email':
        return [{ value: 'email', label: 'Email Format' }];
      case 'number':
        return [{ value: 'number', label: 'Number Range' }];
      case 'text':
      case 'textarea':
        return [
          { value: 'length', label: 'Text Length' },
          { value: 'regex', label: 'Pattern (Regex)' },
        ];
      case 'date':
        return [{ value: 'date', label: 'Date Range' }];
      default:
        return [
          { value: 'custom', label: 'Custom Validation' },
        ];
    }
  };

  if (!canHaveValidation(element.type)) {
    return null;
  }

  return (
    <Collapsible
      open={validationOpen}
      onOpenChange={setValidationOpen}
      className="w-full space-y-2 border-t pt-2 mt-2"
    >
      <div className="flex items-center justify-between space-x-4 px-1">
        <h4 className="text-sm font-semibold">Validation</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <span className="sr-only">Toggle</span>
            {validationOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        {/* Validation Type Selector */}
        <div className="grid gap-2">
          <Label htmlFor="validationType">Validation Type</Label>
          <Select
            value={element.validation?.type || ""}
            onValueChange={(value) => handleValidationChange('type', value)}
          >
            <SelectTrigger id="validationType">
              <SelectValue placeholder="Select validation type" />
            </SelectTrigger>
            <SelectContent>
              {getValidationTypes(element.type).map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conditional validation fields based on validation type */}
        {element.validation?.type === 'length' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="minLength">Minimum Length</Label>
              <Input
                id="minLength"
                type="number"
                value={element.validation?.minLength || 0}
                onChange={(e) => handleValidationChange('minLength', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxLength">Maximum Length</Label>
              <Input
                id="maxLength"
                type="number"
                value={element.validation?.maxLength || 100}
                onChange={(e) => handleValidationChange('maxLength', parseInt(e.target.value) || 100)}
              />
            </div>
          </div>
        )}

        {element.validation?.type === 'number' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="min">Minimum Value</Label>
              <Input
                id="min"
                type="number"
                value={element.validation?.min || 0}
                onChange={(e) => handleValidationChange('min', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                value={element.validation?.max || 100}
                onChange={(e) => handleValidationChange('max', parseInt(e.target.value) || 100)}
              />
            </div>
          </div>
        )}

        {element.validation?.type === 'regex' && (
          <div className="grid gap-2">
            <Label htmlFor="pattern">Regex Pattern</Label>
            <Input
              id="pattern"
              value={element.validation?.pattern || ''}
              placeholder="e.g. ^[A-Z][a-z]+$"
              onChange={(e) => handleValidationChange('pattern', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Example: ^[A-Z][a-z]+$ for capitalized words</p>
          </div>
        )}

        {/* Custom error message for any validation type */}
        <div className="grid gap-2">
          <Label htmlFor="message">Error Message</Label>
          <Input
            id="message"
            value={element.validation?.message || ''}
            placeholder="Error message to display when validation fails"
            onChange={(e) => handleValidationChange('message', e.target.value)}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ValidationTab;
