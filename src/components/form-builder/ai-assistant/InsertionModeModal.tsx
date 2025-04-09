
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Replace, Info, ArrowDown } from "lucide-react";
import { FormElement } from "@/types/form";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InsertionModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelection: (shouldReplace: boolean) => void;
  elementsCount: number;
}

const InsertionModeModal: React.FC<InsertionModeModalProps> = ({
  isOpen,
  onClose,
  onSelection,
  elementsCount
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Choose Insertion Mode
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-muted-foreground mb-4">
            Your AI form with {elementsCount} elements is ready. Choose how you want to add it to your canvas:
          </p>

          <div className="grid grid-cols-2 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex flex-col h-auto py-6 gap-2 border-dashed"
                    onClick={() => onSelection(false)}
                  >
                    <PlusCircle className="h-10 w-10 text-portico-purple/70" />
                    <span className="font-medium">Insert into current form</span>
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-center">
                  <p>Adds new fields below your existing form elements</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex flex-col h-auto py-6 gap-2 border-dashed"
                    onClick={() => onSelection(true)}
                  >
                    <Replace className="h-10 w-10 text-portico-purple/70" />
                    <span className="font-medium">Replace current form</span>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] text-center">
                  <p>Removes existing elements and adds only the generated form</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertionModeModal;
