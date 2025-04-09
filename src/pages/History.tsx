
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import VersionHistory from "@/components/history/VersionHistory";

const History = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Form History</h1>
          <p className="text-muted-foreground mt-2">
            View, compare and restore previous versions of your forms
          </p>
        </div>
        
        <VersionHistory />
      </div>
    </AppLayout>
  );
};

export default History;
