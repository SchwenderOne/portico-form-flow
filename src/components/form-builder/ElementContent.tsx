
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import TextField from "./fields/TextField";
import TextareaField from "./fields/TextareaField";
import CheckboxField from "./fields/CheckboxField";
import SelectField from "./fields/SelectField";
import FileField from "./fields/FileField";
import HeaderField from "./fields/HeaderField";
import EmailField from "./fields/EmailField";
import DateField from "./fields/DateField";
import NumberField from "./fields/NumberField";
import ParagraphField from "./fields/ParagraphField";
import GDPRConsentField from "./fields/GDPRConsentField";
import { InfoIcon, AlertTriangle } from "lucide-react";
import { useCompliance } from "@/context/ComplianceContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ElementContentProps {
  element: FormElement;
  isEditing: boolean;
  isPreview?: boolean; // Add isPreview prop
}

const ElementContent: React.FC<ElementContentProps> = ({ element, isEditing, isPreview = false }) => {
  // Add default state values for form controls
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [gdprConsentValue, setGdprConsentValue] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  
  // Get compliance context for GDPR field
  const { complianceSettings } = useCompliance();

  const renderField = () => {
    // When in preview mode, disable editing for all fields
    const effectiveIsEditing = isPreview ? false : isEditing;

    switch (element.type) {
      case 'text':
        return (
          <TextField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={effectiveIsEditing} 
            value={textValue}
            onChange={setTextValue}
          />
        );
      case 'textarea':
        return (
          <TextareaField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={effectiveIsEditing} 
            value={textValue}
            onChange={setTextValue}
          />
        );
      case 'checkbox':
        return (
          <CheckboxField 
            id={element.id}
            label={element.label || ''} 
            required={element.required} 
            isEditing={effectiveIsEditing} 
            checked={checkboxValue}
            onCheckedChange={setCheckboxValue}
          />
        );
      case 'gdpr-consent':
        return (
          <GDPRConsentField 
            id={element.id}
            checked={gdprConsentValue}
            onCheckedChange={setGdprConsentValue}
            isEditing={effectiveIsEditing}
            privacyPolicyUrl={complianceSettings.privacyPolicyUrl}
            termsOfServiceUrl={complianceSettings.termsOfServiceUrl}
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {element.label && (
              <label className="text-sm font-medium">
                {element.label}
                {element.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <RadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
              className="flex flex-col space-y-1"
            >
              {(element.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${element.id}-${index}`} />
                  <label htmlFor={`${element.id}-${index}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 'select':
        return (
          <SelectField 
            label={element.label || ''} 
            options={element.options || []} 
            required={element.required} 
            isEditing={effectiveIsEditing}
            selectedOption={selectValue}
            onChange={setSelectValue}
          />
        );
      case 'file':
        return (
          <FileField 
            label={element.label || ''} 
            required={element.required} 
            isEditing={effectiveIsEditing} 
          />
        );
      case 'header':
        return <HeaderField content={(element as any).content || ''} isEditing={effectiveIsEditing} />;
      case 'paragraph':
        return <ParagraphField content={(element as any).content || ''} isEditing={effectiveIsEditing} />;
      case 'email':
        return (
          <EmailField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={effectiveIsEditing}
            value={textValue}
            onChange={setTextValue}
          />
        );
      case 'date':
        return (
          <DateField 
            label={element.label || ''} 
            required={element.required} 
            isEditing={effectiveIsEditing}
            date={dateValue}
            onChange={setDateValue}
          />
        );
      case 'number':
        return (
          <NumberField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={effectiveIsEditing}
            value={textValue}
            onChange={setTextValue}
          />
        );
      default:
        return <div>Unsupported field type: {element.type}</div>;
    }
  };

  return (
    <div className="form-element-content w-full">
      {renderField()}
      
      {/* Help Text - Don't show in preview mode unless configured differently */}
      {element.helpText && element.type !== 'header' && element.type !== 'paragraph' && !isPreview && (
        <div className="mt-1 flex items-start gap-1.5">
          <InfoIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">{element.helpText}</p>
        </div>
      )}
      
      {/* Validation Status - only show this when there's a validation type set and not in preview or editing mode */}
      {element.validation?.type && !isEditing && !isPreview && (
        <div className="mt-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-sm flex items-center text-yellow-700">
          <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
          <span className="text-xs">
            {element.validation.message || `Validation: ${element.validation.type}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default ElementContent;
