
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { FolderPlus, Pencil, Trash, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data for projects
const mockProjects = [
  { id: 1, name: "Healthcare Forms", description: "Medical and insurance forms", forms: 5, created: "2023-11-10" },
  { id: 2, name: "Government Applications", description: "Public service request forms", forms: 3, created: "2023-12-05" },
  { id: 3, name: "Education Documents", description: "School and enrollment forms", forms: 7, created: "2024-01-15" },
  { id: 4, name: "NGO Initiatives", description: "Volunteer and donation forms", forms: 2, created: "2024-02-20" },
];

interface Project {
  id: number;
  name: string;
  description: string;
  forms: number;
  created: string;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (editMode && editId !== null) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editId 
          ? { ...project, name: newProject.name, description: newProject.description } 
          : project
      ));
      toast.success("Project updated successfully");
    } else {
      // Create new project
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      
      setProjects([
        ...projects,
        {
          id: newId,
          name: newProject.name,
          description: newProject.description,
          forms: 0,
          created: today
        }
      ]);
      toast.success("Project created successfully");
    }

    // Reset form and close dialog
    setNewProject({ name: "", description: "" });
    setIsDialogOpen(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      name: project.name,
      description: project.description
    });
    setEditMode(true);
    setEditId(project.id);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast.success("Project deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-base font-medium">Your Projects</h4>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setNewProject({ name: "", description: "" });
              setEditMode(false);
              setEditId(null);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription>
                {editMode 
                  ? "Update your project details below." 
                  : "Add a new project to organize your forms."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-description">Description</Label>
                <Input 
                  id="project-description" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Brief description of the project"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateProject}>
                {editMode ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length > 0 ? (
        <Table>
          <TableCaption>A list of your projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Forms</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell className="text-center">{project.forms}</TableCell>
                <TableCell>{project.created}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditProject(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDeleteProject(project.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 border rounded-md bg-muted/20">
          <FolderPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Create your first project to organize your forms</p>
          <Button onClick={() => setIsDialogOpen(true)}>Create Project</Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
