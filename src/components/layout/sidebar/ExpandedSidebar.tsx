
import React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, CreditCard, HelpCircle } from "lucide-react";
import SidebarSection from "./SidebarSection";
import SidebarMenuItems, { MenuItem } from "./SidebarMenuItems";
import { BrandSettings } from "@/types/brand";

interface ExpandedSidebarProps {
  brandSettings: BrandSettings;
  isSidebarCollapsed: boolean;
  createSection: MenuItem[];
  distributeSection: MenuItem[];
  analyzeSection: MenuItem[];
  collaborateSection: MenuItem[];
  controlSection: MenuItem[];
  onMenuItemClick: (path: string) => void;
  onCollapse: () => void;
  onSubscriptionClick: () => void;
  onHelpClick: () => void;
}

const ExpandedSidebar: React.FC<ExpandedSidebarProps> = ({
  brandSettings,
  isSidebarCollapsed,
  createSection,
  distributeSection,
  analyzeSection,
  collaborateSection,
  controlSection,
  onMenuItemClick,
  onCollapse,
  onSubscriptionClick,
  onHelpClick
}) => {
  return (
    <div className="w-64 border-r h-full flex flex-col bg-background transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-md flex items-center justify-center" 
            style={{ backgroundColor: brandSettings.colors.primary }}
          >
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-bold text-lg" style={{ 
            fontFamily: brandSettings.typography.fontFamily 
          }}>
            {brandSettings.identity.brandName}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onCollapse}
        >
          <PanelLeftClose className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-3">
        {/* Create Section */}
        <SidebarSection title="CREATE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItems 
            items={createSection} 
            isSidebarCollapsed={isSidebarCollapsed} 
            onMenuItemClick={onMenuItemClick} 
          />
        </SidebarSection>

        {/* Distribute Section */}
        <SidebarSection title="DISTRIBUTE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItems 
            items={distributeSection} 
            isSidebarCollapsed={isSidebarCollapsed} 
            onMenuItemClick={onMenuItemClick} 
          />
        </SidebarSection>

        {/* Analyze Section */}
        <SidebarSection title="ANALYZE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItems 
            items={analyzeSection} 
            isSidebarCollapsed={isSidebarCollapsed} 
            onMenuItemClick={onMenuItemClick} 
          />
        </SidebarSection>

        {/* Collaborate Section */}
        <SidebarSection title="COLLABORATE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItems 
            items={collaborateSection} 
            isSidebarCollapsed={isSidebarCollapsed} 
            onMenuItemClick={onMenuItemClick} 
          />
        </SidebarSection>

        {/* Brand & Control Section */}
        <SidebarSection title="BRAND & CONTROL" isCollapsed={isSidebarCollapsed}>
          <SidebarMenuItems 
            items={controlSection} 
            isSidebarCollapsed={isSidebarCollapsed} 
            onMenuItemClick={onMenuItemClick} 
          />
        </SidebarSection>
      </div>
      
      <div className="p-3 border-t">
        <div 
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer"
          onClick={onSubscriptionClick}
        >
          <CreditCard className="h-5 w-5" style={{ color: brandSettings.colors.primary }} />
          <div className="flex flex-col">
            <span className="text-xs font-medium">Free Plan</span>
            <span className="text-xs text-muted-foreground">Upgrade to Pro</span>
          </div>
        </div>
        <div 
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer mt-2"
          onClick={onHelpClick}
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-sm">Help & Support</span>
        </div>
      </div>
    </div>
  );
};

export default ExpandedSidebar;
