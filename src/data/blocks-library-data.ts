
import { BlockItem } from "@/components/blocks-library/types";

export const blockLibraryData: BlockItem[] = [
  // Layout blocks
  {
    id: "layout-single-column",
    name: "Single Column Layout",
    description: "A single column layout with full width content",
    category: "layout",
    featured: true,
    code: `<div className="w-full max-w-4xl mx-auto p-4">
  {/* Content goes here */}
</div>`,
    previewComponent: `<div class="w-full max-w-4xl mx-auto p-4 bg-muted/30 rounded-md text-center">
  Single Column Layout
</div>`,
    properties: {
      "Max Width": "4xl (56rem)",
      "Padding": "1rem (16px)",
      "Margin": "Auto (centered)"
    }
  },
  {
    id: "layout-two-column",
    name: "Two Column Grid",
    description: "A responsive two-column grid layout",
    category: "layout",
    code: `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`,
    previewComponent: `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-muted/30 p-4 rounded-md text-center">Column 1</div>
  <div class="bg-muted/30 p-4 rounded-md text-center">Column 2</div>
</div>`,
    properties: {
      "Columns": "1 (mobile), 2 (tablet and up)",
      "Gap": "1rem (16px)",
      "Breakpoint": "md (768px)"
    }
  },
  
  // Components
  {
    id: "component-card",
    name: "Card Component",
    description: "A versatile card component for displaying content",
    category: "components",
    featured: true,
    code: `<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div className="p-6">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground mt-2">Card description goes here</p>
  </div>
  <div className="p-6 pt-0 flex justify-end">
    <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Action
    </button>
  </div>
</div>`,
    previewComponent: `<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
  <div class="p-6">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-sm text-muted-foreground mt-2">Card description goes here</p>
  </div>
  <div class="p-6 pt-0 flex justify-end">
    <button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Action
    </button>
  </div>
</div>`,
    properties: {
      "Border": "1px solid border-color",
      "Border Radius": "lg (8px)",
      "Shadow": "sm (small)",
      "Padding": "1.5rem (24px)"
    }
  },
  {
    id: "component-alert",
    name: "Alert Component",
    description: "An alert component for displaying important messages",
    category: "components",
    code: `<div className="rounded-md border bg-muted p-4">
  <div className="flex items-start">
    <svg className="h-4 w-4 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div className="ml-3">
      <h3 className="text-sm font-medium">Alert Title</h3>
      <div className="text-sm text-muted-foreground mt-1">
        Alert message with important information.
      </div>
    </div>
  </div>
</div>`,
    previewComponent: `<div class="rounded-md border bg-muted p-4">
  <div class="flex items-start">
    <svg class="h-4 w-4 text-muted-foreground mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div class="ml-3">
      <h3 class="text-sm font-medium">Alert Title</h3>
      <div class="text-sm text-muted-foreground mt-1">
        Alert message with important information.
      </div>
    </div>
  </div>
</div>`,
    properties: {
      "Border": "1px solid border-color",
      "Border Radius": "md (6px)",
      "Background": "Muted",
      "Padding": "1rem (16px)"
    }
  },
  
  // Form Elements
  {
    id: "form-input-group",
    name: "Input Group",
    description: "An input field with label and optional helper text",
    category: "forms",
    featured: true,
    code: `<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">Email</label>
  <input
    id="email"
    type="email"
    className="w-full rounded-md border border-input px-3 py-2 text-sm"
    placeholder="Enter your email"
  />
  <p className="text-xs text-muted-foreground">We'll never share your email.</p>
</div>`,
    previewComponent: `<div class="space-y-2">
  <label for="email" class="text-sm font-medium">Email</label>
  <input
    id="email"
    type="email"
    class="w-full rounded-md border border-input px-3 py-2 text-sm"
    placeholder="Enter your email"
  />
  <p class="text-xs text-muted-foreground">We'll never share your email.</p>
</div>`,
    properties: {
      "Input Height": "38px",
      "Border Radius": "md (6px)",
      "Spacing": "0.5rem (8px) between elements",
      "Font Size": "sm (14px)"
    }
  },
  {
    id: "form-checkbox-group",
    name: "Checkbox Group",
    description: "A group of checkboxes with label",
    category: "forms",
    code: `<fieldset className="space-y-3">
  <legend className="text-sm font-medium">Notifications</legend>
  <div className="flex items-center space-x-2">
    <input
      id="email-notifications"
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300"
    />
    <label htmlFor="email-notifications" className="text-sm">Email notifications</label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      id="sms-notifications"
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300"
    />
    <label htmlFor="sms-notifications" className="text-sm">SMS notifications</label>
  </div>
</fieldset>`,
    previewComponent: `<fieldset class="space-y-3">
  <legend class="text-sm font-medium">Notifications</legend>
  <div class="flex items-center space-x-2">
    <input
      id="email-notifications"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300"
    />
    <label for="email-notifications" class="text-sm">Email notifications</label>
  </div>
  <div class="flex items-center space-x-2">
    <input
      id="sms-notifications"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300"
    />
    <label for="sms-notifications" class="text-sm">SMS notifications</label>
  </div>
</fieldset>`,
    properties: {
      "Checkbox Size": "16px × 16px",
      "Spacing": "0.75rem (12px) between groups",
      "Border Radius": "Rounded (4px)",
      "Font Size": "sm (14px)"
    }
  },
  
  // UI Elements
  {
    id: "ui-button-primary",
    name: "Primary Button",
    description: "A standard primary action button",
    category: "ui",
    featured: true,
    code: `<button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50">
  Button Text
</button>`,
    previewComponent: `<button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50">
  Button Text
</button>`,
    properties: {
      "Height": "38px",
      "Padding": "0.5rem (8px) horizontal, 0.25rem (4px) vertical",
      "Border Radius": "md (6px)",
      "Font Size": "sm (14px)",
      "Font Weight": "medium (500)"
    }
  },
  {
    id: "ui-badge",
    name: "Badge",
    description: "A small badge for status or count indicators",
    category: "ui",
    code: `<span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
  Badge
</span>`,
    previewComponent: `<span class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
  Badge
</span>`,
    properties: {
      "Border Radius": "full (9999px)",
      "Padding": "0.5rem (8px) horizontal, 0.25rem (4px) vertical",
      "Font Size": "xs (12px)",
      "Font Weight": "medium (500)"
    }
  },
  
  // Templates
  {
    id: "template-contact-form",
    name: "Contact Form",
    description: "A complete contact form template with validation",
    category: "templates",
    featured: true,
    code: `<form className="space-y-4">
  <div className="space-y-2">
    <label htmlFor="name" className="text-sm font-medium">Name</label>
    <input
      id="name"
      type="text"
      className="w-full rounded-md border border-input px-3 py-2 text-sm"
      placeholder="Your name"
      required
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium">Email</label>
    <input
      id="email"
      type="email"
      className="w-full rounded-md border border-input px-3 py-2 text-sm"
      placeholder="Your email"
      required
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium">Message</label>
    <textarea
      id="message"
      className="w-full rounded-md border border-input px-3 py-2 text-sm"
      rows={4}
      placeholder="Your message"
      required
    />
  </div>
  <button
    type="submit"
    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
  >
    Send Message
  </button>
</form>`,
    previewComponent: `<form class="space-y-4">
  <div class="space-y-2">
    <label for="name" class="text-sm font-medium">Name</label>
    <input
      id="name"
      type="text"
      class="w-full rounded-md border border-input px-3 py-2 text-sm"
      placeholder="Your name"
      required
    />
  </div>
  <div class="space-y-2">
    <label for="email" class="text-sm font-medium">Email</label>
    <input
      id="email"
      type="email"
      class="w-full rounded-md border border-input px-3 py-2 text-sm"
      placeholder="Your email"
      required
    />
  </div>
  <div class="space-y-2">
    <label for="message" class="text-sm font-medium">Message</label>
    <textarea
      id="message"
      class="w-full rounded-md border border-input px-3 py-2 text-sm"
      rows="4"
      placeholder="Your message"
      required
    />
  </div>
  <button
    type="submit"
    class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
  >
    Send Message
  </button>
</form>`,
    properties: {
      "Fields": "Name, Email, Message",
      "Validation": "Required fields",
      "Spacing": "1rem (16px) between fields",
      "Submit Button": "Primary style"
    }
  },
  {
    id: "template-pricing-table",
    name: "Pricing Table",
    description: "A pricing table with multiple tiers",
    category: "templates",
    code: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="rounded-lg border bg-card p-6">
    <h3 className="text-lg font-semibold">Basic</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-3xl font-bold">$9</span>
      <span className="ml-1 text-sm text-muted-foreground">/month</span>
    </div>
    <ul className="mt-6 space-y-3">
      <li className="flex">
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="ml-2">Feature 1</span>
      </li>
      <li className="flex">
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="ml-2">Feature 2</span>
      </li>
    </ul>
    <button className="mt-6 w-full rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Get Started
    </button>
  </div>
  <!-- Additional pricing tiers would be here -->
</div>`,
    previewComponent: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="rounded-lg border bg-card p-6">
    <h3 class="text-lg font-semibold">Basic</h3>
    <div class="mt-4 flex items-baseline">
      <span class="text-3xl font-bold">$9</span>
      <span class="ml-1 text-sm text-muted-foreground">/month</span>
    </div>
    <ul class="mt-6 space-y-3">
      <li class="flex">
        <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="ml-2">Feature 1</span>
      </li>
      <li class="flex">
        <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="ml-2">Feature 2</span>
      </li>
    </ul>
    <button class="mt-6 w-full rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Get Started
    </button>
  </div>
  <!-- Additional pricing tiers would be here -->
</div>`,
    properties: {
      "Layout": "Responsive grid",
      "Cards": "Bordered with shadow",
      "Pricing": "Highlighted with large font",
      "Features": "Bulleted list with icons"
    }
  }
];
