
import { Post } from "@/types";
import { VerificationBadge } from "./VerificationBadge";
import { TrustScore } from "./TrustScore";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { MessageSquare, TrendingUp, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // Determine border color based on verification status
  const getBorderColorClass = () => {
    switch (post.verificationStatus) {
      case 'official':
        return 'border-verified'; // Deep green
      case 'verified-journalist':
        return 'border-verified-light'; // Lighter green
      case 'unverified':
        return 'border-unverified'; // Amber
      case 'disputed':
        return 'border-warning'; // Red
      default:
        return 'border-gray-500'; // Default neutral color
    }
  };


  return (
    <Card className={cn("mb-4 overflow-hidden border-l-4 hover:shadow-md transition-shadow", getBorderColorClass())}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={post.source.profileImage || "/placeholder.svg"} // Use a default placeholder
              alt={post.source.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold flex items-center gap-2">
              {post.source.name}
              {/* Only show icon badge next to source name */}
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
        {/* Trust score badge */}
        <TrustScore score={post.trustScore} size="sm" showLabel={false} /> {/* Smaller score, no label */}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="mb-3">{post.content}</p>
        {post.media && post.media.length > 0 && (
          <div className="mb-3 rounded-md overflow-hidden max-h-96 flex justify-center items-center"> {/* Added max-height and centering */}
             {/* Assuming first media is an image for simplicity */}
            <img
              src={post.media[0].url}
              alt="Media content"
              className="w-full h-auto object-cover" // Ensure image covers the area
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-3"> {/* Increased gap, adjusted margin */}
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs font-medium" // Styled as pill badges
            >
              #{tag}
            </span>
          ))}
        </div>
        {post.location && (
          <div className="text-xs text-muted-foreground mt-3 flex items-center"> {/* Added flex and items-center */}
            <span className="mr-1">📍</span> {/* Location icon */}
            {post.location.name}
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
            {post.engagement.comments} Comments
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} />
            {post.engagement.shares} Shares
          </span>
        </div>
        {/* Full text badge at the bottom */}
        <VerificationBadge type={post.verificationStatus} showText={true} />
      </CardFooter>
    </Card>
  );
};