
import React from "react";
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
  Star,
  Search,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";

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

  // Count blocks in each category for badges
  const categoryCounts = categories.reduce((acc, category) => {
    if (category.id === "all") {
      acc[category.id] = blocks.length;
    } else {
      acc[category.id] = blocks.filter(block => block.category === category.id).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const featuredBlocks = blocks.filter(block => block.featured);

  return (
    <div className="w-72 bg-background border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search blocks..." 
            className="pl-8 h-9"
          />
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-1 justify-between pr-2 min-w-[90px]"
                onClick={() => onCategoryChange(category.id as BlockCategories)}
              >
                <div className="flex items-center">
                  <CategoryIcon className="h-4 w-4 mr-1.5" />
                  <span className="truncate">{category.name}</span>
                </div>
                <span className="ml-1 text-xs rounded-full bg-muted px-1.5 py-0.5">
                  {categoryCounts[category.id]}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {featuredBlocks.length > 0 && activeCategory === "all" && (
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1.5" />
                Featured Blocks
              </h3>
            </div>
            <div className="grid gap-2">
              {featuredBlocks.map((block) => (
                <div
                  key={block.id}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors",
                    selectedBlock?.id === block.id && "border-primary bg-primary/5"
                  )}
                  onClick={() => onBlockSelect(block)}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('blockData', JSON.stringify(block));
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{block.name}</h3>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">
              {activeCategory === "all" ? "All Blocks" : categories.find(c => c.id === activeCategory)?.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {blocks.length} blocks
            </span>
          </div>
          <div className="grid gap-2">
            {blocks.length > 0 ? (
              blocks.map((block) => (
                <div
                  key={block.id}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors",
                    selectedBlock?.id === block.id && "border-primary bg-primary/5",
                    "group" // Add group class for hover effects
                  )}
                  onClick={() => onBlockSelect(block)}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('blockData', JSON.stringify(block));
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{block.name}</h3>
                    <div className="flex items-center">
                      {block.featured && (
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
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
        </div>
      </ScrollArea>
    </div>
  );
};
