
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { toast } from "sonner";

const MetadataTab = () => {
  const { metadata, updateMetadata } = useFormMetadata();
  
  const handleSaveMetadata = () => {
    toast.success("Form metadata saved");
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="form-name">Form Name</Label>
          <Input 
            id="form-name" 
            placeholder="My Form" 
            className="h-8 text-sm"
            value={metadata?.name || ''}
            onChange={(e) => updateMetadata?.({ ...metadata, name: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="form-desc">Description</Label>
          <Textarea 
            id="form-desc" 
            placeholder="Enter form description..." 
            className="h-20 text-sm resize-none"
            value={metadata?.description || ''}
            onChange={(e) => updateMetadata?.({ ...metadata, description: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="form-status">Status</Label>
          <Select
            value={metadata?.status || 'draft'}
            onValueChange={(value) => updateMetadata?.({ ...metadata, status: value as any })}
          >
            <SelectTrigger id="form-status" className="h-8 text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="form-owner">Responsible Person</Label>
          <Input 
            id="form-owner" 
            placeholder="John Doe" 
            className="h-8 text-sm"
            value={metadata?.responsiblePerson || ''}
            onChange={(e) => updateMetadata?.({ ...metadata, responsiblePerson: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="form-tags">Tags (comma separated)</Label>
          <Input 
            id="form-tags" 
            placeholder="survey, customer, feedback" 
            className="h-8 text-sm"
            value={metadata?.tags?.join(', ') || ''}
            onChange={(e) => updateMetadata?.({ ...metadata, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          />
        </div>
      </div>
      
      <Button className="w-full gap-1" onClick={handleSaveMetadata}>
        <Save className="h-4 w-4" />
        Save Metadata
      </Button>
    </div>
  );
};

export default MetadataTab;
