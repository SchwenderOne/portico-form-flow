
import React, { useRef, useEffect, useState } from "react";
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

  const [localContent, setLocalContent] = useState(content);
  const contentRef = useRef<HTMLDivElement>(null);
  const { handleDeleteElement, handleDuplicateElement, handleElementAlign, updateElement } = useFormCanvas();

  // Update the content editable element when content changes from outside
  useEffect(() => {
    if (contentRef.current && !isEditing) {
      contentRef.current.innerHTML = content;
      setLocalContent(content);
    }
  }, [content, isEditing]);

  // Handle content changes and save them
  const handleBlur = () => {
    if (isEditing && contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      onContentChange(newContent);
      setLocalContent(newContent);
      setIsEditing(false);
      saveChanges();
      
      // Also update the element in the form canvas context
      updateElement({
        ...element,
        content: newContent
      });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isEditing && onContentChange) {
      // Update the content as the user types
      const target = e.target as HTMLDivElement;
      const newContent = target.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
  };

  const handleFontSize = (size: string) => {
    if (!contentRef.current) return;
    
    document.execCommand('fontSize', false, size);
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };

  const handleTextColor = (color: string) => {
    if (!contentRef.current) return;
    
    document.execCommand('foreColor', false, color);
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };

  return (
    <div ref={elementRef} className="relative w-full h-full">
      <div
        ref={contentRef}
        className={`outline-none ${className}`}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onInput={handleInput}
        onDoubleClick={handleDoubleClick}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: localContent }}
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
