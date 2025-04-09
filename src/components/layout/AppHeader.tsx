
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import UserMenu from "@/components/auth/UserMenu";

// Replace with your actual logo component or image
const Logo = () => (
  <div className="flex items-center font-bold text-xl">
    <span className="text-primary">Portico</span>
  </div>
);

const AppHeader = () => {
  return (
    <header className="h-14 px-4 flex items-center justify-between border-b bg-background">
      <div className="flex items-center">
        <Link to="/" className="mr-4">
          <Logo />
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <UserMenu />
      </div>
    </header>
  );
};

export default AppHeader;
