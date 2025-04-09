
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, FileText, List, Star } from "lucide-react";

interface ExamplePromptsProps {
  onSelectExample: (example: string) => void;
}

const examplePrompts = [
  {
    text: "Create an RSVP form for an event",
    icon: <Sparkles className="h-4 w-4 mr-2" />
  },
  {
    text: "Build a simple contact form with name, email, message",
    icon: <FileText className="h-4 w-4 mr-2" />
  },
  {
    text: "Generate a feedback form with 5-star rating and comment box",
    icon: <Star className="h-4 w-4 mr-2" />
  },
  {
    text: "Create a multi-step onboarding form with 3 sections",
    icon: <List className="h-4 w-4 mr-2" />
  },
  {
    text: "Design a form for booking a consultation appointment",
    icon: <Lightbulb className="h-4 w-4 mr-2" />
  }
];

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectExample }) => {
  return (
    <div className="space-y-2 mb-4">
      <div className="text-sm text-muted-foreground mb-2">Try one of these examples:</div>
      <div className="flex flex-wrap gap-2">
        {examplePrompts.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-auto py-1.5 px-3 text-xs justify-start"
            onClick={() => onSelectExample(example.text)}
          >
            {example.icon}
            <span className="truncate">{example.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
