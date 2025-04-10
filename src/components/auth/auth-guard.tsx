
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  requiredRole?: "admin" | "user";
}

export const AuthGuard = ({ requiredRole }: AuthGuardProps) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!state.isLoading && !state.isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    // If role is required and user doesn't have it, redirect based on their role
    if (
      !state.isLoading &&
      state.isAuthenticated &&
      requiredRole &&
      state.user?.role !== requiredRole
    ) {
      if (state.user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [state.isLoading, state.isAuthenticated, state.user, navigate, requiredRole]);

  // Show loading state while checking authentication
  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication check is complete and user is authenticated
  if (!state.isLoading && state.isAuthenticated) {
    // If role is required and user has it, or no role is required
    if (!requiredRole || state.user?.role === requiredRole) {
      return <Outlet />;
    }
  }

  // This should not be reached due to the useEffect redirects,
  // but it's a fallback to avoid returning null
  return null;
};
