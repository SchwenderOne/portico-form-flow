
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectsManager from "@/components/projects/ProjectsManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  return (
    <AppLayout>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Projects & Folders</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsManager />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Projects;
