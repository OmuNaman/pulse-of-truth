
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface TrustScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const TrustScore = ({
  score,
  size = "md",
  showLabel = true,
  className,
}: TrustScoreProps) => {
  const getScoreColorClass = () => {
    if (score >= 80) return "bg-verified text-white";
    if (score >= 60) return "bg-verified-light text-white"; // Adjusted class name based on tailwind.config
    if (score >= 40) return "bg-unverified text-white";
    return "bg-warning text-white";
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-xs";
      case "lg":
        return "w-16 h-16 text-xl";
      default:
        return "w-12 h-12 text-sm";
    }
  };

  const scoreElement = (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold",
        getSizeClasses(),
        getScoreColorClass()
      )}
    >
      {score}
    </div>
  );

  if (showLabel) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        {scoreElement}
        <span className="text-xs text-muted-foreground mt-1">Trust Score</span> {/* Use muted-foreground */}
      </div>
    );
  }

  // If showLabel is false, wrap in tooltip for accessibility
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {scoreElement}
      </TooltipTrigger>
      <TooltipContent side="top">
        Trust Score: {score}
      </TooltipContent>
    </Tooltip>
  );
};