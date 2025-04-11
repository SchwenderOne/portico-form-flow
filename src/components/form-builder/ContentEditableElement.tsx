
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
  readOnly?: boolean;
}

const ContentEditableElement: React.FC<ContentEditableElementProps> = ({
  element,
  content,
  onContentChange,
  className = "",
  readOnly = false,
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
  const [isExternalEdit, setIsExternalEdit] = useState(false);

  // Update the content editable element when content changes from outside
  useEffect(() => {
    if (contentRef.current && !isEditing && !isExternalEdit) {
      contentRef.current.innerHTML = content;
      setLocalContent(content);
    }
  }, [content, isEditing, isExternalEdit]);

  // Handle content changes and save them
  const handleBlur = () => {
    if (isEditing && contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      onContentChange(newContent);
      setLocalContent(newContent);
      setIsEditing(false);
      saveChanges();
      
      // Update the element in the form canvas context
      updateElement({
        ...element,
        content: newContent
      });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isEditing && onContentChange && !readOnly) {
      // Update the content as the user types
      const target = e.target as HTMLDivElement;
      const newContent = target.innerHTML;
      setLocalContent(newContent);
      setIsExternalEdit(true); // Prevent external update while typing
      onContentChange(newContent);
      setIsExternalEdit(false);
    }
  };

  const handleFontSize = (size: string) => {
    if (!contentRef.current || readOnly) return;
    
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
    if (!contentRef.current || readOnly) return;
    
    document.execCommand('foreColor', false, color);
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };

  const handleBackgroundColor = (color: string) => {
    if (!contentRef.current || readOnly) return;
    
    document.execCommand('hiliteColor', false, color);
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };

  const handleTextAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    if (!contentRef.current || readOnly) return;
    
    document.execCommand(`justify${align.charAt(0).toUpperCase() + align.slice(1)}`, false, '');
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };

  const handleFontFamily = (font: string) => {
    if (!contentRef.current || readOnly) return;
    
    document.execCommand('fontName', false, font);
    
    // Save changes and notify parent
    if (contentRef.current && onContentChange) {
      const newContent = contentRef.current.innerHTML;
      setLocalContent(newContent);
      onContentChange(newContent);
    }
    saveChanges();
  };
  
  const handleTextTransform = (command: 'superscript' | 'subscript') => {
    if (!contentRef.current || readOnly) return;
    
    document.execCommand(command, false, '');
    
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
        contentEditable={isEditing && !readOnly}
        onBlur={handleBlur}
        onInput={handleInput}
        onDoubleClick={!readOnly ? handleDoubleClick : undefined}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: localContent }}
      />
      
      {isEditing && !readOnly && elementRect && (
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
          onBackgroundColor={handleBackgroundColor}
          onTextAlign={handleTextAlign}
          onFontFamily={handleFontFamily}
          onTextTransform={handleTextTransform}
          element={element}
        />
      )}
    </div>
  );
};

export default ContentEditableElement;
