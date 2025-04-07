
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu, ChevronDown, Save, Share, Play, Users } from "lucide-react";

const AppHeader = () => {
  const { toast } = useToast();

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "Preview functionality will be available soon.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Your form has been saved successfully.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing functionality will be available soon.",
    });
  };

  const handleCollaborate = () => {
    toast({
      title: "Collaborate",
      description: "Collaboration functionality will be available soon.",
    });
  };

  return (
    <header className="border-b border-border py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
          <div className="flex items-center">
            <span className="font-semibold text-lg mr-2">Untitled Form</span>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={handleCollaborate}>
            <Users className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Collaborate</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={handlePreview}>
            <Play className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={handleShare}>
            <Share className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
