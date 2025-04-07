
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
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
  Shield
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, title: "Templates", path: "/templates" },
    { icon: FileEdit, title: "Forms", path: "/" },
    { icon: Send, title: "Distribute", path: "/distribute" },
    { icon: BarChart, title: "Analytics", path: "/analytics" },
    { icon: Palette, title: "Branding", path: "/branding" },
    { icon: History, title: "History", path: "/history" },
    { icon: Shield, title: "Compliance", path: "/compliance" },
    { icon: Settings, title: "Settings", path: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-portico-purple rounded-md flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-bold text-xl">Portico</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>WORKSPACE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={cn(
                      location.pathname === item.path && "bg-sidebar-accent text-portico-purple font-medium"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
            <Award className="h-5 w-5 text-portico-purple" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">Free Plan</span>
              <span className="text-xs text-muted-foreground">Upgrade to Pro</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer mt-2">
            <HelpCircle className="h-5 w-5" />
            <span className="text-sm">Help & Support</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
