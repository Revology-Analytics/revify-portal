import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Info, CheckCircle2, LockKeyhole, EyeOff, Eye, ArrowRight, Linkedin } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, state } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [demoCred, setDemoCred] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.isAuthenticated && !state.isLoading) {
      if (state.user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [state.isAuthenticated, state.isLoading, state.user, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setLoginError(null);
    
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const fillAdminCredentials = () => {
    form.setValue("email", "admin@example.com");
    form.setValue("password", "admin123");
    setDemoCred("admin");
    toast({
      title: "Admin credentials filled",
      description: "Click 'Log in' to sign in as an admin",
    });
  };

  const fillUserCredentials = () => {
    form.setValue("email", "user@example.com");
    form.setValue("password", "user123");
    setDemoCred("user");
    toast({
      title: "User credentials filled",
      description: "Click 'Log in' to sign in as a regular user",
    });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const featureSlides = [
    {
      title: "Complete Business Intelligence",
      description: "Gain insights with our powerful analytics dashboard",
      stats: "+21.35%",
      statsPeriod: "last month",
      statsLabel: "Your business growth is accelerating",
    },
    {
      title: "Streamlined Onboarding",
      description: "Get up and running quickly with guided step-by-step process",
      stats: "3x",
      statsPeriod: "faster",
      statsLabel: "Complete onboarding with ease",
    },
    {
      title: "Secure Data Management",
      description: "Your data is protected with enterprise-grade security",
      stats: "99.9%",
      statsPeriod: "uptime",
      statsLabel: "Reliable platform you can trust",
    }
  ];

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2 relative overflow-hidden">
      <AuthBackground />
      
      <div className="flex items-center justify-center p-4 md:p-8 relative z-10">
        <div 
          className={`w-full max-w-md transition-all duration-1000 transform ${
            animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/lovable-uploads/78ce9c1d-4a0e-48f9-b47b-d2ed2bacdbe5.png"
              alt="Revify Logo"
              className="w-48 h-auto object-contain mb-4 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-muted-foreground text-center mt-1">Sign in to continue to your account</p>
          </div>

          <Alert className="mb-6 border-green-base/40 bg-green-light/40 dark:bg-green-base/10 dark:border-green-base/40 auth-card">
            <Info className="h-4 w-4 text-green-base dark:text-green-base" />
            <AlertTitle className="text-green-base dark:text-green-base font-medium">Demo Credentials</AlertTitle>
            <AlertDescription className="text-sm mt-2">
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`w-full text-xs ${demoCred === "admin" ? "bg-green-base text-white dark:bg-green-hover" : ""} border-green-base/50 text-green-base dark:text-green-base dark:border-green-base/50 hover:text-white hover:bg-green-base dark:hover:bg-green-hover transition-colors duration-300`}
                  onClick={fillAdminCredentials}
                >
                  {demoCred === "admin" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                  Admin Login
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`w-full text-xs ${demoCred === "user" ? "bg-green-base text-white dark:bg-green-hover" : ""} border-green-base/50 text-green-base dark:text-green-base dark:border-green-base/50 hover:text-white hover:bg-green-base dark:hover:bg-green-hover transition-colors duration-300`}
                  onClick={fillUserCredentials}
                >
                  {demoCred === "user" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                  User Login
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem 
                    className={`transition-all duration-1000 delay-100 transform ${
                      animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} className="h-12 auth-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem 
                    className={`transition-all duration-1000 delay-200 transform ${
                      animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-darkblue-base dark:text-green-base hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="********" 
                          {...field} 
                          className="h-12 pr-10 auth-input"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div 
                className={`pt-2 transition-all duration-1000 delay-300 transform ${
                  animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-green-base hover:bg-green-hover dark:bg-green-base dark:hover:bg-green-hover text-white auth-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {loginError && (
                <Alert variant="destructive" className="mt-4 animate-fade-in">
                  <AlertDescription className="text-sm">
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}
              
              <div 
                className={`mt-6 transition-all duration-1000 delay-400 transform ${
                  animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-xs text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-11 border-green-base/20 hover:border-green-base/60 transition-colors duration-300">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-11 border-green-base/20 hover:border-green-base/60 transition-colors duration-300">
                    <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          
          <div 
            className={`text-center mt-8 text-sm text-muted-foreground transition-all duration-1000 delay-500 transform ${
              animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Don't have an account?{" "}
            <Link to="/register" className="text-green-base dark:text-green-base font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block relative bg-gradient-to-br from-green-base to-darkblue-base">
        <div className="absolute inset-0 opacity-10 pattern-dots pattern-white pattern-size-4 pattern-offset-[8px]"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-white text-center">
          {featureSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="mb-8">
                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm animate-float">
                  <img
                    src="/lovable-uploads/78ce9c1d-4a0e-48f9-b47b-d2ed2bacdbe5.png"
                    alt="Feature"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-white/80">{slide.description}</p>
              </div>
              
              <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-4 hover:bg-white/15 transition-colors duration-300">
                <div className="text-4xl font-bold">{slide.stats}</div>
                <div className="text-sm text-white/70">{slide.statsPeriod}</div>
                <div className="mt-4 text-sm">{slide.statsLabel}</div>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-8">
                {featureSlides.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === i ? "bg-white w-6" : "bg-white/30"
                    }`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
