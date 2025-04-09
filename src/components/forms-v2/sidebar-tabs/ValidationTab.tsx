
import React from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const ValidationTab = () => {
  const { elements } = useFormCanvas();
  
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-1">
        <h3 className="font-medium">Form Validation</h3>
        <p className="text-xs text-muted-foreground">
          Manage validation rules and error messages
        </p>
      </div>
      
      <div className="rounded-md border bg-amber-50 border-amber-200 p-3">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-500 mt-0.5" />
          <div>
            <p className="text-xs font-medium">Select a field to edit its validation rules</p>
            <p className="text-xs text-muted-foreground mt-1">
              You can set required fields, pattern validation, and custom error messages
            </p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-3">
          {elements.length > 0 ? (
            elements.map(element => (
              <div 
                key={element.id}
                className="flex items-start gap-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {element.required ? (
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-gray-300 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium">
                    {element.label || element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {element.required ? "Required" : "Optional"} - {element.type}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No form elements to validate</p>
              <Button variant="outline" size="sm" className="mt-2">
                Add Elements
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ValidationTab;
