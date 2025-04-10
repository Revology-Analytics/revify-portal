
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileUp,
  Calendar,
  ArrowUpRight,
  Check,
  UploadCloud,
  File
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DataUploadsPage = () => {
  const { state } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock data - in a real app, this would come from an API
  const uploadHistory = [
    {
      id: 1,
      filename: "sales_data_march_2025.csv",
      size: "4.2 MB",
      uploadedAt: "2025-03-28 14:32",
      status: "processed"
    },
    {
      id: 2,
      filename: "customer_feedback_q1.xlsx",
      size: "1.8 MB",
      uploadedAt: "2025-03-15 09:17",
      status: "processed"
    },
    {
      id: 3,
      filename: "inventory_levels_2025.csv",
      size: "5.6 MB",
      uploadedAt: "2025-03-01 11:45",
      status: "processed"
    }
  ];

  const handleUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  // Determine the next upload due date (just a simulation)
  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
  const nextUploadDate = `${nextMonth.toLocaleString('default', { month: 'long' })} 5, ${nextMonth.getFullYear()}`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Uploads</h1>
        <p className="text-muted-foreground">
          Upload your data files and track your submission history.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UploadCloud className="mr-2" size={20} />
                Upload New Data
              </CardTitle>
              <CardDescription>
                Upload your latest data files for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploading ? (
                <div className="space-y-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-center">{uploadProgress}% complete</p>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleUpload}>
                  <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium mb-1">Drag and drop files here</p>
                  <p className="text-sm text-muted-foreground mb-3">or click to browse</p>
                  <Button size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}>
                    Select Files
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 py-3">
              <div className="flex items-center text-sm">
                <Calendar size={14} className="mr-1" />
                <span>Next upload due: <strong>{nextUploadDate}</strong></span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <a href="https://drive.google.com/drive/folders/client-specific-folder" target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight size={12} className="mr-1" />
                  Go to Google Drive
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" size={20} />
                Upload Schedule
              </CardTitle>
              <CardDescription>
                Your data submission schedule and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Weekly Sales Data</p>
                      <p className="text-xs text-muted-foreground">Every Monday</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Up to date
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Monthly Financial Report</p>
                      <p className="text-xs text-muted-foreground">By the 5th of each month</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    Due in 7 days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>
                Your recent data submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium">File Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Size</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Uploaded</th>
                      <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadHistory.map((file) => (
                      <tr key={file.id} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <File size={16} className="mr-2 text-muted-foreground" />
                            <span className="font-medium">{file.filename}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {file.size}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {file.uploadedAt}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check size={12} className="mr-1" />
                            {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataUploadsPage;
