
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar, ArrowRight, FileText, Timer } from "lucide-react";

// Custom hook for checklist management
import { useChecklist } from "@/hooks/useChecklist";

// Components
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { ChecklistSection } from "@/components/dashboard/ChecklistSection";
import { FileUploadSection } from "@/components/dashboard/FileUploadSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";
import ConsultingTierBox from "@/components/dashboard/ConsultingTierBox";
import SupportForm from "@/components/dashboard/SupportForm";
import WelcomeOnboarding from "@/components/onboarding/WelcomeOnboarding";

const DashboardPage = () => {
  const { toast } = useToast();
  const { state } = useAuth();
  const userId = state.user?.id || "demo-user";
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Check if the user has completed onboarding
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    // Show welcome screen for new users
    setShowWelcome(!onboardingComplete);
  }, []);
  
  const {
    checklist,
    loadUserFiles,
    updateTaskCompletion,
    areRequiredDocumentsUploaded,
    setDocumentStatus,
    getProgress
  } = useChecklist(userId);
  
  // Calculate progress values
  const progress = getProgress();
  const completedItems = checklist.filter((item) => item.completed).length;
  
  // Handle file upload completion
  const handleFileUploadComplete = (file: any) => {
    loadUserFiles(); // Reload files after upload
    
    toast({
      title: "Document uploaded",
      description: `${file.name} has been uploaded and will be reviewed.`,
    });
  };

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Mock benefits for the consulting tier
  const eliteBenefits = [
    "Priority support with 2-hour response time",
    "Weekly strategy calls with your dedicated consultant",
    "Custom AI model training for your specific data",
    "Unlimited data processing capacity",
    "Executive quarterly business review"
  ];

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/50">
        <WelcomeOnboarding userName={state.user?.name || "Client"} />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              {currentDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Timer size={16} />
              Activity Log
            </Button>
            <Button size="sm" className="gap-2">
              <Calendar size={16} />
              Schedule Call
            </Button>
          </div>
        </div>

        {/* Onboarding Checklist */}
        <OnboardingChecklist clientName={state.user?.name || "Client"} />

        <ConsultingTierBox 
          tier="Elite" 
          description="Premium access to all Revify services and features with priority support and dedicated consulting" 
          benefits={eliteBenefits}
          showDetails={true}
        />

        {/* Main Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" size={20} />
                Recent Files
              </CardTitle>
              <CardDescription>
                Your recently uploaded files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <p>No files have been uploaded recently</p>
                <p className="text-sm mt-1">Upload files to see them here</p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => window.location.href = '/data-uploads'}>
                View All Files
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common actions and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/data-uploads">
                  <Calendar className="mr-2" size={18} />
                  Schedule Data Upload
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://revify.com/pricing-calculator" target="_blank" rel="noopener noreferrer">
                  <Calculator className="mr-2" size={18} />
                  Pricing Calculator
                </a>
              </Button>
              <SupportForm 
                defaultName={state.user?.name || ""} 
                defaultEmail={state.user?.email || ""}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
