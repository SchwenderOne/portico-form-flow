
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrandColors from "./tabs/BrandColors";
import BrandTypography from "./tabs/BrandTypography";
import BrandIdentity from "./tabs/BrandIdentity";
import BrandPreview from "./BrandPreview";

const BrandingDashboard = () => {
  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your brand appearance across all forms and documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="identity">Identity</TabsTrigger>
              </TabsList>
              <TabsContent value="colors" className="mt-6">
                <BrandColors />
              </TabsContent>
              <TabsContent value="typography" className="mt-6">
                <BrandTypography />
              </TabsContent>
              <TabsContent value="identity" className="mt-6">
                <BrandIdentity />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="sticky top-6">
              <h3 className="text-lg font-medium mb-4">Live Preview</h3>
              <BrandPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingDashboard;
