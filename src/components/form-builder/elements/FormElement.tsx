import React from 'react';
import { FormElement as FormElementType } from '@/types/form';
import { ElementDragHandle } from './ElementDragHandle';
import { toast } from "sonner";
import { useCollaboration } from '@/context/CollaborationContext';

interface FormElementProps {
  element: FormElementType;
  onPositionChange: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSelect: (id: string) => void;
  selected: boolean;
}

const FormElement: React.FC<FormElementProps> = ({
  element,
  onPositionChange,
  onResize,
  onDelete,
  onDuplicate,
  onSelect,
  selected
}) => {
  const { activeElementId } = useCollaboration();
  const isBeingDragged = activeElementId === element.id;

  const handleDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
  };

  const handleStop = (e: React.MouseEvent, data: any) => {
    e.stopPropagation();
    onPositionChange(element.id, data.x, data.y);
  };

  const handleResizeStop = (e: React.MouseEvent, data: any, ref: any) => {
    e.stopPropagation();
    onResize(element.id, ref.offsetWidth, ref.offsetHeight);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(element.id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(element.id);
  };

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return <div className="text-element">{element.content || 'Text Element'}</div>;
      case 'header':
        return <h1 className="header-element">{element.content || 'Header'}</h1>;
      case 'paragraph':
        return <p className="paragraph-element">{element.content || 'Paragraph'}</p>;
      case 'image':
        return <img src={element.content || 'URL'} alt="Image Element" className="image-element" />;
      default:
        return <div>Unknown Element Type</div>;
    }
  };

  return (
    <div
      style={{
        width: element.size.width,
        height: element.size.height,
        transform: `translate(${element.position.x}px, ${element.position.y}px)`,
      }}
      className={`absolute bg-white shadow-md rounded-md border border-dashed border-gray-300 transition-transform duration-200 ${selected ? 'border-blue-500' : ''} ${isBeingDragged ? 'opacity-50' : ''}`}
      onClick={handleSelect}
    >
      <ElementDragHandle onDrag={handleDrag} onStop={handleStop} id={element.id} />
      <div className="p-4">
        {renderElement()}
      </div>
      {selected && (
        <div className="absolute top-1 right-1 space-x-1">
          <button onClick={handleDuplicate} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
            Duplicate
          </button>
          <button onClick={handleDelete} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FormElement;
