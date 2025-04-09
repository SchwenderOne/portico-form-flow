
import React, { useState } from "react";
import { ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-md mb-3 bg-white shadow-sm"
    >
      <CollapsibleTrigger className="flex items-center w-full p-3 hover:bg-gray-50 rounded-t-md transition-colors">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {icon && <span className="text-portico-purple">{icon}</span>}
            <span className="font-medium text-sm">{title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 bg-gray-50 rounded-b-md animate-accordion-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarSection;
