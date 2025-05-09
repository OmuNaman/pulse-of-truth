import { FactCheck, FactCheckStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, XCircle, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface FactCheckListProps {
  factChecks: FactCheck[];
}

const getStatusIcon = (status: FactCheckStatus) => {
  switch (status) {
    case "true":
      return <CheckCircle2 className="text-verified" size={20} />;
    case "false":
      return <XCircle className="text-warning" size={20} />;
    case "partially-true":
      return <AlertCircle className="text-unverified" size={20} />;
    case "unverified":
    default:
      return <HelpCircle className="text-muted-foreground" size={20} />;
  }
};

const getStatusLabel = (status: FactCheckStatus) => {
  switch (status) {
    case "true":
      return "True";
    case "false":
      return "False";
    case "partially-true":
      return "Partially True";
    case "unverified":
    default:
      return "Unverified";
  }
};


export const FactCheckList = ({ factChecks }: FactCheckListProps) => {
  const sortedFactChecks = [...factChecks].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-6">Fact Checks</h2>
      <div className="space-y-4">
        {sortedFactChecks.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No fact checks available.
          </p>
        ) : (
          sortedFactChecks.map((fc) => (
            <Card key={fc.id}>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-lg font-semibold">{fc.claim}</CardTitle>
                 <div className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    fc.status === 'true' && 'text-verified',
                    fc.status === 'false' && 'text-warning',
                    fc.status === 'partially-true' && 'text-unverified',
                    fc.status === 'unverified' && 'text-muted-foreground'
                 )}>
                    {getStatusIcon(fc.status)}
                    <span>{getStatusLabel(fc.status)}</span>
                 </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-3">{fc.explanation}</p>
                <div className="text-xs text-gray-500">
                   Checked {formatDistanceToNow(new Date(fc.timestamp), { addSuffix: true })}
                   {fc.relatedPosts.length > 0 && (
                      <span className="ml-2">
                         (Related posts: {fc.relatedPosts.join(', ')}) {/* In a real app, these would be links */}
                      </span>
                   )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};