
import React from "react";
import { DatabaseFormVersion } from "@/types/form";
import { Button } from "@/components/ui/button";
import { 
  RotateCcw, 
  ArrowLeftRight, 
  RefreshCw,
  User,
  Calendar
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface VersionsListProps {
  versions: DatabaseFormVersion[];
  isLoading: boolean;
  currentUserId: string;
  onRestore: (version: DatabaseFormVersion) => void;
  onCompare: (version: DatabaseFormVersion) => void;
  onRefresh: () => void;
}

const VersionsList: React.FC<VersionsListProps> = ({ 
  versions, 
  isLoading,
  currentUserId,
  onRestore, 
  onCompare,
  onRefresh
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-3 border rounded-md">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-muted/20">
        <p className="text-muted-foreground">No versions found.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Save a version to start tracking your form changes.
        </p>
        <Button variant="outline" size="sm" onClick={onRefresh} className="mt-3">
          <RefreshCw className="h-3 w-3 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-3 w-3 mr-2" />
          Refresh
        </Button>
      </div>

      {versions.map((version) => {
        const isCreatedByCurrentUser = version.created_by === currentUserId;
        const createdDate = new Date(version.created_at);
        
        return (
          <div 
            key={version.id} 
            className="p-3 border rounded-md hover:bg-muted/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{version.version_label}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                  <Calendar className="h-3 w-3" />
                  <span title={format(createdDate, "MMMM d, yyyy h:mm:ss a")}>
                    {formatDistanceToNow(createdDate, { addSuffix: true })}
                  </span>
                  {isCreatedByCurrentUser && (
                    <>
                      <span className="mx-1">•</span>
                      <User className="h-3 w-3" />
                      <span>You</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => onCompare(version)}
                  title="Compare with another version"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-amber-500 hover:text-amber-600 hover:bg-amber-50" 
                      title="Restore this version"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Restore Version</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will replace your current form with this version.
                        Are you sure you want to restore to "{version.version_label}"?
                        Unsaved changes will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onRestore(version)}
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        Yes, Restore
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VersionsList;
