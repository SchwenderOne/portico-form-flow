
import React, { useRef, useEffect } from "react";

interface HeaderFieldProps {
  content: string;
  isEditing: boolean;
}

const HeaderField: React.FC<HeaderFieldProps> = ({ content, isEditing }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (isEditing && headerRef.current) {
      // Place cursor at the end of text
      const range = document.createRange();
      const selection = window.getSelection();
      
      headerRef.current.focus();
      range.selectNodeContents(headerRef.current);
      range.collapse(false); // collapse to end
      
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing]);

  return (
    <h2 
      ref={headerRef}
      className="text-2xl font-bold focus:outline-none"
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
    >
      {content || 'Header'}
    </h2>
  );
};

export default HeaderField;
