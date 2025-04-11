
import React, { useState, useEffect } from "react";
import { FormCanvasProvider } from "@/components/form-builder/context/FormCanvasContext";
import { CollaborationProvider } from "@/context/CollaborationContext";
import { PortoEditor } from "@/components/porto/PortoEditor";
import { PortoProvider } from "@/components/porto/context/PortoContext";
import { BrandSettingsProvider } from "@/context/BrandSettingsContext";
import { BrandSettingsApplier } from "@/components/branding/BrandSettingsApplier";
import { Toaster } from "@/components/ui/sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

const Porto = () => {
  // Default form ID for collaboration
  const formId = "porto-form-id";
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide welcome message after 5 seconds
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <AppLayout>
      <div className="h-[calc(100vh-60px)] w-full overflow-hidden">
        {/* Wrap everything in the BrandSettingsProvider context */}
        <BrandSettingsProvider>
          {/* Apply brand settings to CSS variables */}
          <BrandSettingsApplier />
          
          <PortoProvider>
            <CollaborationProvider formId={formId}>
              <FormCanvasProvider>
                <PortoEditor />
                <Toaster position="top-center" />
              </FormCanvasProvider>
            </CollaborationProvider>
          </PortoProvider>
        </BrandSettingsProvider>
        
        {showWelcome && (
          <div className="fixed bottom-4 right-4 max-w-md z-50 transition-all duration-500 ease-in-out transform translate-y-0 opacity-100">
            <Alert className="bg-primary/10 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription>
                Welcome to Portico Form Builder! Create beautiful, accessible forms for regulated industries with our drag & drop interface.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Porto;
