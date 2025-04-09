
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useCollaboration } from "@/context/CollaborationContext";

export const useElementEditor = (elementId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLElement | null>(null);
  const { isElementLocked, setActiveElement } = useCollaboration();

  // Handle click outside for editing mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current && 
        !elementRef.current.contains(event.target as Node) &&
        isEditing
      ) {
        saveChanges();
        setIsEditing(false);
        setActiveElement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, setActiveElement]);

  // Handle text selection within the element
  useEffect(() => {
    if (!isEditing) return;

    const checkTextSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setIsTextSelected(false);
        setSelectionRect(null);
        return;
      }

      const selectedText = selection.toString();
      if (selectedText && elementRef.current?.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectionRect(rect);
        setIsTextSelected(true);
      } else {
        setIsTextSelected(false);
        setSelectionRect(null);
      }
    };

    document.addEventListener('selectionchange', checkTextSelection);
    document.addEventListener('mouseup', checkTextSelection);
    
    return () => {
      document.removeEventListener('selectionchange', checkTextSelection);
      document.removeEventListener('mouseup', checkTextSelection);
    };
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if element is locked by another user
    if (isElementLocked(elementId)) {
      toast.error("This element is being edited by another user");
      return;
    }
    
    setIsEditing(true);
    setActiveElement(elementId);
    
    if (elementRef.current) {
      setElementRect(elementRef.current.getBoundingClientRect());
      
      // Find the content editable element within our element
      const contentElement = elementRef.current.querySelector('[contenteditable="true"]');
      if (contentElement) {
        contentEditableRef.current = contentElement as HTMLElement;
        // Focus and position cursor at end of text
        setTimeout(() => {
          // Ensure contentElement is an HTMLElement before calling focus()
          const htmlElement = contentElement as HTMLElement;
          htmlElement.focus();
          const range = document.createRange();
          range.selectNodeContents(contentElement);
          range.collapse(false);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }, 0);
      }
    }
  };

  const saveChanges = () => {
    // In a real app, this would update the form element content in your state
    if (contentEditableRef.current) {
      // For now, just log the updated content
      console.log('Saving content:', contentEditableRef.current.innerHTML);
      toast.success("Content updated");
    }
  };

  const getSelection = (): Selection | null => {
    return window.getSelection();
  };

  const getSelectedText = (): string => {
    const selection = getSelection();
    return selection ? selection.toString() : '';
  };

  const handleBold = () => {
    if (!contentEditableRef.current) return;
    
    document.execCommand('bold', false);
    saveChanges();
    toast.success("Text formatted: Bold");
  };

  const handleItalic = () => {
    if (!contentEditableRef.current) return;
    
    document.execCommand('italic', false);
    saveChanges();
    toast.success("Text formatted: Italic");
  };

  const handleUnderline = () => {
    if (!contentEditableRef.current) return;
    
    document.execCommand('underline', false);
    saveChanges();
    toast.success("Text formatted: Underline");
  };

  const handleLink = (url?: string) => {
    if (!contentEditableRef.current || !url) return;
    
    const selectedText = getSelectedText();
    if (selectedText) {
      document.execCommand('createLink', false, url);
      saveChanges();
      toast.success("Link added");
    } else {
      // If no text is selected, insert the link at cursor position
      document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
      saveChanges();
      toast.success("Link added");
    }
  };

  return {
    isEditing,
    elementRect,
    elementRef,
    isTextSelected,
    selectionRect,
    handleDoubleClick,
    handleBold,
    handleItalic,
    handleUnderline,
    handleLink,
    setIsEditing,
    saveChanges,
    getSelectedText
  };
};
