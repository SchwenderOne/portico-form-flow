
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElement } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Box, Type, Palette, Settings as SettingsIcon, Wand2 } from "lucide-react";

interface FormToolbarProps {
  selectedElement: FormElement | null;
  onUpdate: (element: FormElement) => void;
}

const FormToolbar: React.FC<FormToolbarProps> = ({ selectedElement, onUpdate }) => {
  const [element, setElement] = useState<FormElement | null>(null);

  useEffect(() => {
    setElement(selectedElement);
  }, [selectedElement]);

  const handleChange = (field: string, value: any) => {
    if (element) {
      const updatedElement = { ...element, [field]: value };
      setElement(updatedElement);
      onUpdate(updatedElement);
    }
  };

  const handleSizeChange = (width: number) => {
    if (element) {
      const updatedElement = { 
        ...element, 
        size: { ...element.size, width } 
      };
      setElement(updatedElement);
      onUpdate(updatedElement);
    }
  };

  if (!element) {
    return (
      <div className="h-64 border-t border-border p-4 bg-muted/20">
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Type className="h-8 w-8 mb-2" />
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 border-t border-border">
      <Tabs defaultValue="properties">
        <div className="flex items-center px-4 pt-2 border-b">
          <p className="text-sm font-medium mr-4">
            Editing: <span className="text-portico-purple">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</span>
          </p>
          <TabsList>
            <TabsTrigger value="properties" className="text-xs">
              <Box className="h-3 w-3 mr-1" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs">
              <Palette className="h-3 w-3 mr-1" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <SettingsIcon className="h-3 w-3 mr-1" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">
              <Wand2 className="h-3 w-3 mr-1" />
              AI Assist
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties" className="p-4 h-48 overflow-y-auto">
          {element.type === 'header' ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="content">Header Text</Label>
                <Textarea
                  id="content"
                  value={(element as any).content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="label">Field Label</Label>
                <Input
                  id="label"
                  value={element.label || ''}
                  onChange={(e) => handleChange('label', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="placeholder">Placeholder Text</Label>
                <Input
                  id="placeholder"
                  value={element.placeholder || ''}
                  onChange={(e) => handleChange('placeholder', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={element.required || false}
                  onCheckedChange={(checked) => handleChange('required', checked)}
                />
                <Label htmlFor="required">Required Field</Label>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="appearance" className="p-4 h-48 overflow-y-auto">
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
        </TabsContent>

        <TabsContent value="settings" className="p-4 h-48 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="enabled" defaultChecked />
              <Label htmlFor="enabled">Field Enabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="visible" defaultChecked />
              <Label htmlFor="visible">Field Visible</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="validation">Validation Message</Label>
              <Input
                id="validation"
                placeholder="Please enter a valid value"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="p-4 h-48 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-portico-purple/10 p-3 rounded-md">
              <h3 className="text-sm font-medium flex items-center text-portico-purple">
                <Wand2 className="h-4 w-4 mr-1" />
                AI Form Suggestions
              </h3>
              <p className="text-xs mt-1">Use AI to enhance your form field</p>
            </div>

            <div className="space-y-2">
              <Button size="sm" className="w-full">
                Suggest Improvements
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Generate Validation Rules
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Optimize for Accessibility
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormToolbar;
