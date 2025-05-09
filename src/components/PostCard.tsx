
import { Post } from "@/types";
import { VerificationBadge } from "./VerificationBadge";
import { TrustScore } from "./TrustScore";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { MessageSquare, TrendingUp, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <Card className="mb-4 overflow-hidden border-l-4 hover:shadow-md transition-shadow" 
         style={{ 
           borderLeftColor: post.verificationStatus === 'official' ? '#2E7D32' : 
                            post.verificationStatus === 'verified-journalist' ? '#4CAF50' :
                            post.verificationStatus === 'unverified' ? '#FFA000' : '#D32F2F'
         }}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={post.source.profileImage || "/placeholder.svg"}
              alt={post.source.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold flex items-center gap-2">
              {post.source.name}
              <VerificationBadge 
                type={post.source.verificationStatus}
                className="ml-1" 
                showText={false}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {post.source.handle}
            </div>
          </div>
        </div>
        <TrustScore score={post.trustScore} size="sm" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="mb-3">{post.content}</p>
        {post.media && post.media.length > 0 && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img
              src={post.media[0].url}
              alt="Media content"
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        {post.location && (
          <div className="text-xs text-muted-foreground mt-2">
            📍 {post.location.name}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {formatTimestamp(post.timestamp)}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {post.engagement.comments}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} />
            {post.engagement.shares}
          </span>
        </div>
        <VerificationBadge type={post.verificationStatus} />
      </CardFooter>
    </Card>
  );
};
