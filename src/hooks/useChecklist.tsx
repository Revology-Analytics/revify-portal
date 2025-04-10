
import { useState, useEffect } from "react";
import { ChecklistItem, DocumentCategory } from "@/types/onboarding";
import { 
  getUserFiles, 
  getUserFilesByCategory, 
  checkRequiredDocuments 
} from "@/utils/fileUtils";

export const useChecklist = (userId: string) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [documentStatus, setDocumentStatus] = useState<any>(null);
  
  // Initialize checklist from localStorage or create new one
  useEffect(() => {
    const savedChecklist = localStorage.getItem(`user_checklist_${userId}`);
    
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    } else {
      // Initial checklist if none exists
      const initialChecklist: ChecklistItem[] = [
        {
          id: "1",
          title: "Complete your profile",
          description: "Fill in all required profile information",
          completed: false,
          order: 1,
          requiredDocuments: [],
        },
        {
          id: "2",
          title: "Upload company logo",
          description: "Add your company logo for branding",
          completed: false,
          order: 2,
          requiredDocuments: ["company_logo" as DocumentCategory],
        },
        {
          id: "3",
          title: "Provide business details",
          description: "Enter your business information and address",
          completed: false,
          order: 3,
          requiredDocuments: [],
        },
        {
          id: "4",
          title: "Upload required documents",
          description: "Submit necessary legal and business documents",
          completed: false,
          order: 4,
          requiredDocuments: ["id_verification", "address_proof", "business_certificate"] as DocumentCategory[],
        },
        {
          id: "5",
          title: "Review terms and conditions",
          description: "Read and accept the terms of service",
          completed: false,
          order: 5,
          requiredDocuments: [],
        },
      ];
      
      setChecklist(initialChecklist);
      localStorage.setItem(`user_checklist_${userId}`, JSON.stringify(initialChecklist));
    }
    
    // Load user files
    loadUserFiles();
  }, [userId]);
  
  // Check if document upload task should be completed based on file uploads
  useEffect(() => {
    if (userFiles.length > 0) {
      const requiredDocsStatus = checkRequiredDocuments(
        userId, 
        ["id_verification", "address_proof", "business_certificate"]
      );
      setDocumentStatus(requiredDocsStatus);
      
      // Auto-complete the document upload task if all required documents are uploaded and verified
      if (requiredDocsStatus?.complete) {
        updateTaskCompletion("4", true);
      }
    }
  }, [userFiles]);
  
  // Load user files from storage
  const loadUserFiles = () => {
    const files = getUserFiles(userId);
    setUserFiles(files);
  };

  // Calculate progress
  const getProgress = () => {
    const completedItems = checklist.filter((item) => item.completed).length;
    return checklist.length > 0 ? Math.round((completedItems / checklist.length) * 100) : 0;
  };

  // Update task completion status
  const updateTaskCompletion = (taskId: string, isCompleted: boolean) => {
    const updatedChecklist = checklist.map(item => {
      if (item.id === taskId) {
        return { ...item, completed: isCompleted };
      }
      return item;
    });
    
    setChecklist(updatedChecklist);
    localStorage.setItem(`user_checklist_${userId}`, JSON.stringify(updatedChecklist));
  };

  // Check if the required documents for a task are uploaded
  const areRequiredDocumentsUploaded = (task: ChecklistItem): boolean => {
    if (!task.requiredDocuments || task.requiredDocuments.length === 0) {
      return true; // No documents required for this task
    }
    
    // For each required document category, check if it's uploaded
    for (const category of task.requiredDocuments) {
      const filesInCategory = getUserFilesByCategory(userId, category);
      if (filesInCategory.length === 0) {
        return false; // Missing at least one required document
      }
    }
    
    return true;
  };

  return {
    checklist,
    userFiles,
    documentStatus,
    loadUserFiles,
    setDocumentStatus,
    updateTaskCompletion,
    areRequiredDocumentsUploaded,
    getProgress,
  };
};
