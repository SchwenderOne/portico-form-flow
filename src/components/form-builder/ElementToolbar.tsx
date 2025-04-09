
import React from "react";
import { Copy, Settings, Group, Ungroup, Trash2 } from "lucide-react";

interface ElementToolbarProps {
  elementId: string;
  isGrouped: boolean;
  multipleSelected: boolean;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string, multiSelect: boolean) => void;
  onGroup: () => void;
  onUngroup: () => void;
}

const ElementToolbar: React.FC<ElementToolbarProps> = ({
  elementId,
  isGrouped,
  multipleSelected,
  onDuplicate,
  onDelete,
  onSelect,
  onGroup,
  onUngroup
}) => {
  return (
    <div className="form-element-toolbar visible opacity-100">
      <button 
        className="toolbar-button toolbar-button-secondary p-1"
        onClick={(e) => {
          e.stopPropagation();
          onDuplicate(elementId);
        }}
      >
        <Copy className="h-3 w-3" />
      </button>
      
      {multipleSelected && (
        <button 
          className="toolbar-button toolbar-button-secondary p-1"
          onClick={(e) => {
            e.stopPropagation();
            onGroup();
          }}
        >
          <Group className="h-3 w-3" />
        </button>
      )}
      
      {isGrouped && (
        <button 
          className="toolbar-button toolbar-button-secondary p-1"
          onClick={(e) => {
            e.stopPropagation();
            onUngroup();
          }}
        >
          <Ungroup className="h-3 w-3" />
        </button>
      )}
      
      <button 
        className="toolbar-button toolbar-button-secondary p-1"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(elementId, false);
        }}
      >
        <Settings className="h-3 w-3" />
      </button>
      
      <button 
        className="toolbar-button toolbar-button-secondary p-1"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(elementId);
        }}
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
};

export default ElementToolbar;
