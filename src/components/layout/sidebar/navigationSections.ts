
import { 
  LayoutGrid, 
  FileEdit, 
  Component, 
  Clipboard,
  Send, 
  MessageSquare, 
  Zap, 
  CalendarClock,
  BarChart,
  TestTube,
  Sparkles,
  Users, 
  History, 
  Folders,
  Palette, 
  Shield, 
  Settings, 
  KeyRound 
} from "lucide-react";
import { MenuItem } from "./SidebarMenuItems";

export const createNavigationSections = (): {
  createSection: MenuItem[];
  distributeSection: MenuItem[];
  analyzeSection: MenuItem[];
  collaborateSection: MenuItem[];
  controlSection: MenuItem[];
} => {
  // Menu sections based on the proposed structure
  const createSection: MenuItem[] = [
    { icon: LayoutGrid, title: "Templates", path: "/templates" },
    { icon: FileEdit, title: "Forms", path: "/" },
    { icon: Component, title: "Components", path: "/blocks-library" },
    { icon: Clipboard, title: "Porto", path: "/porto", highlight: true },
  ];

  const distributeSection: MenuItem[] = [
    { icon: Send, title: "Distribute", path: "/distribute" },
    { icon: MessageSquare, title: "Submissions", path: "/submissions" },
    { icon: Zap, title: "Automations", path: "/automations" },
    { icon: CalendarClock, title: "Scheduler", path: "/scheduler" },
  ];

  const analyzeSection: MenuItem[] = [
    { icon: BarChart, title: "Analytics", path: "/analytics" },
    // Future items commented out for now
    // { icon: TestTube, title: "A/B Testing", path: "/ab-testing", disabled: true },
    // { icon: Sparkles, title: "AI Suggestions", path: "/ai-suggestions", disabled: true },
  ];

  const collaborateSection: MenuItem[] = [
    { icon: Users, title: "Team", path: "/team" },
    { icon: History, title: "History", path: "/history" },
    { icon: Folders, title: "Projects", path: "/projects" },
  ];

  const controlSection: MenuItem[] = [
    { icon: Palette, title: "Branding", path: "/branding", usesBrandColor: true },
    { icon: Shield, title: "Compliance", path: "/compliance" },
    { icon: Settings, title: "Settings", path: "/settings" },
    { icon: KeyRound, title: "Security", path: "/security" },
  ];

  return {
    createSection,
    distributeSection,
    analyzeSection,
    collaborateSection,
    controlSection
  };
};
