
import React, { useEffect } from "react";
import { useBrandSettings } from "@/context/BrandSettingsContext";

/**
 * This component subscribes to brand settings changes and applies them as CSS variables
 * to enable global theming across the application
 */
export function BrandSettingsApplier() {
  const { brandSettings } = useBrandSettings();

  useEffect(() => {
    // Get the root element to apply CSS variables
    const root = document.documentElement;

    // Apply color variables
    root.style.setProperty('--brand-primary', brandSettings.colors.primary);
    root.style.setProperty('--brand-secondary', brandSettings.colors.secondary);
    root.style.setProperty('--brand-accent', brandSettings.colors.accent);

    // Convert HEX to HSL for the primary color to work with Tailwind's HSL vars
    const primaryRgb = hexToRgb(brandSettings.colors.primary);
    if (primaryRgb) {
      const primaryHsl = rgbToHsl(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      root.style.setProperty('--primary', `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`);
    }

    // Typography variables
    root.style.setProperty('--brand-font-family', brandSettings.typography.fontFamily);
    root.style.setProperty('--brand-heading-size', brandSettings.typography.headingSize);
    root.style.setProperty('--brand-body-size', brandSettings.typography.bodySize);

    // Field style variables
    root.style.setProperty('--brand-border-radius', brandSettings.fieldStyles.borderRadius);
    root.style.setProperty('--brand-border-style', brandSettings.fieldStyles.borderStyle);
    root.style.setProperty('--brand-padding', brandSettings.fieldStyles.padding);
  }, [brandSettings]);

  return null; // This component does not render anything
}

// Helper function to convert HEX to RGB
function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

// Helper function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}
