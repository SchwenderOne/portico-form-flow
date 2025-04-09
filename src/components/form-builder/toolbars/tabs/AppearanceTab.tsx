
import React from "react";
import { FormElement } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AppearanceTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ element, onElementUpdate }) => {
  const handleSizeChange = (width: number) => {
    const updatedElement = { 
      ...element, 
      size: { ...element.size, width } 
    };
    onElementUpdate(updatedElement);
  };

  return (
    <div className="p-4 h-48 overflow-y-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="width">Width</Label>
            <span className="text-xs text-muted-foreground">{element.size.width}px</span>
          </div>
          <Slider
            id="width"
            min={200}
            max={800}
            step={25}
            value={[element.size.width]}
            onValueChange={(values) => handleSizeChange(values[0])}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">
            Align Left
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Align Center
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
