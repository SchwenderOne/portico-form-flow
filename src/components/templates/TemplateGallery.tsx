
import React, { useState } from "react";
import { templatesData } from "@/data/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { SearchBar } from "@/components/ui/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelectedTemplate } from "@/context/SelectedTemplateContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Building, CalendarIcon, Clock, Star } from "lucide-react";
import { FormElement } from "@/types/form";

export const TemplateGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { setSelectedTemplate } = useSelectedTemplate();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Preview state
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Template usage options state
  const [showUsageOptions, setShowUsageOptions] = useState(false);
  const [templateToUse, setTemplateToUse] = useState(null);
  
  // Get unique categories from templates
  const categories = ["all", ...new Set(templatesData.map(t => t.category))];
  
  // Filter templates based on search term and category
  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSelectTemplate = (templateId) => {
    const template = templatesData.find(t => t.id === templateId);
    if (template) {
      setTemplateToUse(template);
      setShowUsageOptions(true);
    }
  };

  const handlePreviewTemplate = (templateId) => {
    const template = templatesData.find(t => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
      setIsPreviewOpen(true);
    }
  };

  const handleUseAsNewForm = () => {
    if (templateToUse) {
      setSelectedTemplate(templateToUse);
      setShowUsageOptions(false);
      
      toast({
        title: "Template Selected",
        description: `${templateToUse.title} will be used as a new form.`,
      });
      
      navigate('/form-builder');
    }
  };

  const handleUseSelectedFields = () => {
    if (templateToUse) {
      setSelectedTemplate(templateToUse);
      setShowUsageOptions(false);
      
      toast({
        title: "Template Fields Ready",
        description: "You can now select which fields to add to your current form.",
      });
      
      // Navigate to form-builder with a special mode for field selection
      navigate('/form-builder?mode=field-selection');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Template Gallery</h2>
        <SearchBar 
          placeholder="Search templates..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </div>
      
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={handleCategoryChange}>
        <div className="px-4 pt-2 border-b">
          <TabsList className="w-full h-auto flex overflow-x-auto py-1">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onSelect={() => handleSelectTemplate(template.id)}
                  onPreview={() => handlePreviewTemplate(template.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No templates found matching your criteria
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>

      {/* Template Preview Dialog */}
      {previewTemplate && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {previewTemplate.title}
                <Badge className="ml-2">{previewTemplate.category}</Badge>
              </DialogTitle>
              <DialogDescription className="flex items-center justify-between">
                <span>{previewTemplate.description}</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {previewTemplate.industry && (
                    <span className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {previewTemplate.industry}
                    </span>
                  )}
                  {previewTemplate.timeEstimate && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {previewTemplate.timeEstimate}
                    </span>
                  )}
                  {previewTemplate.created && (
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {formatDate(previewTemplate.created)}
                    </span>
                  )}
                  {previewTemplate.popularity && (
                    <span className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {previewTemplate.popularity}
                    </span>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 mt-4 overflow-hidden">
              <ScrollArea className="h-[400px] border rounded-md p-4 bg-slate-50 w-full">
                <div className="space-y-6">
                  {previewTemplate.elements.map((element: FormElement) => (
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
                            {element.options?.map((option: string, i: number) => (
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
                handleSelectTemplate(previewTemplate.id);
              }}>
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Template Usage Options Dialog */}
      {templateToUse && (
        <Dialog open={showUsageOptions} onOpenChange={setShowUsageOptions}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>How would you like to use this template?</DialogTitle>
              <DialogDescription>
                Choose how you want to apply the "{templateToUse.title}" template
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <Button 
                variant="default" 
                className="w-full justify-start text-left px-4 h-auto py-3"
                onClick={handleUseAsNewForm}
              >
                <div>
                  <div className="font-medium">Create new form</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Start a new form using this template as a base
                  </div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-left px-4 h-auto py-3"
                onClick={handleUseSelectedFields}
              >
                <div>
                  <div className="font-medium">Select fields to add</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Choose specific fields from this template to add to your current form
                  </div>
                </div>
              </Button>
            </div>
            
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowUsageOptions(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
