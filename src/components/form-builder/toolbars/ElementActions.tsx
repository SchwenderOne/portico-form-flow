
import React from "react";
import { 
  Copy, 
  Trash2, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface ElementActionsProps {
  elementId: string;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAlign?: (id: string, alignment: 'left' | 'center' | 'right') => void;
  showAlignmentControls?: boolean;
}

const ElementActions: React.FC<ElementActionsProps> = ({
  elementId,
  onDuplicate,
  onDelete,
  onAlign,
  showAlignmentControls = true
}) => {
  const commonButtonClasses = "p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-portico-purple transition-colors";

  return (
    <>
      {showAlignmentControls && onAlign && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={commonButtonClasses} 
                onClick={() => onAlign(elementId, 'left')}
                aria-label="Align Left"
              >
                <AlignLeft size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Align Left</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={commonButtonClasses} 
                onClick={() => onAlign(elementId, 'center')}
                aria-label="Align Center"
              >
                <AlignCenter size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Align Center</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={commonButtonClasses} 
                onClick={() => onAlign(elementId, 'right')}
                aria-label="Align Right"
              >
                <AlignRight size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Align Right</p>
            </TooltipContent>
          </Tooltip>
          
          <Separator orientation="vertical" className="mx-0.5 h-4" />
        </>
      )}
      
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className={commonButtonClasses} 
            onClick={() => onDuplicate(elementId)}
            aria-label="Duplicate"
          >
            <Copy size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Duplicate</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className="p-1.5 rounded-md hover:bg-portico-gray-soft text-portico-gray-dark hover:text-destructive transition-colors"
            onClick={() => onDelete(elementId)}
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Delete</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default ElementActions;
