
import React, { useState } from "react";
import { PortoSidebar } from "./PortoSidebar";
import { useFormCanvas } from "../form-builder/context/FormCanvasContext";
import { AIAssistantModal } from "./AIAssistantModal";
import { BrandSettingsSheet } from "../form-builder/BrandSettingsSheet";
import FormEditorSidebar from "../form-builder/sidebar/FormEditorSidebar";

// Import refactored components
import PortoEmptyState from "./components/PortoEmptyState";
import PortoFormElements from "./components/PortoFormElements";
import PortoToolbar from "./components/PortoToolbar";

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

  const toggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden relative">
      <PortoSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PortoToolbar 
          onOpenAIModal={handleOpenAIModal}
          onOpenBrandSettings={() => setIsBrandSettingsOpen(true)}
          onToggleRightSidebar={toggleRightSidebar}
          isRightSidebarCollapsed={isRightSidebarCollapsed}
          hasSelectedElement={!!selectedElement}
        />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 bg-gray-100 overflow-auto p-4">
            <div className="bg-white rounded-lg shadow-sm min-h-full p-4">
              {elements.length === 0 ? (
                <PortoEmptyState onGenerateWithAI={handleOpenAIModal} />
              ) : (
                <PortoFormElements elements={elements} />
              )}
            </div>
          </div>

          {selectedElement && !isRightSidebarCollapsed && (
            <div className="w-80 border-l bg-background overflow-y-auto transition-all duration-300">
              <FormEditorSidebar
                element={selectedElement}
                onElementUpdate={updateElement}
                existingElements={elements}
              />
            </div>
          )}
        </div>
      </div>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={handleCloseAIModal} />
      <BrandSettingsSheet open={isBrandSettingsOpen} onOpenChange={setIsBrandSettingsOpen} />
    </div>
  );
};
