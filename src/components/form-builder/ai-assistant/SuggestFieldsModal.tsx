
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/types/form";
import { LightbulbIcon, Loader2 } from "lucide-react";
import { generateFieldSuggestions } from "@/services/ai-form-generator";
import { toast } from "sonner";
import SuggestedFields from "./SuggestedFields";

interface SuggestFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElements: (elements: FormElement[]) => void;
  existingElements: FormElement[];
  formMetadata: { name: string; description: string };
}

const SuggestFieldsModal: React.FC<SuggestFieldsModalProps> = ({
  isOpen,
  onClose,
  onAddElements,
  existingElements,
  formMetadata,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [additionalContext, setAdditionalContext] = useState("");
  const [suggestions, setSuggestions] = useState<FormElement[]>([]);
  const [autoGenerateOnMount, setAutoGenerateOnMount] = useState(true);

  // Auto-generate suggestions when modal opens
  React.useEffect(() => {
    if (isOpen && autoGenerateOnMount) {
      handleGenerateSuggestions();
      setAutoGenerateOnMount(false);
    }
  }, [isOpen, autoGenerateOnMount]);

  const handleGenerateSuggestions = async () => {
    try {
      setIsGenerating(true);
      
      const suggestedFields = await generateFieldSuggestions(
        formMetadata.name,
        formMetadata.description,
        additionalContext,
        existingElements
      );
      
      setSuggestions(suggestedFields);
      
      if (suggestedFields.length === 0) {
        toast.info("No additional field suggestions could be generated based on your form context.");
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
      toast.error("Failed to generate field suggestions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: FormElement) => {
    onAddElements([suggestion]);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    toast.success(`Added ${suggestion.label} field to your form`);
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleAcceptAll = () => {
    if (suggestions.length > 0) {
      onAddElements(suggestions);
      toast.success(`Added ${suggestions.length} fields to your form`);
      setSuggestions([]);
    }
  };

  const handleDismissAll = () => {
    setSuggestions([]);
    toast.info("All suggestions dismissed");
  };

  const handleClose = () => {
    setSuggestions([]);
    setAdditionalContext("");
    setAutoGenerateOnMount(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <LightbulbIcon className="h-5 w-5 mr-2 text-portico-purple" />
            Smart Field Suggestions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <>
              <p className="text-sm text-muted-foreground">
                AI is analyzing your form's title, description, and existing fields to suggest relevant additional fields.
              </p>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Context (Optional)</label>
                <Textarea
                  placeholder="Add any specific needs or requirements for this form..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleGenerateSuggestions} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Form & Generating Suggestions...
                  </>
                ) : (
                  <>
                    <LightbulbIcon className="mr-2 h-4 w-4" />
                    Generate Smart Suggestions
                  </>
                )}
              </Button>
            </>
          ) : (
            <SuggestedFields
              suggestions={suggestions}
              onAcceptSuggestion={handleAcceptSuggestion}
              onRejectSuggestion={handleRejectSuggestion}
              onAcceptAll={handleAcceptAll}
              onDismissAll={handleDismissAll}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestFieldsModal;
