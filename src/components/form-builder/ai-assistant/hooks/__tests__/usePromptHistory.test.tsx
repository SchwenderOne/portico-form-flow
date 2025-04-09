
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePromptHistory } from '../usePromptHistory';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('usePromptHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('initializes with empty state when no stored data', () => {
    const { result } = renderHook(() => usePromptHistory());
    
    expect(result.current.prompts).toEqual([]);
    expect(result.current.historyCount).toBe(0);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('loads data from localStorage if available', () => {
    const mockData = [
      { id: '1', text: 'Test prompt', timestamp: '2023-01-01T00:00:00.000Z', isFavorite: false }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));
    
    const { result } = renderHook(() => usePromptHistory());
    
    expect(result.current.prompts).toEqual(mockData);
    expect(result.current.historyCount).toBe(1);
  });

  it('adds a new prompt to history', () => {
    const { result } = renderHook(() => usePromptHistory());
    
    act(() => {
      result.current.addPrompt('New prompt');
    });
    
    expect(result.current.prompts.length).toBe(1);
    expect(result.current.prompts[0].text).toBe('New prompt');
    expect(result.current.prompts[0].isFavorite).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('deletes a prompt from history', () => {
    const mockData = [
      { id: '1', text: 'Test prompt 1', timestamp: '2023-01-01T00:00:00.000Z', isFavorite: false },
      { id: '2', text: 'Test prompt 2', timestamp: '2023-01-02T00:00:00.000Z', isFavorite: true }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));
    
    const { result } = renderHook(() => usePromptHistory());
    
    act(() => {
      result.current.deletePrompt('1');
    });
    
    expect(result.current.prompts.length).toBe(1);
    expect(result.current.prompts[0].id).toBe('2');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('toggles favorite status of a prompt', () => {
    const mockData = [
      { id: '1', text: 'Test prompt', timestamp: '2023-01-01T00:00:00.000Z', isFavorite: false }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));
    
    const { result } = renderHook(() => usePromptHistory());
    
    act(() => {
      result.current.toggleFavorite('1');
    });
    
    expect(result.current.prompts[0].isFavorite).toBe(true);
    
    act(() => {
      result.current.toggleFavorite('1');
    });
    
    expect(result.current.prompts[0].isFavorite).toBe(false);
  });

  it('filters prompts based on activeTab', () => {
    const mockData = [
      { id: '1', text: 'Test prompt 1', timestamp: '2023-01-01T00:00:00.000Z', isFavorite: false },
      { id: '2', text: 'Test prompt 2', timestamp: '2023-01-02T00:00:00.000Z', isFavorite: true }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));
    
    const { result } = renderHook(() => usePromptHistory());
    
    // Default tab is 'history', should show all prompts
    expect(result.current.prompts.length).toBe(2);
    
    // Switch to favorites tab
    act(() => {
      result.current.setActiveTab('favorites');
    });
    
    // Should only show favorite prompts
    expect(result.current.prompts.length).toBe(1);
    expect(result.current.prompts[0].id).toBe('2');
  });

  it('correctly counts history and favorites', () => {
    const mockData = [
      { id: '1', text: 'Test prompt 1', timestamp: '2023-01-01T00:00:00.000Z', isFavorite: false },
      { id: '2', text: 'Test prompt 2', timestamp: '2023-01-02T00:00:00.000Z', isFavorite: true },
      { id: '3', text: 'Test prompt 3', timestamp: '2023-01-03T00:00:00.000Z', isFavorite: true }
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockData));
    
    const { result } = renderHook(() => usePromptHistory());
    
    expect(result.current.historyCount).toBe(3);
    expect(result.current.favoritesCount).toBe(2);
  });
});
