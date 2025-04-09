
import React, { useState, useEffect } from "react";
import { FormElement } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlignLeft, AlignCenter, AlignRight, Trash2, Copy, Lock, Unlock } from "lucide-react";
import { useCollaboration } from "@/context/CollaborationContext";

interface FloatingToolbarProps {
  element: FormElement;
  visible: boolean;
  position: { x: number, y: number };
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onAlign: (id: string, alignment: 'left' | 'center' | 'right') => void;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  element,
  visible,
  position,
  onDelete,
  onDuplicate,
  onAlign
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isElementLocked, getElementEditor } = useCollaboration();
  
  // Check if this element is being edited by another user
  const isLocked = isElementLocked(element.id);
  const editor = getElementEditor(element.id);
  
  useEffect(() => {
    // Add a small delay for the animation
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div 
      className={`floating-toolbar ${isVisible ? 'opacity-100 scale-100' : 'toolbar-hidden'}`}
      style={{
        top: position.y - 45,
        left: position.x,
        transform: 'translateX(-50%)',
      }}
    >
      <TooltipProvider>
        <div className="flex items-center gap-1 p-1">
          {isLocked ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-amber-500"
                  disabled
                >
                  <Lock className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Being edited by {editor?.displayName || 'another user'}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onAlign(element.id, 'left')}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Align Left</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onAlign(element.id, 'center')}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Align Center</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onAlign(element.id, 'right')}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Align Right</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="h-4 w-px bg-gray-200 mx-1" />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onDuplicate(element.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(element.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FloatingToolbar;
