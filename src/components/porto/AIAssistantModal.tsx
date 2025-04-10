
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/types/form";
import { usePorto } from "./context/PortoContext";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { 
  Wand, 
  MessageSquare, 
  Sparkles, 
  BookTemplate,
  Lightbulb,
  AlignLeft,
  Calendar,
  Mail,
  Checkbox,
  ListCheck
} from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AIAssistantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [aiPrompt, setAiPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("generate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedElements, setGeneratedElements] = useState<FormElement[]>([]);
  
  const { formTitle, formDescription } = usePorto();
  const { handleAddAIElements } = useFormCanvas();

  const examplePrompts = [
    "Create a contact form with name, email, and message fields",
    "Make a job application form with personal details and experience sections",
    "Design a conference registration form with attendance options",
    "Generate a feedback survey with multiple choice questions",
    "Create a medical intake form with patient history sections"
  ];

  const fieldSuggestions = [
    { name: "Full Name", type: "text", icon: <AlignLeft className="h-4 w-4" /> },
    { name: "Email Address", type: "email", icon: <Mail className="h-4 w-4" /> },
    { name: "Date of Birth", type: "date", icon: <Calendar className="h-4 w-4" /> },
    { name: "Terms Acceptance", type: "checkbox", icon: <Checkbox className="h-4 w-4" /> },
    { name: "Survey Questions", type: "radio", icon: <ListCheck className="h-4 w-4" /> }
  ];

  const handleSubmitPrompt = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation with some mock elements
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockElements: FormElement[] = [
        {
          id: `header-${Date.now()}`,
          type: "header",
          position: { x: 100, y: 50 },
          size: { width: 600, height: 50 },
          content: formTitle || "Generated Form",
          groupId: null,
          required: false
        },
        {
          id: `paragraph-${Date.now() + 1}`,
          type: "paragraph",
          position: { x: 100, y: 120 },
          size: { width: 600, height: 80 },
          content: formDescription || "This form was generated using AI",
          groupId: null,
          required: false
        },
        {
          id: `text-${Date.now() + 2}`,
          type: "text",
          position: { x: 100, y: 220 },
          size: { width: 600, height: 80 },
          label: "Full Name",
          placeholder: "Enter your full name",
          helpText: "Please provide your first and last name",
          groupId: null,
          required: true
        },
        {
          id: `email-${Date.now() + 3}`,
          type: "email",
          position: { x: 100, y: 320 },
          size: { width: 600, height: 80 },
          label: "Email Address",
          placeholder: "your@email.com",
          helpText: "We'll never share your email with anyone else",
          groupId: null,
          required: true
        }
      ];
      
      setGeneratedElements(mockElements);
      toast.success("Form elements generated successfully");
    } catch (error) {
      console.error("Error generating form:", error);
      toast.error("Failed to generate form elements");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInsertElements = (replace = false) => {
    if (generatedElements.length === 0) {
      toast.error("No elements generated yet");
      return;
    }
    
    handleAddAIElements(generatedElements, replace);
    toast.success(`${generatedElements.length} elements ${replace ? 'replaced existing elements' : 'added to form'}`);
    onClose();
  };

  const handleUseExamplePrompt = (prompt: string) => {
    setAiPrompt(prompt);
  };

  const handleAddField = (fieldType: string) => {
    // Create a single new field based on type
    const newField: FormElement = {
      id: `${fieldType}-${Date.now()}`,
      type: fieldType,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 80 },
      label: `New ${fieldType} field`,
      placeholder: `Enter ${fieldType} here`,
      helpText: `This is a ${fieldType} field`,
      groupId: null,
      required: false
    };
    
    handleAddAIElements([newField]);
    toast.success(`Added ${fieldType} field to form`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>AI Form Assistant</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">
              <Wand className="h-4 w-4 mr-2" />
              Generate Form
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Lightbulb className="h-4 w-4 mr-2" />
              Field Suggestions
            </TabsTrigger>
            <TabsTrigger value="templates">
              <BookTemplate className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="generate" className="m-0">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Example Prompts</h4>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((prompt, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUseExamplePrompt(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Textarea
                    placeholder="Describe the form you want to create..."
                    className="min-h-[100px]"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleSubmitPrompt}
                  disabled={isGenerating || !aiPrompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand className="mr-2 h-4 w-4" />
                      Generate Form
                    </>
                  )}
                </Button>
                
                {generatedElements.length > 0 && (
                  <div className="border rounded-md p-4 mt-4">
                    <h4 className="text-sm font-medium mb-2">Generated Elements ({generatedElements.length})</h4>
                    <ul className="space-y-2 mb-4">
                      {generatedElements.map((element, index) => (
                        <li key={index} className="flex items-center text-sm">
                          {element.type === 'header' ? (
                            <Heading1 className="h-4 w-4 mr-2 text-blue-500" />
                          ) : element.type === 'paragraph' ? (
                            <AlignLeft className="h-4 w-4 mr-2 text-blue-500" />
                          ) : element.type === 'text' ? (
                            <AlignLeft className="h-4 w-4 mr-2 text-purple-500" />
                          ) : element.type === 'email' ? (
                            <Mail className="h-4 w-4 mr-2 text-purple-500" />
                          ) : (
                            <div className="h-4 w-4 mr-2" />
                          )}
                          <span>
                            {element.label || element.content || element.type}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => handleInsertElements(false)}>
                        Add to Form
                      </Button>
                      <Button variant="default" onClick={() => handleInsertElements(true)}>
                        Replace Form
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="m-0">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Suggested Fields</h4>
                <div className="grid grid-cols-2 gap-3">
                  {fieldSuggestions.map((field, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() => handleAddField(field.type)}
                    >
                      {field.icon}
                      <div className="ml-2 text-left">
                        <div className="font-medium">{field.name}</div>
                        <div className="text-xs text-muted-foreground">{field.type}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-3">Smart Field Recommendations</h4>
                  <div className="border rounded-md p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your form's title "{formTitle || 'Untitled Form'}", we recommend adding:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="justify-start"
                        onClick={() => handleAddField('text')}
                      >
                        <AlignLeft className="h-3 w-3 mr-2" />
                        Name Field
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="justify-start"
                        onClick={() => handleAddField('email')}
                      >
                        <Mail className="h-3 w-3 mr-2" />
                        Email Field
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="m-0">
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="border rounded-md p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => handleUseExamplePrompt("Create a contact form with name, email, and message fields")}
                >
                  <h4 className="text-sm font-medium mb-2">Contact Form</h4>
                  <p className="text-xs text-muted-foreground mb-3">Simple form for website contact pages</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </div>
                
                <div 
                  className="border rounded-md p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => handleUseExamplePrompt("Make a job application form with personal details and experience sections")}
                >
                  <h4 className="text-sm font-medium mb-2">Job Application</h4>
                  <p className="text-xs text-muted-foreground mb-3">Complete job application form with multiple sections</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </div>
                
                <div 
                  className="border rounded-md p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => handleUseExamplePrompt("Design a conference registration form with attendance options")}
                >
                  <h4 className="text-sm font-medium mb-2">Event Registration</h4>
                  <p className="text-xs text-muted-foreground mb-3">Form for event and conference sign-ups</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </div>
                
                <div 
                  className="border rounded-md p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => handleUseExamplePrompt("Generate a feedback survey with multiple choice questions")}
                >
                  <h4 className="text-sm font-medium mb-2">Customer Feedback</h4>
                  <p className="text-xs text-muted-foreground mb-3">Survey form to collect customer opinions</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <MessageSquare className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
