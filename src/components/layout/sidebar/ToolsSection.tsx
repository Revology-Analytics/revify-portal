
import { Search, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolsSection() {
  return (
    <div className="w-full space-y-1">
      <button
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        onClick={() => {
          // Open feedback form
        }}
      >
        <MessageSquare size={18} />
        <span>Give feedback</span>
      </button>
      <button
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        onClick={() => {
          // Open help documentation
        }}
      >
        <HelpCircle size={18} />
        <span>Learn more</span>
      </button>
    </div>
  );
}
