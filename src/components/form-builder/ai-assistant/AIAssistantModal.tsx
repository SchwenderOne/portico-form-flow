
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Wand2, 
  Sparkles, 
  History, 
  Plus, 
  Check, 
  RefreshCw, 
  Lightbulb, 
  AlertCircle, 
  Clock, 
  Star, 
  StarOff, 
  Edit, 
  Trash, 
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { generateFormFromPrompt } from "@/services/ai-form-generator";
import { FormElement } from "@/types/form";
import InsertionModeModal from "./InsertionModeModal";
import { formatDistanceToNow } from "date-fns";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElements: (elements: FormElement[], replaceExisting?: boolean) => void;
  existingElements: FormElement[];
}

interface PromptHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  isFavorite: boolean;
}

const EXAMPLE_PROMPTS = [
  "Create a customer feedback form with name, email, rating, and comment section",
  "Make a job application form with personal details, experience, and education",
  "Design a simple event registration with attendee info and preferences",
  "Create a 5-step onboarding form for HR with name, position, department, consent",
  "Build a survey with multiple choice and open-ended questions"
];

const STORAGE_KEY = "portico-ai-form-prompt-history";

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  isOpen, 
  onClose,
  onAddElements,
  existingElements
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [historyTab, setHistoryTab] = useState<string>("history");
  const [generatedElements, setGeneratedElements] = useState<FormElement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showInsertionModal, setShowInsertionModal] = useState(false);

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

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    setError(null);
  };

  const handleGenerateForm = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your form");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const elements = await generateFormFromPrompt(prompt);
      
      if (!elements || elements.length === 0) {
        throw new Error("Could not generate form fields from your description");
      }
      
      // Adjust positions for proper layout alignment with grid
      const adjustedElements = elements.map((el, index) => ({
        ...el,
        position: {
          x: Math.round(el.position.x / 25) * 25, // Snap to grid (25px)
          y: Math.round(el.position.y / 25) * 25
        },
        size: {
          ...el.size,
          width: Math.max(Math.round(el.size.width / 25) * 25, 500) // Ensure minimum width and align to grid
        }
      }));
      
      setGeneratedElements(adjustedElements);
      setActiveTab("preview");
      
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
      
      toast.success("Form generated successfully!", {
        description: `${elements.length} elements created`
      });
    } catch (error) {
      console.error("Error generating form:", error);
      setError(error instanceof Error ? error.message : "Failed to generate form");
      toast.error("Form generation failed", {
        description: "Please try a different description or try again later."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToCanvas = () => {
    if (generatedElements.length > 0) {
      // Show insertion modal instead of immediately adding elements
      setShowInsertionModal(true);
    }
  };

  const handleInsertionMode = (replaceExisting: boolean) => {
    onAddElements(generatedElements, replaceExisting);
    toast.success(`${generatedElements.length} elements ${replaceExisting ? 'replaced existing form' : 'added to canvas'}`);
    handleCloseModal();
  };

  const handleUsePrompt = (historyPrompt: string) => {
    setPrompt(historyPrompt);
    setActiveTab("prompt");
  };

  const handleToggleFavorite = (id: string) => {
    setHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleDeletePrompt = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.success("Prompt removed from history");
  };

  const handleRegenerateForm = () => {
    setActiveTab("prompt");
  };

  const handleUseExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleCloseModal = () => {
    setPrompt("");
    setGeneratedElements([]);
    setActiveTab("prompt");
    setShowInsertionModal(false);
    onClose();
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold">
              <Wand2 className="h-5 w-5 mr-2 text-portico-purple" />
              AI Form Generator
            </DialogTitle>
            <DialogDescription>
              Describe the form you want to create in natural language
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prompt">Write Prompt</TabsTrigger>
              <TabsTrigger value="preview" disabled={generatedElements.length === 0}>
                Form Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="flex-1 flex flex-col">
              <div className="bg-portico-purple/5 p-4 rounded-md mb-4">
                <h3 className="text-sm font-medium flex items-center text-portico-purple mb-2">
                  <Lightbulb className="h-4 w-4 mr-1" />
                  Example Prompts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((example, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs py-1 h-auto bg-background/80 justify-start"
                      onClick={() => handleUseExamplePrompt(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Describe the form you want to create..."
                value={prompt}
                onChange={handlePromptChange}
                className="flex-1 min-h-[120px] text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.metaKey) handleGenerateForm();
                }}
              />

              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleGenerateForm} 
                  disabled={isGenerating || !prompt.trim()} 
                  className="flex items-center"
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" /> Generate Form
                    </>
                  )}
                </Button>
              </div>

              {history.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <Tabs defaultValue="history" value={historyTab} onValueChange={setHistoryTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="history" className="text-xs">
                        <History className="h-3.5 w-3.5 mr-1" /> History
                      </TabsTrigger>
                      <TabsTrigger value="favorites" className="text-xs">
                        <Star className="h-3.5 w-3.5 mr-1" /> Favorites
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="history" className="mt-0">
                      <ScrollArea className="h-[150px]">
                        <div className="space-y-1">
                          {history.length > 0 ? (
                            history.map((item) => (
                              <div 
                                key={item.id} 
                                className="group flex items-center justify-between py-2 px-3 text-sm rounded-md hover:bg-accent/50 transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium truncate">{item.text}</span>
                                  </div>
                                  <div className="text-muted-foreground text-xs flex items-center mt-0.5">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {formatTime(item.timestamp)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8" 
                                    onClick={() => handleToggleFavorite(item.id)}
                                    title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                  >
                                    {item.isFavorite ? (
                                      <StarOff className="h-4 w-4 text-amber-500" />
                                    ) : (
                                      <Star className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8" 
                                    onClick={() => handleUsePrompt(item.text)}
                                    title="Edit prompt"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive/70 hover:text-destructive" 
                                    onClick={() => handleDeletePrompt(item.id)}
                                    title="Delete prompt"
                                  >
                                    <Trash className="h-4 w-4" />
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
                      <ScrollArea className="h-[150px]">
                        <div className="space-y-1">
                          {history.filter(item => item.isFavorite).length > 0 ? (
                            history.filter(item => item.isFavorite).map((item) => (
                              <div 
                                key={item.id} 
                                className="group flex items-center justify-between py-2 px-3 text-sm rounded-md hover:bg-accent/50 transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                                    <span className="font-medium truncate">{item.text}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8" 
                                    onClick={() => handleToggleFavorite(item.id)}
                                    title="Remove from favorites"
                                  >
                                    <StarOff className="h-4 w-4 text-amber-500" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8" 
                                    onClick={() => handleUsePrompt(item.text)}
                                    title="Use this prompt"
                                  >
                                    <ArrowRight className="h-4 w-4" />
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
            </TabsContent>

            <TabsContent value="preview" className="flex-1 flex flex-col">
              <div className="flex-1 border rounded-md overflow-hidden">
                <div className="bg-muted/40 py-2 px-3 border-b flex justify-between items-center">
                  <h3 className="text-sm font-medium">Form Preview</h3>
                  <Button variant="ghost" size="sm" onClick={handleRegenerateForm}>
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Edit Prompt
                  </Button>
                </div>
                <ScrollArea className="h-[300px] p-4">
                  {generatedElements.length > 0 ? (
                    <div className="space-y-4">
                      {generatedElements.map((element, index) => (
                        <div key={index} className="border rounded-md p-3 bg-card">
                          <div className="text-sm font-medium mb-1 capitalize">
                            {element.type === "header" ? "Header" : 
                             element.type === "paragraph" ? "Paragraph" : 
                             `${element.type} Field`}
                          </div>
                          {element.type === "header" || element.type === "paragraph" ? (
                            <div className="text-sm">{element.content}</div>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-sm">{element.label}</div>
                              {element.helpText && (
                                <div className="text-xs text-muted-foreground">{element.helpText}</div>
                              )}
                              {(element.type === "select" || element.type === "radio" || element.type === "checkbox") && 
                               element.options && (
                                <div className="text-xs text-muted-foreground">
                                  Options: {element.options.join(", ")}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No form elements generated yet
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {generatedElements.length > 0 && `${generatedElements.length} elements generated`}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddToCanvas} 
                disabled={generatedElements.length === 0}
                className="flex items-center"
              >
                <Check className="h-4 w-4 mr-1" /> Add to Canvas
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <InsertionModeModal
        isOpen={showInsertionModal}
        onClose={() => setShowInsertionModal(false)}
        elements={generatedElements}
        onInsert={handleInsertionMode}
      />
    </>
  );
};

export default AIAssistantModal;
