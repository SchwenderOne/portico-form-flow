
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useCollaboration } from "@/context/CollaborationContext";
import { useDebounce } from "@/hooks/useDebounce";

export const useElementEditor = (elementId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLElement | null>(null);
  const { isElementLocked, setActiveElement } = useCollaboration();
  
  // Remove any existing toolbars on unmount
  useEffect(() => {
    return () => {
      const existingToolbars = document.querySelectorAll('.floating-toolbar');
      existingToolbars.forEach(toolbar => {
        if (toolbar.parentNode) {
          toolbar.parentNode.removeChild(toolbar);
        }
      });
    };
  }, []);

  // Get the most current element rect
  const updateElementRect = useCallback(() => {
    if (elementRef.current) {
      const newRect = elementRef.current.getBoundingClientRect();
      setElementRect(newRect);
    }
  }, []);
  
  // Debounce the rect update to prevent excessive rerenders
  const debouncedUpdateElementRect = useDebounce(updateElementRect, 50);

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
    
    // Update the element rect when the window is resized or scrolled
    const handleWindowChange = () => {
      if (isEditing) {
        debouncedUpdateElementRect();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('scroll', handleWindowChange);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('scroll', handleWindowChange);
    };
  }, [isEditing, setActiveElement, debouncedUpdateElementRect]);

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
        setIsTextSelected(selectedText.length > 0);
      } else {
        setIsTextSelected(false);
        setSelectionRect(null);
      }
    };

    // Debounce the selection check to prevent flickering
    const debouncedCheckSelection = debounce(checkTextSelection, 50);

    document.addEventListener('selectionchange', debouncedCheckSelection);
    document.addEventListener('mouseup', debouncedCheckSelection);
    
    // Update element rect immediately
    updateElementRect();
    
    return () => {
      document.removeEventListener('selectionchange', debouncedCheckSelection);
      document.removeEventListener('mouseup', debouncedCheckSelection);
    };
  }, [isEditing, updateElementRect]);

  // Simple debounce function for selection checking
  function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function(...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if element is locked by another user
    if (isElementLocked(elementId)) {
      toast.error("This element is being edited by another user");
      return;
    }
    
    // Remove any existing toolbars
    const existingToolbars = document.querySelectorAll('.floating-toolbar');
    existingToolbars.forEach(toolbar => {
      if (toolbar.parentNode) {
        toolbar.parentNode.removeChild(toolbar);
      }
    });
    
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

  const handleStrikethrough = () => {
    if (!contentEditableRef.current) return;
    
    document.execCommand('strikeThrough', false);
    saveChanges();
    toast.success("Text formatted: Strikethrough");
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
    handleStrikethrough,
    handleLink,
    setIsEditing,
    saveChanges,
    getSelectedText
  };
};
