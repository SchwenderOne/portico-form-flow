
import React, { useState } from "react";
import { templatesData } from "@/data/templates";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { SearchBar } from "@/components/ui/search-bar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelectedTemplate } from "@/context/SelectedTemplateContext";

export const TemplateGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { setSelectedTemplate } = useSelectedTemplate();
  
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
      setSelectedTemplate(template);
    }
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
        
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  onSelect={() => handleSelectTemplate(template.id)}
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
    </div>
  );
};
