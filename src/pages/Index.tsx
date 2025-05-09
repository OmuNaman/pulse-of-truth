
import { useState } from "react";
import { Header } from "@/components/Header";
import { PostFeed } from "@/components/PostFeed";
import { TimelineView } from "@/components/TimelineView";
import { posts, timelineEvents } from "@/data/mockData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
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
