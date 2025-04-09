
import React, { useRef, useEffect } from "react";
import { useElementEditor } from "@/hooks/useElementEditor";
import UnifiedFloatingToolbar from "@/components/form-builder/toolbars/UnifiedFloatingToolbar";
import { FormElement } from "@/types/form";
import { useFormCanvas } from "./context/FormCanvasContext";

interface ContentEditableElementProps {
  element: FormElement;
  content: string;
  onContentChange?: (content: string) => void;
  className?: string;
}

const ContentEditableElement: React.FC<ContentEditableElementProps> = ({
  element,
  content,
  onContentChange,
  className = "",
}) => {
  const {
    isEditing,
    elementRef,
    elementRect,
    isTextSelected,
    selectionRect,
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleUnderline,
    handleStrikethrough,
    handleLink,
    setIsEditing,
    saveChanges,
    getSelectedText
  } = useElementEditor(element.id);

  const contentRef = useRef<HTMLDivElement>(null);
  const { handleDeleteElement, handleDuplicateElement, handleElementAlign } = useFormCanvas();

  // Update the content editable element when content changes from outside
  useEffect(() => {
    if (contentRef.current && !isEditing) {
      contentRef.current.innerHTML = content;
    }
  }, [content, isEditing]);

  // Handle content changes and save them
  const handleBlur = () => {
    if (isEditing && contentRef.current && onContentChange) {
      onContentChange(contentRef.current.innerHTML);
      setIsEditing(false);
      saveChanges();
    }
  };

  const handleFontSize = (size: string) => {
    // Implementation for font size change
    if (!contentRef.current) return;
    
    document.execCommand('fontSize', false, size);
    saveChanges();
  };

  const handleTextColor = (color: string) => {
    // Implementation for text color change
    if (!contentRef.current) return;
    
    document.execCommand('foreColor', false, color);
    saveChanges();
  };

  return (
    <div ref={elementRef} className="relative w-full h-full">
      <div
        ref={contentRef}
        className={`outline-none ${className}`}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onDoubleClick={handleDoubleClick}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {isEditing && elementRect && (
        <UnifiedFloatingToolbar
          elementId={element.id}
          elementRect={elementRect}
          isTextSelected={isTextSelected}
          selectionRect={selectionRect}
          selectedText={getSelectedText()}
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          onStrikethrough={handleStrikethrough}
          onLink={handleLink}
          onDuplicate={handleDuplicateElement}
          onDelete={handleDeleteElement}
          onAlign={handleElementAlign}
          onFontSize={handleFontSize}
          onTextColor={handleTextColor}
          element={element}
        />
      )}
    </div>
  );
};

export default ContentEditableElement;
