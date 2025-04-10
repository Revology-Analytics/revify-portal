
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChecklistItem as ChecklistItemType } from "@/types/onboarding";
import { ChecklistItemComponent } from "./ChecklistItem";

interface ChecklistSectionProps {
  checklist: ChecklistItemType[];
  onCompleteTask: (id: string, isCompleted?: boolean) => void;
  areRequiredDocumentsUploaded: (task: ChecklistItemType) => boolean;
}

export const ChecklistSection = ({
  checklist,
  onCompleteTask,
  areRequiredDocumentsUploaded,
}: ChecklistSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Checklist</CardTitle>
        <CardDescription>
          Follow these steps to complete your onboarding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checklist.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            onComplete={onCompleteTask}
            areRequiredDocumentsUploaded={areRequiredDocumentsUploaded}
          />
        ))}
      </CardContent>
    </Card>
  );
};
