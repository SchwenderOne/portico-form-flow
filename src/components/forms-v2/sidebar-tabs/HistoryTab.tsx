
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  History,
  RotateCcw,
  User,
  Clock,
  ChevronRight,
  GitCompare,
  Clock4
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const HistoryTab = () => {
  const versionHistory = [
    {
      id: "v5",
      createdAt: "2023-08-15T14:30:00Z",
      author: "John Doe",
      changes: "Added GDPR consent field",
      current: true
    },
    {
      id: "v4",
      createdAt: "2023-08-14T11:20:00Z",
      author: "Sarah Smith",
      changes: "Updated form layout and styling"
    },
    {
      id: "v3",
      createdAt: "2023-08-12T16:45:00Z",
      author: "John Doe",
      changes: "Added validation rules"
    },
    {
      id: "v2",
      createdAt: "2023-08-10T09:15:00Z",
      author: "Alex Johnson",
      changes: "Initial form structure complete"
    },
    {
      id: "v1",
      createdAt: "2023-08-09T13:30:00Z",
      author: "John Doe",
      changes: "Created form"
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleRestore = (versionId: string) => {
    toast.success(`Version ${versionId} restored successfully`);
  };
  
  const handleCompare = (versionId: string) => {
    toast.info(`Comparing current version with ${versionId}...`);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-1">
        <h3 className="font-medium">Version History</h3>
        <p className="text-xs text-muted-foreground">
          View and restore previous versions of your form
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">5 Versions</p>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
          <Clock4 className="h-3 w-3" />
          Auto-save on
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-260px)]">
        <div className="space-y-3">
          {versionHistory.map((version, index) => (
            <div 
              key={version.id}
              className={cn(
                "rounded-md border p-3 text-sm",
                version.current && "border-blue-200 bg-blue-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-xs">{version.id}</span>
                    {version.current && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs">{version.changes}</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex items-center gap-1 text-[10px]">
                      <User className="h-3 w-3" />
                      <span>{version.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(version.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                {!version.current && (
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCompare(version.id)}
                    >
                      <GitCompare className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRestore(version.id)}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistoryTab;
