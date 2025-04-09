
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, StarOff, Edit, Trash, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { Prompt } from "../types";

interface PromptHistoryProps {
  prompts: Prompt[];
  onReusePrompt: (prompt: string) => void;
  onEditPrompt: (prompt: string) => void;
  onDeletePrompt: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  activeTab: 'history' | 'favorites';
}

const PromptHistory: React.FC<PromptHistoryProps> = ({
  prompts,
  onReusePrompt,
  onEditPrompt,
  onDeletePrompt,
  onToggleFavorite,
  activeTab
}) => {
  // Guard against empty history
  if (prompts.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        {activeTab === 'history' ? 'No prompt history yet' : 'No favorite prompts yet'}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-32 overflow-y-auto p-1">
      {prompts.map((promptItem) => (
        <div 
          key={promptItem.id} 
          className="group flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors text-sm"
        >
          <div className="flex-1 truncate">
            <span className="font-medium">{promptItem.text}</span>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(promptItem.timestamp), { addSuffix: true })}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7"
                    onClick={() => onToggleFavorite(promptItem.id)}
                  >
                    {promptItem.isFavorite ? 
                      <StarOff className="h-4 w-4 text-amber-500" /> : 
                      <Star className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{promptItem.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7"
                    onClick={() => onEditPrompt(promptItem.text)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7"
                    onClick={() => onReusePrompt(promptItem.text)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reuse prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Separator orientation="vertical" className="h-4" />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDeletePrompt(promptItem.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete prompt</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptHistory;
