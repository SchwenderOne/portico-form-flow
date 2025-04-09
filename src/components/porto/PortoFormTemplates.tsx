
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormElement } from "@/types/form";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { usePorto } from "./context/PortoContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample templates
const templates = [
  {
    id: "contact-form",
    title: "Contact Form",
    description: "A simple contact form with name, email and message fields",
    thumbnail: "📝",
    category: "Basic",
    elements: [
      {
        id: crypto.randomUUID(),
        type: "header",
        label: "Contact Us",
        content: "Contact Us",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 50 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        position: { x: 100, y: 120 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        position: { x: 100, y: 220 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "textarea",
        label: "Message",
        placeholder: "How can we help you?",
        required: false,
        position: { x: 100, y: 320 },
        size: { width: 600, height: 150 },
        groupId: null,
      },
    ],
  },
  {
    id: "job-application",
    title: "Job Application",
    description: "Complete job application form with personal and professional details",
    thumbnail: "👔",
    category: "Business",
    elements: [
      {
        id: crypto.randomUUID(),
        type: "header",
        label: "Job Application",
        content: "Job Application Form",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 50 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        position: { x: 100, y: 120 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        position: { x: 100, y: 220 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "textarea",
        label: "Work Experience",
        placeholder: "Describe your relevant work experience",
        required: true,
        position: { x: 100, y: 320 },
        size: { width: 600, height: 150 },
        groupId: null,
      },
    ],
  },
  {
    id: "feedback-survey",
    title: "Feedback Survey",
    description: "Customer feedback form with rating questions",
    thumbnail: "⭐",
    category: "Feedback",
    elements: [
      {
        id: crypto.randomUUID(),
        type: "header",
        label: "Feedback Survey",
        content: "We Value Your Feedback",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 50 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "text",
        label: "Name (Optional)",
        placeholder: "Enter your name",
        required: false,
        position: { x: 100, y: 120 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "select",
        label: "How would you rate our service?",
        placeholder: "Select a rating",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
        required: true,
        position: { x: 100, y: 220 },
        size: { width: 400, height: 80 },
        groupId: null,
      },
      {
        id: crypto.randomUUID(),
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Please share any additional comments or suggestions",
        required: false,
        position: { x: 100, y: 320 },
        size: { width: 600, height: 150 },
        groupId: null,
      },
    ],
  },
];

export const PortoFormTemplates: React.FC = () => {
  const { handleAddAIElements } = useFormCanvas();
  const { setActiveSection } = usePorto();
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTemplate = (templateElements: FormElement[]) => {
    handleAddAIElements(templateElements, true); // Replace existing elements
    setActiveSection("editor");
    toast.success("Template applied successfully");
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Form Templates</h2>
          <p className="text-muted-foreground mb-6">
            Choose a template to get started or create a form from scratch.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="text-4xl mb-2">{template.thumbnail}</div>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                <div className="bg-muted p-1 rounded inline-block">
                  {template.category}
                </div>
                <div className="mt-2">
                  {template.elements.length} elements
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleSelectTemplate(template.elements)}
                >
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {filteredTemplates.length === 0 && (
            <div className="col-span-3 text-center py-8">
              <p className="text-muted-foreground">No templates found matching "{searchQuery}"</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
