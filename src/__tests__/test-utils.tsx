
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { FormCanvasProvider } from '@/components/form-builder/context/FormCanvasContext';
import { GroupingProvider } from '@/components/form-builder/GroupingContext';
import { vi } from 'vitest';

// Define RenderOptions type since it's not exported from testing-library
interface RenderOptions {
  wrapper?: React.ComponentType<any>;
  [key: string]: any;
}

// Define RenderResult type since it's not exported from testing-library
interface RenderResult {
  container: HTMLElement;
  baseElement: HTMLElement;
  debug: (baseElement?: HTMLElement | DocumentFragment) => void;
  unmount: () => void;
  rerender: (ui: React.ReactElement) => void;
  findByText: (text: string | RegExp) => Promise<HTMLElement>;
  findAllByText: (text: string | RegExp) => Promise<HTMLElement[]>;
  findByRole: (role: string) => Promise<HTMLElement>;
  findAllByRole: (role: string) => Promise<HTMLElement[]>;
  findByLabelText: (text: string | RegExp) => Promise<HTMLElement>;
  findAllByLabelText: (text: string | RegExp) => Promise<HTMLElement[]>;
  findByPlaceholderText: (text: string | RegExp) => Promise<HTMLElement>;
  findAllByPlaceholderText: (text: string | RegExp) => Promise<HTMLElement[]>;
  findByTestId: (text: string | RegExp) => Promise<HTMLElement>;
  findAllByTestId: (text: string | RegExp) => Promise<HTMLElement[]>;
  [key: string]: any;
}

// Mock providers wrapper
const AllProviders = ({ children }: PropsWithChildren<{}>) => {
  // Mock grouping context values
  const mockGroupingContext = {
    selectedElements: [],
    groupElements: vi.fn(),
    ungroupElements: vi.fn(),
    isElementSelected: () => false,
    selectElements: vi.fn(),
    clearSelection: vi.fn(),
  };

  return (
    <FormCanvasProvider>
      <GroupingProvider value={mockGroupingContext}>
        {children}
      </GroupingProvider>
    </FormCanvasProvider>
  );
};

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: AllProviders, ...options }) as RenderResult;

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };

// Mock form elements for testing
export const mockFormElements = [
  {
    id: "header-1",
    type: "header",
    content: "Test Form",
    position: { x: 100, y: 50 },
    size: { width: 500, height: 60 },
    groupId: null
  },
  {
    id: "text-1",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
    position: { x: 100, y: 130 },
    size: { width: 500, height: 80 },
    groupId: null
  }
];
