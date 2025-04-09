
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Grid3X3, List, Plus, SlidersHorizontal } from "lucide-react";
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

const EnhancedTemplateGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brandSettings } = useBrandSettings();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [industry, setIndustry] = useState("All");

  const categories = useMemo(() => {
    const allCategories = templatesData.map(template => template.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  const industries = useMemo(() => {
    const allIndustries = templatesData.map(template => template.industry);
    return ["All", ...Array.from(new Set(allIndustries))];
  }, []);

  const filteredTemplates = useMemo(() => {
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
  }, [searchTerm, selectedCategory, industry, sortBy]);

  const handleCreateNew = () => {
    toast({
      title: "Create New Form",
      description: "Starting with a blank form...",
    });
    navigate('/form-builder');
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Form Templates</h1>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_3fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-card rounded-lg border p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
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
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Industry</p>
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
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Sort by</p>
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
            </div>
          </div>
        </div>

        {/* Main Templates Grid/List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
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

          {filteredTemplates.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
