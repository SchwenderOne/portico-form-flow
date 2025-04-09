
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptInput from '../PromptInput';

describe('PromptInput', () => {
  it('renders textarea and submit button', () => {
    const props = {
      prompt: '',
      setPrompt: vi.fn(),
      onSubmit: vi.fn(),
      isLoading: false
    };
    
    render(<PromptInput {...props} />);
    
    expect(screen.getByPlaceholderText('Describe the form you want to create...')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });
  
  it('updates prompt value when typing in textarea', () => {
    const setPrompt = vi.fn();
    const props = {
      prompt: '',
      setPrompt,
      onSubmit: vi.fn(),
      isLoading: false
    };
    
    render(<PromptInput {...props} />);
    
    const textarea = screen.getByPlaceholderText('Describe the form you want to create...');
    fireEvent.change(textarea, { target: { value: 'New prompt text' } });
    
    expect(setPrompt).toHaveBeenCalledWith('New prompt text');
  });
  
  it('calls onSubmit when Generate button is clicked', () => {
    const onSubmit = vi.fn();
    const props = {
      prompt: 'Test prompt',
      setPrompt: vi.fn(),
      onSubmit,
      isLoading: false
    };
    
    render(<PromptInput {...props} />);
    
    const button = screen.getByText('Generate');
    fireEvent.click(button);
    
    expect(onSubmit).toHaveBeenCalled();
  });
  
  it('disables the button when prompt is empty', () => {
    const props = {
      prompt: '',
      setPrompt: vi.fn(),
      onSubmit: vi.fn(),
      isLoading: false
    };
    
    render(<PromptInput {...props} />);
    
    const button = screen.getByText('Generate');
    expect(button).toBeDisabled();
  });
  
  it('disables the button when isLoading is true', () => {
    const props = {
      prompt: 'Test prompt',
      setPrompt: vi.fn(),
      onSubmit: vi.fn(),
      isLoading: true
    };
    
    render(<PromptInput {...props} />);
    
    const button = screen.getByText('Generate');
    expect(button).toBeDisabled();
  });
  
  it('shows loading spinner when isLoading is true', () => {
    const props = {
      prompt: 'Test prompt',
      setPrompt: vi.fn(),
      onSubmit: vi.fn(),
      isLoading: true
    };
    
    render(<PromptInput {...props} />);
    
    // Check for the loading spinner (represented by the character "⟳")
    expect(screen.getByText('⟳')).toBeInTheDocument();
  });
  
  it('submits on Ctrl+Enter keypress', () => {
    const onSubmit = vi.fn();
    const props = {
      prompt: 'Test prompt',
      setPrompt: vi.fn(),
      onSubmit,
      isLoading: false
    };
    
    render(<PromptInput {...props} />);
    
    const textarea = screen.getByPlaceholderText('Describe the form you want to create...');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    
    expect(onSubmit).toHaveBeenCalled();
  });
});
