
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
  FileJson,
  Download,
  FileType,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";
import { 
  exportToJSON, 
  exportToCSV, 
  downloadFile, 
  generateExportFilename,
  preparePdfExport,
  testAnonymization
} from "@/utils/export-utils";
import { FormElement } from "@/types/form";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExportFormDropdownProps {
  formElements: FormElement[];
}

const ExportFormDropdown: React.FC<ExportFormDropdownProps> = ({ 
  formElements 
}) => {
  const { brandSettings } = useBrandSettings();
  const [includeBranding, setIncludeBranding] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewData, setPreviewData] = useState<Record<string, any> | null>(null);
  
  const handleExportPDF = () => {
    try {
      // In a real app, this would generate and download the PDF
      const pdfData = preparePdfExport(
        formElements, 
        brandSettings, 
        includeBranding,
        anonymizeData
      );
      
      // Since we can't actually generate a PDF in this demo, show info about the options
      console.log("PDF Export Options:", {
        elements: formElements.length,
        includeBranding,
        anonymizeData,
        brandPrimaryColor: brandSettings.colors.primary
      });
      
      // Trigger test download - in a real app, this would be a PDF file
      const filename = generateExportFilename("pdf", anonymizeData);
      
      toast.success("PDF export prepared", {
        description: `Your form would now download as ${filename}`
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF", {
        description: "Please try again or contact support"
      });
    }
  };
  
  const handleExportCSV = () => {
    try {
      const csvContent = exportToCSV(formElements, anonymizeData);
      const filename = generateExportFilename("csv", anonymizeData);
      
      downloadFile(csvContent, filename, "text/csv;charset=utf-8");
      
      toast.success("CSV exported successfully", {
        description: `File saved as ${filename}`
      });
    } catch (error) {
      console.error("CSV export error:", error);
      toast.error("Failed to export CSV", {
        description: "Please try again or contact support"
      });
    }
  };
  
  const handleExportJSON = () => {
    try {
      const jsonContent = exportToJSON(formElements, anonymizeData);
      const filename = generateExportFilename("json", anonymizeData);
      
      downloadFile(jsonContent, filename, "application/json");
      
      toast.success("JSON exported successfully", {
        description: `File saved as ${filename}`
      });
    } catch (error) {
      console.error("JSON export error:", error);
      toast.error("Failed to export JSON", {
        description: "Please try again or contact support"
      });
    }
  };
  
  const handlePreviewAnonymization = () => {
    // Get sample anonymized data
    const anonymized = testAnonymization();
    setPreviewData(anonymized);
    setShowPreviewDialog(true);
  };

  return (
    <>
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
        
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <div className="p-2 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-branding" 
                checked={includeBranding}
                onCheckedChange={(checked) => setIncludeBranding(checked as boolean)} 
              />
              <label 
                htmlFor="include-branding" 
                className="text-sm font-medium leading-none cursor-pointer"
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
                className="text-sm font-medium leading-none cursor-pointer flex items-center"
              >
                <span>Anonymize sensitive data</span>
                <ShieldCheck className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
              </label>
            </div>
            
            {anonymizeData && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs mt-1"
                onClick={handlePreviewAnonymization}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Preview anonymization
              </Button>
            )}
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="flex cursor-pointer" 
            onClick={handleExportPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="flex cursor-pointer"
            onClick={handleExportCSV}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Export as CSV</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="flex cursor-pointer"
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
                <DropdownMenuItem className="cursor-pointer">
                  Export filtered responses only
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Export with metadata
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Custom export format
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Anonymized Data Preview</DialogTitle>
            <DialogDescription>
              This is how your sensitive data will look when anonymized.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {previewData && (
              <div className="bg-muted p-3 rounded-md overflow-auto max-h-[300px]">
                <pre className="text-xs">{JSON.stringify(previewData, null, 2)}</pre>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowPreviewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportFormDropdown;
