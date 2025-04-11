
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  FileEdit, 
  Settings, 
  History, 
  Send, 
  HelpCircle, 
  Palette,
  Award,
  BarChart,
  Shield,
  Users,
  Zap,
  Clipboard,
  KeyRound,
  CreditCard,
  Folders,
  MessageSquare,
  CalendarClock,
  PenTool,
  Sparkles,
  TestTube,
  Component,
  ChevronUp,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { openVersionHistory } from "@/components/form-builder/version-history/VersionHistorySheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed: boolean;
}> = ({ 
  title, 
  children, 
  defaultOpen = true,
  isCollapsed
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (isCollapsed) {
    return <>{children}</>;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-2">
      <CollapsibleTrigger className="flex items-center w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
        <span className="font-semibold">{title}</span>
        {isOpen ? (
          <ChevronUp className="ml-auto h-4 w-4" />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState(false);
  const { brandSettings } = useBrandSettings();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname === "/team") {
      setIsTeamManagementOpen(true);
    }
  }, [location.pathname]);

  const handleMenuItemClick = (path: string) => {
    if (path === "/team") {
      setIsTeamManagementOpen(true);
    } else if (path === "/history") {
      const isInFormEditor = location.pathname.includes("form-builder");
      
      if (isInFormEditor) {
        openVersionHistory();
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  // Menu sections based on the proposed structure
  const createSection = [
    { icon: LayoutGrid, title: "Templates", path: "/templates" },
    { icon: FileEdit, title: "Forms", path: "/" },
    { icon: Component, title: "Components", path: "/blocks-library" },
    { icon: Clipboard, title: "Porto", path: "/porto", highlight: true },
  ];

  const distributeSection = [
    { icon: Send, title: "Distribute", path: "/distribute" },
    { icon: MessageSquare, title: "Submissions", path: "/submissions" },
    { icon: Zap, title: "Automations", path: "/automations" },
    { icon: CalendarClock, title: "Scheduler", path: "/scheduler" },
  ];

  const analyzeSection = [
    { icon: BarChart, title: "Analytics", path: "/analytics" },
    // Future items commented out for now
    // { icon: TestTube, title: "A/B Testing", path: "/ab-testing", disabled: true },
    // { icon: Sparkles, title: "AI Suggestions", path: "/ai-suggestions", disabled: true },
  ];

  const collaborateSection = [
    { icon: Users, title: "Team", path: "/team" },
    { icon: History, title: "History", path: "/history" },
    { icon: Folders, title: "Projects", path: "/projects" },
  ];

  const controlSection = [
    { icon: Palette, title: "Branding", path: "/branding", usesBrandColor: true },
    { icon: Shield, title: "Compliance", path: "/compliance" },
    { icon: Settings, title: "Settings", path: "/settings" },
    { icon: KeyRound, title: "Security", path: "/security" },
  ];

  const renderMenuItems = (items: any[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
          className={cn(
            (location.pathname === item.path) && 
            (item.usesBrandColor 
              ? "bg-[var(--brand-primary)] text-white font-medium" 
              : "bg-sidebar-accent text-foreground font-medium"),
            item.highlight && "border-l-2 border-primary",
            item.disabled && "opacity-50 cursor-not-allowed",
            isSidebarCollapsed && "justify-center p-2"
          )}
          onClick={() => !item.disabled && handleMenuItemClick(item.path)}
          disabled={item.disabled}
          tooltip={isSidebarCollapsed ? item.title : undefined}
        >
          <item.icon className={cn("h-5 w-5", !isSidebarCollapsed && "mr-2")} />
          {!isSidebarCollapsed && <span>{item.title}</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  // When the sidebar is fully collapsed, show only icons
  if (isSidebarCollapsed) {
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
                        onClick={() => !item.disabled && handleMenuItemClick(item.path)}
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
                        onClick={() => !item.disabled && handleMenuItemClick(item.path)}
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
                        onClick={() => !item.disabled && handleMenuItemClick(item.path)}
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
                        onClick={() => !item.disabled && handleMenuItemClick(item.path)}
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
                        onClick={() => !item.disabled && handleMenuItemClick(item.path)}
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
                onClick={() => setIsSidebarCollapsed(false)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }

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
          onClick={() => setIsSidebarCollapsed(true)}
        >
          <PanelLeftClose className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-3">
        {/* Create Section */}
        <SidebarSection title="CREATE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenu>
            {renderMenuItems(createSection)}
          </SidebarMenu>
        </SidebarSection>

        {/* Distribute Section */}
        <SidebarSection title="DISTRIBUTE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenu>
            {renderMenuItems(distributeSection)}
          </SidebarMenu>
        </SidebarSection>

        {/* Analyze Section */}
        <SidebarSection title="ANALYZE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenu>
            {renderMenuItems(analyzeSection)}
          </SidebarMenu>
        </SidebarSection>

        {/* Collaborate Section */}
        <SidebarSection title="COLLABORATE" isCollapsed={isSidebarCollapsed}>
          <SidebarMenu>
            {renderMenuItems(collaborateSection)}
          </SidebarMenu>
        </SidebarSection>

        {/* Brand & Control Section */}
        <SidebarSection title="BRAND & CONTROL" isCollapsed={isSidebarCollapsed}>
          <SidebarMenu>
            {renderMenuItems(controlSection)}
          </SidebarMenu>
        </SidebarSection>
      </div>
      
      <div className="p-3 border-t">
        <div 
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer"
          onClick={() => navigate("/subscription")}
        >
          <CreditCard className="h-5 w-5" style={{ color: brandSettings.colors.primary }} />
          <div className="flex flex-col">
            <span className="text-xs font-medium">Free Plan</span>
            <span className="text-xs text-muted-foreground">Upgrade to Pro</span>
          </div>
        </div>
        <div 
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer mt-2"
          onClick={() => navigate("/help-support")}
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-sm">Help & Support</span>
        </div>
      </div>
      
      <TeamManagementSheet
        open={isTeamManagementOpen}
        onOpenChange={setIsTeamManagementOpen}
        showTrigger={false}
      />
    </div>
  );
};

export default AppSidebar;
