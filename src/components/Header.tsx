
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Link } from "react-router-dom";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-card border-b sticky top-0 z-20 shadow-sm">
      <div className="container max-w-6xl mx-auto py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h1 className="font-bold text-xl mr-2">
              <Link to="/">WarzoneIntel</Link>
            </h1>
            <span className="bg-intelBlue text-white text-xs px-2 py-0.5 rounded">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-2">
             {/* Link to Auth page for Sign In */}
            <Button asChild variant="outline" size="sm">
              <Link to="/auth">
                 <User size={16} className="mr-1" />
                 Sign In
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4"> {/* Increased bottom margin */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search for updates, sources, or locations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-10"> {/* Adjusted grid-cols and height */}
            <TabsTrigger value="all">All Updates</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
             {/* Removed Timeline Trigger */}
            <TabsTrigger value="trending">Trending</TabsTrigger>
             <TabsTrigger value="fact-check">Fact Checks</TabsTrigger> {/* Added Fact Check Trigger */}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};