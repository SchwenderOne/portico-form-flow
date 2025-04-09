
import React from "react";

interface HeaderFieldProps {
  content: string;
  isEditing: boolean;
}

const HeaderField: React.FC<HeaderFieldProps> = ({ content, isEditing }) => {
  return (
    <h2 
      className="text-2xl font-bold"
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
    >
      {content || 'Header'}
    </h2>
  );
};

export default HeaderField;
