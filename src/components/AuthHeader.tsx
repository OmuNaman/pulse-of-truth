
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";

type AuthHeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const AuthHeader = ({ activeTab, setActiveTab }: AuthHeaderProps) => {
  const { user } = useAuth();
  
  const tabs = [
    { id: "all", label: "All Sources" },
    { id: "verified", label: "Verified Only" },
    { id: "timeline", label: "Timeline" },
    { id: "trending", label: "Trending" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-8">
            <Link to="/">WarzoneIntel</Link>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <UserMenu />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-8">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(tab.id);
                      // Fix: Cast to HTMLElement to access click() method
                      const sheetCloseButton = document.querySelector("button[data-state='open']");
                      if (sheetCloseButton && sheetCloseButton instanceof HTMLElement) {
                        sheetCloseButton.click();
                      }
                    }}
                    className="justify-start"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
