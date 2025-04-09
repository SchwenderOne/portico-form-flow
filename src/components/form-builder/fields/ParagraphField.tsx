
import React from "react";

interface ParagraphFieldProps {
  content: string;
  isEditing: boolean;
}

const ParagraphField: React.FC<ParagraphFieldProps> = ({ content, isEditing }) => {
  return (
    <p 
      className="text-base"
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
    >
      {content || 'Paragraph text'}
    </p>
  );
};

export default ParagraphField;
