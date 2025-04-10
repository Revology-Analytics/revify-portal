
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  User,
  FileText,
  CalendarDays
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const ViewAssignedChecklist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const location = useLocation();
  const isEditable = location.pathname.includes("edit-assignment");
  
  // Mock data that would normally be fetched from API
  const [assignmentData, setAssignmentData] = useState({
    id: id,
    checklistTitle: "New Client Onboarding",
    assignedTo: {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
      avatar: "",
    },
    progress: 30,
    assignedDate: "2023-06-15",
    dueDate: "2023-07-15",
    lastUpdated: "2023-06-20",
    items: [
      {
        id: "item-1",
        text: "Collect client information",
        description: "Gather basic contact and business details",
        required: true,
        completed: true,
        completedOn: "2023-06-16",
      },
      {
        id: "item-2",
        text: "Set up initial meeting",
        description: "Schedule kickoff call with the client",
        required: true,
        completed: true,
        completedOn: "2023-06-18",
      },
      {
        id: "item-3",
        text: "Document requirements",
        description: "Capture detailed project requirements",
        required: true,
        completed: false,
        completedOn: null,
      },
      {
        id: "item-4",
        text: "Create project timeline",
        description: "Develop schedule for project milestones",
        required: true,
        completed: false,
        completedOn: null,
      },
      {
        id: "item-5",
        text: "Set up project tools",
        description: "Configure project management and communication tools",
        required: false,
        completed: false,
        completedOn: null,
      },
    ],
  });

  // Toggle completion status of an item
  const toggleItemCompletion = (itemId: string) => {
    if (!isEditable) return;
    
    const newItems = assignmentData.items.map(item => {
      if (item.id === itemId) {
        const newCompleted = !item.completed;
        return {
          ...item,
          completed: newCompleted,
          completedOn: newCompleted ? new Date().toISOString().split('T')[0] : null,
        };
      }
      return item;
    });
    
    // Calculate new progress
    const completedCount = newItems.filter(item => item.completed).length;
    const newProgress = Math.round((completedCount / newItems.length) * 100);
    
    setAssignmentData({
      ...assignmentData,
      items: newItems,
      progress: newProgress,
    });
  };

  // Save changes
  const handleSaveChanges = () => {
    // Here would be API call to update the checklist assignment
    toast({
      title: "Changes saved",
      description: "The checklist progress has been updated.",
    });
    navigate("/admin/checklists");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/checklists")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditable ? "Edit Assigned Checklist" : "View Assigned Checklist"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{assignmentData.checklistTitle}</span>
              <Badge variant={assignmentData.progress === 100 ? "success" : "default"}>
                {assignmentData.progress}% Complete
              </Badge>
            </CardTitle>
            <CardDescription>
              Assignment details and progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Assignment Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-md">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={assignmentData.assignedTo.avatar} />
                      <AvatarFallback>
                        {assignmentData.assignedTo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{assignmentData.assignedTo.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-md">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Date</p>
                  <p className="font-medium mt-1">{assignmentData.assignedDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium mt-1">{assignmentData.dueDate}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm font-medium">{assignmentData.progress}%</p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    assignmentData.progress === 100 
                      ? "bg-green-500" 
                      : "bg-primary"
                  }`}
                  style={{ width: `${assignmentData.progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Last updated: {assignmentData.lastUpdated}
              </p>
            </div>

            {/* Checklist Items */}
            <div>
              <h3 className="font-semibold mb-3">Checklist Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Required</TableHead>
                    <TableHead className="hidden md:table-cell">Completed On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignmentData.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {isEditable ? (
                          <Checkbox 
                            checked={item.completed}
                            onCheckedChange={() => toggleItemCompletion(item.id)}
                          />
                        ) : (
                          item.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300" />
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.text}</div>
                        <div className="md:hidden text-sm text-muted-foreground mt-1">
                          {item.description}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{item.description}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.required ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.completedOn || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          {isEditable && (
            <CardFooter className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/checklists")}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ViewAssignedChecklist;
