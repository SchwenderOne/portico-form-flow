
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lightbulb, Bot } from "lucide-react";
import { useFormCanvas } from "../form-builder/context/FormCanvasContext";
import { generateFormWithOpenRouter } from "@/services/openrouter-service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleAddAIElements } = useFormCanvas();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateForm = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log("Starting form generation with prompt:", prompt);
      toast.info("Mistral AI is generating your form...", { duration: 3000 });
      
      // Use the OpenRouter service to generate form elements
      const generatedElements = await generateFormWithOpenRouter(prompt);
      
      if (generatedElements && generatedElements.length > 0) {
        console.log("Generated elements:", generatedElements);
        handleAddAIElements(generatedElements);
        toast.success("Form generated successfully");
        setPrompt("");
        onClose();
      } else {
        console.error("No elements generated from prompt:", prompt);
        setError("Failed to generate form elements. Please try a different prompt.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      console.error("Error in AI form generation:", errorMessage);
      setError(errorMessage);
      toast.error("Failed to generate form");
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "Create a contact form with name, email, and message fields",
    "Generate a job application form with education and experience sections",
    "Build a customer feedback survey with rating and comments",
    "Make a patient intake form for a medical clinic",
    "Design a subscription form with billing information fields",
  ];

  const handleUseExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    setError(null); // Clear any previous errors
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Mistral AI Form Generator
          </DialogTitle>
          <DialogDescription>
            Describe what kind of form you want to create and let Mistral AI build it for
            you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Your prompt</Label>
            <Textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the form you want to create..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-primary" />
              Example prompts
            </Label>
            <ScrollArea className="h-[150px] rounded-md border">
              <div className="p-2 space-y-2">
                {examplePrompts.map((examplePrompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-2 text-sm"
                    onClick={() => handleUseExamplePrompt(examplePrompt)}
                  >
                    {examplePrompt}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateForm} 
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Form"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
