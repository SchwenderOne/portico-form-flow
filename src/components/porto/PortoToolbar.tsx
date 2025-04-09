
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { FormElement } from "@/types/form";
import {
  Copy,
  Trash2,
  Group,
  Ungroup,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoveHorizontal,
  ToggleRight,
  Undo,
  Redo,
} from "lucide-react";
import { toast } from "sonner";

export const PortoToolbar: React.FC = () => {
  const {
    elements,
    selectedElements,
    handleDuplicateElement,
    handleDuplicateGroup,
    handleDeleteElement,
    handleRequiredToggle,
    grouping,
    handleElementAlign,
    undoOperation,
    redoOperation,
    canUndo,
    canRedo
  } = useFormCanvas();

  const selectedCount = selectedElements.length;
  const selectedElement = selectedCount === 1
    ? elements.find(el => el.id === selectedElements[0])
    : null;

  const handleDuplicateAction = () => {
    if (selectedCount === 0) return;
    
    if (selectedCount === 1 && selectedElement) {
      handleDuplicateElement(selectedElement.id);
      toast.success("Element duplicated");
    } else {
      handleDuplicateGroup(selectedElements);
      toast.success("Elements duplicated");
    }
  };

  const handleDeleteAction = () => {
    if (selectedCount === 0) return;
    
    selectedElements.forEach(id => handleDeleteElement(id));
    toast.success(`${selectedCount} element(s) deleted`);
  };

  const handleRequiredToggleAction = () => {
    if (!selectedElement) return;
    
    if (selectedElement.type !== 'header' && selectedElement.type !== 'paragraph') {
      handleRequiredToggle(selectedElement.id, !selectedElement.required);
      toast.success(`Field is now ${!selectedElement.required ? 'required' : 'optional'}`);
    }
  };

  const handleAlignAction = (alignment: 'left' | 'center' | 'right') => {
    if (!selectedElement) return;
    handleElementAlign(selectedElement.id, alignment);
  };

  return (
    <div className="h-12 border-b bg-background flex items-center px-4 justify-between">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undoOperation}
          disabled={!canUndo}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redoOperation}
          disabled={!canRedo}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicateAction}
          >
            <Copy className="h-4 w-4 mr-1" />
            Duplicate
          </Button>

          {selectedCount > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => grouping.groupElements()}
              >
                <Group className="h-4 w-4 mr-1" />
                Group
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => grouping.ungroupElements()}
              >
                <Ungroup className="h-4 w-4 mr-1" />
                Ungroup
              </Button>
            </>
          )}

          {selectedCount === 1 && selectedElement && (
            <>
              <div className="flex border rounded overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignAction('left')}
                  className="rounded-none border-r h-8 px-2"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignAction('center')}
                  className="rounded-none border-r h-8 px-2"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignAction('right')}
                  className="rounded-none h-8 px-2"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              {selectedElement.type !== 'header' && selectedElement.type !== 'paragraph' && (
                <Button
                  variant={selectedElement.required ? "default" : "outline"}
                  size="sm"
                  onClick={handleRequiredToggleAction}
                >
                  <ToggleRight className="h-4 w-4 mr-1" />
                  {selectedElement.required ? "Required" : "Optional"}
                </Button>
              )}
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteAction}
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      )}

      {selectedCount === 0 && (
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-muted-foreground">
            Select an element to edit
          </span>
        </div>
      )}
    </div>
  );
};
