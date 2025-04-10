
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Check, 
  Clock,
  FileText,
  Upload,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  clientAction: boolean;
  actionType: "manual" | "link" | "upload";
  actionTarget?: string;
  icon?: React.ReactNode;
  dueDate?: string;
}

interface OnboardingChecklistProps {
  clientName?: string;
}

const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ clientName = "Client" }) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  
  // Check if user is viewing the checklist for the first time
  useEffect(() => {
    const hasSeenChecklist = localStorage.getItem("hasSeenChecklist");
    if (hasSeenChecklist) {
      setIsFirstTimeUser(false);
    } else {
      // Show welcome message for first-time users
      setTimeout(() => {
        toast({
          title: "Welcome to your onboarding checklist!",
          description: "Complete these steps to get started with Revify.",
        });
        localStorage.setItem("hasSeenChecklist", "true");
      }, 1000);
    }
  }, [toast]);
  
  // Mock checklist data - in a real app, this would come from an API
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "mNDA Signed",
      description: "Please sign and return the mutual non-disclosure agreement.",
      completed: true,
      clientAction: true,
      actionType: "manual",
      icon: <FileText size={18} className="text-primary" />,
      dueDate: "Completed"
    },
    {
      id: "2",
      title: "Complete Questionnaire",
      description: "Fill out our detailed questionnaire to help us understand your business needs.",
      completed: false,
      clientAction: true,
      actionType: "link",
      actionTarget: "https://surveymonkey.com/example-questionnaire",
      icon: <FileText size={18} className="text-amber-500" />,
      dueDate: "Due in 3 days"
    },
    {
      id: "3",
      title: "Initial Data Submission",
      description: "Upload your initial data files for analysis.",
      completed: false,
      clientAction: true,
      actionType: "upload",
      icon: <Upload size={18} className="text-blue-500" />,
      dueDate: "Due in 5 days"
    },
    {
      id: "4",
      title: "Data Health Check",
      description: "Our team will perform a data quality assessment on your uploaded files.",
      completed: false,
      clientAction: false,
      actionType: "manual",
      icon: <Clock size={18} className="text-purple-500" />,
      dueDate: "Expected by Apr 15"
    },
    {
      id: "5",
      title: "Activate Revify",
      description: "Your Revify instance will be activated with your data integrated.",
      completed: false,
      clientAction: false,
      actionType: "manual",
      icon: <Clock size={18} className="text-purple-500" />,
      dueDate: "Expected by Apr 20"
    },
    {
      id: "6",
      title: "Schedule Initial Diagnostic Review",
      description: "Schedule a call to review initial findings and next steps.",
      completed: false,
      clientAction: true,
      actionType: "link",
      actionTarget: "https://calendly.com/revify-team/diagnostic-review",
      icon: <Calendar size={18} className="text-green-500" />,
      dueDate: "Due by Apr 22"
    },
  ]);
  
  const handleToggleChecklist = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleToggleItem = (id: string) => {
    setChecklistItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    // Show a toast when an item is marked complete
    const item = checklistItems.find(item => item.id === id);
    if (item && !item.completed) {
      toast({
        title: "Task completed",
        description: `You've completed: ${item.title}`,
        className: "bg-green-50 text-green-900 border-green-200",
      });
    }
  };
  
  const completedCount = checklistItems.filter(item => item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;
  
  // Calculate the stage based on completed items
  const getStage = () => {
    if (completedCount === 0) return "Getting Started";
    if (completedCount <= 2) return "Initial Setup";
    if (completedCount <= 4) return "Data Integration";
    return "Final Configuration";
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      isFirstTimeUser && !isExpanded ? "shadow-lg ring-2 ring-primary/20" : ""
    )}>
      <CardHeader className={cn(
        "pb-3",
        isFirstTimeUser && !isExpanded ? "bg-primary/5" : ""
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Onboarding Checklist</CardTitle>
            {isFirstTimeUser && !isExpanded && (
              <Badge variant="default" className="ml-2">New</Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleToggleChecklist}
            aria-label={isExpanded ? "Collapse checklist" : "Expand checklist"}
            className="hover:bg-primary/10"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        <CardDescription>
          {completedCount === checklistItems.length 
            ? "All steps completed! Your Revify account is fully configured."
            : `Complete these steps to fully set up your Revify account (Stage: ${getStage()})`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium flex items-center gap-2">
            <span>Progress: {completedCount} of {checklistItems.length} complete</span>
            {completedCount === checklistItems.length && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                All complete!
              </span>
            )}
          </div>
          <div className="text-sm font-medium">{Math.round(progress)}%</div>
        </div>
        <Progress 
          value={progress} 
          className={cn(
            "h-2 transition-colors", 
            progress === 100 ? "bg-green-100" : ""
          )} 
        />
        
        {!isExpanded && completedCount < checklistItems.length && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-dashed border-primary/40 hover:border-primary/70 hover:bg-primary/5"
              onClick={handleToggleChecklist}
            >
              View {checklistItems.length - completedCount} pending tasks
            </Button>
          </div>
        )}
        
        {isExpanded && (
          <div className="space-y-4 mt-4">
            {checklistItems.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "p-4 border rounded-lg transition-all duration-200 hover:border-primary/30",
                  item.completed 
                    ? "bg-muted/30 border-muted-foreground/20" 
                    : item.clientAction 
                      ? "bg-card border-primary/10 hover:bg-primary/5" 
                      : "bg-card/50 border-muted"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center pt-0.5">
                    <Checkbox 
                      id={`checklist-item-${item.id}`} 
                      checked={item.completed}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      disabled={!item.clientAction}
                    />
                  </div>
                  <div className="grid gap-1.5 leading-none flex-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`checklist-item-${item.id}`}
                        className={cn(
                          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2",
                          item.completed && "line-through text-muted-foreground"
                        )}
                      >
                        {item.icon}
                        {index + 1}. {item.title}
                      </label>
                      {!item.clientAction && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                          Revify Action
                        </span>
                      )}
                      {item.dueDate && !item.completed && (
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full ml-auto",
                          item.dueDate.includes("Due") 
                            ? "bg-amber-50 text-amber-800" 
                            : "bg-blue-50 text-blue-800"
                        )}>
                          {item.dueDate}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.actionType === "link" && item.actionTarget && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-primary/5 border-primary/20 hover:bg-primary/10" 
                          asChild
                        >
                          <a 
                            href={item.actionTarget} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink size={14} className="mr-2" />
                            {item.title === "Complete Questionnaire" ? "Open Questionnaire" : "Schedule Call"}
                          </a>
                        </Button>
                      )}
                      {item.actionType === "upload" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                          onClick={() => window.location.href = '/data-uploads'}
                        >
                          <Upload size={14} className="mr-2" />
                          Upload Files
                        </Button>
                      )}
                    </div>
                  </div>
                  {item.completed && (
                    <div className="ml-auto">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check size={12} className="text-green-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      {isExpanded && (
        <CardFooter className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={handleToggleChecklist}
          >
            Collapse Checklist
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OnboardingChecklist;
