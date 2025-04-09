
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useElementGrouping } from '../useElementGrouping';
import { FormElement } from '@/types/form';

// Mock the toast function
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('useElementGrouping', () => {
  let elements: FormElement[];
  let setElements: any;
  let selectedElements: string[];

  beforeEach(() => {
    elements = [
      {
        id: 'element-1',
        type: 'text',
        position: { x: 0, y: 0 },
        size: { width: 100, height: 50 },
        groupId: null
      },
      {
        id: 'element-2',
        type: 'text',
        position: { x: 0, y: 100 },
        size: { width: 100, height: 50 },
        groupId: null
      },
      {
        id: 'element-3',
        type: 'text',
        position: { x: 0, y: 200 },
        size: { width: 100, height: 50 },
        groupId: 'existing-group'
      }
    ];
    setElements = vi.fn();
    selectedElements = ['element-1', 'element-2'];
  });

  it('should toggle required state for an element', () => {
    const { result } = renderHook(() => 
      useElementGrouping(elements, setElements, selectedElements)
    );

    act(() => {
      result.current.handleRequiredToggle('element-1', true);
    });

    expect(setElements).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'element-1',
          required: true
        })
      ])
    );
  });

  it('should group elements when multiple elements are selected', () => {
    const { result } = renderHook(() => 
      useElementGrouping(elements, setElements, selectedElements)
    );

    act(() => {
      result.current.handleGroupElements();
    });

    expect(setElements).toHaveBeenCalled();
    // Check that both elements now have the same groupId
    const updatedElements = setElements.mock.calls[0][0];
    const groupId = updatedElements.find((el: FormElement) => el.id === 'element-1').groupId;
    expect(groupId).toBeTruthy();
    expect(updatedElements.find((el: FormElement) => el.id === 'element-2').groupId).toBe(groupId);
  });

  it('should not group elements when less than 2 elements are selected', () => {
    const { result } = renderHook(() => 
      useElementGrouping(elements, setElements, ['element-1'])
    );

    act(() => {
      result.current.handleGroupElements();
    });

    // setElements should not be called
    expect(setElements).not.toHaveBeenCalled();
  });

  it('should ungroup elements when a grouped element is selected', () => {
    // Setup with a grouped element selected
    selectedElements = ['element-3'];
    
    const { result } = renderHook(() => 
      useElementGrouping(elements, setElements, selectedElements)
    );

    act(() => {
      result.current.handleUngroupElements();
    });

    expect(setElements).toHaveBeenCalled();
    // Check that the element now has null groupId
    const updatedElements = setElements.mock.calls[0][0];
    expect(updatedElements.find((el: FormElement) => el.id === 'element-3').groupId).toBeNull();
  });

  it('should not ungroup when no grouped element is selected', () => {
    const { result } = renderHook(() => 
      useElementGrouping(elements, setElements, ['element-1'])
    );

    act(() => {
      result.current.handleUngroupElements();
    });

    // setElements should not be called
    expect(setElements).not.toHaveBeenCalled();
  });
});
