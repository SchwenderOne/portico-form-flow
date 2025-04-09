
import React from "react";
import { Button } from "@/components/ui/button";
import { Ungroup } from "lucide-react";

interface GroupTabProps {
  onUngroup: () => void;
}

const GroupTab: React.FC<GroupTabProps> = ({ onUngroup }) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <p className="text-sm">This element is part of a group. You can ungroup to edit elements individually.</p>
        <Button size="sm" onClick={onUngroup}>
          <Ungroup className="h-4 w-4 mr-2" />
          Ungroup Elements
        </Button>
      </div>
    </div>
  );
};

export default GroupTab;
