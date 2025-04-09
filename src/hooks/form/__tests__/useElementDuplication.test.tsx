
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useElementDuplication } from '../useElementDuplication';
import { FormElement } from '@/types/form';

// Mock the toast function
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('useElementDuplication', () => {
  let elements: FormElement[];
  let setElements: any;
  let setSelectedElements: any;

  beforeEach(() => {
    elements = [
      {
        id: 'element-1',
        type: 'text',
        position: { x: 100, y: 100 },
        size: { width: 200, height: 50 },
        groupId: null
      },
      {
        id: 'element-2',
        type: 'text',
        position: { x: 100, y: 200 },
        size: { width: 200, height: 50 },
        groupId: 'group-1'
      },
      {
        id: 'element-3',
        type: 'text',
        position: { x: 100, y: 300 },
        size: { width: 200, height: 50 },
        groupId: 'group-1'
      }
    ];
    setElements = vi.fn();
    setSelectedElements = vi.fn();
  });

  it('should duplicate a single element', () => {
    const { result } = renderHook(() => 
      useElementDuplication(elements, setElements, setSelectedElements)
    );

    // Get the timestamp to compare with the generated ID
    const now = Date.now();
    vi.setSystemTime(now);

    act(() => {
      result.current.handleDuplicateElement('element-1');
    });

    expect(setElements).toHaveBeenCalled();
    
    // Check the new element has been added with offset position
    const newElements = setElements.mock.calls[0][0];
    expect(newElements.length).toBe(elements.length + 1);
    
    // Check the last element is the duplicated one
    const duplicated = newElements[newElements.length - 1];
    expect(duplicated.type).toBe('text');
    expect(duplicated.position.x).toBe(120); // Original x + 20
    expect(duplicated.position.y).toBe(120); // Original y + 20
    expect(duplicated.groupId).toBeNull(); // Group ID should be null for duplicated elements
    
    // Check the selection is updated to the new element
    expect(setSelectedElements).toHaveBeenCalledWith([duplicated.id]);
  });

  it('should duplicate a group of elements', () => {
    const { result } = renderHook(() => 
      useElementDuplication(elements, setElements, setSelectedElements)
    );

    // Mock timestamp for consistent IDs in test
    const now = Date.now();
    vi.setSystemTime(now);

    act(() => {
      result.current.handleDuplicateGroup(['element-2', 'element-3']);
    });

    expect(setElements).toHaveBeenCalled();
    
    // Check new elements have been added
    const newElements = setElements.mock.calls[0][0];
    expect(newElements.length).toBe(elements.length + 2);
    
    // Check the new elements have the same new group ID
    const newGroupElements = newElements.slice(-2);
    const newGroupId = newGroupElements[0].groupId;
    expect(newGroupId).not.toBe('group-1'); // Should be a new group ID
    expect(newGroupElements[1].groupId).toBe(newGroupId);
    
    // Check positions are offset
    expect(newGroupElements[0].position.x).toBe(120); // Original x + 20
    expect(newGroupElements[0].position.y).toBe(220); // Original y + 20
    expect(newGroupElements[1].position.x).toBe(120); // Original x + 20
    expect(newGroupElements[1].position.y).toBe(320); // Original y + 20
    
    // Check selection is updated to the new elements
    expect(setSelectedElements).toHaveBeenCalledWith([
      newGroupElements[0].id,
      newGroupElements[1].id
    ]);
  });

  it('should return an empty array if no elements to duplicate', () => {
    const { result } = renderHook(() => 
      useElementDuplication(elements, setElements, setSelectedElements)
    );

    let returnedIds;
    act(() => {
      returnedIds = result.current.handleDuplicateGroup([]);
    });

    expect(returnedIds).toEqual([]);
    expect(setElements).not.toHaveBeenCalled();
    expect(setSelectedElements).not.toHaveBeenCalled();
  });
});
