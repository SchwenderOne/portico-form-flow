
import { useState, useEffect } from 'react';
import { Prompt } from '../types';

// The key used to store prompts in localStorage
const STORAGE_KEY = 'portico-ai-prompt-history';

export const usePromptHistory = () => {
  // Initialize state from localStorage if available
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const storedPrompts = localStorage.getItem(STORAGE_KEY);
    return storedPrompts ? JSON.parse(storedPrompts) : [];
  });

  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');

  // Update localStorage whenever prompts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  // Add a new prompt to history
  const addPrompt = (text: string) => {
    const newPrompt: Prompt = {
      id: Date.now().toString(), // Simple unique ID
      text,
      timestamp: new Date().toISOString(),
      isFavorite: false
    };
    
    setPrompts(prev => [newPrompt, ...prev]);
    return newPrompt;
  };

  // Delete a prompt from history
  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(prompt => prompt.id !== id));
  };

  // Toggle favorite status for a prompt
  const toggleFavorite = (id: string) => {
    setPrompts(prev => 
      prev.map(prompt => 
        prompt.id === id 
          ? { ...prompt, isFavorite: !prompt.isFavorite } 
          : prompt
      )
    );
  };

  // Get history or favorite prompts based on activeTab
  const getFilteredPrompts = () => {
    return activeTab === 'favorites'
      ? prompts.filter(prompt => prompt.isFavorite)
      : prompts;
  };

  // Count of history and favorite prompts
  const historyCount = prompts.length;
  const favoritesCount = prompts.filter(prompt => prompt.isFavorite).length;

  return {
    prompts: getFilteredPrompts(),
    addPrompt,
    deletePrompt,
    toggleFavorite,
    activeTab,
    setActiveTab,
    historyCount,
    favoritesCount
  };
};
