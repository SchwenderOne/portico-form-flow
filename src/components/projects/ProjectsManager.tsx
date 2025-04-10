
import React, { useState } from "react";
import { 
  Folders, 
  FolderPlus, 
  FolderOpen, 
  FilePlus, 
  MoreHorizontal,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for projects
const mockProjects = [
  { 
    id: "1", 
    name: "Healthcare Forms", 
    type: "folder", 
    items: 12, 
    lastModified: "2023-11-15T14:32:00Z",
    shared: true
  },
  { 
    id: "2", 
    name: "Patient Intake", 
    type: "form", 
    items: null, 
    lastModified: "2023-12-01T09:15:00Z",
    shared: false
  },
  { 
    id: "3", 
    name: "Government Compliance", 
    type: "folder", 
    items: 8, 
    lastModified: "2024-01-05T16:45:00Z",
    shared: true
  },
  { 
    id: "4", 
    name: "Education Templates", 
    type: "folder", 
    items: 5, 
    lastModified: "2024-01-10T11:20:00Z",
    shared: false
  },
  { 
    id: "5", 
    name: "Consent Form", 
    type: "form", 
    items: null, 
    lastModified: "2024-01-15T13:40:00Z",
    shared: true
  }
];

const ProjectsManager = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFolder = () => {
    toast.success("Feature coming soon: Create Folder");
  };

  const handleCreateForm = () => {
    toast.success("Feature coming soon: Create Form");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects and folders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateFolder} variant="outline" size="sm">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button onClick={handleCreateForm} variant="default" size="sm">
            <FilePlus className="mr-2 h-4 w-4" />
            New Form
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Shared</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {project.type === "folder" ? (
                        <FolderOpen className="mr-2 h-4 w-4 text-amber-500" />
                      ) : (
                        <Folders className="mr-2 h-4 w-4 text-blue-500" />
                      )}
                      {project.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.type === "folder" ? "outline" : "secondary"}>
                      {project.type === "folder" ? 'Folder' : 'Form'}
                      {project.type === "folder" && project.items && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({project.items} items)
                        </span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(project.lastModified)}</TableCell>
                  <TableCell>
                    {project.shared ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Shared
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Private
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.success(`Rename ${project.name}`)}>
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Share ${project.name}`)}>
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toast.success(`Duplicate ${project.name}`)}
                          className="text-blue-600"
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toast.error(`Delete ${project.name}`)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectsManager;
