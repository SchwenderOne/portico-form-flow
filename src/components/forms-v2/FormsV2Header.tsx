
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Play, 
  Download,
  Share2, 
  Settings,
  Undo,
  Redo
} from "lucide-react";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const FormsV2Header = () => {
  const { metadata } = useFormMetadata();
  
  const handleSave = () => {
    toast.success("Form saved successfully");
  };
  
  const handlePreview = () => {
    toast.info("Form preview opened in new tab");
  };
  
  const handleExport = () => {
    toast.success("Form exported successfully");
  };
  
  const handleShare = () => {
    toast.success("Sharing options opened");
  };
  
  return (
    <div className="h-14 border-b bg-white/50 backdrop-blur-sm flex items-center justify-between px-4 z-10">
      <div className="flex items-center space-x-2">
        <h1 className="font-semibold text-lg truncate">
          {metadata?.name || "Untitled Form"}
        </h1>
        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
          {metadata?.status || "Draft"}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 mr-2">
          <Button variant="ghost" size="icon" title="Undo">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Redo">
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="ghost" size="sm" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handlePreview}>
          <Play className="h-4 w-4 mr-2" />
          Preview
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FormsV2Header;
