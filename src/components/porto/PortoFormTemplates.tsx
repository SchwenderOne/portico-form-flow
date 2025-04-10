
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

// Enhanced form templates with proper elements
const formTemplates = [
  {
    id: "contact-form",
    title: "Contact Form",
    description: "A simple contact form with name, email, and message fields.",
    category: "Business",
    industry: "All",
    tags: ["contact", "basic", "simple"],
    thumbnail: "📝",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Contact Us",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "textarea-1",
        type: "textarea",
        label: "Message",
        placeholder: "How can we help you?",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 150 },
        groupId: null
      }
    ]
  },
  {
    id: "registration-form",
    title: "Registration Form",
    description: "A comprehensive registration form with various fields.",
    category: "Account",
    industry: "All",
    tags: ["registration", "signup", "account"],
    thumbnail: "📋",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Create an Account",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 290, height: 80 },
        groupId: null
      },
      {
        id: "text-2",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
        required: true,
        position: { x: 410, y: 130 },
        size: { width: 290, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "password-1",
        type: "text",
        label: "Password",
        placeholder: "Choose a secure password",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null
      }
    ]
  },
  {
    id: "feedback-form",
    title: "Feedback Form",
    description: "Collect feedback from customers with ratings and comments.",
    category: "Feedback",
    industry: "All",
    tags: ["feedback", "survey", "ratings"],
    thumbnail: "⭐",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Customer Feedback",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Your Name",
        placeholder: "Enter your name",
        required: false,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "select-1",
        type: "select",
        label: "How would you rate our service?",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null,
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
      },
      {
        id: "textarea-1",
        type: "textarea",
        label: "Additional Comments",
        placeholder: "Please share any additional feedback",
        required: false,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 120 },
        groupId: null
      }
    ]
  },
  {
    id: "event-registration",
    title: "Event Registration",
    description: "Registration form for events, workshops, and conferences.",
    category: "Events",
    industry: "Education",
    tags: ["events", "registration", "education"],
    thumbnail: "🎫",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Event Registration",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "select-1",
        type: "select",
        label: "Event Session",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null,
        options: ["Morning Session", "Afternoon Session", "Evening Session", "All Day"]
      },
      {
        id: "checkbox-1",
        type: "checkbox",
        label: "I agree to the terms and conditions",
        required: true,
        position: { x: 100, y: 430 },
        size: { width: 600, height: 60 },
        groupId: null
      }
    ]
  },
  {
    id: "patient-intake",
    title: "Patient Intake Form",
    description: "Comprehensive medical history and patient information form.",
    category: "Healthcare",
    industry: "Healthcare",
    tags: ["medical", "patient", "healthcare"],
    thumbnail: "🏥",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Patient Information",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter patient's full name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "date-1",
        type: "date",
        label: "Date of Birth",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "text-2",
        type: "text",
        label: "Insurance Provider",
        placeholder: "Enter insurance company name",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "textarea-1",
        type: "textarea",
        label: "Medical History",
        placeholder: "Briefly describe relevant medical history",
        required: true,
        position: { x: 100, y: 430 },
        size: { width: 600, height: 120 },
        groupId: null
      }
    ]
  },
  {
    id: "job-application",
    title: "Job Application",
    description: "Collect applications for job positions at your organization.",
    category: "HR",
    industry: "All",
    tags: ["job", "application", "career"],
    thumbnail: "👔",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Job Application",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "text-2",
        type: "text",
        label: "Phone Number",
        placeholder: "Enter your phone number",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "textarea-1",
        type: "textarea",
        label: "Work Experience",
        placeholder: "Describe your relevant work experience",
        required: true,
        position: { x: 100, y: 430 },
        size: { width: 600, height: 120 },
        groupId: null
      },
      {
        id: "textarea-2",
        type: "textarea",
        label: "Education",
        placeholder: "List your educational background",
        required: true,
        position: { x: 100, y: 570 },
        size: { width: 600, height: 120 },
        groupId: null
      }
    ]
  },
  {
    id: "grant-application",
    title: "Grant Application",
    description: "Form for nonprofits to apply for grants and funding.",
    category: "Nonprofit",
    industry: "Nonprofit",
    tags: ["grants", "application", "nonprofit"],
    thumbnail: "🏦",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Grant Application",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Organization Name",
        placeholder: "Enter your organization's name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "text-2",
        type: "text",
        label: "Contact Person",
        placeholder: "Enter the primary contact's name",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Email Address",
        placeholder: "Enter contact email address",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "textarea-1",
        type: "textarea",
        label: "Project Description",
        placeholder: "Describe the project that needs funding",
        required: true,
        position: { x: 100, y: 430 },
        size: { width: 600, height: 120 },
        groupId: null
      },
      {
        id: "number-1",
        type: "number",
        label: "Funding Amount Requested",
        placeholder: "Enter amount in USD",
        required: true,
        position: { x: 100, y: 570 },
        size: { width: 600, height: 80 },
        groupId: null
      }
    ]
  },
  {
    id: "student-enrollment",
    title: "Student Enrollment",
    description: "School or course enrollment form with student details.",
    category: "Education",
    industry: "Education",
    tags: ["student", "enrollment", "education"],
    thumbnail: "🎓",
    published: true,
    elements: [
      {
        id: "header-1",
        type: "header",
        content: "Student Enrollment",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 60 },
        groupId: null
      },
      {
        id: "text-1",
        type: "text",
        label: "Student Name",
        placeholder: "Enter student's full name",
        required: true,
        position: { x: 100, y: 130 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "date-1",
        type: "date",
        label: "Date of Birth",
        required: true,
        position: { x: 100, y: 230 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "select-1",
        type: "select",
        label: "Grade Level",
        required: true,
        position: { x: 100, y: 330 },
        size: { width: 600, height: 80 },
        groupId: null,
        options: ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"]
      },
      {
        id: "text-2",
        type: "text",
        label: "Parent/Guardian Name",
        placeholder: "Enter parent or guardian's name",
        required: true,
        position: { x: 100, y: 430 },
        size: { width: 600, height: 80 },
        groupId: null
      },
      {
        id: "email-1",
        type: "email",
        label: "Contact Email",
        placeholder: "Enter contact email address",
        required: true,
        position: { x: 100, y: 530 },
        size: { width: 600, height: 80 },
        groupId: null
      }
    ]
  }
];

const categories = ["All", "Business", "Account", "Feedback", "Events", "Healthcare", "Nonprofit", "HR", "Education"];
const industries = ["All", "Healthcare", "Education", "Government", "Nonprofit", "Technology", "Finance"];

export const PortoFormTemplates: React.FC = () => {
  const { setActiveSection, setFormElements, setCurrentTemplate, formElements } = usePorto();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["All"]);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof formTemplates[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  // Filter templates based on search, category, and industries
  const filteredTemplates = formTemplates.filter((template) => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    // Industry filter
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
    setFormElements(template.elements);
    setCurrentTemplate(template.id);
    setActiveSection("editor");
    toast.success(`"${template.title}" template loaded successfully!`);
  };

  const handlePreview = (template: typeof formTemplates[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  // Handle industry selection
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
          <TabsList className="w-full flex-wrap h-auto">
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

      {/* Template Preview Dialog */}
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
            
            <ScrollArea className="flex-1 mt-4 border rounded-md p-4 bg-slate-50">
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

      {/* Confirmation Dialog for overwriting existing form */}
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
            
            <Alert variant="warning" className="mt-2">
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
