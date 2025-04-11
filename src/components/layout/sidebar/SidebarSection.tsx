
import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
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

export default SidebarSection;
