
import React from 'react';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerProvider = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:text-green-600 group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50",
          error:
            "group-[.toaster]:text-red-600 group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50",
          info:
            "group-[.toaster]:text-blue-600 group-[.toaster]:border-blue-200 group-[.toaster]:bg-blue-50",
          warning:
            "group-[.toaster]:text-amber-600 group-[.toaster]:border-amber-200 group-[.toaster]:bg-amber-50",
        },
      }}
      {...props}
    />
  );
};

// Export the provider for use in the app
export { SonnerProvider };

// Also export a centralized toast notification system with predefined styles
export const notifications = {
  success: (title: string, description?: string) => {
    toast.success(title, {
      description,
      duration: 3000,
    });
  },
  error: (title: string, description?: string) => {
    toast.error(title, {
      description,
      duration: 5000, // Error messages stay longer
    });
  },
  warning: (title: string, description?: string) => {
    toast.warning(title, {
      description,
      duration: 4000,
    });
  },
  info: (title: string, description?: string) => {
    toast.info(title, {
      description,
      duration: 3000,
    });
  }
};
