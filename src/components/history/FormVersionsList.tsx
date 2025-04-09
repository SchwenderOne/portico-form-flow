
import React from "react";
import { DatabaseFormVersion } from "@/types/form";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeftRight, 
  RefreshCw,
  User,
  Calendar,
  FileText
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface FormVersionsListProps {
  versions: DatabaseFormVersion[];
  isLoading: boolean;
  onSelect: (version: DatabaseFormVersion) => void;
  onRefresh: () => void;
}

const FormVersionsList: React.FC<FormVersionsListProps> = ({ 
  versions, 
  isLoading,
  onSelect,
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
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No versions found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This form has no saved versions yet
          </p>
          <Button variant="outline" size="sm" onClick={onRefresh} className="mt-4">
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {versions.map((version) => {
        const createdDate = new Date(version.created_at);
        
        return (
          <div 
            key={version.id} 
            className="p-4 border rounded-md hover:bg-accent/10 transition-colors cursor-pointer"
            onClick={() => onSelect(version)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{version.version_label}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1">
                  <Calendar className="h-3 w-3" />
                  <span title={format(createdDate, "MMMM d, yyyy h:mm:ss a")}>
                    {formatDistanceToNow(createdDate, { addSuffix: true })}
                  </span>
                  {version.created_by && (
                    <>
                      <span className="mx-1">•</span>
                      <User className="h-3 w-3" />
                      <span>{version.created_by.substring(0, 8)}</span>
                    </>
                  )}
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
              >
                <ArrowLeftRight className="h-4 w-4 mr-1" />
                Compare
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormVersionsList;
