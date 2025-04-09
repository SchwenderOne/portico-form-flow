
import React from "react";
import { FormElement } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface AppearanceTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ element, onElementUpdate }) => {
  
  // Function to handle size changes
  const handleSizeChange = (width: number, height: number) => {
    onElementUpdate({
      ...element,
      size: {
        width,
        height
      }
    });
  };
  
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium mb-4">Appearance Settings</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="width" className="text-xs">Width</Label>
          <div className="flex items-center gap-2">
            <Slider 
              id="width-slider"
              defaultValue={[element.size.width]}
              min={200} 
              max={800}
              step={10}
              onValueChange={(values) => handleSizeChange(values[0], element.size.height)}
              className="flex-1"
            />
            <Input 
              id="width"
              type="number" 
              value={element.size.width} 
              onChange={(e) => handleSizeChange(Number(e.target.value), element.size.height)}
              className="w-16 h-8 text-xs" 
            />
          </div>
        </div>
        
        {element.type !== "header" && element.type !== "paragraph" && (
          <div>
            <Label htmlFor="height" className="text-xs">Height</Label>
            <div className="flex items-center gap-2">
              <Slider 
                id="height-slider"
                defaultValue={[element.size.height]}
                min={40} 
                max={200}
                step={5}
                onValueChange={(values) => handleSizeChange(element.size.width, values[0])}
                className="flex-1"
              />
              <Input 
                id="height"
                type="number" 
                value={element.size.height} 
                onChange={(e) => handleSizeChange(element.size.width, Number(e.target.value))}
                className="w-16 h-8 text-xs" 
              />
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Palette className="h-3 w-3 mr-1" /> Color Settings
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Advanced Styling</h4>
                  <p className="text-sm text-muted-foreground">
                    Additional styling options will be available soon.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
