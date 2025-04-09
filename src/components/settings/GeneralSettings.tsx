
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";

const GeneralSettings = () => {
  const { brandSettings, updateBrandSettings } = useBrandSettings();

  const handleLanguageChange = (value: string) => {
    toast.info("Language preference saved", {
      description: `User interface language set to ${value}`
    });
  };

  const handleTimeZoneChange = (value: string) => {
    toast.info("Time zone preference saved", {
      description: `Time zone set to ${value}`
    });
  };

  const handleDateFormatChange = (value: string) => {
    toast.info("Date format preference saved", {
      description: `Date format set to ${value}`
    });
  };

  const handleToggleSmartDefaults = (checked: boolean) => {
    toast.info(`Smart defaults ${checked ? "enabled" : "disabled"}`, {
      description: `AI-powered field suggestions will ${checked ? "be shown" : "not be shown"} while creating forms`
    });
  };

  const handleSaveGeneral = () => {
    toast.success("General settings saved", {
      description: "Your preferences have been updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure general application preferences
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en" onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This changes the language of the user interface
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="timezone">Time Zone</Label>
          <Select defaultValue="UTC" onValueChange={handleTimeZoneChange}>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="EST">Eastern Time (EST)</SelectItem>
              <SelectItem value="CST">Central Time (CST)</SelectItem>
              <SelectItem value="PST">Pacific Time (PST)</SelectItem>
              <SelectItem value="CET">Central European Time (CET)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose your local time zone for accurate time display
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="date-format">Date Format</Label>
          <Select defaultValue="MM/DD/YYYY" onValueChange={handleDateFormatChange}>
            <SelectTrigger id="date-format">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Set how dates are displayed throughout the application
          </p>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="smart-defaults">Smart Defaults</Label>
            <p className="text-xs text-muted-foreground">
              Enable AI-powered field suggestions when creating forms
            </p>
          </div>
          <Switch
            id="smart-defaults"
            defaultChecked={true}
            onCheckedChange={handleToggleSmartDefaults}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="autosave">Autosave</Label>
            <p className="text-xs text-muted-foreground">
              Automatically save your work every 30 seconds
            </p>
          </div>
          <Switch
            id="autosave"
            defaultChecked={true}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveGeneral}>Save Changes</Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
