
import { Post, VerificationType } from "@/types";
import { PostCard } from "./PostCard";
import { useState } from "react";

interface PostFeedProps {
  posts: Post[];
  title: string;
  filterType?: VerificationType;
}

export const PostFeed = ({ posts, title, filterType }: PostFeedProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "trust">("recent");

  const filteredPosts = filterType
    ? posts.filter((post) => post.verificationStatus === filterType)
    : posts;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return b.trustScore - a.trustScore;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "recent" | "trust")}
          className="text-sm bg-background border rounded-md px-2 py-1"
        >
          <option value="recent">Most Recent</option>
          <option value="trust">Highest Trust</option>
        </select>
      </div>
      <div>
        {sortedPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No posts available in this category.
          </p>
        ) : (
          sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};
