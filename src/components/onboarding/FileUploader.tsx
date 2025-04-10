
import React, { useState, useEffect } from "react";
import { UploadCloud, File, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  uploadFile, 
  getUserFiles, 
  deleteFile,
  checkRequiredDocuments
} from "@/utils/fileUtils";
import { 
  UploadedFile, 
  DocumentCategory, 
  DOCUMENT_CATEGORIES, 
  REQUIRED_DOCUMENTS 
} from "@/types/onboarding";
import { useAuth } from "@/contexts/auth-context";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FileUploaderProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onVerificationStatusChange?: (status: ReturnType<typeof checkRequiredDocuments>) => void;
  categories?: DocumentCategory[];
}

export function FileUploader({ 
  onUploadComplete, 
  onVerificationStatusChange,
  categories = Object.keys(DOCUMENT_CATEGORIES) as DocumentCategory[]
}: FileUploaderProps) {
  const { toast } = useToast();
  const { state } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('general');
  const userId = state.user?.id || "demo-user";
  
  // Load existing files on component mount
  useEffect(() => {
    loadUserFiles();
  }, [userId]);
  
  // Check document verification status when files change
  useEffect(() => {
    const verificationStatus = checkRequiredDocuments(userId, REQUIRED_DOCUMENTS);
    if (onVerificationStatusChange) {
      onVerificationStatusChange(verificationStatus);
    }
  }, [files, userId, onVerificationStatusChange]);

  const loadUserFiles = () => {
    const userFiles = getUserFiles(userId);
    setFiles(userFiles);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    try {
      // Upload the file with category
      const uploadedFile = await uploadFile(file, userId, selectedCategory);
      
      // Update local state
      setFiles(prev => [...prev, uploadedFile]);
      
      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete(uploadedFile);
      }
      
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded as ${DOCUMENT_CATEGORIES[selectedCategory as DocumentCategory]} and is pending verification.`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const success = deleteFile(fileId);
    if (success) {
      setFiles(prev => prev.filter(file => file.id !== fileId));
      toast({
        title: "File deleted",
        description: "The file has been successfully removed.",
      });
    }
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-[#68b046]" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: UploadedFile['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-[#68b046]">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    }
  };

  // Calculate upload progress
  const verificationStatus = checkRequiredDocuments(userId, REQUIRED_DOCUMENTS);
  const uploadProgress = Math.round(
    (verificationStatus.uploaded.length / REQUIRED_DOCUMENTS.length) * 100
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Document Type</label>
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as DocumentCategory)}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {DOCUMENT_CATEGORIES[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto">
          <Button 
            disabled={isUploading} 
            className="w-full md:w-auto bg-[#68b046] hover:bg-[#72c90a]"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      </div>

      {/* Required Documents Status */}
      {REQUIRED_DOCUMENTS.length > 0 && (
        <div className="border rounded-lg p-4 bg-background">
          <h4 className="font-medium mb-2">Required Documents</h4>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
          <div className="space-y-2">
            {REQUIRED_DOCUMENTS.map((category) => {
              const isUploaded = verificationStatus.uploaded.includes(category);
              const isVerified = verificationStatus.verified.includes(category);
              const isRejected = verificationStatus.rejected.includes(category);
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isVerified ? (
                      <CheckCircle className="h-4 w-4 text-[#68b046]" />
                    ) : (
                      <div className={`h-2 w-2 rounded-full ${
                        isRejected ? 'bg-red-500' : 
                        isUploaded ? 'bg-yellow-400' : 'bg-gray-300'
                      }`} />
                    )}
                    <span>{DOCUMENT_CATEGORIES[category as DocumentCategory]}</span>
                  </div>
                  <div>
                    {isRejected && <Badge variant="destructive">Rejected</Badge>}
                    {isUploaded && !isVerified && !isRejected && 
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>}
                    {isVerified && <Badge className="bg-[#68b046]">Verified</Badge>}
                    {!isUploaded && <Badge variant="outline">Required</Badge>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-3 border rounded-md bg-background ${
                  file.status === 'rejected' ? 'border-red-200 bg-red-50' : 
                  file.status === 'verified' ? 'border-green-200 bg-green-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {file.name}
                      {getStatusIcon(file.status)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {new Date(file.uploadedAt).toLocaleString()}
                      </p>
                      {file.category && (
                        <Badge variant="outline" className="text-xs">
                          {DOCUMENT_CATEGORIES[file.category as DocumentCategory] || file.category}
                        </Badge>
                      )}
                      {getStatusBadge(file.status)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
