
import React, { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, SquareUser, Type, Layers, LayoutGrid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ColorPicker } from "@/components/ui/color-picker";

interface AppearanceTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({ element, onElementUpdate }) => {
  const [advancedTab, setAdvancedTab] = useState("layout");
  const [styling, setStyling] = useState(element.styling || {});

  // Update local styling when element styling changes
  useEffect(() => {
    setStyling(element.styling || {});
  }, [element.styling]);
  
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

  // Function to handle styling changes
  const handleStylingChange = (property: string, value: string) => {
    const updatedStyling = {
      ...styling,
      [property]: value
    };
    
    setStyling(updatedStyling);
    
    onElementUpdate({
      ...element,
      styling: updatedStyling
    });
    
    toast.success(`Updated ${property} styling`);
  };

  // Apply all styling changes at once
  const applyAllStylingChanges = () => {
    onElementUpdate({
      ...element,
      styling
    });
    
    toast.success("All styling changes applied");
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
              value={[element.size.width]}
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
                value={[element.size.height]}
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
                <Palette className="h-3 w-3 mr-1" /> Advanced Styling
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Advanced Styling</h4>
                  <Tabs value={advancedTab} onValueChange={setAdvancedTab}>
                    <TabsList className="grid grid-cols-4 h-8">
                      <TabsTrigger value="layout" className="text-xs py-1 px-2">
                        <LayoutGrid className="h-3 w-3 mr-1" />
                        Layout
                      </TabsTrigger>
                      <TabsTrigger value="typography" className="text-xs py-1 px-2">
                        <Type className="h-3 w-3 mr-1" />
                        Text
                      </TabsTrigger>
                      <TabsTrigger value="colors" className="text-xs py-1 px-2">
                        <Palette className="h-3 w-3 mr-1" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="borders" className="text-xs py-1 px-2">
                        <Layers className="h-3 w-3 mr-1" />
                        Borders
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="layout" className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="padding" className="text-xs">Padding</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('padding', value)}
                            value={(styling?.padding || 'md')}
                          >
                            <SelectTrigger id="padding" className="h-8 text-xs">
                              <SelectValue placeholder="Padding" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Extra Small</SelectItem>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                              <SelectItem value="xl">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="margin" className="text-xs">Margin</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('margin', value)}
                            value={(styling?.margin || 'md')}
                          >
                            <SelectTrigger id="margin" className="h-8 text-xs">
                              <SelectValue placeholder="Margin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Extra Small</SelectItem>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                              <SelectItem value="xl">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="typography" className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="fontFamily" className="text-xs">Font Family</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('fontFamily', value)}
                            value={(styling?.fontFamily || 'sans')}
                          >
                            <SelectTrigger id="fontFamily" className="h-8 text-xs">
                              <SelectValue placeholder="Font Family" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sans">Sans-serif</SelectItem>
                              <SelectItem value="serif">Serif</SelectItem>
                              <SelectItem value="mono">Monospace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="fontSize" className="text-xs">Font Size</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('fontSize', value)}
                            value={(styling?.fontSize || 'md')}
                          >
                            <SelectTrigger id="fontSize" className="h-8 text-xs">
                              <SelectValue placeholder="Font Size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Extra Small</SelectItem>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                              <SelectItem value="xl">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="textAlign" className="text-xs">Text Align</Label>
                        <Select 
                          onValueChange={(value) => handleStylingChange('textAlign', value)}
                          value={(styling?.textAlign || 'left')}
                        >
                          <SelectTrigger id="textAlign" className="h-8 text-xs">
                            <SelectValue placeholder="Text Align" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                            <SelectItem value="justify">Justify</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="colors" className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="bgColor" className="text-xs">Background</Label>
                          <div className="flex items-center gap-2">
                            <ColorPicker
                              color={styling?.bgColor || '#ffffff'}
                              onChange={(color) => handleStylingChange('bgColor', color)}
                              label="Background Color"
                            />
                            <Input 
                              id="bgColor"
                              type="text" 
                              value={styling?.bgColor || '#ffffff'} 
                              onChange={(e) => handleStylingChange('bgColor', e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="textColor" className="text-xs">Text Color</Label>
                          <div className="flex items-center gap-2">
                            <ColorPicker
                              color={styling?.textColor || '#000000'}
                              onChange={(color) => handleStylingChange('textColor', color)}
                              label="Text Color"
                            />
                            <Input 
                              id="textColor"
                              type="text" 
                              value={styling?.textColor || '#000000'} 
                              onChange={(e) => handleStylingChange('textColor', e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="borders" className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="borderStyle" className="text-xs">Border Style</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('borderStyle', value)}
                            value={(styling?.borderStyle || 'solid')}
                          >
                            <SelectTrigger id="borderStyle" className="h-8 text-xs">
                              <SelectValue placeholder="Border Style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="solid">Solid</SelectItem>
                              <SelectItem value="dashed">Dashed</SelectItem>
                              <SelectItem value="dotted">Dotted</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="borderRadius" className="text-xs">Corner Radius</Label>
                          <Select 
                            onValueChange={(value) => handleStylingChange('borderRadius', value)}
                            value={(styling?.borderRadius || 'md')}
                          >
                            <SelectTrigger id="borderRadius" className="h-8 text-xs">
                              <SelectValue placeholder="Corner Radius" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                              <SelectItem value="full">Full</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <Separator className="my-2" />
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={applyAllStylingChanges}
                    >
                      Apply Styling
                    </Button>
                  </div>
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
