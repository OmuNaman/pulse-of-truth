
import { useState, useEffect } from "react";
import { AuthHeader } from "@/components/AuthHeader";
import { PostFeed } from "@/components/PostFeed";
import { TimelineView } from "@/components/TimelineView";
import { posts, timelineEvents } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user, isLoading } = useAuth();
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Check user profile on load to validate data access
  useEffect(() => {
    if (user) {
      const checkProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
            
          if (error) {
            console.error("Error fetching profile:", error);
            toast({
              title: "Data access issue",
              description: "There was a problem accessing your profile data. Please try signing out and back in.",
              variant: "destructive",
            });
          } else {
            console.log("Profile loaded successfully:", data);
            setProfileLoaded(true);
          }
        } catch (error) {
          console.error("Profile check error:", error);
        }
      };
      
      checkProfile();
    }
  }, [user]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }

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
              title="Unverified & Trending"
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
          </div>
        )}

        {activeTab === "timeline" && <TimelineView events={timelineEvents} />}

        {activeTab === "trending" && (
          <PostFeed
            title="Trending Updates"
            posts={posts.sort((a, b) => b.engagement.shares - a.engagement.shares)}
          />
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
