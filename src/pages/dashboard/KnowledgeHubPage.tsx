
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardSidebar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const KnowledgeHubPage = () => {
  // Add event listeners to disable inspect element
  useEffect(() => {
    const disableInspect = () => {
      // Disable right-click context menu
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      // Disable keyboard shortcuts for inspect element
      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable F12 key
        if (e.key === "F12") {
          e.preventDefault();
        }

        // Disable Ctrl+Shift+I / Cmd+Option+I
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
          e.preventDefault();
        }

        // Disable Ctrl+Shift+C / Cmd+Option+C
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c")) {
          e.preventDefault();
        }

        // Disable Ctrl+Shift+J / Cmd+Option+J
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
          e.preventDefault();
        }

        // Disable Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
          e.preventDefault();
        }
      };

      // Add event listeners
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);

      // Clean up event listeners when component unmounts
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    };

    const cleanup = disableInspect();
    return cleanup;
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Seamless full-width card with iframe only */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="min-h-[80vh]">
              <iframe 
                src="https://knowledgehub-revology.notion.site/ebd/1730db3d2d0880b3b471e47957635bfa?v=1730db3d2d088142a724000cff9fddb8" 
                width="100%" 
                height="100%" 
                style={{ 
                  border: "none",
                  height: "80vh",
                  borderRadius: "0.5rem" 
                }} 
                title="Revify Knowledge Hub"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        {/* Hidden information cards section for mobile view only */}
        <div className="md:hidden mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">Getting Started</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Platform overview</li>
                  <li>Account setup guide</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">FAQ & Support</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Common questions</li>
                  <li>Contact support team</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeHubPage;
