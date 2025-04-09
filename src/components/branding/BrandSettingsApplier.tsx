
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
      
      // Also set the raw RGB values for use in rgba() functions
      root.style.setProperty('--primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    }

    // Typography variables
    root.style.setProperty('--brand-font-family', brandSettings.typography.fontFamily);
    root.style.setProperty('--brand-heading-size', brandSettings.typography.headingSize);
    root.style.setProperty('--brand-body-size', brandSettings.typography.bodySize);

    // Add the font to the document if it's from Google Fonts
    if (brandSettings.typography.fontFamily && 
        !brandSettings.typography.fontFamily.includes('system-ui') && 
        !document.querySelector(`link[href*="${brandSettings.typography.fontFamily.split(',')[0].trim().replace(/['\"]/g, '')}"]`)) {
      const fontName = brandSettings.typography.fontFamily.split(',')[0].trim().replace(/['\"]/g, '');
      if (fontName !== 'Inter') { // Skip Inter as it's already included in the app
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;500;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }

    // Field style variables
    root.style.setProperty('--brand-border-radius', brandSettings.fieldStyles.borderRadius);
    root.style.setProperty('--brand-border-style', brandSettings.fieldStyles.borderStyle);
    root.style.setProperty('--brand-padding', brandSettings.fieldStyles.padding);

    // Apply CSS-level font-family directly to make sure fonts take effect immediately
    if (brandSettings.typography.fontFamily) {
      document.body.style.fontFamily = brandSettings.typography.fontFamily;
    }

    console.log("Brand settings applied:", brandSettings);
  }, [brandSettings]);

  return null; // This component does not render anything
}

// Helper function to convert HEX to RGB
function hexToRgb(hex: string) {
  // Handle invalid hex values
  if (!hex || typeof hex !== 'string') {
    console.error("Invalid hex color value", hex);
    return { r: 155, g: 135, b: 245 }; // Default purple
  }

  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Handle invalid hex format
  if (hex.length !== 6) {
    console.error("Invalid hex color format", hex);
    return { r: 155, g: 135, b: 245 }; // Default purple
  }

  try {
    // Parse the hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  } catch (error) {
    console.error("Error parsing hex color", hex, error);
    return { r: 155, g: 135, b: 245 }; // Default purple
  }
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
