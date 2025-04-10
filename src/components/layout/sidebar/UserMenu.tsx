
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";

export function UserMenu() {
  const { state } = useAuth();
  const user = state.user;
  
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>
          {user?.name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user?.name}</span>
        <span className="text-xs text-muted-foreground">{user?.email}</span>
      </div>
    </div>
  );
}
