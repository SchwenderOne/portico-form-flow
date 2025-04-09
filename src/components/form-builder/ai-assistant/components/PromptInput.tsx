
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (prompt.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the form you want to create..."
          className="resize-none min-h-24 pr-24"
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2">
          <Button
            className="gap-1.5"
            onClick={onSubmit}
            disabled={!prompt.trim() || isLoading}
          >
            <Wand2 className="h-4 w-4" />
            <span>Generate</span>
            {isLoading && (
              <span className="ml-1 animate-spin">⟳</span>
            )}
          </Button>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        Press <kbd className="rounded border px-1 py-0.5 bg-muted">Ctrl</kbd> + <kbd className="rounded border px-1 py-0.5 bg-muted">Enter</kbd> to submit
      </div>
    </div>
  );
};

export default PromptInput;
