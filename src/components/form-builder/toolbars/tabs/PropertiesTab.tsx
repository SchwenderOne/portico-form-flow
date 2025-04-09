
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Box, 
  InfoIcon
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface PropertiesTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const PropertiesTab: React.FC<PropertiesTabProps> = ({ element, onElementUpdate }) => {
  const [generalOpen, setGeneralOpen] = useState(true);
  
  const handleChange = (field: string, value: any) => {
    const updatedElement = { ...element, [field]: value };
    onElementUpdate(updatedElement);
  };

  return (
    <div className="p-4 h-48 overflow-y-auto">
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
    </div>
  );
};

export default PropertiesTab;
