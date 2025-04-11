
import React from "react";
import { Button } from "@/components/ui/button";
import { PaintBucket, HelpCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PortoToolbarProps {
  onOpenAIModal: () => void;
  onOpenBrandSettings: () => void;
  onToggleRightSidebar: () => void;
  isRightSidebarCollapsed: boolean;
  hasSelectedElement: boolean;
}

const PortoToolbar: React.FC<PortoToolbarProps> = ({
  onOpenAIModal,
  onOpenBrandSettings,
  onToggleRightSidebar,
  isRightSidebarCollapsed,
  hasSelectedElement
}) => {
  const handlePreviewForm = () => {
    toast.success("Form ready to preview");
  };

  const handleExportForm = () => {
    toast.success("Form exported successfully");
  };

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white z-10">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium">Portico Form Builder</h1>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onOpenBrandSettings}
                className="h-8 w-8"
              >
                <PaintBucket className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Brand Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toast.info("Help documentation will open in a modal")}
                className="h-8 w-8"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Help & Documentation
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
          onClick={onOpenAIModal}
        >
          AI Assistant
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="text-sm"
          onClick={handleExportForm}
        >
          Export
        </Button>
        
        <Button
          variant="default"
          size="sm"
          className="text-sm"
          onClick={handlePreviewForm}
        >
          Preview Form
        </Button>
        
        {hasSelectedElement && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleRightSidebar}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {isRightSidebarCollapsed ? "Show" : "Hide"} element settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default PortoToolbar;
