
import React, { useState } from "react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Wand2, Sparkles, Lightbulb, MessageSquare, AlertCircle, Bot, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateFormWithOpenRouter } from "@/services/openrouter-service";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const PortoAITab: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleAddAIElements, elements } = useFormCanvas();

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
        toast.success(`Added ${generatedElements.length} form fields to your canvas`);
        setPrompt("");
        setError(null);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isGenerating) {
        handleGenerateForm();
      }
    }
  };

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
              onKeyDown={handleKeyDown}
              rows={5}
              disabled={isGenerating}
            />
            <div className="text-xs text-muted-foreground">
              Press <kbd className="rounded border px-1 py-0.5 bg-muted">Ctrl</kbd> + <kbd className="rounded border px-1 py-0.5 bg-muted">Enter</kbd> to submit
            </div>
          </div>
          
          <Button 
            className="w-full mt-2 gap-2" 
            onClick={handleGenerateForm}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Form
              </>
            )}
          </Button>
        </div>
        
        <Separator />

        {elements.length > 0 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium">Smart Suggestions</h3>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                Based on your current form with {elements.length} fields, you might want to add:
              </p>
              
              <div className="space-y-2">
                {formSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isGenerating}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
          </>
        )}
        
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
                disabled={isGenerating}
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
