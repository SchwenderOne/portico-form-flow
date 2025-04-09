
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Sparkles, History, Plus, Check, RefreshCw, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { generateFormFromPrompt } from "@/services/ai-form-generator";
import { FormElement } from "@/types/form";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElements: (elements: FormElement[]) => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  isOpen, 
  onClose,
  onAddElements
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [generatedElements, setGeneratedElements] = useState<FormElement[]>([]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateForm = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your form");
      return;
    }

    setIsGenerating(true);
    try {
      const elements = await generateFormFromPrompt(prompt);
      setGeneratedElements(elements);
      setActiveTab("preview");
      
      // Add to history if not already there
      if (!history.includes(prompt)) {
        setHistory(prev => [prompt, ...prev].slice(0, 5));
      }
      
      toast.success("Form generated successfully!", {
        description: `${elements.length} elements created`
      });
    } catch (error) {
      toast.error("Failed to generate form", {
        description: "Please try a different description or try again later."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToCanvas = () => {
    if (generatedElements.length > 0) {
      onAddElements(generatedElements);
      toast.success(`${generatedElements.length} elements added to canvas`);
      handleCloseModal();
    }
  };

  const handleUseFromHistory = (historyPrompt: string) => {
    setPrompt(historyPrompt);
    setActiveTab("prompt");
  };

  const handleRegenerateForm = () => {
    setActiveTab("prompt");
  };

  const handleCloseModal = () => {
    setPrompt("");
    setGeneratedElements([]);
    setActiveTab("prompt");
    onClose();
  };

  return (
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
                Prompt Examples
              </h3>
              <ul className="text-xs space-y-1">
                <li>• "Create a customer feedback form with name, email, rating, and comment section"</li>
                <li>• "Make a job application form with personal details, experience, and education"</li>
                <li>• "Design a simple event registration with attendee info and preferences"</li>
              </ul>
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
              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <History className="h-4 w-4 mr-1 text-muted-foreground" />
                  <h4 className="text-sm font-medium text-muted-foreground">Recent Prompts</h4>
                </div>
                <ScrollArea className="h-24">
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
  );
};

export default AIAssistantModal;
