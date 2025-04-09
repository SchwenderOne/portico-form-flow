
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  History, 
  RotateCcw, 
  Search, 
  RefreshCw, 
  ArrowLeftRight, 
  Filter, 
  FileClock
} from "lucide-react";
import { DatabaseFormVersion, FormMetadata } from "@/types/form";
import { getFormVersions, getForms } from "@/services/forms-service";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import FormVersionsList from "./FormVersionsList";
import VersionCompare from "../form-builder/version-history/VersionCompare";

const VersionHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("forms");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forms, setForms] = useState<FormMetadata[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormMetadata | null>(null);
  const [formVersions, setFormVersions] = useState<DatabaseFormVersion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<DatabaseFormVersion | null>(null);
  const [compareVersion, setCompareVersion] = useState<DatabaseFormVersion | null>(null);
  const [sortBy, setSortBy] = useState<string>("date-desc");

  // Fetch all forms on component mount
  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      try {
        const fetchedForms = await getForms();
        setForms(fetchedForms);
      } catch (error) {
        console.error("Failed to fetch forms:", error);
        toast.error("Failed to load forms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Fetch versions when a form is selected
  useEffect(() => {
    if (selectedForm) {
      fetchFormVersions(selectedForm.id);
    }
  }, [selectedForm]);

  const fetchFormVersions = async (formId: string) => {
    setIsLoading(true);
    try {
      const versions = await getFormVersions(formId);
      setFormVersions(versions);
    } catch (error) {
      console.error("Failed to fetch versions:", error);
      toast.error("Failed to load form versions");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter forms based on search term
  const filteredForms = forms.filter(form => 
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (form.description && form.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter and sort versions
  const sortedVersions = [...formVersions].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === "date-asc") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return 0;
  });

  const handleSelectForm = (form: FormMetadata) => {
    setSelectedForm(form);
    setActiveTab("versions");
    setSelectedVersion(null);
    setCompareVersion(null);
  };

  const handleSelectVersion = (version: DatabaseFormVersion) => {
    setSelectedVersion(version);
    setActiveTab("compare");
  };

  const handleSetCompareVersion = (version: DatabaseFormVersion) => {
    setCompareVersion(version);
  };

  const handleRefresh = () => {
    if (selectedForm) {
      fetchFormVersions(selectedForm.id);
    }
  };

  const handleBackToVersions = () => {
    setActiveTab("versions");
    setSelectedVersion(null);
    setCompareVersion(null);
  };

  const handleBackToForms = () => {
    setActiveTab("forms");
    setSelectedForm(null);
    setFormVersions([]);
  };

  const renderFormsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search forms..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="cursor-pointer">
              <CardHeader className="p-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredForms.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileClock className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No forms found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Create a form to start tracking history"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredForms.map((form) => (
            <Card 
              key={form.id} 
              className="cursor-pointer hover:bg-accent/5 transition-colors"
              onClick={() => handleSelectForm(form)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{form.name}</CardTitle>
                <CardDescription>
                  {form.description || "No description"}
                  <div className="mt-1 flex items-center text-xs">
                    <span>Last edited: {formatDistanceToNow(new Date(form.lastEditDate), { addSuffix: true })}</span>
                    <span className="mx-2">•</span>
                    <span>Status: {form.status}</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderVersionsTab = () => (
    <div className="space-y-4">
      {selectedForm && (
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2 -ml-2" 
              onClick={handleBackToForms}
            >
              ← Back to forms
            </Button>
            <h2 className="text-xl font-bold">{selectedForm.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedForm.description || "No description"}</p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest first</SelectItem>
                <SelectItem value="date-asc">Oldest first</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <FormVersionsList
        versions={sortedVersions}
        isLoading={isLoading}
        onSelect={handleSelectVersion}
        onRefresh={handleRefresh}
      />
    </div>
  );

  const renderCompareTab = () => (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-2 -ml-2" 
        onClick={handleBackToVersions}
      >
        ← Back to versions
      </Button>

      {selectedVersion && (
        <VersionCompare
          selectedVersion={selectedVersion}
          compareVersion={compareVersion}
          versions={formVersions}
          onSelectCompareVersion={handleSetCompareVersion}
          onRestore={() => {}}
        />
      )}
    </div>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>Version History</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="forms" 
              disabled={activeTab === "compare"}
            >
              Forms
            </TabsTrigger>
            <TabsTrigger 
              value="versions" 
              disabled={!selectedForm || activeTab === "compare"}
            >
              Versions
            </TabsTrigger>
            <TabsTrigger 
              value="compare" 
              disabled={!selectedVersion}
            >
              Compare
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="forms">{renderFormsTab()}</TabsContent>
            <TabsContent value="versions">{renderVersionsTab()}</TabsContent>
            <TabsContent value="compare">{renderCompareTab()}</TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
