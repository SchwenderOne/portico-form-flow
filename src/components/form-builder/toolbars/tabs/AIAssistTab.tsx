
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wand2, Sparkles, History, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { generateFieldFromPrompt } from "@/services/ai-field-generator";
import { FormElement } from "@/types/form";

interface AIAssistTabProps {
  onAddElement?: (element: FormElement) => void;
}

const AIAssistTab: React.FC<AIAssistTabProps> = ({ onAddElement }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [generatedField, setGeneratedField] = useState<FormElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    setError(null);
  };

  const handleGenerateField = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your field");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const field = await generateFieldFromPrompt(prompt);
      setGeneratedField(field);
      
      // Add to history if not already there
      if (!history.includes(prompt)) {
        setHistory(prev => [prompt, ...prev].slice(0, 5));
      }
      
      toast.success("Field generated successfully!", {
        description: `Created a ${field.type} field: ${field.label}`
      });
    } catch (error) {
      console.error("Error generating field:", error);
      setError(error instanceof Error ? error.message : "Failed to generate field");
      toast.error("Failed to generate field", {
        description: "Please try a different description or try again later."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToCanvas = () => {
    if (generatedField && onAddElement) {
      onAddElement(generatedField);
      setGeneratedField(null);
      setPrompt("");
      toast.success("Field added to canvas");
    }
  };

  const handleUseFromHistory = (historyPrompt: string) => {
    setPrompt(historyPrompt);
  };

  return (
    <div className="p-4 h-full overflow-hidden flex flex-col">
      <div className="mb-4 flex flex-col space-y-2">
        <div className="bg-portico-purple/10 p-3 rounded-md mb-2">
          <h3 className="text-sm font-medium flex items-center text-portico-purple">
            <Wand2 className="h-4 w-4 mr-1" />
            AI Field Generator
          </h3>
          <p className="text-xs mt-1">Describe the field you want to create in natural language</p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="e.g., Add a field for client feedback with a 5-star rating"
            value={prompt}
            onChange={handlePromptChange}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateField()}
          />
          <Button 
            onClick={handleGenerateField} 
            disabled={isGenerating || !prompt.trim()} 
            className="flex items-center"
          >
            {isGenerating ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-1" /> Generate
              </>
            )}
          </Button>
        </div>
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-600 flex items-start">
            <AlertCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {generatedField && (
        <div className="border rounded-md p-3 bg-accent/30 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Generated Field</h4>
            <Button size="sm" variant="secondary" onClick={handleAddToCanvas}>
              <Plus className="h-3 w-3 mr-1" /> Add to Canvas
            </Button>
          </div>
          <div className="text-xs space-y-1">
            <p><span className="font-medium">Type:</span> {generatedField.type}</p>
            <p><span className="font-medium">Label:</span> {generatedField.label}</p>
            {generatedField.placeholder && (
              <p><span className="font-medium">Placeholder:</span> {generatedField.placeholder}</p>
            )}
            {generatedField.required !== undefined && (
              <p><span className="font-medium">Required:</span> {generatedField.required ? "Yes" : "No"}</p>
            )}
            {generatedField.helpText && (
              <p><span className="font-medium">Help Text:</span> {generatedField.helpText}</p>
            )}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            <History className="h-4 w-4 mr-1 text-muted-foreground" />
            <h4 className="text-sm font-medium text-muted-foreground">Recent Prompts</h4>
          </div>
          <ScrollArea className="h-20">
            <div className="space-y-1">
              {history.map((historyItem, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-xs h-auto py-1.5 text-left" 
                  onClick={() => handleUseFromHistory(historyItem)}
                >
                  {historyItem}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default AIAssistTab;
