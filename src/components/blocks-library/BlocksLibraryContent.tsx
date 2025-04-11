
import React, { useState, useEffect } from "react";
import { BlocksLibraryHeader } from "./BlocksLibraryHeader";
import { BlocksLibrarySidebar } from "./BlocksLibrarySidebar";
import { BlocksLibraryCanvas } from "./BlocksLibraryCanvas";
import { BlockCategories, BlockItem } from "./types";
import { blockLibraryData } from "@/data/blocks-library-data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const BlocksLibraryContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlockCategories>("all");
  const [selectedBlock, setSelectedBlock] = useState<BlockItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter blocks based on active category and search query
  const filteredBlocks = blockLibraryData.filter(block => {
    const matchesCategory = activeCategory === "all" || block.category === activeCategory;
    const matchesSearch = 
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (block.tags && block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
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

  // Check if we need to handle blocks stored in localStorage
  useEffect(() => {
    // Add event listener for dropping blocks onto form canvas
    const handleBlockDrop = (event: DragEvent) => {
      if (event.dataTransfer && event.dataTransfer.getData('blockData')) {
        try {
          const blockData = JSON.parse(event.dataTransfer.getData('blockData'));
          toast.success(`${blockData.name} dragged to form builder`);
        } catch (error) {
          console.error("Error parsing block data:", error);
        }
      }
    };

    window.addEventListener('dragend', handleBlockDrop);
    
    return () => {
      window.removeEventListener('dragend', handleBlockDrop);
    };
  }, []);

  // If a featured block is available, select it by default
  useEffect(() => {
    if (!selectedBlock && filteredBlocks.length > 0) {
      const featuredBlock = filteredBlocks.find(block => block.featured);
      if (featuredBlock) {
        setSelectedBlock(featuredBlock);
      } else {
        setSelectedBlock(filteredBlocks[0]);
      }
    }
  }, [filteredBlocks, selectedBlock]);

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
