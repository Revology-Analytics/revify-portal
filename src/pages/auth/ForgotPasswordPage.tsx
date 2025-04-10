
import { useState } from "react";
import { Link } from "react-router-dom";
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
  CardFooter,
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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call the API to send a reset email
      console.log("Sending password reset email to:", data.email);
      
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
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
                src="/lovable-uploads/78ce9c1d-4a0e-48f9-b47b-d2ed2bacdbe5.png"
                alt="Revify Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email and we'll send you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to your email. Please check your inbox.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-green-base text-green-base hover:bg-green-base hover:text-white"
                  onClick={() => setEmailSent(false)}
                >
                  Send again
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-green-base hover:bg-green-hover" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              <Link to="/login" className="text-green-base font-semibold hover:underline">
                Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
