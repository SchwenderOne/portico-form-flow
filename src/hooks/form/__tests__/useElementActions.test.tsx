
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useElementActions } from '../useElementActions';
import { FormElement } from '@/types/form';

// Mock dependencies
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

vi.mock('@/utils/element-utils', () => ({
  findValidPosition: (x: number, y: number) => ({ x, y }),
  createNewElement: (type: string, position: { x: number, y: number }) => ({
    id: `${type}-new`,
    type,
    position,
    size: { width: 500, height: 80 },
    label: `New ${type}`,
    required: false,
    groupId: null
  })
}));

describe('useElementActions', () => {
  let elements: FormElement[];
  let setElements: any;
  let selectedElements: string[];
  let setSelectedElements: any;

  beforeEach(() => {
    elements = [
      {
        id: 'element-1',
        type: 'text',
        label: 'Text Field',
        position: { x: 100, y: 100 },
        size: { width: 200, height: 50 },
        groupId: null
      },
      {
        id: 'element-2',
        type: 'text',
        label: 'Another Text Field',
        position: { x: 100, y: 200 },
        size: { width: 200, height: 50 },
        groupId: 'group-1'
      }
    ];
    setElements = vi.fn();
    selectedElements = ['element-1'];
    setSelectedElements = vi.fn();
  });

  it('should update an element', () => {
    const { result } = renderHook(() => 
      useElementActions(elements, setElements, selectedElements, setSelectedElements)
    );

    const updatedElement = {
      ...elements[0],
      label: 'Updated Text Field'
    };

    act(() => {
      result.current.updateElement(updatedElement);
    });

    expect(setElements).toHaveBeenCalled();
    const newElements = setElements.mock.calls[0][0];
    expect(newElements[0].label).toBe('Updated Text Field');
  });

  it('should handle element move', () => {
    const { result } = renderHook(() => 
      useElementActions(elements, setElements, selectedElements, setSelectedElements)
    );

    const newPosition = { x: 150, y: 150 };

    act(() => {
      result.current.handleElementMove('element-1', newPosition);
    });

    expect(setElements).toHaveBeenCalled();
    const newElements = setElements.mock.calls[0][0];
    expect(newElements[0].position).toEqual(newPosition);
  });

  it('should handle element drop', () => {
    const { result } = renderHook(() => 
      useElementActions(elements, setElements, selectedElements, setSelectedElements)
    );

    const position = { x: 200, y: 200 };
    const elementType = 'email';

    act(() => {
      result.current.handleElementDrop(elementType, position);
    });

    expect(setElements).toHaveBeenCalled();
    const newElements = setElements.mock.calls[0][0];
    
    // Check that a new element was added
    expect(newElements.length).toBe(elements.length + 1);
    
    // Check the new element has the expected properties
    const newElement = newElements[newElements.length - 1];
    expect(newElement.type).toBe(elementType);
    expect(newElement.position).toEqual(position);
    
    // Check selection was updated
    expect(setSelectedElements).toHaveBeenCalledWith([newElement.id]);
  });

  it('should handle delete element for a single element', () => {
    const { result } = renderHook(() => 
      useElementActions(elements, setElements, selectedElements, setSelectedElements)
    );

    // Mock window.confirm to always return false (don't delete group)
    vi.spyOn(window, 'confirm').mockImplementation(() => false);

    act(() => {
      result.current.handleDeleteElement('element-1');
    });

    expect(setElements).toHaveBeenCalled();
    const newElements = setElements.mock.calls[0][0];
    
    // Check element was removed
    expect(newElements.length).toBe(elements.length - 1);
    expect(newElements.find(el => el.id === 'element-1')).toBeUndefined();
    
    // Check selection was updated
    expect(setSelectedElements).toHaveBeenCalledWith([]);
  });

  it('should handle delete element for a grouped element with confirmation', () => {
    const { result } = renderHook(() => 
      useElementActions(elements, setElements, ['element-2'], setSelectedElements)
    );

    // Mock window.confirm to return true (delete entire group)
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    act(() => {
      result.current.handleDeleteElement('element-2');
    });

    expect(setElements).toHaveBeenCalled();
    const newElements = setElements.mock.calls[0][0];
    
    // Check all elements with the same group ID were removed
    expect(newElements.find(el => el.groupId === 'group-1')).toBeUndefined();
    
    // Check selection was cleared
    expect(setSelectedElements).toHaveBeenCalledWith([]);
  });
});
