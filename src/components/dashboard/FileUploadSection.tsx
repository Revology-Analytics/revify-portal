
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { FileUploader } from "@/components/onboarding/FileUploader";

interface FileUploadSectionProps {
  onFileUploadComplete: (file: any) => void;
  onVerificationStatusChange: (status: any) => void;
}

export const FileUploadSection = ({
  onFileUploadComplete,
  onVerificationStatusChange,
}: FileUploadSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUp className="h-5 w-5" /> Document Upload
        </CardTitle>
        <CardDescription>
          Upload required documents for your onboarding process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploader 
          onUploadComplete={onFileUploadComplete}
          onVerificationStatusChange={onVerificationStatusChange}
        />
      </CardContent>
    </Card>
  );
};
