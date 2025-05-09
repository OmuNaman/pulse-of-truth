
import { VerificationType } from "../types";
import { BadgeCheck, BadgeAlert, Flag, FlagOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"; // Import Tooltip components

interface VerificationBadgeProps {
  type: VerificationType;
  className?: string;
  showText?: boolean;
}

export const VerificationBadge = ({
  type,
  className,
  showText = true,
}: VerificationBadgeProps) => {
  const getBadgeContent = () => {
    switch (type) {
      case "official":
        return {
          icon: <BadgeCheck size={16} />,
          text: "Official",
          className: "bg-verified text-white",
        };
      case "verified-journalist":
        return {
          icon: <BadgeCheck size={16} />, // Can use a slightly different icon or color later if needed
          text: "Verified Journalist",
          className: "bg-verified-light text-white", // Adjusted class name
        };
      case "unverified":
        return {
          icon: <Flag size={16} />,
          text: "Unverified",
          className: "bg-unverified text-white",
        };
      case "disputed":
        return {
          icon: <FlagOff size={16} />, // Icon for disputed
          text: "Disputed",
          className: "bg-warning text-white",
        };
      default:
        return {
          icon: <Flag size={16} />,
          text: "Unknown",
          className: "bg-gray-500 text-white", // Default grey
        };
    }
  };

  const { icon, text, className: badgeClassName } = getBadgeContent();

  const badgeContent = (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium", // Added padding
        badgeClassName,
        className
      )}
    >
      {icon}
      {showText && <span>{text}</span>}
    </div>
  );

  // If showText is false, wrap the icon in a tooltip
  if (!showText) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent side="top">
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }

  return badgeContent;
};