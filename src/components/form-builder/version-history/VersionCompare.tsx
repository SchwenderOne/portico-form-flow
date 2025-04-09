
import React, { useMemo } from "react";
import { DatabaseFormVersion, FormElement } from "@/types/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { 
  RotateCcw, 
  ChevronLeft,
  PlusCircle,
  MinusCircle,
  Edit
} from "lucide-react";
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

interface VersionCompareProps {
  selectedVersion: DatabaseFormVersion;
  compareVersion: DatabaseFormVersion | null;
  versions: DatabaseFormVersion[];
  onSelectCompareVersion: (version: DatabaseFormVersion) => void;
  onRestore: (version: DatabaseFormVersion) => void;
}

type ElementDiff = {
  id: string;
  type: string;
  status: 'added' | 'removed' | 'modified' | 'unchanged';
  changes?: string[];
  element1?: FormElement;
  element2?: FormElement;
};

const VersionCompare: React.FC<VersionCompareProps> = ({
  selectedVersion,
  compareVersion,
  versions,
  onSelectCompareVersion,
  onRestore
}) => {
  const getVersionById = (id: string) => {
    return versions.find(v => v.id === id) || null;
  };

  const handleCompareVersionChange = (versionId: string) => {
    const version = getVersionById(versionId);
    if (version) {
      onSelectCompareVersion(version);
    }
  };

  const getDifferences = useMemo(() => {
    if (!compareVersion) return [];

    const v1Elements = (selectedVersion.snapshot as any)?.elements || [];
    const v2Elements = (compareVersion.snapshot as any)?.elements || [];
    
    const differences: ElementDiff[] = [];
    const v1Map = new Map(v1Elements.map((el: FormElement) => [el.id, el]));
    const v2Map = new Map(v2Elements.map((el: FormElement) => [el.id, el]));

    // Check for added or modified elements
    v2Elements.forEach((element: FormElement) => {
      if (!v1Map.has(element.id)) {
        // Element exists in v2 but not in v1 (added)
        differences.push({
          id: element.id,
          type: element.type,
          status: 'added',
          element2: element
        });
      } else {
        // Element exists in both (potentially modified)
        const v1Element = v1Map.get(element.id);
        const changes: string[] = [];
        
        // Compare fields to detect changes
        if (v1Element) {
          if (JSON.stringify(v1Element.position) !== JSON.stringify(element.position)) {
            changes.push('position');
          }
          if (JSON.stringify(v1Element.size) !== JSON.stringify(element.size)) {
            changes.push('size');
          }
          if (v1Element.content !== element.content) {
            changes.push('content');
          }
          if (v1Element.label !== element.label) {
            changes.push('label');
          }
          if (v1Element.required !== element.required) {
            changes.push('required status');
          }
          if (v1Element.groupId !== element.groupId) {
            changes.push('group');
          }
          
          if (changes.length > 0) {
            differences.push({
              id: element.id,
              type: element.type,
              status: 'modified',
              changes,
              element1: v1Element,
              element2: element
            });
          }
        }
      }
    });

    // Check for removed elements
    v1Elements.forEach((element: FormElement) => {
      if (!v2Map.has(element.id)) {
        // Element exists in v1 but not in v2 (removed)
        differences.push({
          id: element.id,
          type: element.type,
          status: 'removed',
          element1: element
        });
      }
    });

    return differences;
  }, [selectedVersion, compareVersion]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-600 bg-green-50';
      case 'removed': return 'text-red-600 bg-red-50';
      case 'modified': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return <PlusCircle className="h-4 w-4" />;
      case 'removed': return <MinusCircle className="h-4 w-4" />;
      case 'modified': return <Edit className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 text-xs"
          onClick={() => onSelectCompareVersion(selectedVersion)}
        >
          <ChevronLeft className="h-3 w-3" />
          Back to List
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-amber-600 border-amber-200 hover:bg-amber-50 gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Restore
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Restore Version</AlertDialogTitle>
              <AlertDialogDescription>
                This will replace your current form with "{selectedVersion.version_label}".
                Unsaved changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onRestore(selectedVersion)}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Yes, Restore
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-3 bg-muted/10">
          <h4 className="font-medium text-sm mb-1">Selected Version</h4>
          <p className="text-xs text-muted-foreground truncate mb-1">
            {selectedVersion.version_label}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(selectedVersion.created_at), "MMM d, yyyy h:mm a")}
          </p>
        </div>

        <div className="border rounded-md p-3 bg-muted/10">
          <h4 className="font-medium text-sm mb-1">Compare With</h4>
          <Select
            value={compareVersion?.id || ''}
            onValueChange={handleCompareVersionChange}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Select a version to compare" />
            </SelectTrigger>
            <SelectContent>
              {versions
                .filter(v => v.id !== selectedVersion.id)
                .map(version => (
                  <SelectItem key={version.id} value={version.id} className="text-xs">
                    {version.version_label} ({format(new Date(version.created_at), "MMM d")})
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted/20 p-2 border-b">
          <h4 className="font-medium text-sm">Changes</h4>
        </div>

        {!compareVersion ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Select another version to compare
          </div>
        ) : getDifferences.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No differences found between these versions
          </div>
        ) : (
          <div className="divide-y max-h-[300px] overflow-y-auto">
            {getDifferences.map((diff) => (
              <div key={diff.id} className="p-3 hover:bg-muted/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(diff.status)}`}>
                      {getStatusIcon(diff.status)}
                      {diff.status}
                    </span>
                    <span className="text-sm font-medium">{diff.type}</span>
                    {diff.element2?.label && (
                      <span className="text-xs text-muted-foreground">
                        ({diff.element2.label})
                      </span>
                    )}
                  </div>
                </div>
                
                {diff.status === 'modified' && diff.changes && (
                  <p className="text-xs text-muted-foreground mt-1 ml-6">
                    Changed: {diff.changes.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionCompare;
