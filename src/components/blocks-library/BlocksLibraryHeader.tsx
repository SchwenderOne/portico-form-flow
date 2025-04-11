
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BlocksLibraryHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const BlocksLibraryHeader: React.FC<BlocksLibraryHeaderProps> = ({
  onSearch,
  searchQuery
}) => {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="mr-1">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Components Library</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative max-w-md w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Component
        </Button>
      </div>
    </div>
  );
};
