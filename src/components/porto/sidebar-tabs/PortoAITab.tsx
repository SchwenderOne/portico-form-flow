
import React, { useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/types/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Wand2, Sparkles, Lightbulb, MessageSquare } from "lucide-react";
import { toast } from "sonner";

// Sample AI-generated elements for demo
const aiGeneratedElements: FormElement[] = [
  {
    id: crypto.randomUUID(),
    type: "header",
    label: "Contact Information",
    content: "Contact Information",
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
];

// Sample form suggestions
const formSuggestions = [
  "Add a phone number field for alternative contact",
  "Include a checkbox for newsletter subscription",
  "Add a file upload field for attachments",
  "Include a GDPR consent checkbox",
];

export const PortoAITab: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleAddAIElements } = useFormCanvas();

  const handleGenerateForm = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      handleAddAIElements(aiGeneratedElements);
      setIsGenerating(false);
      setPrompt("");
      toast.success("Form generated based on your prompt");
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">AI Form Generator</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Describe the form you want to create and AI will generate it for you.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="form-prompt">Your prompt</Label>
            <Textarea
              id="form-prompt"
              placeholder="Describe the form you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
            />
          </div>
          
          <Button 
            className="w-full mt-2" 
            onClick={handleGenerateForm}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Form
              </>
            )}
          </Button>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">AI Suggestions</h3>
          </div>
          
          <div className="space-y-2">
            {formSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Example Prompts</h3>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 text-sm"
              onClick={() => handleSuggestionClick("Create a contact form with name, email, and message fields")}
            >
              Create a contact form with name, email, and message fields
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 text-sm"
              onClick={() => handleSuggestionClick("Make a survey about customer satisfaction with 5 questions")}
            >
              Make a survey about customer satisfaction with 5 questions
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 text-sm"
              onClick={() => handleSuggestionClick("Build a job application form with education and experience sections")}
            >
              Build a job application form with education and experience sections
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
