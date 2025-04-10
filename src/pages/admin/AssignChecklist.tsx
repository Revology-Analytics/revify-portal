
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ArrowLeft, CheckSquare, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssignChecklist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  
  // Mock data - in a real app would be fetched from API
  const checklist = {
    id,
    title: "New Client Onboarding",
    description: "Standard onboarding process for new clients",
    itemCount: 10,
  };
  
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", avatar: "" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", avatar: "" },
  ];
  
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<string>("");

  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle assignment
  const handleAssign = () => {
    // Here would be API calls to assign the checklist
    toast({
      title: "Checklist assigned",
      description: `Assigned to ${selectedUsers.length} user(s)`,
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
            Assign Checklist
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checklist Information</CardTitle>
            <CardDescription>
              You're about to assign this checklist to users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <CheckSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{checklist.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {checklist.description}
                  </p>
                  <p className="text-sm mt-1">
                    {checklist.itemCount} items to complete
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Users</CardTitle>
            <CardDescription>
              Choose which users to assign this checklist to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.map((user) => (
              <div 
                key={user.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                  selectedUsers.includes(user.id) ? "bg-primary/5 border-primary/30" : ""
                }`}
                onClick={() => toggleUserSelection(user.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md border flex items-center justify-center">
                  {selectedUsers.includes(user.id) && (
                    <CheckSquare className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div>
              <p className="text-sm font-medium">
                {selectedUsers.length} user(s) selected
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/checklists")}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAssign}
                disabled={selectedUsers.length === 0}
              >
                Assign Checklist
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AssignChecklist;
