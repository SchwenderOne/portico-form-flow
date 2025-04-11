
import React from "react";
import { FormElement } from "@/types/form";

interface PortoFormElementsProps {
  elements: FormElement[];
}

const PortoFormElements: React.FC<PortoFormElementsProps> = ({ elements }) => {
  return (
    <div>
      {elements.map((element) => (
        <div
          key={element.id}
          className="border rounded-md p-4 mb-4"
          style={{
            marginLeft: `${element.position.x}px`,
            marginTop: `${element.position.y - (element.position.y > 0 ? 50 : 0)}px`,
            width: `${element.size.width}px`,
          }}
        >
          {element.type === "header" ? (
            <h3 className="text-lg font-semibold">{element.content}</h3>
          ) : element.type === "paragraph" ? (
            <p>{element.content}</p>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {element.label} {element.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={element.type === "email" ? "email" : "text"}
                placeholder={element.placeholder}
                className="w-full px-3 py-2 border rounded-md"
                disabled
              />
              {element.helpText && (
                <p className="text-xs text-muted-foreground">{element.helpText}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortoFormElements;
