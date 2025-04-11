
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  SidebarSeparator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";
import { MenuItem } from "./SidebarMenuItems";
import { BrandSettings } from "@/types/brand";

interface CollapsedSidebarProps {
  brandSettings: BrandSettings;
  createSection: MenuItem[];
  distributeSection: MenuItem[];
  analyzeSection: MenuItem[];
  collaborateSection: MenuItem[];
  controlSection: MenuItem[];
  onMenuItemClick: (path: string) => void;
  onExpand: () => void;
}

const CollapsedSidebar: React.FC<CollapsedSidebarProps> = ({
  brandSettings,
  createSection,
  distributeSection,
  analyzeSection,
  collaborateSection,
  controlSection,
  onMenuItemClick,
  onExpand
}) => {
  const location = useLocation();

  return (
    <div className="w-14 border-r h-full flex flex-col bg-background transition-all duration-300">
      <div className="p-2 flex justify-center border-b">
        <div 
          className="w-8 h-8 rounded-md flex items-center justify-center" 
          style={{ backgroundColor: brandSettings.colors.primary }}
        >
          <span className="text-white font-bold">P</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={100}>
          <div className="space-y-6">
            <div className="px-2">
              {createSection.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className={cn(
                        "w-10 h-10 mb-1",
                        item.highlight && "border-l-2 border-primary"
                      )}
                      onClick={() => !item.disabled && onMenuItemClick(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <SidebarSeparator />
            
            <div className="px-2">
              {distributeSection.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className="w-10 h-10 mb-1"
                      onClick={() => !item.disabled && onMenuItemClick(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <SidebarSeparator />
            
            <div className="px-2">
              {analyzeSection.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className="w-10 h-10 mb-1"
                      onClick={() => !item.disabled && onMenuItemClick(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <SidebarSeparator />
            
            <div className="px-2">
              {collaborateSection.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className="w-10 h-10 mb-1"
                      onClick={() => !item.disabled && onMenuItemClick(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <SidebarSeparator />
            
            <div className="px-2">
              {controlSection.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      size="icon"
                      className="w-10 h-10 mb-1"
                      onClick={() => !item.disabled && onMenuItemClick(item.path)}
                      style={item.usesBrandColor && location.pathname === item.path ? { 
                        backgroundColor: brandSettings.colors.primary,
                        color: 'white'
                      } : {}}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
      
      <div className="p-2 border-t">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="w-10 h-10"
              onClick={onExpand}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Expand sidebar</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default CollapsedSidebar;
