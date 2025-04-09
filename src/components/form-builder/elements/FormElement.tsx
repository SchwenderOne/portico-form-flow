import React from 'react';
import { FormElement as FormElementType } from '@/types/form';
import ElementDragHandle from './ElementDragHandle';
import { toast } from "sonner";
import { useCollaboration } from '@/context/CollaborationContext';
import { useFormCanvas } from '@/components/form-builder/context/FormCanvasContext';
import { GripHorizontal } from 'lucide-react';

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
  const { activeElement } = useCollaboration();
  const { setIsDragging } = useFormCanvas();
  const isBeingDragged = activeElement === element.id;

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    onSelect(element.id);
    setIsDragging(true);
    
    e.dataTransfer.setData('elementId', element.id);
    e.dataTransfer.setData('action', 'move');
    e.dataTransfer.setData('startX', e.clientX.toString());
    e.dataTransfer.setData('startY', e.clientY.toString());
    e.dataTransfer.setData('elementX', element.position.x.toString());
    e.dataTransfer.setData('elementY', element.position.y.toString());
    
    const dragImage = document.createElement('div');
    dragImage.style.width = `${element.size.width}px`;
    dragImage.style.height = `${element.size.height}px`;
    dragImage.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
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
    toast.success("Element duplicated");
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
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="absolute top-0 left-0 w-full h-6 bg-gray-100 rounded-t-md flex items-center px-2 cursor-move"
           onMouseDown={handleDrag}>
        <GripHorizontal size={14} className="text-gray-400 mr-2" />
        <span className="text-xs text-gray-600 truncate">{element.label || element.type}</span>
      </div>
      
      <ElementDragHandle onMouseDown={handleDrag} id={element.id} />
      <div className="p-4 mt-6">
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
