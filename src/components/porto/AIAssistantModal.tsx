
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/types/form";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesSquare, Lightbulb, History, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample form field suggestions
const sampleFormFields: FormElement[] = [
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
  {
    id: crypto.randomUUID(),
    type: "textarea",
    label: "Message",
    placeholder: "How can we help you?",
    required: false,
    position: { x: 100, y: 320 },
    size: { width: 600, height: 150 },
    groupId: null,
  },
];

// Sample example prompts
const examplePrompts = [
  "Create a contact form with name, email, and message fields",
  "Add a job application form with education and experience sections",
  "Generate a customer feedback survey with rating questions",
  "Build a GDPR-compliant newsletter signup form",
  "Create a form to collect shipping information",
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  
  const { handleAddAIElements } = useFormCanvas();

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    
    // Add prompt to history
    setPromptHistory(prev => [prompt, ...prev]);

    // Simulate AI generation with a timeout
    setTimeout(() => {
      handleAddAIElements(sampleFormFields);
      setIsGenerating(false);
      setPrompt("");
      toast.success("Form fields generated successfully");
      onClose();
    }, 2000);
  };

  const handleExamplePromptClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>AI Form Assistant</DialogTitle>
          <DialogDescription>
            Describe the form you want to create and the AI will generate form fields.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
            <div className="flex-1 bg-muted/30 rounded-md p-4 overflow-y-auto">
              {promptHistory.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 mx-auto mb-2 text-primary/60" />
                    <p>Enter a prompt below to generate form fields</p>
                    <p className="text-sm">Example: "Create a contact form"</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {promptHistory.map((historyPrompt, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="bg-primary/10 p-3 rounded-lg self-end max-w-[80%]">
                        <p className="text-sm">{historyPrompt}</p>
                      </div>
                      <div className="bg-secondary/10 p-3 rounded-lg self-start max-w-[80%]">
                        <p className="text-sm">I've generated form fields based on your prompt.</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Describe the form you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-h-[80px]"
              />
              <Button 
                onClick={handleSubmit}
                disabled={isGenerating || !prompt.trim()}
                className="self-end"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="flex-1">
            <div className="grid grid-cols-1 gap-3">
              {examplePrompts.map((examplePrompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left"
                  onClick={() => handleExamplePromptClick(examplePrompt)}
                >
                  <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{examplePrompt}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            {promptHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No history yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {promptHistory.map((historyPrompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left"
                    onClick={() => handleExamplePromptClick(historyPrompt)}
                  >
                    <History className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{historyPrompt}</span>
                  </Button>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
