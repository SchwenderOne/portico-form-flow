
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElement } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Box, 
  Type, 
  Palette, 
  Settings as SettingsIcon, 
  Wand2, 
  Group, 
  Ungroup, 
  InfoIcon, 
  AlertTriangle,
  Check
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onUpdate: (element: FormElement) => void;
  onGroup: () => void;
  onUngroup: () => void;
}

const FormToolbar: React.FC<FormToolbarProps> = ({ 
  selectedElement, 
  selectedCount,
  onUpdate,
  onGroup,
  onUngroup
}) => {
  const [element, setElement] = useState<FormElement | null>(null);
  const [generalOpen, setGeneralOpen] = useState(true);
  const [validationOpen, setValidationOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

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

  const handleValidationChange = (field: string, value: any) => {
    if (element) {
      const validation = element.validation || {};
      const updatedValidation = { ...validation, [field]: value };
      
      const updatedElement = { 
        ...element, 
        validation: updatedValidation
      };
      
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

  // Helper function to determine if validation is applicable for this field type
  const canHaveValidation = (type: string) => {
    return ['text', 'email', 'number', 'textarea', 'date', 'select'].includes(type);
  };

  // Get appropriate validation types based on field type
  const getValidationTypes = (type: string) => {
    switch (type) {
      case 'email':
        return [{ value: 'email', label: 'Email Format' }];
      case 'number':
        return [{ value: 'number', label: 'Number Range' }];
      case 'text':
      case 'textarea':
        return [
          { value: 'length', label: 'Text Length' },
          { value: 'regex', label: 'Pattern (Regex)' },
        ];
      case 'date':
        return [{ value: 'date', label: 'Date Range' }];
      default:
        return [
          { value: 'custom', label: 'Custom Validation' },
        ];
    }
  };

  if (selectedCount > 1) {
    return (
      <div className="h-64 border-t border-border p-4 bg-muted/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{selectedCount} elements selected</h3>
            <p className="text-xs text-muted-foreground mt-1">You can group these elements to move them together</p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" onClick={onGroup}>
              <Group className="h-4 w-4 mr-2" />
              Group Elements
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (element && element.groupId) {
    return (
      <div className="h-64 border-t border-border">
        <Tabs defaultValue="properties">
          <div className="flex items-center px-4 pt-2 border-b">
            <p className="text-sm font-medium mr-4">
              Editing: <span className="text-portico-purple">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</span>
              <span className="text-xs ml-2 bg-portico-purple/10 text-portico-purple px-1 rounded">Grouped</span>
            </p>
            <TabsList>
              <TabsTrigger value="properties" className="text-xs">
                <Box className="h-3 w-3 mr-1" />
                Properties
              </TabsTrigger>
              <TabsTrigger value="group" className="text-xs">
                <Group className="h-3 w-3 mr-1" />
                Group
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="properties">
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

          <TabsContent value="group" className="p-4">
            <div className="space-y-4">
              <p className="text-sm">This element is part of a group. You can ungroup to edit elements individually.</p>
              <Button size="sm" onClick={onUngroup}>
                <Ungroup className="h-4 w-4 mr-2" />
                Ungroup Elements
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

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
          <Collapsible
            open={generalOpen}
            onOpenChange={setGeneralOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-1">
              <h4 className="text-sm font-semibold">General</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <span className="sr-only">Toggle</span>
                  {generalOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                      <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                      <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-4">
              {element.type === 'header' || element.type === 'paragraph' ? (
                <div className="grid gap-2">
                  <Label htmlFor="content">Text Content</Label>
                  <Textarea
                    id="content"
                    value={(element as any).content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                  />
                </div>
              ) : (
                <>
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

                  <div className="grid gap-2">
                    <Label htmlFor="helpText">Help Text</Label>
                    <Input
                      id="helpText"
                      value={element.helpText || ''}
                      placeholder="Add descriptive text below this field"
                      onChange={(e) => handleChange('helpText', e.target.value)}
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
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {canHaveValidation(element.type) && (
            <Collapsible
              open={validationOpen}
              onOpenChange={setValidationOpen}
              className="w-full space-y-2 border-t pt-2 mt-2"
            >
              <div className="flex items-center justify-between space-x-4 px-1">
                <h4 className="text-sm font-semibold">Validation</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <span className="sr-only">Toggle</span>
                    {validationOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                        <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                        <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-4">
                {/* Validation Type Selector */}
                <div className="grid gap-2">
                  <Label htmlFor="validationType">Validation Type</Label>
                  <Select
                    value={element.validation?.type || ""}
                    onValueChange={(value) => handleValidationChange('type', value)}
                  >
                    <SelectTrigger id="validationType">
                      <SelectValue placeholder="Select validation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {getValidationTypes(element.type).map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional validation fields based on validation type */}
                {element.validation?.type === 'length' && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minLength">Minimum Length</Label>
                      <Input
                        id="minLength"
                        type="number"
                        value={element.validation?.minLength || 0}
                        onChange={(e) => handleValidationChange('minLength', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxLength">Maximum Length</Label>
                      <Input
                        id="maxLength"
                        type="number"
                        value={element.validation?.maxLength || 100}
                        onChange={(e) => handleValidationChange('maxLength', parseInt(e.target.value) || 100)}
                      />
                    </div>
                  </div>
                )}

                {element.validation?.type === 'number' && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="min">Minimum Value</Label>
                      <Input
                        id="min"
                        type="number"
                        value={element.validation?.min || 0}
                        onChange={(e) => handleValidationChange('min', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="max">Maximum Value</Label>
                      <Input
                        id="max"
                        type="number"
                        value={element.validation?.max || 100}
                        onChange={(e) => handleValidationChange('max', parseInt(e.target.value) || 100)}
                      />
                    </div>
                  </div>
                )}

                {element.validation?.type === 'regex' && (
                  <div className="grid gap-2">
                    <Label htmlFor="pattern">Regex Pattern</Label>
                    <Input
                      id="pattern"
                      value={element.validation?.pattern || ''}
                      placeholder="e.g. ^[A-Z][a-z]+$"
                      onChange={(e) => handleValidationChange('pattern', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Example: ^[A-Z][a-z]+$ for capitalized words</p>
                  </div>
                )}

                {/* Custom error message for any validation type */}
                <div className="grid gap-2">
                  <Label htmlFor="message">Error Message</Label>
                  <Input
                    id="message"
                    value={element.validation?.message || ''}
                    placeholder="Error message to display when validation fails"
                    onChange={(e) => handleValidationChange('message', e.target.value)}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <Collapsible
            open={advancedOpen}
            onOpenChange={setAdvancedOpen}
            className="w-full space-y-2 border-t pt-2 mt-2"
          >
            <div className="flex items-center justify-between space-x-4 px-1">
              <h4 className="text-sm font-semibold">Advanced</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <span className="sr-only">Toggle</span>
                  {advancedOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                      <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" className="h-4 w-4">
                      <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="disabled"
                  checked={element.disabled || false}
                  onCheckedChange={(checked) => handleChange('disabled', checked)}
                />
                <Label htmlFor="disabled">Disable Field</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
