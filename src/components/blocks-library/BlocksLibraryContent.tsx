
import React, { useState } from "react";
import { BlocksLibraryHeader } from "./BlocksLibraryHeader";
import { BlocksLibrarySidebar } from "./BlocksLibrarySidebar";
import { BlocksLibraryCanvas } from "./BlocksLibraryCanvas";
import { BlockCategories, BlockItem } from "./types";
import { blockLibraryData } from "@/data/blocks-library-data";

export const BlocksLibraryContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlockCategories>("all");
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blocks based on active category and search query
  const filteredBlocks = blockLibraryData.filter(block => {
    const matchesCategory = activeCategory === "all" || block.category === activeCategory;
    const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          block.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: BlockCategories) => {
    setActiveCategory(category);
    setSelectedBlock(null);
  };

  const handleBlockSelect = (block: BlockItem) => {
    setSelectedBlock(block);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <BlocksLibraryHeader onSearch={handleSearch} searchQuery={searchQuery} />
      <div className="flex flex-1 h-full overflow-hidden">
        <BlocksLibrarySidebar 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
          blocks={filteredBlocks}
          selectedBlock={selectedBlock}
          onBlockSelect={handleBlockSelect}
        />
        <BlocksLibraryCanvas selectedBlock={selectedBlock} />
      </div>
    </div>
  );
};
