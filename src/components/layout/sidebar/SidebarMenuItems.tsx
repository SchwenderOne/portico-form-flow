
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export interface MenuItem {
  icon: React.ElementType;
  title: string;
  path: string;
  highlight?: boolean;
  usesBrandColor?: boolean;
  disabled?: boolean;
}

interface SidebarMenuItemsProps {
  items: MenuItem[];
  isSidebarCollapsed: boolean;
  onMenuItemClick: (path: string) => void;
}

const SidebarMenuItems: React.FC<SidebarMenuItemsProps> = ({ 
  items, 
  isSidebarCollapsed, 
  onMenuItemClick 
}) => {
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => (
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
            onClick={() => !item.disabled && onMenuItemClick(item.path)}
            disabled={item.disabled}
            tooltip={isSidebarCollapsed ? item.title : undefined}
          >
            <item.icon className={cn("h-5 w-5", !isSidebarCollapsed && "mr-2")} />
            {!isSidebarCollapsed && <span>{item.title}</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarMenuItems;
