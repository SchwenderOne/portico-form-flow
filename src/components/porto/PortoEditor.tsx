
import React, { useState } from "react";
import { PortoSidebar } from "./PortoSidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HelpCircle, PaintBucket, Settings } from "lucide-react";
import { useFormCanvas } from "../form-builder/context/FormCanvasContext";
import { toast } from "sonner";
import { AIAssistantModal } from "./AIAssistantModal";
import { BrandSettingsSheet } from "../form-builder/BrandSettingsSheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FormEditorSidebar from "../form-builder/sidebar/FormEditorSidebar";

export const PortoEditor: React.FC = () => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isBrandSettingsOpen, setIsBrandSettingsOpen] = useState(false);
  const { elements, selectedElements, updateElement } = useFormCanvas();
  
  // Get the currently selected element based on selectedElements array
  const selectedElement = selectedElements.length === 1 
    ? elements.find(el => el.id === selectedElements[0]) 
    : null;

  const handleOpenAIModal = () => {
    setIsAIModalOpen(true);
  };

  const handleCloseAIModal = () => {
    setIsAIModalOpen(false);
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  const handlePreviewForm = () => {
    toast.success(`Form with ${elements.length} elements ready to preview`);
  };

  const handleExportForm = () => {
    toast.success("Form exported successfully");
  };

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden relative">
      {isLeftSidebarCollapsed ? (
        <div className="w-10 bg-background border-r h-full flex flex-col items-center pt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLeftSidebar}
                  className="mb-4"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Show sidebar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <PortoSidebar />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {!isLeftSidebarCollapsed && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleLeftSidebar}
                      className="mr-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Hide sidebar
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <h1 className="text-lg font-medium">Portico Form Builder</h1>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsBrandSettingsOpen(true)}
                    className="h-8 w-8"
                  >
                    <PaintBucket className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Brand Settings
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toast.info("Help documentation will open in a modal")}
                    className="h-8 w-8"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Help & Documentation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={handleOpenAIModal}
            >
              AI Assistant
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="text-sm"
              onClick={handleExportForm}
            >
              Export
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="text-sm"
              onClick={handlePreviewForm}
            >
              Preview Form
            </Button>
            
            {selectedElement && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleRightSidebar}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {isRightSidebarCollapsed ? "Show" : "Hide"} element settings
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 bg-gray-100 overflow-auto p-4">
            <div className="bg-white rounded-lg shadow-sm min-h-full p-4">
              {elements.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <h2 className="text-xl font-semibold mb-2">Design Your Form</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Drag elements from the sidebar or use the AI Assistant to generate a complete form
                  </p>
                  <Button onClick={handleOpenAIModal}>Generate with AI</Button>
                </div>
              ) : (
                <div>
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className="border rounded-md p-4 mb-4"
                      style={{
                        marginLeft: `${element.position.x}px`,
                        marginTop: `${element.position.y - (element.position.y > 0 ? 50 : 0)}px`,
                        width: `${element.size.width}px`,
                      }}
                    >
                      {element.type === "header" ? (
                        <h3 className="text-lg font-semibold">{element.content}</h3>
                      ) : element.type === "paragraph" ? (
                        <p>{element.content}</p>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            {element.label} {element.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type={element.type === "email" ? "email" : "text"}
                            placeholder={element.placeholder}
                            className="w-full px-3 py-2 border rounded-md"
                            disabled
                          />
                          {element.helpText && (
                            <p className="text-xs text-muted-foreground">{element.helpText}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedElement && !isRightSidebarCollapsed && (
            <FormEditorSidebar
              element={selectedElement}
              onElementUpdate={updateElement}
              existingElements={elements}
            />
          )}
        </div>
      </div>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={handleCloseAIModal} />
      <BrandSettingsSheet open={isBrandSettingsOpen} onOpenChange={setIsBrandSettingsOpen} />
    </div>
  );
};
