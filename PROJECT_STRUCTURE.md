
# Portico Form Builder Project Structure

## Overview
This document outlines the modular architecture of the Portico form builder project,
organized for maintainability, scalability, and clarity.

## Folder Structure

```
src/
│
├── components/
│   ├── form-builder/           # Main Form Builder UI components
│   │   ├── canvas/             # Canvas-related components
│   │   │   └── CanvasDropZone.tsx
│   │   │
│   │   ├── elements/           # Form elements
│   │   │   ├── FormElement.tsx     # Base component for all form elements
│   │   │   └── ElementDragHandle.tsx
│   │   │
│   │   ├── fields/             # Field type implementations
│   │   │   ├── TextField.tsx
│   │   │   ├── CheckboxField.tsx
│   │   │   ├── SelectField.tsx
│   │   │   ├── EmailField.tsx
│   │   │   ├── DateField.tsx
│   │   │   ├── NumberField.tsx
│   │   │   ├── FileField.tsx
│   │   │   ├── TextareaField.tsx
│   │   │   ├── HeaderField.tsx
│   │   │   └── ParagraphField.tsx
│   │   │
│   │   ├── toolbars/           # Toolbars for the editor
│   │   │   └── ElementToolbar.tsx
│   │   │
│   │   ├── hooks/              # Form builder specific hooks
│   │   │   └── useSmartGuides.tsx
│   │   │
│   │   ├── DragPreview.tsx     # Preview of dragged elements
│   │   ├── ElementContent.tsx  # Renders form element content
│   │   ├── FormCanvas.tsx      # Main canvas component
│   │   ├── FormToolbar.tsx     # Bottom property toolbar
│   │   ├── FormTopToolbar.tsx  # Top action toolbar
│   │   ├── GroupingContext.tsx # Context for element grouping
│   │   └── SmartGuides.tsx     # Alignment guides
│   │
│   ├── ui/                     # General UI components (shadcn/ui)
│   ├── layout/                 # Layout components
│   └── templates/              # Form templates
│
├── hooks/                      # Global application hooks
│   ├── use-form-elements.tsx   # Form state and operations
│   ├── use-element-editor.tsx  # Element editing functionality
│   ├── use-mobile.tsx          # Mobile detection
│   └── use-toast.ts            # Toast notifications
│
├── utils/                      # Utility functions
│   ├── element-utils.ts        # Form element utilities
│   └── utils.ts                # General utilities
│
├── types/                      # TypeScript type definitions
│   └── form.ts                 # Form and element types
│
├── constants/                  # Global constants
│   └── formBuilder.ts          # Form builder constants
│
└── pages/                      # Application pages
    ├── FormBuilder.tsx         # Main form builder page
    ├── Templates.tsx           # Template gallery
    ├── Index.tsx               # Landing page
    └── NotFound.tsx            # 404 page
```

## Key Components

### Canvas
- `FormCanvas.tsx`: Main component that orchestrates the form builder
- `CanvasDropZone.tsx`: Handles element drag and drop interactions

### Elements
- `FormElement.tsx`: Base component for all form elements
- `ElementContent.tsx`: Renders the appropriate field based on element type

### Fields
Each field type (text, checkbox, etc.) has its own component that handles
rendering and interaction for that specific field type.

### Toolbars
- `FormToolbar.tsx`: Properties panel for selected element
- `FormTopToolbar.tsx`: Actions for the selected element or form
- `ElementToolbar.tsx`: Contextual toolbar for individual elements

## State Management
- Form elements state is managed in `useFormElements` hook
- Element editing state in `useElementEditor` hook
- Element grouping in `GroupingContext`

## Utilities
- `element-utils.ts`: Functions for element creation, positioning, etc.
- `formBuilder.ts`: Constants for grid sizing, element dimensions, etc.

