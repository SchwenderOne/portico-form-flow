
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetadataTab from "@/components/form-builder/toolbars/tabs/MetadataTab";

const FormMetadata = () => {
  return (
    <AppLayout>
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Form Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <MetadataTab />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default FormMetadata;
