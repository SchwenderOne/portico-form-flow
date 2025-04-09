
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, ShieldCheck } from "lucide-react";

interface DataExportSectionProps {
  anonymizeExports: boolean;
  onAnonymizeExportsChange: (value: boolean) => void;
}

const DataExportSection: React.FC<DataExportSectionProps> = ({
  anonymizeExports,
  onAnonymizeExportsChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md font-semibold flex items-center">
          Data Export Settings
          <ShieldCheck className="ml-2 h-4 w-4 text-green-500" />
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure how form data can be exported and accessed
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center">
              <Label htmlFor="anonymize-exports" className="font-medium">
                Anonymize sensitive data in exports
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground ml-2 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      When enabled, sensitive personal information (names, emails, addresses) 
                      will be automatically anonymized in CSV and JSON exports unless explicitly 
                      overridden during export.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">
              Default for all exports (can be overridden during export)
            </p>
          </div>
          <Switch
            id="anonymize-exports"
            checked={anonymizeExports}
            onCheckedChange={onAnonymizeExportsChange}
          />
        </div>

        <div className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
          <p>
            <strong>Recommended:</strong> Enable anonymization by default to ensure GDPR compliance 
            when sharing form data with team members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataExportSection;
