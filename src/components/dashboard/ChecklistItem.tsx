
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChecklistItem as ChecklistItemType } from "@/types/onboarding";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onComplete: (id: string, isCompleted?: boolean) => void;
  areRequiredDocumentsUploaded: (task: ChecklistItemType) => boolean;
}

export const ChecklistItemComponent = ({
  item,
  onComplete,
  areRequiredDocumentsUploaded,
}: ChecklistItemProps) => {
  const { toast } = useToast();

  // Get task button status
  const getTaskButton = () => {
    if (item.completed) {
      return (
        <Button variant="ghost" disabled className="flex gap-2 items-center">
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </Button>
      );
    }

    if (item.requiredDocuments && item.requiredDocuments.length > 0) {
      const hasRequiredDocs = areRequiredDocumentsUploaded(item);

      return (
        <Button
          variant={hasRequiredDocs ? "default" : "outline"}
          onClick={() => handleCompleteTask()}
          className={hasRequiredDocs ? "bg-[#68b046] hover:bg-[#72c90a]" : ""}
          disabled={!hasRequiredDocs}
        >
          {!hasRequiredDocs && <AlertCircle className="h-4 w-4 mr-2" />}
          {hasRequiredDocs ? "Complete" : "Upload Required Files"}
        </Button>
      );
    }

    return (
      <Button
        variant="default"
        onClick={() => handleCompleteTask()}
        className="bg-[#68b046] hover:bg-[#72c90a]"
      >
        Complete
      </Button>
    );
  };

  // Handle completing a task
  const handleCompleteTask = () => {
    if (!areRequiredDocumentsUploaded(item)) {
      toast({
        title: "Missing required documents",
        description: "Please upload all required documents before completing this task.",
        variant: "destructive",
      });
      return;
    }

    onComplete(item.id, true);

    toast({
      title: "Task completed",
      description: "Your progress has been updated",
    });
  };

  return (
    <div
      key={item.id}
      className={`flex items-start gap-4 p-4 border rounded-lg ${
        item.completed ? "bg-muted/50" : ""
      }`}
    >
      <div
        className={`mt-0.5 ${
          item.completed ? "text-[#68b046]" : "text-muted-foreground"
        }`}
      >
        {item.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1">
        <h3
          className={`font-medium ${
            item.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {item.description}
        </p>
        {item.requiredDocuments && item.requiredDocuments.length > 0 && !item.completed && (
          <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Required documents must be uploaded first
          </div>
        )}
      </div>
      {getTaskButton()}
    </div>
  );
};
