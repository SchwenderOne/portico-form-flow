
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Archive, 
  Trash, 
  Eye, 
  MoreHorizontal, 
  ChevronDown,
  BellRing
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Mock data for form submissions
const mockSubmissions = [
  {
    id: "1",
    formName: "Patient Intake Form",
    submittedBy: "John Smith",
    email: "john.smith@example.com",
    submittedOn: "2024-04-09T14:30:00Z",
    status: "new"
  },
  {
    id: "2",
    formName: "Patient Intake Form",
    submittedBy: "Sarah Johnson",
    email: "sarah.j@example.com",
    submittedOn: "2024-04-09T10:15:00Z",
    status: "reviewed"
  },
  {
    id: "3",
    formName: "Consent Form",
    submittedBy: "Michael Brown",
    email: "mbrown@example.com",
    submittedOn: "2024-04-08T16:45:00Z",
    status: "flagged"
  },
  {
    id: "4",
    formName: "Employee Feedback",
    submittedBy: "Emma Wilson",
    email: "e.wilson@example.com",
    submittedOn: "2024-04-07T11:20:00Z",
    status: "archived"
  },
  {
    id: "5",
    formName: "Compliance Checklist",
    submittedBy: "David Miller",
    email: "dmiller@example.com",
    submittedOn: "2024-04-06T09:10:00Z",
    status: "new"
  },
  {
    id: "6",
    formName: "Patient Intake Form",
    submittedBy: "Lisa Garcia",
    email: "lisa.g@example.com",
    submittedOn: "2024-04-05T15:30:00Z",
    status: "reviewed"
  }
];

const SubmissionsManager = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedForm, setSelectedForm] = useState("all");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);

  // Get unique form names for filter
  const formNames = Array.from(new Set(submissions.map(sub => sub.formName)));

  // Filter submissions based on search query, status, and form name
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.formName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || submission.status === selectedStatus;
    const matchesForm = selectedForm === "all" || submission.formName === selectedForm;
    
    return matchesSearch && matchesStatus && matchesForm;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
      case "reviewed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Reviewed</Badge>;
      case "flagged":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Flagged</Badge>;
      case "archived":
        return <Badge variant="outline" className="text-muted-foreground">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubmissions(filteredSubmissions.map(sub => sub.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const handleSelectSubmission = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSubmissions([...selectedSubmissions, id]);
    } else {
      setSelectedSubmissions(selectedSubmissions.filter(subId => subId !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedSubmissions.length === 0) {
      toast.error("No submissions selected");
      return;
    }
    
    toast.success(`${action} ${selectedSubmissions.length} submissions`);
    setSelectedSubmissions([]);
  };

  const handleViewSubmission = (id: string) => {
    toast.success(`Viewing submission ${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Submissions</h4>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form</label>
                  <Select value={selectedForm} onValueChange={setSelectedForm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Forms</SelectItem>
                      {formNames.map(form => (
                        <SelectItem key={form} value={form}>{form}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedForm("all");
                    setSelectedStatus("all");
                  }}>
                    Reset
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={() => handleBulkAction("Exporting")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={selectedSubmissions.length === 0}>
                Bulk Actions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkAction("Marking as reviewed")}>
                Mark as Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction("Flagging")}>
                Flag Submissions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleBulkAction("Archiving")}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleBulkAction("Deleting")}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredSubmissions.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <Checkbox 
                    checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedSubmissions.includes(submission.id)}
                      onCheckedChange={(checked) => handleSelectSubmission(submission.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{submission.formName}</TableCell>
                  <TableCell>
                    <div>
                      <div>{submission.submittedBy}</div>
                      <div className="text-sm text-muted-foreground">{submission.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(submission.submittedOn)}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewSubmission(submission.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.success(`Marked as reviewed`)}>
                            Mark as Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Exported submission`)}>
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Archived submission`)}>
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toast.error(`Deleted submission`)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 border rounded-md text-center">
          <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No submissions found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            There are no submissions matching your current filters. Try adjusting your search criteria or check back later.
          </p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setSelectedForm("all");
            setSelectedStatus("all");
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmissionsManager;
