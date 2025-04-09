
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Trash, 
  LucideToggleRight, 
  Users, 
  BrainCircuit, 
  FileText,
  ChevronsUpDown,
  CheckSquare
} from "lucide-react";
import { FormElement } from "@/types/form";
import { useFormMetadata } from "@/context/FormMetadataContext";
import { CollaboratorAvatars } from "@/context/CollaborationContext";
import { toast } from "sonner";

// Used to show/hide the metadata sheet
const formMetadataSheetControls = {
  open: null as (() => void) | null,
  close: null as (() => void) | null,
};

export const registerFormMetadataSheetControls = (
  openFn: (() => void) | null,
  closeFn: (() => void) | null
) => {
  formMetadataSheetControls.open = openFn;
  formMetadataSheetControls.close = closeFn;
};

interface FormTopToolbarProps {
  selectedElement: FormElement | null;
  selectedCount: number;
  onDuplicate: (id: string) => void;
  onDuplicateGroup: (ids: string[]) => void;
  onRequiredToggle: (id: string, required: boolean) => void;
  onGroup: () => void;
  onUngroup: () => void;
  onOpenAIModal: () => void;
  existingElements: FormElement[];
}

const FormTopToolbar: React.FC<FormTopToolbarProps> = ({
  selectedElement,
  selectedCount,
  onDuplicate,
  onDuplicateGroup,
  onRequiredToggle,
  onGroup,
  onUngroup,
  onOpenAIModal,
  existingElements
}) => {
  const { metadata, saveMetadata } = useFormMetadata();

  const handleOpenMetadataSheet = () => {
    if (formMetadataSheetControls.open) {
      formMetadataSheetControls.open();
    }
  };

  const handleSaveForm = async () => {
    try {
      await saveMetadata();
      toast.success("Form metadata saved successfully");
    } catch (error) {
      console.error("Error saving form metadata:", error);
      toast.error("Failed to save form metadata");
    }
  };

  return (
    <div className="border-b bg-background p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenMetadataSheet}
          className="flex items-center"
        >
          <FileText className="h-4 w-4 mr-1" />
          <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
            {metadata.name || "Untitled Form"}
          </span>
          <ChevronsUpDown className="h-4 w-4 ml-1" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSaveForm}
        >
          Save
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        {/* Show collaborators */}
        <div className="mr-4">
          <CollaboratorAvatars />
        </div>

        {selectedCount > 0 && (
          <>
            {selectedCount === 1 && selectedElement && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRequiredToggle(selectedElement.id, !selectedElement.required)}
                disabled={selectedElement.type === 'header' || selectedElement.type === 'paragraph'}
              >
                <CheckSquare className={`h-4 w-4 mr-1 ${selectedElement.required ? 'text-portico-purple' : ''}`} />
                {selectedElement.required ? 'Required' : 'Optional'}
              </Button>
            )}

            {selectedCount === 1 && selectedElement && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(selectedElement.id)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
            )}

            {selectedCount > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicateGroup([])}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate Selection
              </Button>
            )}

            {selectedCount > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onGroup}
              >
                <Users className="h-4 w-4 mr-1" />
                Group
              </Button>
            )}

            {selectedCount >= 1 && selectedElement?.groupId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onUngroup}
              >
                <Users className="h-4 w-4 mr-1" />
                Ungroup
              </Button>
            )}
          </>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenAIModal}
        >
          <BrainCircuit className="h-4 w-4 mr-1" />
          AI Assist
        </Button>
      </div>
    </div>
  );
};

export default FormTopToolbar;
