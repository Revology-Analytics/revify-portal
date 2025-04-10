
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
  requiredDocuments?: DocumentCategory[];
}

export interface Checklist {
  id: string;
  title: string;
  description?: string;
  items: ChecklistItem[];
  assignedTo?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserOnboarding {
  userId: string;
  checklistId: string;
  progress: number;
  completedItems: string[];
  startedAt: string;
  lastUpdatedAt: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  userId: string;
  uploadedAt: string;
  category?: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt: string | null;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: "google" | "openai" | "gemini" | "pinecone" | "notion";
  createdAt: string;
  lastUsed?: string;
}

export type DocumentCategory = 
  | 'id_verification'
  | 'address_proof'
  | 'business_certificate'
  | 'tax_document'
  | 'company_logo'
  | 'general';

export const DOCUMENT_CATEGORIES: Record<DocumentCategory, string> = {
  id_verification: 'ID Verification',
  address_proof: 'Proof of Address',
  business_certificate: 'Business Certificate',
  tax_document: 'Tax Document',
  company_logo: 'Company Logo',
  general: 'General Document'
};

export const REQUIRED_DOCUMENTS: DocumentCategory[] = [
  'id_verification',
  'address_proof',
  'business_certificate',
];
