
export interface BrandSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    headingSize: string;
    bodySize: string;
  };
  identity: {
    brandName: string;
    tagline: string;
    logoUrl: string | null;
  };
  fieldStyles: {
    borderRadius: string;
    borderStyle: string;
    padding: string;
  };
}

export const defaultBrandSettings: BrandSettings = {
  colors: {
    primary: "#9b87f5",
    secondary: "#1EAEDB",
    accent: "#F1F0FB"
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingSize: "1.25rem",
    bodySize: "0.875rem"
  },
  identity: {
    brandName: "Portico Forms",
    tagline: "Forms you trust",
    logoUrl: null
  },
  fieldStyles: {
    borderRadius: "0.5rem",
    borderStyle: "solid",
    padding: "0.75rem"
  }
};
