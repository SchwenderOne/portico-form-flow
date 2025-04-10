
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
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { openVersionHistory } from "@/components/form-builder/version-history/VersionHistorySheet";

const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div className={cn("py-4", className)} {...props}>
      {children}
    </div>
  );
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState(false);
  const { brandSettings } = useBrandSettings();

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
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !item.disabled && handleMenuItemClick(item.path)}
          disabled={item.disabled}
        >
          <item.icon className="mr-2 h-5 w-5" />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center px-4 py-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-md flex items-center justify-center" 
              style={{ backgroundColor: brandSettings.colors.primary }}
            >
              <span className="text-white font-bold">P</span>
            </div>
            <span className="font-bold text-xl" style={{ 
              fontFamily: brandSettings.typography.fontFamily 
            }}>
              {brandSettings.identity.brandName}
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Create Section */}
          <SidebarGroup>
            <SidebarGroupLabel>CREATE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(createSection)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-1 mx-3" />

          {/* Distribute Section */}
          <SidebarGroup>
            <SidebarGroupLabel>DISTRIBUTE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(distributeSection)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-1 mx-3" />

          {/* Analyze Section */}
          <SidebarGroup>
            <SidebarGroupLabel>ANALYZE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(analyzeSection)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-1 mx-3" />

          {/* Collaborate Section */}
          <SidebarGroup>
            <SidebarGroupLabel>COLLABORATE</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(collaborateSection)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-1 mx-3" />

          {/* Brand & Control Section */}
          <SidebarGroup>
            <SidebarGroupLabel>BRAND & CONTROL</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(controlSection)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-4 py-2">
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
        </SidebarFooter>
      </Sidebar>

      <TeamManagementSheet
        open={isTeamManagementOpen}
        onOpenChange={setIsTeamManagementOpen}
        showTrigger={false}
      />
    </>
  );
};

export default AppSidebar;
