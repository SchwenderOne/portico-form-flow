
# Portico Project Structure

## Overview
Portico is a SaaS form builder platform focused on regulated industries. This document outlines the organization of the codebase after refactoring.

## Core Directories

### `/src/components/`
Contains all UI components organized by domain.

- **`/form-builder/`** - Main form builder components
  - **`/elements/`** - Reusable form elements (FormElement, ElementDragHandle)
  - **`/fields/`** - Field type implementations (TextField, EmailField, etc.)
  - **`/toolbars/`** - Toolbar components
    - **`/tabs/`** - Individual tab content components for the form toolbar
  - **`/canvas/`** - Canvas related components (CanvasDropZone)
  - **`/hooks/`** - Form builder specific hooks

### `/src/hooks/`
Global hooks that can be used across the application.

- **`/form/`** - Hooks related to form functionality
  - `useElementSelection.tsx` - Hook for element selection logic
  - `useElementActions.tsx` - Hook for element CRUD operations
  - `useElementDuplication.tsx` - Hook for element duplication
  - `useElementGrouping.tsx` - Hook for grouping functionality
- `use-form-elements.tsx` - Main hook that combines all form-related hooks
- `useElementEditor.tsx` - Hook for editing element content
- `use-toast.ts` - Hook for toast notifications

### `/src/utils/`
Utility functions and helpers.

- `element-utils.ts` - Functions for element creation and positioning

### `/src/types/`
TypeScript interfaces and type definitions.

- `form.ts` - Form element interfaces
- `validation.ts` - Validation related interfaces

### `/src/constants/`
Constants and configuration values.

- `formBuilder.ts` - Form builder constants (grid size, element types, etc.)

### `/src/pages/`
Page components for routing.

- `FormBuilder.tsx` - Main form builder page

## Key Files

- `FormCanvas.tsx` - Main canvas for the form builder
- `FormElement.tsx` - Individual form element component
- `ElementContent.tsx` - Content renderer for form elements
- `FormToolbar.tsx` - Properties toolbar for editing elements

## File Naming Conventions

- React components: PascalCase (`FormElement.tsx`)
- Hooks: camelCase with 'use' prefix (`useElementEditor.tsx`)
- Utilities: kebab-case (`element-utils.ts`)
- Constants: UPPER_SNAKE_CASE for constants, camelCase for files
