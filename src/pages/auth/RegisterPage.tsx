
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AuthBackground } from "@/components/auth/AuthBackground";
import { useToast } from "@/hooks/use-toast";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, state } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setRegistrationComplete(true);
      toast({
        title: "Registration successful",
        description: "Account created successfully. Awaiting approval.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
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
                src="/lovable-uploads/6a698e8c-e0d7-4380-bf89-d405719f85fc.png"
                alt="Revify Logo"
                className="w-48 h-auto object-contain"
              />
            </div>
            <CardDescription className="text-center">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrationComplete ? (
              <div className="space-y-4">
                <Alert className="border-green-base/50 bg-green-base/10">
                  <AlertTitle className="text-green-base">Registration successful!</AlertTitle>
                  <AlertDescription>
                    Your account has been created and is pending admin approval. You will be notified when your account is approved.
                  </AlertDescription>
                </Alert>
                <Button 
                  onClick={() => navigate("/login")} 
                  className="w-full bg-green-base hover:bg-green-hover"
                >
                  Go to Login
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                  {state.error && (
                    <p className="text-sm text-destructive text-center">{state.error}</p>
                  )}
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-base font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
