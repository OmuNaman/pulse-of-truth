
import { TimelineEvent } from "@/types";
import { VerificationBadge } from "./VerificationBadge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface TimelineViewProps {
  events: TimelineEvent[];
}

export const TimelineView = ({ events }: TimelineViewProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-6">Timeline of Events</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>

        {/* Events */}
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="flex mb-8 relative">
            {/* Timeline node */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center z-10",
                event.verificationStatus === "official" || event.verificationStatus === "verified-journalist"
                  ? "bg-verified"
                  : event.verificationStatus === "unverified"
                  ? "bg-unverified"
                  : "bg-warning"
              )}
            >
              <span className="text-white font-bold">{index + 1}</span>
            </div>

            {/* Event content */}
            <div className="ml-4 bg-card rounded-md p-4 shadow-sm border flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{event.title}</h3>
                <VerificationBadge 
                  type={event.verificationStatus}
                  showText={false}
                />
              </div>
              <p className="text-sm mb-2">{event.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div>
                  {event.location && <span>📍 {event.location.name}</span>}
                </div>
                <div>
                  {formatDistanceToNow(new Date(event.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
