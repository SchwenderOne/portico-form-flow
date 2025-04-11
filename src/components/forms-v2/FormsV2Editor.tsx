
import React, { useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import FormCanvas from "@/components/form-builder/FormCanvas";
import FormsV2Sidebar from "./FormsV2Sidebar";
import FormsV2Header from "./FormsV2Header";

const FormsV2Editor = () => {
  const [currentTab, setCurrentTab] = useState<string>("elements");
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <FormsV2Header />
      
      <div className="flex flex-1 overflow-hidden">
        <FormsV2Sidebar 
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
        
        <div className="flex-1 overflow-hidden">
          <FormCanvas />
        </div>
      </div>
    </div>
  );
};

export default FormsV2Editor;
