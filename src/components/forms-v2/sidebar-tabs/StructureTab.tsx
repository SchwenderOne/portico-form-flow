
import React from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  EyeOff,
  Trash2,
  Copy,
  Lock,
  Unlock,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const StructureTab = () => {
  const { elements, selectedElements, handleElementSelect } = useFormCanvas();
  
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const [hiddenElements, setHiddenElements] = React.useState<Record<string, boolean>>({});
  const [lockedElements, setLockedElements] = React.useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const toggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHiddenElements((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const toggleLock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLockedElements((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Group elements by their type for organization
  const elementsByType: Record<string, typeof elements> = {
    "Layout Elements": elements.filter(el => ["header", "paragraph", "section", "image"].includes(el.type)),
    "Form Fields": elements.filter(el => !["header", "paragraph", "section", "image"].includes(el.type))
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm">
        <p className="text-muted-foreground mb-2">Form structure and element hierarchy</p>
        
        {Object.entries(elementsByType).map(([category, categoryElements]) => (
          categoryElements.length > 0 ? (
            <div key={category} className="mb-4">
              <h3 className="text-xs font-medium mb-2 text-muted-foreground">{category}</h3>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-0.5">
                  {categoryElements.map(element => (
                    <div 
                      key={element.id}
                      className={cn(
                        "group flex items-center border rounded-md p-2 cursor-pointer hover:bg-blue-50 relative",
                        selectedElements.includes(element.id) && "bg-blue-50 border-blue-300"
                      )}
                      onClick={() => handleElementSelect(element.id, false)}
                    >
                      <div className="flex items-center flex-1 overflow-hidden">
                        <GripVertical className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-grab mr-1" />
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 p-0 mr-1"
                          onClick={() => toggleExpand(element.id)}
                        >
                          {expandedSections[element.id] ? 
                            <ChevronDown className="h-3 w-3" /> : 
                            <ChevronRight className="h-3 w-3" />
                          }
                        </Button>
                        
                        <div className="truncate text-sm">
                          {element.label || `${element.type.charAt(0).toUpperCase() + element.type.slice(1)}`}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => toggleVisibility(element.id, e)}
                        >
                          {hiddenElements[element.id] ? 
                            <EyeOff className="h-3 w-3" /> : 
                            <Eye className="h-3 w-3" />
                          }
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => toggleLock(element.id, e)}
                        >
                          {lockedElements[element.id] ? 
                            <Lock className="h-3 w-3" /> : 
                            <Unlock className="h-3 w-3" />
                          }
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default StructureTab;
