
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Star } from "lucide-react";

interface PromptTabsProps {
  activeTab: 'history' | 'favorites';
  onTabChange: (tab: 'history' | 'favorites') => void;
  historyCount: number;
  favoritesCount: number;
}

const PromptTabs: React.FC<PromptTabsProps> = ({
  activeTab,
  onTabChange,
  historyCount,
  favoritesCount
}) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'history' | 'favorites')}>
      <TabsList className="w-full mb-2">
        <TabsTrigger value="history" className="flex-1">
          <History className="h-4 w-4 mr-2" />
          History
          {historyCount > 0 && (
            <span className="ml-1 text-xs bg-muted rounded-full px-1.5 py-0.5">
              {historyCount}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex-1">
          <Star className="h-4 w-4 mr-2" />
          Favorites
          {favoritesCount > 0 && (
            <span className="ml-1 text-xs bg-muted rounded-full px-1.5 py-0.5">
              {favoritesCount}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default PromptTabs;
