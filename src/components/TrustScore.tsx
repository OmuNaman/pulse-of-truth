
import { cn } from "@/lib/utils";

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
  const getScoreColor = () => {
    if (score >= 80) return "bg-verified";
    if (score >= 60) return "bg-verified-light";
    if (score >= 40) return "bg-unverified";
    return "bg-warning";
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

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white",
          getSizeClasses(),
          getScoreColor()
        )}
      >
        {score}
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 mt-1">Trust Score</span>
      )}
    </div>
  );
};
