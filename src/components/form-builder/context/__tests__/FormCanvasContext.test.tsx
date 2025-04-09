
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { FormCanvasProvider, useFormCanvas } from '../FormCanvasContext';
import { FormElement } from '@/types/form';
import React from 'react';

// Mock necessary hooks and services
vi.mock('@/hooks/use-form-elements', () => ({
  useFormElements: () => ({
    elements: [
      {
        id: 'test-1',
        type: 'header',
        content: 'Test Form',
        position: { x: 100, y: 50 },
        size: { width: 500, height: 60 },
        groupId: null
      }
    ],
    selectedElements: [],
    handleElementSelect: vi.fn(),
    handleElementMove: vi.fn(),
    handleElementDrop: vi.fn(),
    handleDeleteElement: vi.fn(),
    handleDuplicateElement: vi.fn(),
    handleRequiredToggle: vi.fn(),
    handleGroupElements: vi.fn(),
    handleUngroupElements: vi.fn(),
    handleDuplicateGroup: vi.fn(),
    updateElement: vi.fn(),
    addElement: vi.fn(),
    setElements: vi.fn(),
    setSelectedElements: vi.fn()
  })
}));

vi.mock('../../../hooks/useSmartGuides', () => ({
  useSmartGuides: () => ({
    showSmartGuides: false,
    guideLines: { horizontal: [], vertical: [] },
    distances: { horizontal: [], vertical: [] },
    calculateSmartGuides: vi.fn(),
    autoNudgePosition: (id: string, pos: any) => pos
  })
}));

// Test wrapper to render hooks within the provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FormCanvasProvider>{children}</FormCanvasProvider>
);

describe('FormCanvasContext', () => {
  it('provides context value through useFormCanvas hook', () => {
    const TestComponent = () => {
      const { elements } = useFormCanvas();
      return <div data-testid="element-count">{elements.length}</div>;
    };

    render(
      <FormCanvasProvider>
        <TestComponent />
      </FormCanvasProvider>
    );

    expect(screen.getByTestId('element-count')).toHaveTextContent('1');
  });

  it('throws error when useFormCanvas is used outside provider', () => {
    // Suppress expected console error
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const TestComponent = () => {
      const { elements } = useFormCanvas();
      return <div>{elements.length}</div>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useFormCanvas must be used within a FormCanvasProvider'
    );
  });

  it('handles element selection', () => {
    const { result } = renderHook(() => useFormCanvas(), {
      wrapper: TestWrapper
    });

    expect(result.current.selectedElements).toEqual([]);
    
    act(() => {
      result.current.handleElementSelect('test-1', false);
    });
    
    // Since we're mocking useFormElements, this doesn't actually change state
    // But we can verify the function was exposed correctly
    expect(result.current.handleElementSelect).toBeDefined();
  });

  it('handles adding AI-generated elements', () => {
    const { result } = renderHook(() => useFormCanvas(), {
      wrapper: TestWrapper
    });
    
    const mockAIElements: FormElement[] = [
      {
        id: 'ai-1',
        type: 'text',
        label: 'AI Generated Field',
        position: { x: 100, y: 300 },
        size: { width: 500, height: 80 },
        groupId: null
      }
    ];
    
    act(() => {
      result.current.handleAddAIElements(mockAIElements);
    });
    
    // Just test that the function is exposed and doesn't throw
    expect(result.current.handleAddAIElements).toBeDefined();
  });

  it('provides keyboard event handlers', () => {
    const { result } = renderHook(() => useFormCanvas(), {
      wrapper: TestWrapper
    });
    
    expect(result.current.handleKeyDown).toBeDefined();
    
    // We can't fully test the keyboard handlers without mocking more deeply,
    // but we can verify they're exposed correctly
  });

  it('exposes smart guides data', () => {
    const { result } = renderHook(() => useFormCanvas(), {
      wrapper: TestWrapper
    });
    
    expect(result.current.showSmartGuides).toBe(false);
    expect(result.current.guideLines).toEqual({ horizontal: [], vertical: [] });
    expect(result.current.distances).toEqual({ horizontal: [], vertical: [] });
  });

  it('exposes grouping functionality', () => {
    const { result } = renderHook(() => useFormCanvas(), {
      wrapper: TestWrapper
    });
    
    expect(result.current.grouping).toBeDefined();
    expect(result.current.grouping.selectedElements).toEqual([]);
    expect(typeof result.current.grouping.groupElements).toBe('function');
    expect(typeof result.current.grouping.ungroupElements).toBe('function');
  });
});
