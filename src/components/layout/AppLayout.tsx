
import React from "react";
import AppHeader from "./AppHeader";
import { SonnerProvider } from "../ui/sonner-provider";

interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideHeader = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideHeader && <AppHeader />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Global toast provider for notifications */}
      <SonnerProvider position="top-right" />
    </div>
  );
};

export default AppLayout;
