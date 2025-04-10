
export type BlockCategories = "all" | "layout" | "components" | "forms" | "ui" | "templates";

export interface BlockItem {
  id: string;
  name: string;
  description: string;
  category: Exclude<BlockCategories, "all">;
  featured?: boolean;
  code?: string;
  previewComponent?: string;
  properties?: Record<string, string>;
  tags?: string[];
}
