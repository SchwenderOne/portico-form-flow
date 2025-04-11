
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { TeamManagementSheet } from "@/components/team/TeamManagementSheet";
import { openVersionHistory } from "@/components/form-builder/version-history/VersionHistorySheet";

// Import refactored components
import CollapsedSidebar from "./sidebar/CollapsedSidebar";
import ExpandedSidebar from "./sidebar/ExpandedSidebar";
import { createNavigationSections } from "./sidebar/navigationSections";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState(false);
  const { brandSettings } = useBrandSettings();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { 
    createSection, 
    distributeSection, 
    analyzeSection, 
    collaborateSection, 
    controlSection 
  } = createNavigationSections();

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

  const handleSubscriptionClick = () => {
    navigate("/subscription");
  };

  const handleHelpClick = () => {
    navigate("/help-support");
  };

  if (isSidebarCollapsed) {
    return (
      <>
        <CollapsedSidebar 
          brandSettings={brandSettings}
          createSection={createSection}
          distributeSection={distributeSection}
          analyzeSection={analyzeSection}
          collaborateSection={collaborateSection}
          controlSection={controlSection}
          onMenuItemClick={handleMenuItemClick}
          onExpand={() => setIsSidebarCollapsed(false)}
        />
        
        <TeamManagementSheet
          open={isTeamManagementOpen}
          onOpenChange={setIsTeamManagementOpen}
          showTrigger={false}
        />
      </>
    );
  }

  return (
    <>
      <ExpandedSidebar 
        brandSettings={brandSettings}
        isSidebarCollapsed={isSidebarCollapsed}
        createSection={createSection}
        distributeSection={distributeSection}
        analyzeSection={analyzeSection}
        collaborateSection={collaborateSection}
        controlSection={controlSection}
        onMenuItemClick={handleMenuItemClick}
        onCollapse={() => setIsSidebarCollapsed(true)}
        onSubscriptionClick={handleSubscriptionClick}
        onHelpClick={handleHelpClick}
      />
      
      <TeamManagementSheet
        open={isTeamManagementOpen}
        onOpenChange={setIsTeamManagementOpen}
        showTrigger={false}
      />
    </>
  );
};

export default AppSidebar;
