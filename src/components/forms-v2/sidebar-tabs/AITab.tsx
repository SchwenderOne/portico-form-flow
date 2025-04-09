
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wand2, MessageSquarePlus, ListPlus, Bot, Sparkles } from "lucide-react";
import { useFormCanvas } from "@/components/form-builder/context/FormCanvasContext";
import { toast } from "sonner";

const AITab = () => {
  const [prompt, setPrompt] = React.useState("");
  const { elements } = useFormCanvas();
  
  const handleSubmitPrompt = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    toast.info("AI is generating suggestions...");
    
    // Mock the AI generation with a timeout
    setTimeout(() => {
      toast.success("AI suggestions generated");
      setPrompt("");
    }, 1500);
  };
  
  const examplePrompts = [
    { 
      title: "Create a contact form", 
      description: "Generate fields for name, email, message" 
    },
    { 
      title: "Make a feedback survey", 
      description: "Create questions for user feedback collection" 
    },
    { 
      title: "Build a job application", 
      description: "Set up fields for resume, experience, references" 
    },
    { 
      title: "Generate GDPR fields", 
      description: "Add GDPR compliant consent fields" 
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="text-sm space-y-2">
        <h3 className="font-medium">AI Form Assistant</h3>
        <p className="text-xs text-muted-foreground">
          Generate form elements, suggest fields, or help with form setup using AI
        </p>
      </div>
      
      <div className="space-y-1.5">
        <div className="rounded-md border p-2 bg-blue-50 border-blue-100">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-700">
                AI can suggest more fields based on your current form
              </p>
              <p className="text-xs text-blue-600 mt-1">
                You have {elements.length} fields. AI can analyze your form and suggest additional relevant fields.
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-2 h-7 text-xs bg-white hover:bg-blue-100"
              >
                <Bot className="h-3 w-3 mr-1.5" />
                Suggest More Fields
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-xs font-medium text-muted-foreground mt-3">Example Prompts</p>
        <ScrollArea className="h-[120px]">
          <div className="space-y-2 pr-2">
            {examplePrompts.map((example, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                className="w-full justify-start text-left h-auto py-2 px-3"
                onClick={() => setPrompt(example.title)}
              >
                <div>
                  <p className="text-xs font-medium">{example.title}</p>
                  <p className="text-[10px] text-muted-foreground">{example.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Enter your prompt</p>
        <Textarea 
          placeholder="Describe what you want to create..."
          className="min-h-[100px] text-sm resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <ListPlus className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            size="sm" 
            className="gap-1"
            onClick={handleSubmitPrompt}
          >
            <Wand2 className="h-4 w-4" />
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AITab;
