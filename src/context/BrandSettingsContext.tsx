
import React, { createContext, useContext, useState } from "react";
import { BrandSettings, defaultBrandSettings } from "@/types/brand";

type BrandSettingsContextType = {
  brandSettings: BrandSettings;
  updateBrandSettings: (settings: Partial<BrandSettings>) => void;
  updateColors: (colors: Partial<BrandSettings['colors']>) => void;
  updateTypography: (typography: Partial<BrandSettings['typography']>) => void;
  updateIdentity: (identity: Partial<BrandSettings['identity']>) => void;
  updateFieldStyles: (fieldStyles: Partial<BrandSettings['fieldStyles']>) => void;
  resetToDefaults: () => void;
};

const BrandSettingsContext = createContext<BrandSettingsContextType | undefined>(undefined);

export const useBrandSettings = () => {
  const context = useContext(BrandSettingsContext);
  if (!context) {
    throw new Error("useBrandSettings must be used within a BrandSettingsProvider");
  }
  return context;
};

export const BrandSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(defaultBrandSettings);

  const updateBrandSettings = (settings: Partial<BrandSettings>) => {
    setBrandSettings(prev => ({
      ...prev,
      ...settings,
    }));
  };

  const updateColors = (colors: Partial<BrandSettings['colors']>) => {
    setBrandSettings(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...colors,
      },
    }));
  };

  const updateTypography = (typography: Partial<BrandSettings['typography']>) => {
    setBrandSettings(prev => ({
      ...prev,
      typography: {
        ...prev.typography,
        ...typography,
      },
    }));
  };

  const updateIdentity = (identity: Partial<BrandSettings['identity']>) => {
    setBrandSettings(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        ...identity,
      },
    }));
  };

  const updateFieldStyles = (fieldStyles: Partial<BrandSettings['fieldStyles']>) => {
    setBrandSettings(prev => ({
      ...prev,
      fieldStyles: {
        ...prev.fieldStyles,
        ...fieldStyles,
      },
    }));
  };

  const resetToDefaults = () => {
    setBrandSettings(defaultBrandSettings);
  };

  return (
    <BrandSettingsContext.Provider
      value={{
        brandSettings,
        updateBrandSettings,
        updateColors,
        updateTypography,
        updateIdentity,
        updateFieldStyles,
        resetToDefaults,
      }}
    >
      {children}
    </BrandSettingsContext.Provider>
  );
};
