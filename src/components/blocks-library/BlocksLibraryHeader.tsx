
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, FileUp, BookOpen } from "lucide-react";
import { useBrandSettings } from "@/context/BrandSettingsContext";

interface BlocksLibraryHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const BlocksLibraryHeader: React.FC<BlocksLibraryHeaderProps> = ({ 
  searchQuery, 
  onSearch 
}) => {
  const { brandSettings } = useBrandSettings();

  return (
    <div className="border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1">
        <h1 className="text-lg font-semibold">Blocks & Components Library</h1>
      </div>
      
      <div className="flex items-center gap-2 mx-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks and components..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <FileUp className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button 
          size="sm" 
          style={{ backgroundColor: brandSettings.colors.primary }}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Documentation
        </Button>
      </div>
    </div>
  );
};
