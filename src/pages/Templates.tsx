
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { SelectedTemplateProvider } from "@/context/SelectedTemplateContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <SelectedTemplateProvider>
      <AppLayout>
        <div className="flex flex-col h-[calc(100vh-56px)]">
          <div className="flex items-center border-b p-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-auto" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold text-center">Form Templates</h1>
            <div className="ml-auto w-20"></div> {/* Spacer for centered title */}
          </div>
          
          <div className="flex-1 overflow-auto">
            <TemplateGallery />
          </div>
        </div>
      </AppLayout>
    </SelectedTemplateProvider>
  );
};

export default Templates;
