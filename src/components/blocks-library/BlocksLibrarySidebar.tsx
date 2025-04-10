
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlockCategories, BlockItem } from "./types";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  Blocks, 
  Component, 
  Monitor, 
  FormInput, 
  FileText,
  Star
} from "lucide-react";

interface BlocksLibrarySidebarProps {
  activeCategory: BlockCategories;
  onCategoryChange: (category: BlockCategories) => void;
  blocks: BlockItem[];
  selectedBlock: BlockItem | null;
  onBlockSelect: (block: BlockItem) => void;
}

export const BlocksLibrarySidebar: React.FC<BlocksLibrarySidebarProps> = ({
  activeCategory,
  onCategoryChange,
  blocks,
  selectedBlock,
  onBlockSelect
}) => {
  const categories = [
    { id: "all", name: "All Blocks", icon: LayoutGrid },
    { id: "layout", name: "Layout", icon: Blocks },
    { id: "components", name: "Components", icon: Component },
    { id: "forms", name: "Form Elements", icon: FormInput },
    { id: "ui", name: "UI Elements", icon: Monitor },
    { id: "templates", name: "Templates", icon: FileText }
  ];

  return (
    <div className="w-72 bg-background border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => onCategoryChange(category.id as BlockCategories)}
              >
                <CategoryIcon className="h-4 w-4" />
                <span className="truncate">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 grid gap-2">
          {blocks.length > 0 ? (
            blocks.map((block) => (
              <div
                key={block.id}
                className={cn(
                  "border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors",
                  selectedBlock?.id === block.id && "border-primary bg-primary/5"
                )}
                onClick={() => onBlockSelect(block)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{block.name}</h3>
                  {block.featured && (
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {block.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No blocks found for the selected category
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
