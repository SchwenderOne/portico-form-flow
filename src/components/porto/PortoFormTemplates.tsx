
import React, { useState } from "react";
import { usePorto } from "./context/PortoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, LayoutTemplate, ArrowLeft, Filter, TagIcon, Eye, AlertTriangle } from "lucide-react";
import { FormElement } from "@/types/form";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { templatesData } from "@/data/templates";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";

// Extract and convert template data for use in the component
const formTemplates = templatesData.map(template => ({
  id: template.id,
  title: template.title,
  description: template.description,
  category: template.category,
  industry: template.industry,
  thumbnail: "📝",  // Default emoji for templates
  tags: [template.category, template.industry], 
  elements: template.elements || []
}));

const categories = ["All", "HR", "Feedback", "Healthcare", "Events", "Government", "Education", "Research", "Administrative", "Non-profit", "Security", "Membership"];
const industries = ["All", "Healthcare", "Education", "Government", "Nonprofit", "Recruitment", "Retail", "Medical", "Entertainment", "Public Sector", "Various", "Corporate", "Charity", "Associations", "Academic"];

export const PortoFormTemplates: React.FC = () => {
  const { setActiveSection, setFormElements, setCurrentTemplate, formElements } = usePorto();
  const formCanvas = useFormCanvas();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["All"]);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof formTemplates[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  const filteredTemplates = formTemplates.filter((template) => {
    const matchesSearch = searchQuery === "" || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    const matchesIndustry = selectedIndustries.includes("All") || 
      selectedIndustries.includes(template.industry);
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const handleUseTemplate = (template: typeof formTemplates[0]) => {
    if (formElements.length > 0) {
      setSelectedTemplate(template);
      setIsConfirmOpen(true);
    } else {
      applyTemplate(template);
    }
  };

  const applyTemplate = (template: typeof formTemplates[0]) => {
    try {
      // Deep clone the template elements to avoid reference issues
      const templateElements = JSON.parse(JSON.stringify(template.elements));
      
      // Update both contexts to ensure consistency
      setFormElements(templateElements);
      formCanvas.setElements(templateElements);
      
      // Set the current template ID for reference
      setCurrentTemplate(template.id);
      
      // Return to editor with the new form
      setActiveSection("editor");
      
      toast.success(`"${template.title}" template loaded successfully!`);
    } catch (error) {
      console.error("Error applying template:", error);
      toast.error("Failed to load template. Please try again.");
    }
  };

  const handlePreview = (template: typeof formTemplates[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const toggleIndustry = (industry: string) => {
    if (industry === "All") {
      setSelectedIndustries(["All"]);
      return;
    }

    const newIndustries = selectedIndustries.includes(industry)
      ? selectedIndustries.filter(i => i !== industry)
      : [...selectedIndustries.filter(i => i !== "All"), industry];
    
    if (newIndustries.length === 0) {
      setSelectedIndustries(["All"]);
    } else {
      setSelectedIndustries(newIndustries);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setActiveSection("editor")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
        </div>
        
        <h2 className="font-medium text-base flex items-center">
          <LayoutTemplate className="h-4 w-4 mr-2" />
          Form Templates
        </h2>
        
        <div className="flex-1"></div>
      </div>
      
      <div className="p-4 border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Industry
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Industries</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {industries.map((industry) => (
                <DropdownMenuCheckboxItem
                  key={industry}
                  checked={selectedIndustries.includes(industry)}
                  onCheckedChange={() => toggleIndustry(industry)}
                >
                  {industry}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <TagIcon className="h-4 w-4 mr-2" />
                Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Popular Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Registration</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Contact</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Feedback</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Survey</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Application</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          className="mt-4"
        >
          <TabsList className="w-full h-auto flex flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="flex-grow">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleUseTemplate(template)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="text-3xl mr-2">{template.thumbnail}</div>
                    <div>
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {template.category} · {template.industry}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template);
                    }}
                  >
                    Use Template
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => handlePreview(template, e)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No templates found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                We couldn't find any templates matching your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {selectedTemplate && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <span className="text-xl mr-2">{selectedTemplate.thumbnail}</span>
                {selectedTemplate.title}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 mt-4 overflow-hidden">
              <ScrollArea className="h-[400px] border rounded-md p-4 bg-slate-50 w-full">
                <div className="space-y-6">
                  {selectedTemplate.elements.map((element) => (
                    <div key={element.id} className="border border-dashed border-gray-300 p-4 rounded-md">
                      {element.type === "header" && (
                        <h2 className="text-xl font-bold">{element.content}</h2>
                      )}
                      {element.type === "text" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="text"
                            placeholder={element.placeholder as string}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                      {element.type === "email" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="email"
                            placeholder={element.placeholder as string}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                      {element.type === "textarea" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <textarea
                            placeholder={element.placeholder as string}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                            rows={3}
                          />
                        </div>
                      )}
                      {element.type === "select" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <select
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          >
                            <option value="">Select an option</option>
                            {(element as any).options?.map((option: string, i: number) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      {element.type === "date" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="date"
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                      {element.type === "number" && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{element.label}</label>
                          <input
                            type="number"
                            placeholder={element.placeholder as string}
                            disabled
                            className="w-full border rounded-md px-3 py-2 bg-white"
                          />
                        </div>
                      )}
                      {element.type === "checkbox" && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            disabled
                            className="border rounded-md"
                          />
                          <label className="text-sm font-medium">{element.label}</label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsPreviewOpen(false);
                handleUseTemplate(selectedTemplate);
              }}>
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedTemplate && (
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Replace Existing Form?
              </DialogTitle>
              <DialogDescription>
                Your current form will be replaced with the "{selectedTemplate.title}" template. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <Alert variant="default" className="mt-2 border-amber-200 bg-amber-50 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                All existing form elements will be lost.
              </AlertDescription>
            </Alert>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  setIsConfirmOpen(false);
                  applyTemplate(selectedTemplate);
                }}
              >
                Replace Form
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
