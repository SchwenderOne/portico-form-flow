
import React from "react";
import { FormElement } from "@/types/form";

interface ComplianceTabProps {
  element?: FormElement;
  onElementUpdate?: (element: FormElement) => void;
}

const ComplianceTab: React.FC<ComplianceTabProps> = ({ element, onElementUpdate }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Compliance Settings</h3>
      <p className="text-sm text-muted-foreground">
        Configure compliance settings for this form element or the entire form.
      </p>
      {/* Compliance settings content goes here */}
    </div>
  );
};

export default ComplianceTab;
