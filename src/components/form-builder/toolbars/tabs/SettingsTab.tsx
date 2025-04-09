
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsTab: React.FC = () => {
  return (
    <div className="p-4 h-48 overflow-y-auto">
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
    </div>
  );
};

export default SettingsTab;
