
import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateCard from "./TemplateCard";
import { useNavigate } from "react-router-dom";

const templatesData = [
  {
    id: "1",
    title: "Job Application",
    description: "Standard job application form with all required fields.",
    category: "HR",
    image: "/placeholder.svg",
    created: "2023-10-12"
  },
  {
    id: "2",
    title: "Customer Feedback",
    description: "Collect detailed feedback from your customers.",
    category: "Feedback",
    image: "/placeholder.svg",
    created: "2023-09-05"
  },
  {
    id: "3",
    title: "Medical Intake",
    description: "Complete patient intake form for healthcare facilities.",
    category: "Healthcare",
    image: "/placeholder.svg",
    created: "2023-11-20"
  },
  {
    id: "4",
    title: "Event Registration",
    description: "Register attendees for your upcoming event.",
    category: "Events",
    image: "/placeholder.svg",
    created: "2023-12-01"
  },
  {
    id: "5",
    title: "Government Grant Application",
    description: "Apply for government grants with all required information.",
    category: "Government",
    image: "/placeholder.svg",
    created: "2023-10-30"
  },
  {
    id: "6",
    title: "Research Consent Form",
    description: "Detailed consent form for research participation.",
    category: "Research",
    image: "/placeholder.svg", 
    created: "2023-08-15"
  }
];

const categories = ["All", "HR", "Healthcare", "Government", "Feedback", "Events", "Research"];

const TemplateGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateNew = () => {
    navigate('/');
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Form Templates</h1>
          <p className="text-muted-foreground mt-1">
            Start with a template or create your own form from scratch
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Form
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="mb-4">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
