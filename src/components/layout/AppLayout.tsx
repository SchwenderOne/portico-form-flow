
import React from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { SonnerProvider } from "../ui/sonner-provider";
import { SidebarProvider } from "../ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideHeader = false }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <div className="flex flex-col flex-1 min-h-screen">
            {!hideHeader && <AppHeader />}
            <main className="flex-1 flex flex-col overflow-auto">
              {children}
            </main>
          </div>
        </div>
        
        {/* Global toast provider for notifications */}
        <SonnerProvider position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
