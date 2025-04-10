
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AuthBackground } from "@/components/auth/AuthBackground";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Check if token exists
    if (!token) {
      toast({
        title: "Invalid token",
        description: "The reset token is missing. Please request a new password reset.",
        variant: "destructive",
      });
      navigate("/forgot-password");
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this would call the API to reset the password
      console.log("Resetting password with token:", token);
      
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative">
      {/* Dynamic background */}
      <AuthBackground />
      
      <div className="w-full max-w-md relative z-10">
        <Card className="w-full shadow-lg border-green-base/20 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img
                src="/lovable-uploads/c6574cfa-11f0-4c58-8f1e-962b252ae14f.png"
                alt="Analytics Dashboard"
                className="w-20 h-20 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Create a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!token ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Invalid or missing reset token. Please request a new password reset.
                </p>
                <Button
                  variant="default"
                  className="w-full bg-green-base hover:bg-green-hover"
                  onClick={() => navigate("/forgot-password")}
                >
                  Request new reset link
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-green-base hover:bg-green-hover" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      "Reset password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
