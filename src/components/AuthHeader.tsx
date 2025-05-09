import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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
    { id: "trending", label: "Trending" },
    { id: "fact-check", label: "Fact Checks" },
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
                className={cn(
                  activeTab === tab.id && "bg-intelBlue hover:bg-intelBlue/90 text-primary-foreground"
                )}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* User Menu & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <UserMenu />
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
                  <SheetClose asChild key={tab.id}>
                    <Button
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "justify-start",
                        activeTab === tab.id && "bg-intelBlue hover:bg-intelBlue/90 text-primary-foreground"
                      )}
                    >
                      {tab.label}
                    </Button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
