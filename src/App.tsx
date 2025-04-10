
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth/auth-guard";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import KnowledgeHubPage from "./pages/dashboard/KnowledgeHubPage";
import OpportunitiesPage from "./pages/dashboard/OpportunitiesPage";
import DataUploadsPage from "./pages/dashboard/DataUploadsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminChecklists from "./pages/admin/AdminChecklists";
import AdminApiKeys from "./pages/admin/AdminApiKeys";
import AdminFiles from "./pages/admin/AdminFiles";
import AdminOpportunities from "./pages/admin/AdminOpportunities"; 
import ChecklistEditor from "./pages/admin/ChecklistEditor";
import AssignChecklist from "./pages/admin/AssignChecklist";
import ViewAssignedChecklist from "./pages/admin/ViewAssignedChecklist";

// Create the QueryClient outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* User Routes */}
              <Route element={<AuthGuard requiredRole="user" />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
                <Route path="/opportunities" element={<OpportunitiesPage />} />
                <Route path="/data-uploads" element={<DataUploadsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AuthGuard requiredRole="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/checklists" element={<AdminChecklists />} />
                <Route path="/admin/checklists/create" element={<ChecklistEditor />} />
                <Route path="/admin/checklists/edit/:id" element={<ChecklistEditor />} />
                <Route path="/admin/checklists/assign/:id" element={<AssignChecklist />} />
                <Route path="/admin/checklists/view-assignment/:id" element={<ViewAssignedChecklist />} />
                <Route path="/admin/checklists/edit-assignment/:id" element={<ViewAssignedChecklist />} />
                <Route path="/admin/api-keys" element={<AdminApiKeys />} />
                <Route path="/admin/files" element={<AdminFiles />} />
                <Route path="/admin/opportunities" element={<AdminOpportunities />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
