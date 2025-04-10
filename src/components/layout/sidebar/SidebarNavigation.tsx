
import { useLocation, useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarNavigationProps {
  items: NavItem[];
  currentPath: string;
}

export function SidebarNavigation({ items, currentPath }: SidebarNavigationProps) {
  const navigate = useNavigate();
  
  return (
    <div className="w-full space-y-1">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            currentPath === item.path 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
        >
          <item.icon size={18} />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}
