
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
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
  
  const { metadata } = useFormMetadata();
  const { elements, setElements } = useFormCanvas();
  const { user } = useAuth();

  // Fetch versions when component mounts or form ID changes
  useEffect(() => {
    if (open) {
      fetchVersions();
    }
  }, [open, metadata.id]);

  const fetchVersions = async () => {
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
      
      // Generate default version label if none provided
      const label = versionLabel.trim() || 
        `Version ${versions.length + 1} - ${format(new Date(), "MMM d, yyyy h:mm a")}`;
      
      // Create snapshot of current form state
      const snapshot = {
        elements,
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
      // Extract elements from snapshot
      const snapshot = version.snapshot as { elements: FormElement[], metadata: any };
      
      if (!snapshot || !snapshot.elements) {
        toast.error("Invalid version snapshot");
        return;
      }
      
      // Update canvas with elements from snapshot
      setElements(snapshot.elements);
      
      // Optionally update metadata if needed
      // updateMetadata({ name: snapshot.metadata.title, ... });
      
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
