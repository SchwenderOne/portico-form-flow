
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import AIAssistantButton from "../../ai-assistant/AIAssistantButton";
import { FormElement } from "@/types/form";

interface AIAssistTabProps {
  onAddElements?: (elements: FormElement[]) => void;
  existingElements?: FormElement[]; // Add this property to the interface
}

const AIAssistTab: React.FC<AIAssistTabProps> = ({ 
  onAddElements,
  existingElements = [] // Provide a default value
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuickPrompt = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    // Mock implementation - in real app, we would call the AI service here
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
      // Alert the user that this is just a prototype
      alert("This quick prompt feature is a UI prototype. Use the AI Assistant button for actual form generation.");
    }, 1500);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <AIAssistantButton 
          label="Open AI Form Generator" 
          size="default" 
          variant="default"
          existingElements={existingElements} // Pass the prop here
          onAddElements={onAddElements}
        />
      </div>
      
      <div className="text-sm text-muted-foreground mb-2">Quick Field Prompt:</div>
      
      <div className="relative">
        <Textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe a field to add (e.g., 'Add an email field for newsletter signup')"
          className="resize-none h-24"
          disabled={isGenerating}
        />
        
        <Button 
          size="sm"
          disabled={!prompt.trim() || isGenerating}
          className="absolute bottom-2 right-2"
          onClick={handleQuickPrompt}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Field'}
        </Button>
      </div>
      
      <div className="mt-auto pt-2 text-xs text-muted-foreground">
        Tip: The AI can analyze your form context to suggest relevant fields and improvements.
      </div>
    </div>
  );
};

export default AIAssistTab;
