
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Wand2, 
  Sparkles, 
  History, 
  Plus, 
  AlertCircle, 
  Clock, 
  Star, 
  StarOff,
  Edit,
  Trash,
  LightbulbIcon,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { generateFieldFromPrompt } from "@/services/ai-field-generator";
import { FormElement } from "@/types/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";

interface PromptHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  isFavorite: boolean;
}

interface AIAssistTabProps {
  onAddElements?: (elements: FormElement[]) => void;
  existingElements?: FormElement[]; // Added this prop to the interface
}

const EXAMPLE_PROMPTS = [
  "Create an RSVP form for an event",
  "Build a simple contact form with name, email, message",
  "Generate a feedback form with 5-star rating and comment box",
  "Create a multi-step onboarding form with 3 sections",
  "Design a form for booking a consultation appointment"
];

const STORAGE_KEY = "portico-ai-prompt-history";

const AIAssistTab: React.FC<AIAssistTabProps> = ({ onAddElements, existingElements = [] }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [generatedField, setGeneratedField] = useState<FormElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("history");

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

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
      const promptId = Date.now().toString();
      setHistory(prev => {
        // Check if this exact prompt already exists
        if (!prev.some(item => item.text === prompt)) {
          return [
            { id: promptId, text: prompt, timestamp: Date.now(), isFavorite: false },
            ...prev
          ];
        }
        return prev;
      });
      
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
    if (generatedField && onAddElements) {
      onAddElements([generatedField]);
      setGeneratedField(null);
      setPrompt("");
      toast.success("Field added to canvas");
    }
  };

  const handleUsePrompt = (historyPrompt: string) => {
    setPrompt(historyPrompt);
  };

  const handleDeletePrompt = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success("Prompt removed from history");
  };

  const handleToggleFavorite = (id: string) => {
    setHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleUseExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
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

        <div className="rounded-md border p-2 bg-background/50 mb-2">
          <h4 className="text-xs font-medium flex items-center text-muted-foreground mb-1.5">
            <LightbulbIcon className="h-3.5 w-3.5 mr-1" />
            Try these examples
          </h4>
          <div className="flex gap-1.5 flex-wrap">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs py-1 h-auto bg-background/80 flex-shrink-0 max-w-[200px] truncate"
                onClick={() => handleUseExamplePrompt(example)}
              >
                {example}
              </Button>
            ))}
          </div>
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
          <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="history" className="text-xs">
                <History className="h-3.5 w-3.5 mr-1" /> History
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs">
                <Star className="h-3.5 w-3.5 mr-1" /> Favorites
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="mt-0">
              <ScrollArea className="h-[120px]">
                <div className="space-y-1">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <div 
                        key={item.id} 
                        className="group flex items-center justify-between py-1.5 px-2 text-xs rounded-md hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium truncate">{item.text}</span>
                          </div>
                          <div className="text-muted-foreground text-[10px] flex items-center mt-0.5">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(item.timestamp)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleToggleFavorite(item.id)}
                          >
                            {item.isFavorite ? (
                              <StarOff className="h-3.5 w-3.5 text-amber-500" />
                            ) : (
                              <Star className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleUsePrompt(item.text)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-destructive/70 hover:text-destructive" 
                            onClick={() => handleDeletePrompt(item.id)}
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No prompt history yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <ScrollArea className="h-[120px]">
                <div className="space-y-1">
                  {history.filter(item => item.isFavorite).length > 0 ? (
                    history.filter(item => item.isFavorite).map((item) => (
                      <div 
                        key={item.id} 
                        className="group flex items-center justify-between py-1.5 px-2 text-xs rounded-md hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            <span className="font-medium truncate">{item.text}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleToggleFavorite(item.id)}
                          >
                            <StarOff className="h-3.5 w-3.5 text-amber-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleUsePrompt(item.text)}
                          >
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No favorite prompts yet
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AIAssistTab;
