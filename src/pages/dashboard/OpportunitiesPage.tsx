
import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

const OpportunitiesPage = () => {
  const { state } = useAuth();
  
  // Mock data - in a real app, this would come from an API
  const opportunities = [
    {
      id: 1,
      title: "Inventory Management Optimization",
      description: "Analysis shows potential for 15% reduction in holding costs through improved inventory forecasting.",
      createdAt: "2025-03-28",
      priority: "high",
    },
    {
      id: 2,
      title: "Customer Segmentation Enhancement",
      description: "Current segmentation can be refined to target high-value customer groups more effectively.",
      createdAt: "2025-03-25",
      priority: "medium",
    },
    {
      id: 3,
      title: "Supply Chain Visibility",
      description: "Implement real-time tracking to reduce delivery uncertainties and improve customer satisfaction.",
      createdAt: "2025-03-20",
      priority: "medium",
    }
  ];

  // Mock presentations data
  const presentations = [
    {
      id: 1,
      title: "Q1 2025 Strategy Review",
      date: "2025-03-15",
      link: "https://drive.google.com/file/d/1example"
    },
    {
      id: 2,
      title: "Implementation Roadmap",
      date: "2025-03-01",
      link: "https://drive.google.com/file/d/2example"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Opportunities & Actions</h1>
        <p className="text-muted-foreground">
          Review key opportunities identified by the Revify team and access client-specific presentations.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Consulting Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Elite Consulting Tier</p>
                  <p className="text-sm text-muted-foreground">Premium access to all Revify services and features</p>
                </div>
                <Button variant="outline" size="sm">View Benefits</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Top Opportunities</CardTitle>
              <CardDescription>Key insights identified by the Revify team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div 
                    key={opp.id} 
                    className="p-4 border rounded-lg bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{opp.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">Added {opp.createdAt}</p>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        opp.priority === 'high' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : opp.priority === 'medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      }`}>
                        {opp.priority.charAt(0).toUpperCase() + opp.priority.slice(1)} Priority
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Client Presentations</CardTitle>
              <CardDescription>Access your strategic recommendations and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {presentations.map((presentation) => (
                  <div key={presentation.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-primary/10 rounded">
                        <FileText size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{presentation.title}</p>
                        <p className="text-xs text-muted-foreground">{presentation.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={presentation.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="mr-1" />
                        Open
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href="https://drive.google.com/drive/folders/client-specific-folder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View All in Google Drive
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OpportunitiesPage;
