
import React, { useState, useEffect } from "react";
import { FormElement } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Wand2, InfoIcon } from "lucide-react";
import { getSmartDefaultsStatus, toggleSmartDefaults } from "@/utils/smart-defaults";

interface SettingsTabProps {
  element: FormElement;
  onElementUpdate: (element: FormElement) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ element, onElementUpdate }) => {
  const [smartDefaultsOpen, setSmartDefaultsOpen] = useState(true);
  const [smartDefaultsEnabled, setSmartDefaultsEnabled] = useState(getSmartDefaultsStatus());

  const handleSmartDefaultsToggle = (checked: boolean) => {
    setSmartDefaultsEnabled(checked);
    toggleSmartDefaults(checked);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Form Settings</h3>
      
      <Collapsible
        open={smartDefaultsOpen}
        onOpenChange={setSmartDefaultsOpen}
        className="w-full space-y-2 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-indigo-500" />
            <h4 className="text-sm font-semibold">Smart Features</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <span className="sr-only">Toggle</span>
              {smartDefaultsOpen ? (
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
        
        <CollapsibleContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="smart-defaults" className="text-sm">Smart Defaults</Label>
              <p className="text-xs text-muted-foreground">
                Automatically set intelligent default values based on context
              </p>
            </div>
            <Switch
              id="smart-defaults"
              checked={smartDefaultsEnabled}
              onCheckedChange={handleSmartDefaultsToggle}
            />
          </div>
          
          {smartDefaultsEnabled && (
            <div className="bg-muted/50 rounded-md p-2 flex items-start gap-2">
              <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Smart Defaults will suggest field values based on surrounding elements. 
                You'll see a notification when this happens, with an option to undo.
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="my-4" />
      
      {/* Additional settings can be added here */}
    </div>
  );
};

export default SettingsTab;
