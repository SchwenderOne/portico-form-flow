
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

interface ElementContentProps {
  element: FormElement;
  isEditing: boolean;
}

const ElementContent: React.FC<ElementContentProps> = ({ element, isEditing }) => {
  // Add default state values for form controls
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [gdprConsentValue, setGdprConsentValue] = useState(false);
  
  // Get compliance context for GDPR field
  const { complianceSettings } = useCompliance();

  const renderField = () => {
    switch (element.type) {
      case 'text':
        return (
          <TextField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={isEditing} 
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
            isEditing={isEditing} 
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
            isEditing={isEditing} 
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
            isEditing={isEditing}
            privacyPolicyUrl={complianceSettings.privacyPolicyUrl}
            termsAndConditionsUrl={complianceSettings.termsAndConditionsUrl}
          />
        );
      case 'radio':
        // Radio buttons would need a different implementation
        return <div>Radio field (not implemented)</div>;
      case 'select':
        return (
          <SelectField 
            label={element.label || ''} 
            options={element.options || []} 
            required={element.required} 
            isEditing={isEditing}
            selectedOption={selectValue}
            onChange={setSelectValue}
          />
        );
      case 'file':
        return (
          <FileField 
            label={element.label || ''} 
            required={element.required} 
            isEditing={isEditing} 
          />
        );
      case 'header':
        return <HeaderField content={(element as any).content || ''} isEditing={isEditing} />;
      case 'paragraph':
        return <ParagraphField content={(element as any).content || ''} isEditing={isEditing} />;
      case 'email':
        return (
          <EmailField 
            label={element.label || ''} 
            placeholder={element.placeholder} 
            required={element.required} 
            isEditing={isEditing}
            value={textValue}
            onChange={setTextValue}
          />
        );
      case 'date':
        return (
          <DateField 
            label={element.label || ''} 
            required={element.required} 
            isEditing={isEditing}
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
            isEditing={isEditing}
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
      
      {/* Help Text */}
      {element.helpText && element.type !== 'header' && element.type !== 'paragraph' && (
        <div className="mt-1 flex items-start gap-1.5">
          <InfoIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">{element.helpText}</p>
        </div>
      )}
      
      {/* Validation Status - only show this when there's a validation type set */}
      {element.validation?.type && !isEditing && (
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
