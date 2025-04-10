
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressOverviewProps {
  progress: number;
  completedItems: number;
  totalItems: number;
}

export const ProgressOverview = ({ 
  progress, 
  completedItems, 
  totalItems 
}: ProgressOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Onboarding Progress</span>
          <span className="text-lg">{progress}%</span>
        </CardTitle>
        <CardDescription>
          Complete all the required steps to finish your onboarding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2 bg-green-base/20" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {completedItems} of {totalItems} tasks completed
          </span>
          <span className="font-medium">
            {totalItems - completedItems} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
