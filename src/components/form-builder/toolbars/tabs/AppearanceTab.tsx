
import React from "react";
import { FormElement } from "@/types/form";

interface AppearanceTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ element, onElementUpdate }) => {
  // For now, this is a placeholder for appearance settings
  // We will expand this as needed
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-4">Appearance Settings</h3>
      <p className="text-sm text-muted-foreground">
        Appearance settings for {element.type} will be implemented soon.
      </p>
    </div>
  );
};

export default AppearanceTab;
