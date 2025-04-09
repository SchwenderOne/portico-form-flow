
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExamplePrompts from '../ExamplePrompts';

describe('ExamplePrompts', () => {
  it('renders all example prompts', () => {
    const onSelectExample = vi.fn();
    render(<ExamplePrompts onSelectExample={onSelectExample} />);
    
    // Check that all example prompts are rendered
    expect(screen.getByText('Create an RSVP form for an event')).toBeInTheDocument();
    expect(screen.getByText('Build a simple contact form with name, email, message')).toBeInTheDocument();
    expect(screen.getByText('Generate a feedback form with 5-star rating and comment box')).toBeInTheDocument();
    expect(screen.getByText('Create a multi-step onboarding form with 3 sections')).toBeInTheDocument();
    expect(screen.getByText('Design a form for booking a consultation appointment')).toBeInTheDocument();
  });
  
  it('calls onSelectExample with the correct prompt when clicked', () => {
    const onSelectExample = vi.fn();
    render(<ExamplePrompts onSelectExample={onSelectExample} />);
    
    // Click on one of the example prompts
    fireEvent.click(screen.getByText('Create an RSVP form for an event'));
    
    // Check that onSelectExample was called with the correct prompt
    expect(onSelectExample).toHaveBeenCalledWith('Create an RSVP form for an event');
  });
  
  it('displays the heading text', () => {
    const onSelectExample = vi.fn();
    render(<ExamplePrompts onSelectExample={onSelectExample} />);
    
    expect(screen.getByText('Try one of these examples:')).toBeInTheDocument();
  });
});
