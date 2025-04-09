
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePorto } from "../context/PortoContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Download,
  Upload,
  Trash2,
  Settings,
  FileJson,
  Save,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export const PortoSettingsTab: React.FC = () => {
  const { 
    formTitle, 
    formDescription, 
    saveForm, 
    publishForm, 
    unpublishForm, 
    isPublished 
  } = usePorto();
  
  const [showGridLines, setShowGridLines] = React.useState(true);
  const [enableSnapToGrid, setEnableSnapToGrid] = React.useState(true);
  const [showFieldProperties, setShowFieldProperties] = React.useState(true);
  const [enableAutosave, setEnableAutosave] = React.useState(true);

  const handleExportForm = () => {
    toast.success("Form exported successfully");
  };

  const handleImportForm = () => {
    toast.success("Form imported successfully");
  };

  const handleDuplicateForm = () => {
    toast.success("Form duplicated successfully");
  };

  const handleDeleteForm = () => {
    toast.error("Form deleted");
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Form Information</CardTitle>
            <CardDescription className="text-xs">
              Basic information about your form
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground text-xs">Title</div>
              <div className="font-medium">{formTitle}</div>
            </div>
            <div className="space-y-1 mt-3">
              <div className="text-muted-foreground text-xs">Description</div>
              <div className="text-sm">{formDescription}</div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex flex-col items-stretch gap-2">
            <Button onClick={saveForm} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Form
            </Button>
            <Button
              variant={isPublished ? "destructive" : "outline"}
              onClick={isPublished ? unpublishForm : publishForm}
              className="w-full"
            >
              {isPublished ? "Unpublish Form" : "Publish Form"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Editor Settings</CardTitle>
            <CardDescription className="text-xs">
              Configure the behavior of the form editor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-grid" className="text-sm">
                  Show Grid Lines
                </Label>
                <Switch
                  id="show-grid"
                  checked={showGridLines}
                  onCheckedChange={setShowGridLines}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="snap-grid" className="text-sm">
                  Enable Snap to Grid
                </Label>
                <Switch
                  id="snap-grid"
                  checked={enableSnapToGrid}
                  onCheckedChange={setEnableSnapToGrid}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="field-props" className="text-sm">
                  Show Field Properties
                </Label>
                <Switch
                  id="field-props"
                  checked={showFieldProperties}
                  onCheckedChange={setShowFieldProperties}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autosave" className="text-sm">
                  Enable Autosave
                </Label>
                <Switch
                  id="autosave"
                  checked={enableAutosave}
                  onCheckedChange={setEnableAutosave}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Form Actions</CardTitle>
            <CardDescription className="text-xs">
              Import, export, and manage your form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleExportForm}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Form
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleImportForm}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Form
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleDuplicateForm}
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate Form
            </Button>
            <Separator className="my-2" />
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={handleDeleteForm}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
