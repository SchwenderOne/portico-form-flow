
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Eye, Download, Search } from "lucide-react";

// Define the Submission interface with correct status types
interface Submission {
  id: string;
  formName: string;
  submittedBy: string;
  submittedAt: string;
  status: "complete" | "incomplete" | "pending";
}

// Mock data for submissions with explicitly typed status values
const mockSubmissions: Submission[] = [
  { 
    id: "S-1001", 
    formName: "Patient Registration", 
    submittedBy: "john.doe@example.com", 
    submittedAt: "2024-03-10 14:32", 
    status: "complete" 
  },
  { 
    id: "S-1002", 
    formName: "Insurance Claim", 
    submittedBy: "sarah.smith@example.com", 
    submittedAt: "2024-03-12 09:15", 
    status: "incomplete" 
  },
  { 
    id: "S-1003", 
    formName: "Volunteer Application", 
    submittedBy: "mike.johnson@example.com", 
    submittedAt: "2024-03-15 16:45", 
    status: "complete" 
  },
  { 
    id: "S-1004", 
    formName: "Grant Request", 
    submittedBy: "emily.davis@example.com", 
    submittedAt: "2024-03-18 11:20", 
    status: "pending" 
  },
  { 
    id: "S-1005", 
    formName: "Feedback Survey", 
    submittedBy: "robert.brown@example.com", 
    submittedAt: "2024-03-20 13:10", 
    status: "complete" 
  },
];

const SubmissionsManager = () => {
  const [submissions] = useState<Submission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter submissions based on search term and status
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.formName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      submission.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsDetailsOpen(true);
  };

  const handleDownload = (id: string) => {
    console.log(`Downloading submission ${id}`);
    // In a real app, this would trigger a download
  };

  const getStatusBadge = (status: "complete" | "incomplete" | "pending") => {
    switch (status) {
      case "complete":
        return <Badge variant="default" className="bg-green-500">Complete</Badge>;
      case "incomplete":
        return <Badge variant="secondary" className="bg-amber-500">Incomplete</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search submissions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredSubmissions.length > 0 ? (
        <Table>
          <TableCaption>Submissions received from your forms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-mono">{submission.id}</TableCell>
                <TableCell>{submission.formName}</TableCell>
                <TableCell>{submission.submittedBy}</TableCell>
                <TableCell>{submission.submittedAt}</TableCell>
                <TableCell>{getStatusBadge(submission.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleViewDetails(submission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDownload(submission.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 border rounded-md bg-muted/20">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No submissions found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filters" 
              : "You haven't received any form submissions yet"}
          </p>
        </div>
      )}

      {/* Submission details dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.id} - Submitted on {selectedSubmission?.submittedAt}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Form Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Form Name</p>
                  <p className="text-sm">{selectedSubmission?.formName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="mt-1">
                    {selectedSubmission && getStatusBadge(selectedSubmission.status)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Submitted By</p>
                  <p className="text-sm">{selectedSubmission?.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Submission ID</p>
                  <p className="text-sm font-mono">{selectedSubmission?.id}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Submission Data</h4>
              <div className="border rounded-md p-4 bg-muted/20">
                <p className="text-muted-foreground text-sm italic">
                  This is a placeholder for the actual form submission data, which would be 
                  displayed here in a real application.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
              <Button 
                variant="default"
                onClick={() => handleDownload(selectedSubmission?.id || "")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsManager;
