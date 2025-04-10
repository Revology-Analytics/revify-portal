import { UploadedFile } from "@/types/onboarding";

/**
 * Upload file to the server
 * @param file File to upload
 * @param userId User ID who uploaded the file
 * @param category File category/type for verification purposes
 * @returns Promise with uploaded file metadata
 */
export const uploadFile = async (
  file: File, 
  userId: string, 
  category?: string
): Promise<UploadedFile> => {
  // In a real app, you would upload to a server/cloud storage
  // This is a mock implementation
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create a file record
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        userId: userId,
        category: category || 'general',
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        verifiedAt: null,
      };
      
      // Store in localStorage for demo purposes
      const existingFiles = getUploadedFiles();
      localStorage.setItem('uploadedFiles', JSON.stringify([...existingFiles, uploadedFile]));
      
      resolve(uploadedFile);
    }, 1000);
  });
};

/**
 * Get all uploaded files
 * @returns Array of uploaded files
 */
export const getUploadedFiles = (): UploadedFile[] => {
  const filesJson = localStorage.getItem('uploadedFiles');
  return filesJson ? JSON.parse(filesJson) : [];
};

/**
 * Get uploaded files for a specific user
 * @param userId User ID
 * @returns Array of uploaded files for the user
 */
export const getUserFiles = (userId: string): UploadedFile[] => {
  const allFiles = getUploadedFiles();
  return allFiles.filter(file => file.userId === userId);
};

/**
 * Get uploaded files by category for a specific user
 * @param userId User ID
 * @param category File category
 * @returns Array of uploaded files for the user in the specified category
 */
export const getUserFilesByCategory = (userId: string, category: string): UploadedFile[] => {
  const userFiles = getUserFiles(userId);
  return userFiles.filter(file => file.category === category);
};

/**
 * Check if a user has uploaded a file in a specific category
 * @param userId User ID
 * @param category File category
 * @returns Boolean indicating if the file exists
 */
export const hasUserUploadedFileInCategory = (userId: string, category: string): boolean => {
  const files = getUserFilesByCategory(userId, category);
  return files.length > 0;
};

/**
 * Delete a file by ID
 * @param fileId File ID to delete
 * @returns Boolean indicating success
 */
export const deleteFile = (fileId: string): boolean => {
  const allFiles = getUploadedFiles();
  const updatedFiles = allFiles.filter(file => file.id !== fileId);
  
  if (updatedFiles.length < allFiles.length) {
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    return true;
  }
  
  return false;
};

/**
 * Update file verification status
 * @param fileId File ID
 * @param status New status ('pending', 'verified', 'rejected')
 * @returns Boolean indicating success
 */
export const updateFileStatus = (
  fileId: string, 
  status: 'pending' | 'verified' | 'rejected'
): boolean => {
  const allFiles = getUploadedFiles();
  const fileIndex = allFiles.findIndex(file => file.id === fileId);
  
  if (fileIndex === -1) return false;
  
  allFiles[fileIndex] = {
    ...allFiles[fileIndex],
    status,
    verifiedAt: status === 'pending' ? null : new Date().toISOString(),
  };
  
  localStorage.setItem('uploadedFiles', JSON.stringify(allFiles));
  return true;
};

/**
 * Check if the required documents are uploaded and verified
 * @param userId User ID
 * @param requiredCategories Array of required document categories
 * @returns Object with verification status
 */
export const checkRequiredDocuments = (
  userId: string,
  requiredCategories: string[]
): { 
  complete: boolean; 
  uploaded: string[]; 
  missing: string[];
  verified: string[];
  pending: string[];
  rejected: string[];
} => {
  const userFiles = getUserFiles(userId);
  
  // Group files by category keeping only the latest one for each category
  const categoryFiles: Record<string, UploadedFile> = {};
  userFiles.forEach(file => {
    if (!categoryFiles[file.category] || 
        new Date(file.uploadedAt) > new Date(categoryFiles[file.category].uploadedAt)) {
      categoryFiles[file.category] = file;
    }
  });
  
  const uploaded = Object.keys(categoryFiles);
  const missing = requiredCategories.filter(cat => !uploaded.includes(cat));
  const verified = Object.values(categoryFiles)
    .filter(file => file.status === 'verified')
    .map(file => file.category);
  const pending = Object.values(categoryFiles)
    .filter(file => file.status === 'pending')
    .map(file => file.category);
  const rejected = Object.values(categoryFiles)
    .filter(file => file.status === 'rejected')
    .map(file => file.category);
  
  return {
    complete: missing.length === 0 && rejected.length === 0,
    uploaded,
    missing,
    verified,
    pending,
    rejected
  };
};
