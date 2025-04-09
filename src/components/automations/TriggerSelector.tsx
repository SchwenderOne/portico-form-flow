
import React from "react";
import { TriggerType, Trigger, Condition } from "@/types/automation";
import { FormElement } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BellRing, FileCheck, FormInput } from "lucide-react";

interface TriggerSelectorProps {
  trigger: Trigger;
  formElements: FormElement[];
  onTriggerChange: (trigger: Trigger) => void;
}

const TriggerSelector: React.FC<TriggerSelectorProps> = ({
  trigger,
  formElements,
  onTriggerChange,
}) => {
  const handleTypeChange = (type: TriggerType) => {
    let name = "";
    switch (type) {
      case "formSubmission":
        name = "Form is submitted";
        break;
      case "fieldFilled":
        name = "Field is filled";
        break;
      case "fieldCondition":
        name = "Field meets condition";
        break;
    }

    onTriggerChange({
      ...trigger,
      type,
      name,
      fieldId: type !== "formSubmission" ? (formElements[0]?.id || "") : undefined,
      condition: type === "fieldCondition" ? { fieldId: formElements[0]?.id || "", operator: "equals", value: "" } : undefined,
    });
  };

  const handleFieldChange = (fieldId: string) => {
    if (trigger.type === "fieldFilled") {
      onTriggerChange({
        ...trigger,
        fieldId,
        name: `Field "${formElements.find(e => e.id === fieldId)?.label || fieldId}" is filled`,
      });
    } else if (trigger.type === "fieldCondition" && trigger.condition) {
      const newCondition: Condition = {
        ...trigger.condition,
        fieldId,
      };
      onTriggerChange({
        ...trigger,
        condition: newCondition,
        name: `Field "${formElements.find(e => e.id === fieldId)?.label || fieldId}" meets condition`,
      });
    }
  };

  const handleOperatorChange = (operator: Condition["operator"]) => {
    if (trigger.type === "fieldCondition" && trigger.condition) {
      const fieldId = trigger.condition.fieldId;
      const fieldName = formElements.find(e => e.id === fieldId)?.label || fieldId;
      
      onTriggerChange({
        ...trigger,
        condition: {
          ...trigger.condition,
          operator,
        },
        name: `Field "${fieldName}" ${getOperatorLabel(operator)} ${trigger.condition.value}`,
      });
    }
  };

  const handleValueChange = (value: string) => {
    if (trigger.type === "fieldCondition" && trigger.condition) {
      const fieldId = trigger.condition.fieldId;
      const fieldName = formElements.find(e => e.id === fieldId)?.label || fieldId;
      
      onTriggerChange({
        ...trigger,
        condition: {
          ...trigger.condition,
          value,
        },
        name: `Field "${fieldName}" ${getOperatorLabel(trigger.condition.operator)} ${value}`,
      });
    }
  };

  const getOperatorLabel = (operator: Condition["operator"]) => {
    switch (operator) {
      case "equals": return "equals";
      case "notEquals": return "does not equal";
      case "contains": return "contains";
      case "greaterThan": return "is greater than";
      case "lessThan": return "is less than";
      default: return operator;
    }
  };

  const getTriggerIcon = () => {
    switch (trigger.type) {
      case "formSubmission": return <FileCheck className="h-5 w-5 text-primary" />;
      case "fieldFilled": return <FormInput className="h-5 w-5 text-primary" />;
      case "fieldCondition": return <BellRing className="h-5 w-5 text-primary" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            {getTriggerIcon()}
            <h3 className="text-lg font-medium">Trigger: When this happens...</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="triggerType">Trigger Type</Label>
              <Select 
                value={trigger.type} 
                onValueChange={(value) => handleTypeChange(value as TriggerType)}
              >
                <SelectTrigger id="triggerType">
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formSubmission">Form is submitted</SelectItem>
                  <SelectItem value="fieldFilled">Field is filled</SelectItem>
                  <SelectItem value="fieldCondition">Field meets condition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(trigger.type === "fieldFilled" || trigger.type === "fieldCondition") && (
              <div className="space-y-2">
                <Label htmlFor="fieldId">Form Field</Label>
                <Select 
                  value={trigger.type === "fieldFilled" ? trigger.fieldId : trigger.condition?.fieldId} 
                  onValueChange={handleFieldChange}
                >
                  <SelectTrigger id="fieldId">
                    <SelectValue placeholder="Select a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {formElements.map((element) => (
                      <SelectItem key={element.id} value={element.id}>
                        {element.label || element.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {trigger.type === "fieldCondition" && trigger.condition && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="operator">Condition</Label>
                  <Select 
                    value={trigger.condition.operator} 
                    onValueChange={(value) => handleOperatorChange(value as Condition["operator"])}
                  >
                    <SelectTrigger id="operator">
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="notEquals">Does not equal</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="greaterThan">Greater than</SelectItem>
                      <SelectItem value="lessThan">Less than</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditionValue">Value</Label>
                  <Input
                    id="conditionValue"
                    value={trigger.condition.value.toString()}
                    onChange={(e) => handleValueChange(e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerSelector;
