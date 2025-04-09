
import React, { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  FileText, 
  FileCsv, 
  FileJson,
  Download,
  FileType,
  ShieldCheck
} from "lucide-react";
import { 
  exportToJSON, 
  exportToCSV, 
  downloadFile, 
  generateExportFilename,
  preparePdfExport
} from "@/utils/export-utils";
import { FormElement } from "@/types/form";
import { useBrandSettings } from "@/context/BrandSettingsContext";

interface ExportFormDropdownProps {
  formElements: FormElement[];
}

const ExportFormDropdown: React.FC<ExportFormDropdownProps> = ({ 
  formElements 
}) => {
  const { brandSettings } = useBrandSettings();
  const [includeBranding, setIncludeBranding] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);
  
  const handleExportPDF = () => {
    try {
      // In a real app, this would generate and download the PDF
      const pdfMessage = preparePdfExport(
        formElements, 
        brandSettings, 
        includeBranding,
        anonymizeData
      );
      
      toast.success("PDF export prepared", {
        description: "Your form would now download as a PDF"
      });
      
      // Since we can't actually generate a PDF in this demo, show info about the options
      console.log("PDF Export Options:", {
        elements: formElements.length,
        includeBranding,
        anonymizeData,
        brandPrimaryColor: brandSettings.colors.primary
      });
    } catch (error) {
      toast.error("Failed to export PDF", {
        description: "Please try again or contact support"
      });
    }
  };
  
  const handleExportCSV = () => {
    try {
      const csvContent = exportToCSV(formElements, anonymizeData);
      const anonymizedPrefix = anonymizeData ? "anonymized-" : "";
      const filename = generateExportFilename("csv", anonymizeData);
      
      downloadFile(csvContent, filename, "text/csv;charset=utf-8");
      
      toast.success(`${anonymizedPrefix}CSV exported successfully`, {
        description: `File saved as ${filename}`
      });
    } catch (error) {
      toast.error("Failed to export CSV", {
        description: "Please try again or contact support"
      });
    }
  };
  
  const handleExportJSON = () => {
    try {
      const jsonContent = exportToJSON(formElements, anonymizeData);
      const anonymizedPrefix = anonymizeData ? "anonymized-" : "";
      const filename = generateExportFilename("json", anonymizeData);
      
      downloadFile(jsonContent, filename, "application/json");
      
      toast.success(`${anonymizedPrefix}JSON exported successfully`, {
        description: `File saved as ${filename}`
      });
    } catch (error) {
      toast.error("Failed to export JSON", {
        description: "Please try again or contact support"
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox 
              id="include-branding" 
              checked={includeBranding}
              onCheckedChange={(checked) => setIncludeBranding(checked as boolean)} 
            />
            <label 
              htmlFor="include-branding" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include branding
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="anonymize-data" 
              checked={anonymizeData}
              onCheckedChange={(checked) => setAnonymizeData(checked as boolean)} 
            />
            <label 
              htmlFor="anonymize-data" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
            >
              <span>Anonymize sensitive data</span>
              <ShieldCheck className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
            </label>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer" 
          onClick={handleExportPDF}
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={handleExportCSV}
        >
          <FileCsv className="mr-2 h-4 w-4" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={handleExportJSON}
        >
          <FileJson className="mr-2 h-4 w-4" />
          <span>Export as JSON</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileType className="mr-2 h-4 w-4" />
            <span>Advanced Options</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                Export filtered responses only
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export with metadata
              </DropdownMenuItem>
              <DropdownMenuItem>
                Custom export format
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportFormDropdown;
