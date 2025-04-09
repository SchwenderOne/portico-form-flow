
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import HeaderField from "./fields/HeaderField";
import ParagraphField from "./fields/ParagraphField";
import TextField from "./fields/TextField";
import EmailField from "./fields/EmailField";
import NumberField from "./fields/NumberField";
import TextareaField from "./fields/TextareaField";
import SelectField from "./fields/SelectField";
import CheckboxField from "./fields/CheckboxField";
import DateField from "./fields/DateField";
import FileField from "./fields/FileField";

interface ElementContentProps {
  element: FormElement;
  isEditing?: boolean;
}

const ElementContent: React.FC<ElementContentProps> = ({ element, isEditing = false }) => {
  // Add state for form elements
  const [value, setValue] = useState<string>((element as any).value || "");
  const [checked, setChecked] = useState<boolean>((element as any).checked || false);
  const [date, setDate] = useState<Date | undefined>((element as any).value);
  const [selectedOption, setSelectedOption] = useState<string>((element as any).selectedOption || "");

  switch (element.type) {
    case 'header':
      return (
        <HeaderField 
          content={(element as any).content || ''} 
          isEditing={isEditing} 
        />
      );
    case 'paragraph':
      return (
        <ParagraphField 
          content={(element as any).content || ''} 
          isEditing={isEditing} 
        />
      );
    case 'text':
      return (
        <TextField 
          label={element.label || ''} 
          required={element.required}
          placeholder={element.placeholder}
          value={value}
          onChange={setValue}
          isEditing={isEditing}
        />
      );
    case 'email':
      return (
        <EmailField 
          label={element.label || ''} 
          required={element.required}
          placeholder={element.placeholder}
          value={value}
          onChange={setValue}
          isEditing={isEditing}
        />
      );
    case 'number':
      return (
        <NumberField 
          label={element.label || ''} 
          required={element.required}
          placeholder={element.placeholder}
          value={value}
          onChange={setValue}
          isEditing={isEditing}
        />
      );
    case 'textarea':
      return (
        <TextareaField 
          label={element.label || ''} 
          required={element.required}
          placeholder={element.placeholder}
          value={value}
          onChange={setValue}
          isEditing={isEditing}
        />
      );
    case 'select':
      return (
        <SelectField 
          label={element.label || ''} 
          required={element.required}
          options={element.options || []}
          selectedOption={selectedOption}
          onChange={setSelectedOption}
          isEditing={isEditing}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField 
          id={element.id}
          label={element.label || ''} 
          required={element.required}
          checked={checked}
          onCheckedChange={setChecked}
          isEditing={isEditing}
        />
      );
    case 'date':
      return (
        <DateField 
          label={element.label || ''} 
          required={element.required}
          date={date}
          onChange={setDate}
          isEditing={isEditing}
        />
      );
    case 'file':
      return (
        <FileField 
          label={element.label || ''} 
          required={element.required}
          accept={(element as any).accept || ".pdf,.png"}
          isEditing={isEditing}
        />
      );
    default:
      return <div>Unknown element type</div>;
  }
};

export default ElementContent;
