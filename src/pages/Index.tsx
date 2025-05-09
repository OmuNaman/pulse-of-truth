
import { useState, useEffect } from "react";
import { AuthHeader } from "@/components/AuthHeader";
import { PostFeed } from "@/components/PostFeed";
// Removed import of TimelineView
import { factChecks, posts } from "@/data/mockData"; // Import factChecks
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FactCheckList } from "@/components/FactCheckList"; // Import FactCheckList

const Index = () => {
  const [activeTab, setActiveTab] = useState("all"); // Default to 'all'
  const { user, isLoading } = useAuth();
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Check user profile on load to validate data access
  useEffect(() => {
    if (user) {
      const checkProfile = async () => {
        try {
          // Attempt to fetch the user's profile
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 means row not found
            console.error("Error fetching profile:", error);
            toast({
              title: "Data access issue",
              description: "There was a problem accessing your profile data. Please try signing out and back in.",
              variant: "destructive",
            });
          } else if (data) {
            console.log("Profile loaded successfully:", data);
            setProfileLoaded(true);
          } else {
            // Profile not found for the user ID - might need to create it or handle this case
            console.warn("Profile not found for user:", user.id);
             // Optional: Redirect to a profile creation page or handle automatically
          }
        } catch (error) {
          console.error("Profile check error:", error);
          // Generic error toast for unexpected issues
           toast({
              title: "An unexpected error occurred",
              description: "Could not verify profile data. Please try again.",
              variant: "destructive",
            });
        }
      };

      checkProfile();
    }
  }, [user]);

  // Show loading state while checking authentication and profile
  if (isLoading || (user && !profileLoaded && activeTab !== 'auth')) { // Stay on loading if user exists but profile check is pending
     return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }


  // Redirect to auth page if not authenticated
  if (!user && !isLoading) { // Only redirect after loading is complete
    return <Navigate to="/auth" replace />;
  }

  // Filter functions (already good)
  const getOfficialPosts = () => posts.filter(
    (post) => post.verificationStatus === "official"
  );

  const getVerifiedJournalistPosts = () => posts.filter(
    (post) => post.verificationStatus === "verified-journalist"
  );

  const getUnverifiedPosts = () => posts.filter(
    (post) =>
      post.verificationStatus === "unverified" || post.verificationStatus === "disputed"
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        {activeTab === "all" && (
          <div className="space-y-8">
             <PostFeed
              title="Official Government Sources"
              posts={getOfficialPosts()}
              filterType="official"
            />
            <PostFeed
              title="Verified Journalists"
              posts={getVerifiedJournalistPosts()}
              filterType="verified-journalist"
            />
             <PostFeed
              title="Unverified & Disputed" // Updated title for clarity
              posts={getUnverifiedPosts()}
            />
          </div>
        )}

        {activeTab === "verified" && (
          <div className="space-y-8">
            <PostFeed
              title="Official Government Sources"
              posts={getOfficialPosts()}
              filterType="official"
            />
            <PostFeed
              title="Verified Journalists"
              posts={getVerifiedJournalistPosts()}
              filterType="verified-journalist"
            />
             {/* Note: Unverified/Disputed are excluded in this tab */}
          </div>
        )}

        {/* Removed TimelineView rendering */}

        {activeTab === "trending" && (
          <PostFeed
            title="Trending Updates (by Shares)" // Clarified sort method
            posts={[...posts].sort((a, b) => b.engagement.shares - a.engagement.shares)} // Ensure sorting doesn't modify original array
          />
        )}

         {activeTab === "fact-check" && ( // Added Fact Check rendering
            <FactCheckList factChecks={factChecks} />
         )}
      </main>

      <footer className="bg-card border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container max-w-6xl mx-auto">
          <p>WarzoneIntel © 2025 - Real-time conflict information with verification</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;