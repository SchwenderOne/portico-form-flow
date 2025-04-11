import React, { useState } from "react";
import { BlockItem } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Code, Copy, Download, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { toast } from "sonner";
import { LayoutGrid } from "lucide-react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { useNavigate } from "react-router-dom";

interface BlocksLibraryCanvasProps {
  selectedBlock: BlockItem | null;
}

export const BlocksLibraryCanvas: React.FC<BlocksLibraryCanvasProps> = ({ selectedBlock }) => {
  const { brandSettings } = useBrandSettings();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  
  let formCanvasContext: any = null;
  try {
    formCanvasContext = useFormCanvas();
  } catch (error) {
  }

  const handleCopyCode = () => {
    if (selectedBlock) {
      navigator.clipboard.writeText(selectedBlock.code || "// Block code would go here");
      toast.success("Code copied to clipboard");
    }
  };
  
  const handleAddToForm = () => {
    if (selectedBlock) {
      if (formCanvasContext && formCanvasContext.handleAddAIElements) {
        const elements = [{
          id: `${selectedBlock.id}-${Date.now()}`,
          type: selectedBlock.category === 'forms' ? 'text' : 'header',
          position: { x: 100, y: 100 },
          size: { width: 500, height: selectedBlock.category === 'forms' ? 80 : 60 },
          content: selectedBlock.name,
          groupId: null,
          required: false
        }];
        
        formCanvasContext.handleAddAIElements(elements);
        toast.success(`${selectedBlock.name} added to form`);
      } else {
        localStorage.setItem('blockToAdd', JSON.stringify(selectedBlock));
        navigate('/form-builder');
        toast.success(`${selectedBlock.name} will be added to form editor`);
      }
    }
  };
  
  const handleDragStart = (e: React.DragEvent) => {
    if (!selectedBlock) return;
    
    setIsDragging(true);
    e.dataTransfer.setData('blockData', JSON.stringify(selectedBlock));
    e.dataTransfer.effectAllowed = 'copy';
    
    const dragImage = document.createElement('div');
    dragImage.style.width = '200px';
    dragImage.style.height = '100px';
    dragImage.style.backgroundColor = '#e5deff';
    dragImage.style.border = '2px dashed #8b5cf6';
    dragImage.style.borderRadius = '4px';
    dragImage.style.display = 'flex';
    dragImage.style.alignItems = 'center';
    dragImage.style.justifyContent = 'center';
    dragImage.style.color = '#8b5cf6';
    dragImage.style.fontWeight = 'bold';
    dragImage.textContent = selectedBlock.name;
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 100, 50);
    
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  if (!selectedBlock) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center max-w-md p-6">
          <LayoutGrid className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Select a Block</h2>
          <p className="text-muted-foreground">
            Choose a block or component from the sidebar to view its details, preview, and add it to your form.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{selectedBlock.name}</h2>
          <p className="text-sm text-muted-foreground">{selectedBlock.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm" 
            onClick={handleAddToForm}
            style={{ backgroundColor: brandSettings.colors.primary }}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={isDragging ? "opacity-50" : ""}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Form
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="preview" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div 
                  className="border rounded-md p-6 w-full max-w-2xl cursor-grab"
                  draggable
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  {selectedBlock.previewComponent ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: selectedBlock.previewComponent }} 
                      className={isDragging ? "opacity-50" : ""}
                    />
                  ) : (
                    <div className="bg-muted/30 p-10 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Preview not available</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="code" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm font-mono">
                      {selectedBlock.code || "// Block code would go here"}
                    </code>
                  </pre>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="properties" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="border rounded-md divide-y">
                  {selectedBlock.properties ? (
                    Object.entries(selectedBlock.properties).map(([key, value]) => (
                      <div key={key} className="flex p-3">
                        <div className="font-medium w-1/3">{key}</div>
                        <div className="w-2/3 text-muted-foreground">{value}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No properties available
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
