
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Grid3X3, List, Plus, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EnhancedTemplateCard } from "./EnhancedTemplateCard";
import { TemplateListItem } from "./TemplateListItem";
import { useToast } from "@/hooks/use-toast";
import { useBrandSettings } from "@/context/BrandSettingsContext";
import { templatesData } from "@/data/templates";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnhancedTemplateGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brandSettings } = useBrandSettings();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [industry, setIndustry] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    const allCategories = templatesData.map(template => template.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  const industries = useMemo(() => {
    const allIndustries = templatesData.map(template => template.industry);
    return ["All", ...Array.from(new Set(allIndustries))];
  }, []);

  const filteredTemplates = useMemo(() => {
    if (isLoading) return [];
    
    try {
      let filtered = templatesData.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
        const matchesIndustry = industry === "All" || template.industry === industry;
        
        return matchesSearch && matchesCategory && matchesIndustry;
      });

      // Sort the filtered templates
      return filtered.sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        } else if (sortBy === "oldest") {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        } else if (sortBy === "name-asc") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "name-desc") {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
    } catch (err) {
      console.error("Error filtering templates:", err);
      setError("There was an error loading templates. Please refresh the page.");
      return [];
    }
  }, [searchTerm, selectedCategory, industry, sortBy, isLoading]);

  const handleCreateNew = () => {
    toast({
      title: "Create New Form",
      description: "Starting with a blank form...",
    });
    navigate('/form-builder');
  };

  const SkeletonCard = () => (
    <div className="border rounded-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between mt-4">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className="border rounded-lg p-4">
      <div className="flex items-center">
        <Skeleton className="h-16 w-16 rounded-md mr-4" />
        <div className="flex-1">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4 md:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Form Templates</h1>
          <p className="text-muted-foreground mt-1">
            Start with a template or create your own form from scratch
          </p>
        </div>
        <Button 
          onClick={handleCreateNew}
          className="gap-2"
          style={{ backgroundColor: brandSettings.colors.primary }}
        >
          <Plus className="h-4 w-4" />
          Create New Form
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1fr_3fr]">
        {/* Filters Sidebar */}
        <div className="space-y-4 md:space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="bg-card rounded-lg border p-3 md:p-4 space-y-3 md:space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Category</p>
              <div className="flex flex-wrap gap-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </>
                ) : (
                  categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                      style={selectedCategory === category ? { 
                        backgroundColor: brandSettings.colors.primary,
                        color: "white" 
                      } : {}}
                    >
                      {category}
                    </Badge>
                  ))
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Industry</p>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(item => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Sort by</p>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Main Templates Grid/List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-32 inline-block" />
              ) : (
                `${filteredTemplates.length} ${filteredTemplates.length === 1 ? 'template' : 'templates'} found`
              )}
            </p>
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
                <TabsList className="h-9">
                  <TabsTrigger value="grid" className="h-7 w-7 p-0">
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="h-7 w-7 p-0">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {isLoading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <SkeletonList key={i} />
                ))}
              </div>
            )
          ) : filteredTemplates.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredTemplates.map(template => (
                  <EnhancedTemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTemplates.map(template => (
                  <TemplateListItem key={template.id} template={template} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12 border rounded-lg bg-card">
              <p className="text-muted-foreground mb-4">No templates found matching your criteria.</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setIndustry("All");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTemplateGallery;
