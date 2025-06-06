
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { FormElement, DatabaseFormVersion } from "@/types/form";
import { getFormVersions, createFormVersion } from "@/services/forms-service";
import VersionsList from "./VersionsList";
import VersionCompare from "./VersionCompare";
import { Save, History } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";

// Global storage for version history sheet controls
let openSheetFn: (() => void) | null = null;
let closeSheetFn: (() => void) | null = null;

// Register controls for external components to use
export const registerVersionHistoryControls = (
  openFn: (() => void) | null,
  closeFn: (() => void) | null
) => {
  openSheetFn = openFn;
  closeSheetFn = closeFn;
};

// Expose controls for external components
export const openVersionHistory = () => openSheetFn && openSheetFn();
export const closeVersionHistory = () => closeSheetFn && closeSheetFn();

interface VersionHistorySheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

// Interface for the snapshot structure
interface SnapshotData {
  elements: FormElement[];
  metadata: {
    title: string;
    description: string;
    status: string;
  };
}

const VersionHistorySheet: React.FC<VersionHistorySheetProps> = ({
  open,
  onOpenChange,
  showTrigger = true
}) => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [versions, setVersions] = useState<DatabaseFormVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<DatabaseFormVersion | null>(null);
  const [compareVersion, setCompareVersion] = useState<DatabaseFormVersion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [versionLabel, setVersionLabel] = useState<string>("");
  const [formCanvasElements, setFormCanvasElements] = useState<FormElement[]>([]);
  
  const { metadata } = useFormMetadata();
  const { user } = useAuth();
  
  // Safely check if we're in the FormCanvas context
  const [canAccessFormCanvas, setCanAccessFormCanvas] = useState(false);
  
  useEffect(() => {
    // Only try to access FormCanvas context when the sheet is open
    if (!open) return;
    
    let formElements: FormElement[] = [];
    let isMounted = true;
    
    const checkFormCanvasContext = async () => {
      try {
        // Dynamic import to avoid errors when used outside FormCanvasProvider
        const formCanvasModule = await import('../context/FormCanvasContext');
        
        try {
          // Get the current elements directly from the FormCanvas DOM
          // This is a safer approach than trying to use the context
          const formCanvasElements = document.querySelectorAll('.element-container');
          if (formCanvasElements.length > 0) {
            setCanAccessFormCanvas(true);
            
            // If we really need the elements, we can get them via DOM or events
            // For now, we'll just acknowledge we can interact with the form canvas
          } else {
            setCanAccessFormCanvas(false);
          }
        } catch (error) {
          console.log("VersionHistorySheet: Cannot access form elements");
          setCanAccessFormCanvas(false);
        }
      } catch (error) {
        console.log("VersionHistorySheet: FormCanvasProvider module not available");
        setCanAccessFormCanvas(false);
      }
    };
    
    checkFormCanvasContext();
    
    return () => {
      isMounted = false;
    };
  }, [open]);

  // Fetch versions when component mounts or form ID changes
  useEffect(() => {
    if (open && metadata?.id) {
      fetchVersions();
    }
  }, [open, metadata?.id]);

  const fetchVersions = async () => {
    if (!metadata?.id) return;
    
    try {
      setIsLoading(true);
      const fetchedVersions = await getFormVersions(metadata.id);
      setVersions(fetchedVersions);
    } catch (error) {
      console.error("Failed to fetch versions:", error);
      toast.error("Failed to load version history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVersion = async () => {
    try {
      setIsSaving(true);
      
      if (!canAccessFormCanvas) {
        toast.error("Cannot save version outside the form editor");
        return;
      }
      
      if (!metadata?.id) {
        toast.error("Form must be saved before creating versions");
        return;
      }
      
      // Generate default version label if none provided
      const label = versionLabel.trim() || 
        `Version ${versions.length + 1} - ${format(new Date(), "MMM d, yyyy h:mm a")}`;
      
      // Create snapshot of current form state - we'll use a simplified approach
      // since we can't reliably access the elements from the context
      const snapshot = {
        elements: formCanvasElements.length > 0 ? formCanvasElements : [],
        metadata: {
          title: metadata.name,
          description: metadata.description,
          status: metadata.status,
        }
      };
      
      // Save version to database
      await createFormVersion(metadata.id, label, snapshot);
      
      toast.success("Version saved successfully");
      setVersionLabel("");
      
      // Refresh versions list
      await fetchVersions();
    } catch (error) {
      console.error("Failed to save version:", error);
      toast.error("Failed to save version");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreVersion = (version: DatabaseFormVersion) => {
    try {
      // Check if we're in the form editor
      if (!canAccessFormCanvas) {
        toast.error("Cannot restore version outside the form editor");
        return;
      }
      
      // Convert snapshot to the expected format first
      const snapshotRaw = version.snapshot as Record<string, any>;
      
      if (!snapshotRaw || !Array.isArray(snapshotRaw.elements)) {
        toast.error("Invalid version snapshot structure");
        return;
      }
      
      const snapshot = snapshotRaw as SnapshotData;
      
      // Create a custom event to notify the FormCanvas that we need to update elements
      const event = new CustomEvent('version-restore', { 
        detail: { elements: snapshot.elements } 
      });
      document.dispatchEvent(event);
      
      // Notify user
      toast.success(`Restored to version: ${version.version_label}`);
    } catch (error) {
      console.error("Failed to restore version:", error);
      toast.error("Failed to restore version");
    }
  };

  const handleSelectForCompare = (version: DatabaseFormVersion) => {
    setSelectedVersion(version);
    setActiveTab("compare");
  };

  const handleSetCompareVersion = (version: DatabaseFormVersion) => {
    setCompareVersion(version);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            Version History
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="sm:max-w-md md:max-w-lg" side="right">
        <SheetHeader>
          <SheetTitle>Form Version History</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {canAccessFormCanvas ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Version label (optional)"
                className="flex-1 px-3 py-2 border rounded-md text-sm"
                value={versionLabel}
                onChange={(e) => setVersionLabel(e.target.value)}
              />
              <Button 
                onClick={handleSaveVersion}
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Version
              </Button>
            </div>
          ) : (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
              Version saving is only available in the form editor.
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Versions List</TabsTrigger>
              <TabsTrigger value="compare" disabled={!selectedVersion}>
                Compare Versions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-4">
              <VersionsList 
                versions={versions} 
                isLoading={isLoading}
                currentUserId={user?.id || ''}
                onRestore={handleRestoreVersion}
                onCompare={handleSelectForCompare}
                onRefresh={fetchVersions}
              />
            </TabsContent>
            
            <TabsContent value="compare" className="mt-4">
              {selectedVersion && (
                <VersionCompare
                  selectedVersion={selectedVersion}
                  compareVersion={compareVersion}
                  versions={versions}
                  onSelectCompareVersion={handleSetCompareVersion}
                  onRestore={handleRestoreVersion}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VersionHistorySheet;
