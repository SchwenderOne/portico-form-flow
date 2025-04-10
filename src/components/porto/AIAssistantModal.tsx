
import React, { useState } from "react";
import { FormElement } from "@/types/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Wand2, 
  Sparkles, 
  SquarePen, 
  MessageSquare, 
  Lightbulb, 
  CheckCircle2, 
  Brain, 
  Cpu, 
  Loader2,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

// Sample AI-generated form elements for demo
const aiGeneratedElements: FormElement[] = [
  {
    id: crypto.randomUUID(),
    type: "header",
    content: "Job Application Form",
    position: { x: 100, y: 50 },
    size: { width: 600, height: 60 },
    groupId: null,
  },
  {
    id: crypto.randomUUID(),
    type: "paragraph",
    content: "Please fill out this application form to apply for a position at our company.",
    position: { x: 100, y: 130 },
    size: { width: 600, height: 50 },
    groupId: null,
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    position: { x: 100, y: 200 },
    size: { width: 600, height: 80 },
    groupId: null,
  },
  {
    id: crypto.randomUUID(),
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    position: { x: 100, y: 300 },
    size: { width: 600, height: 80 },
    groupId: null,
  },
  {
    id: crypto.randomUUID(),
    type: "textarea",
    label: "Work Experience",
    placeholder: "Describe your relevant work experience",
    required: true,
    position: { x: 100, y: 400 },
    size: { width: 600, height: 150 },
    groupId: null,
  },
  {
    id: crypto.randomUUID(),
    type: "file",
    label: "Resume Upload",
    placeholder: "Upload your resume (PDF or DOC)",
    required: true,
    position: { x: 100, y: 570 },
    size: { width: 600, height: 100 },
    groupId: null,
  },
];

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("generate");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversation, setConversation] = useState<{role: string, content: string}[]>([
    {
      role: "assistant",
      content: "Hello! I'm the Porto AI Assistant. I can help you build forms, suggest fields, and improve your form's completion rate. How can I assist you today?"
    }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [isGeneratingField, setIsGeneratingField] = useState(false);
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description of the form you want to create");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with a timer
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      
      // Add the successful generation message to the conversation
      setConversation(prev => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: "I've generated a job application form based on your request. You can now see it in the editor." }
      ]);
      
      // Clear the prompt
      setPrompt("");
      
      // Show success message
      toast.success("AI has generated a form based on your prompt!");
    }, 2000);
  };
  
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    // Add user message to the conversation
    setConversation(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Simulate AI processing
    setTimeout(() => {
      // Add AI response
      setConversation(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I understand you're looking for assistance. Based on your form's purpose, I would suggest adding fields for contact information, relevant experience, and availability. Would you like me to generate these fields for you?"
        }
      ]);
      
      // Clear the input
      setUserMessage("");
    }, 1000);
  };
  
  const handleFieldGeneration = () => {
    if (!fieldDescription.trim()) {
      toast.error("Please describe the field you want to generate");
      return;
    }
    
    setIsGeneratingField(true);
    
    // Simulate field generation
    setTimeout(() => {
      setIsGeneratingField(false);
      setFieldDescription("");
      
      toast.success("Field suggestion added to your form!");
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-primary" />
            AI Form Assistant
          </DialogTitle>
          <DialogDescription>
            Create forms, get field suggestions, or optimize your existing form using AI.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col h-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="generate">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Form
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat Assistant
            </TabsTrigger>
            <TabsTrigger value="suggest">
              <Lightbulb className="h-4 w-4 mr-2" />
              Field Suggestions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4 flex-1 overflow-auto">
            <div className="space-y-2">
              <Label htmlFor="form-prompt">Describe the form you want to create</Label>
              <Textarea
                id="form-prompt"
                placeholder="E.g., Create a job application form with fields for personal information, work experience, and education history."
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Brain className="h-4 w-4 mr-2 text-primary" />
                <Label>AI Model Suggestions</Label>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3 text-left" 
                  onClick={() => setPrompt("Create a customer feedback form with rating scales, multiple choice questions about product satisfaction, and an open comment field.")}
                >
                  <div>
                    <p className="font-medium text-sm">Customer Feedback Form</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Rating scales, satisfaction questions, and comment field
                    </p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3 text-left"
                  onClick={() => setPrompt("Build an event registration form for a corporate conference with personal information, company details, session selections, and dietary preferences.")}
                >
                  <div>
                    <p className="font-medium text-sm">Event Registration Form</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Contact info, session selections, and preferences
                    </p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3 text-left"
                  onClick={() => setPrompt("Create a healthcare patient intake form with medical history, current medications, insurance information, and consent forms.")}
                >
                  <div>
                    <p className="font-medium text-sm">Patient Intake Form</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Medical history, medications, and consent sections
                    </p>
                  </div>
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-md p-3 flex items-start">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="ml-2 text-sm">
                <p className="font-medium">Trusted Form Generation</p>
                <p className="text-muted-foreground text-xs mt-1">
                  All generated forms comply with accessibility standards and best practices for form design. Your data and prompts remain private and secure.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto border rounded-md mb-4 p-4 space-y-4">
              {conversation.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "assistant" 
                        ? "bg-muted" 
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask how to improve your form or get help with field types..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground">
              <p className="flex items-center">
                <Cpu className="h-3 w-3 mr-1" />
                AI assistant can help improve your form design and completion rates
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="suggest" className="space-y-4 flex-1 overflow-auto">
            <div className="space-y-2">
              <Label htmlFor="field-description">Describe the field you need</Label>
              <Textarea
                id="field-description"
                placeholder="E.g., I need a field to collect user's date of birth with age verification."
                rows={3}
                value={fieldDescription}
                onChange={(e) => setFieldDescription(e.target.value)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center">
                <SquarePen className="h-4 w-4 mr-2 text-primary" />
                <Label>Common Field Suggestions</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("Address field with auto-complete functionality")}
                >
                  Address Field
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("Phone number field with country code selection")}
                >
                  Phone Number
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("Credit card field with validation and security")}
                >
                  Payment Info
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("Date range picker for selecting start and end dates")}
                >
                  Date Range
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("Consent checkbox with legal language for GDPR compliance")}
                >
                  GDPR Consent
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => setFieldDescription("File upload for accepting resumes with size restrictions")}
                >
                  File Upload
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-3">
              <h4 className="text-sm font-medium">AI-Powered Field Analysis</h4>
              <p className="text-xs text-muted-foreground mt-1">
                The AI assistant is analyzing your existing form and can suggest additional fields that might improve completion rates and data quality.
              </p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" className="text-xs h-7">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Suggest Missing Fields
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Optimize Field Order
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex items-center">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Cancel
          </Button>
          
          {activeTab === "generate" && (
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Form
                </>
              )}
            </Button>
          )}
          
          {activeTab === "suggest" && (
            <Button 
              onClick={handleFieldGeneration} 
              disabled={isGeneratingField || !fieldDescription.trim()}
            >
              {isGeneratingField ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Field...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Field
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
