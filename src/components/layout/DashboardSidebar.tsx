
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Settings, 
  Users, 
  CheckSquare, 
  Key, 
  LogOut,
  Search,
  FileUp,
  UploadCloud,
  BarChart3,
  Wallet
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserMenu } from "./sidebar/UserMenu";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { ToolsSection } from "./sidebar/ToolsSection";

interface DashboardSidebarProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardSidebarProps) {
  const { state } = useAuth();
  const isAdmin = state.user?.role === "admin";
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-end p-4 border-b">
          <UserMenu />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export function DashboardSidebar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = state.user?.role === "admin";
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userNavItems = [
    {
      name: "Find",
      path: "/dashboard",
      icon: Search,
    },
    {
      name: "Knowledge Hub",
      path: "/knowledge-hub",
      icon: FileText,
    },
    {
      name: "Opportunities",
      path: "/opportunities",
      icon: Wallet,
    },
    {
      name: "Data Uploads",
      path: "/data-uploads",
      icon: UploadCloud,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const adminNavItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Checklists",
      path: "/admin/checklists",
      icon: CheckSquare,
    },
    {
      name: "Files",
      path: "/admin/files",
      icon: FileUp,
    },
    {
      name: "API Keys",
      path: "/admin/api-keys",
      icon: Key,
    },
    {
      name: "Opportunities",
      path: "/admin/opportunities",
      icon: BarChart3,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-w-[260px] max-w-[260px] bg-sidebar flex flex-col h-full border-r">
      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/lovable-uploads/78ce9c1d-4a0e-48f9-b47b-d2ed2bacdbe5.png"
            alt="Revify Logo"
            className="h-8 w-auto"
          />
          <span className="font-medium text-xs mt-1">Revify</span>
        </div>
        
        <div className="mb-6 relative">
          <Input 
            placeholder="Search..." 
            className="w-full bg-sidebar-accent/20 border-sidebar-border pl-9"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        
        <div className="mb-6">
          <SidebarNavigation items={navItems} currentPath={currentPath} />
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <ToolsSection />
        
        <div className="mt-3">
          <Button 
            variant="ghost" 
            className="flex w-full items-center gap-3 justify-start px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground" 
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
