
import React, { useRef, useEffect } from "react";
import { useElementEditor } from "@/hooks/useElementEditor";
import FloatingToolbar from "@/components/form-builder/FloatingToolbar";
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
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleUnderline,
    handleLink,
    setIsEditing,
    saveChanges
  } = useElementEditor(element.id);

  const contentRef = useRef<HTMLDivElement>(null);
  const { handleDeleteElement, handleDuplicateElement } = useFormCanvas();

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
        <FloatingToolbar
          elementId={element.id}
          elementRect={elementRect}
          onBold={handleBold}
          onItalic={handleItalic}
          onUnderline={handleUnderline}
          onLink={handleLink}
          onDuplicate={handleDuplicateElement}
          onDelete={handleDeleteElement}
        />
      )}
    </div>
  );
};

export default ContentEditableElement;
