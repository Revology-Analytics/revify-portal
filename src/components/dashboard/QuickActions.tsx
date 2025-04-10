
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, MoveRight } from "lucide-react";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" /> Knowledge Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Access guides, documentation and resources
          </p>
          <Button 
            variant="outline" 
            className="w-full border-[#68b046] text-[#68b046] hover:bg-[#68b046]/10"
            onClick={() => navigate('/knowledge-hub')}
          >
            Visit Knowledge Hub <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Contact our support team for assistance
          </p>
          <Button 
            variant="secondary" 
            className="w-full bg-[#68b046]/20 hover:bg-[#68b046]/30 text-[#68b046]"
            onClick={() => {
              toast({
                title: "Support request sent",
                description: "A support representative will contact you shortly.",
              });
            }}
          >
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
