
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const AdminChecklists = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simulated checklist templates data
  const [templates, setTemplates] = useState([
    {
      id: "template-1",
      title: "New Client Onboarding",
      description: "Standard onboarding process for new clients",
      itemCount: 10,
    },
    {
      id: "template-2",
      title: "Enterprise Client Onboarding",
      description: "Extended onboarding for enterprise clients",
      itemCount: 15,
    },
  ]);
  
  // Simulated assigned checklists data
  const [assignments, setAssignments] = useState([
    {
      id: "assignment-1",
      userId: "user-1",
      userName: "Test User",
      templateId: "template-1",
      templateName: "New Client Onboarding",
      progress: 30,
      assignedDate: "2023-06-15",
    },
    {
      id: "assignment-2",
      userId: "user-2",
      userName: "Jane Smith",
      templateId: "template-2",
      templateName: "Enterprise Client Onboarding",
      progress: 75,
      assignedDate: "2023-07-10",
    },
  ]);

  // Handle click events
  const handleCreateChecklist = () => navigate("/admin/checklists/create");
  
  const handleEditChecklist = (id: string) => {
    navigate(`/admin/checklists/edit/${id}`);
  };
  
  const handleDuplicateChecklist = (id: string) => {
    // In a real app, you'd make an API call to duplicate the checklist
    const templateToDuplicate = templates.find(t => t.id === id);
    
    if (templateToDuplicate) {
      toast({
        title: "Duplicating checklist",
        description: `Creating a copy of ${templateToDuplicate.title}`,
      });
      
      // For demo purposes, navigate to create with query param
      navigate(`/admin/checklists/create?duplicate=${id}`);
    }
  };
  
  const handleAssignChecklist = (id: string) => {
    navigate(`/admin/checklists/assign/${id}`);
  };
  
  const handleViewAssignment = (id: string) => {
    navigate(`/admin/checklists/view-assignment/${id}`);
  };
  
  const handleEditAssignment = (id: string) => {
    navigate(`/admin/checklists/edit-assignment/${id}`);
  };
  
  const handleDeleteAssignment = (id: string) => {
    // In a real app, you'd make an API call to delete the assignment
    setAssignments(assignments.filter(a => a.id !== id));
    
    toast({
      title: "Assignment deleted",
      description: "The checklist assignment has been removed",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Checklist Management
        </h1>
        <p className="text-muted-foreground">
          Create, edit, and assign checklists to users.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Onboarding Checklists</h2>
          </div>
          <Button onClick={handleCreateChecklist}>
            <Plus className="h-4 w-4 mr-2" />
            Create Checklist
          </Button>
        </div>

        <Tabs defaultValue="templates">
          <TabsList>
            <TabsTrigger value="templates">Checklist Templates</TabsTrigger>
            <TabsTrigger value="assigned">Assigned Checklists</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Templates</CardTitle>
                <CardDescription>
                  Manage your checklist templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {templates.map(template => (
                    <div 
                      key={template.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.itemCount} items - {template.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditChecklist(template.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateChecklist(template.id)}
                        >
                          Duplicate
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAssignChecklist(template.id)}
                        >
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assigned" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assignments..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Assigned Checklists</CardTitle>
                <CardDescription>
                  View checklists assigned to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="py-3 px-4 text-left">User</th>
                        <th className="py-3 px-4 text-left">Checklist</th>
                        <th className="py-3 px-4 text-left">Progress</th>
                        <th className="py-3 px-4 text-left">Assigned Date</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map(assignment => (
                        <tr key={assignment.id} className="border-t">
                          <td className="py-3 px-4">{assignment.userName}</td>
                          <td className="py-3 px-4">{assignment.templateName}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 w-24 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`${
                                    assignment.progress === 100 
                                      ? "bg-green-500" 
                                      : "bg-primary"
                                  } h-full rounded-full`}
                                  style={{ width: `${assignment.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{assignment.progress}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{assignment.assignedDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewAssignment(assignment.id)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditAssignment(assignment.id)}
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminChecklists;
