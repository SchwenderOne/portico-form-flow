
import React, { useState } from "react";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  FileText, 
  Edit, 
  Info, 
  SlidersHorizontal, 
  User, 
  Clock, 
  Tag, 
  Plus, 
  X
} from "lucide-react";
import { format } from "date-fns";

const MetadataTab = () => {
  const { metadata, updateMetadata } = useFormMetadata();
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      updateMetadata({ tags: [...metadata.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateMetadata({
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP 'at' p");
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Form Metadata</h3>
      </div>
      
      <div className="space-y-4">
        {/* Form Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Edit className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="form-name">Form Name</Label>
          </div>
          <Input
            id="form-name"
            value={metadata.name}
            onChange={(e) => updateMetadata({ name: e.target.value })}
            placeholder="Enter form name"
          />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="form-description">Description</Label>
          </div>
          <Textarea
            id="form-description"
            value={metadata.description}
            onChange={(e) => updateMetadata({ description: e.target.value })}
            placeholder="Briefly describe the purpose of this form"
            rows={3}
          />
        </div>
        
        {/* Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="form-status">Status</Label>
          </div>
          <Select
            value={metadata.status}
            onValueChange={(value: 'draft' | 'review' | 'published') => 
              updateMetadata({ status: value })
            }
          >
            <SelectTrigger id="form-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Responsible Person */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="responsible-person">Responsible Person</Label>
          </div>
          <Input
            id="responsible-person"
            value={metadata.responsiblePerson}
            onChange={(e) => updateMetadata({ responsiblePerson: e.target.value })}
            placeholder="Who is responsible for this form?"
          />
        </div>
        
        {/* Last Edited */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label>Last Edit</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            By <span className="font-medium">{metadata.lastEditedBy}</span> on {formatDate(metadata.lastEditDate)}
          </div>
        </div>
        
        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="form-tags">Tags</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="form-tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button 
              type="button" 
              size="sm" 
              onClick={handleAddTag}
              disabled={!newTag.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveTag(tag)}
                  className="h-4 w-4 p-0 ml-1"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {tag}</span>
                </Button>
              </Badge>
            ))}
            {metadata.tags.length === 0 && (
              <div className="text-sm text-muted-foreground">No tags added yet</div>
            )}
          </div>
        </div>
        
        {/* Created At (Read-only) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label>Created On</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(metadata.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataTab;
