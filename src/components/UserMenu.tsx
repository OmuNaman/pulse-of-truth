
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

export const UserMenu = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <Button asChild variant="outline">
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }

  // Use first two letters of email for fallback, handle potential null
  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : user.user_metadata?.username
      ? user.user_metadata.username.substring(0, 2).toUpperCase()
      : "WI"; // Default fallback "WI" for WarzoneIntel

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {/* Add src={user.user_metadata?.avatar_url} if avatars are implemented in Supabase */}
            <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || user.user_metadata?.username || "user"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* Display username if available, otherwise email */}
            <p className="text-sm font-medium leading-none">{user.user_metadata?.username || user.email}</p>
            {user.user_metadata?.username && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>} {/* Show email below username if both exist */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};