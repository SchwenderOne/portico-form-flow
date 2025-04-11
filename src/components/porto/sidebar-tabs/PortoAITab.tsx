
import React, { useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Wand2, Sparkles, Lightbulb, MessageSquare, AlertCircle, Bot } from "lucide-react";
import { toast } from "sonner";
import { generateFormWithOpenRouter } from "@/services/openrouter-service";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const PortoAITab: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleAddAIElements } = useFormCanvas();

  const handleGenerateForm = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      console.log("Starting form generation from sidebar with prompt:", prompt);
      toast.info("AI is working on your form...", { duration: 3000 });
      
      // Use the OpenRouter service to generate form elements
      const generatedElements = await generateFormWithOpenRouter(prompt);
      
      if (generatedElements && generatedElements.length > 0) {
        console.log("Generated elements from sidebar:", generatedElements);
        handleAddAIElements(generatedElements);
        toast.success("Form generated based on your prompt");
        setPrompt("");
      } else {
        console.error("No elements generated from sidebar prompt:", prompt);
        setError("Failed to generate form elements. Please try a different prompt.");
        toast.error("Failed to generate form elements");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      console.error("Error in AI form generation from sidebar:", errorMessage);
      setError(errorMessage);
      toast.error("Failed to generate form");
    } finally {
      setIsGenerating(false);
    }
  };

  const formSuggestions = [
    "Add a phone number field for alternative contact",
    "Include a checkbox for newsletter subscription",
    "Add a file upload field for attachments",
    "Include a GDPR consent checkbox",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setError(null); // Clear any previous errors
  };

  const examplePrompts = [
    "Create a contact form with name, email, and message fields",
    "Design a healthcare patient intake form with medical history",
    "Build a job application form with education and experience sections",
    "Generate a feedback survey with rating and comment fields"
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Mistral AI Form Generator</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Describe the form you want to create and Mistral AI will generate it for you.
          </p>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
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
            {examplePrompts.map((examplePrompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 text-sm"
                onClick={() => handleSuggestionClick(examplePrompt)}
              >
                {examplePrompt}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
