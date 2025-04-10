import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState, User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: { user: User; token: string } }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
type AuthContextType = {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  approveUser: (userId: string) => Promise<void>;
  rejectUser: (userId: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved session when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (session && session.user) {
              // Fetch user profile data
              setTimeout(async () => {
                try {
                  const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                    
                  if (error) throw error;
                  
                  if (profile) {
                    const user: User = {
                      id: profile.id,
                      email: profile.email,
                      name: profile.name,
                      role: profile.role as "admin" | "user",
                      createdAt: profile.created_at,
                      avatar: profile.avatar_url,
                      status: profile.status as "pending" | "approved" | "rejected"
                    };
                    
                    dispatch({
                      type: "LOGIN_SUCCESS",
                      payload: {
                        user,
                        token: session.access_token,
                      },
                    });
                    
                    toast({
                      title: "Login successful",
                      description: `Welcome back${profile.name ? ', ' + profile.name : ''}!`,
                    });
                  }
                } catch (error: any) {
                  console.error("Error fetching profile:", error);
                }
              }, 0);
            } else {
              dispatch({ type: "LOGOUT" });
            }
          }
        );
        
        // THEN check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          // User data will be fetched by the onAuthStateChange handler
        } else {
          dispatch({ type: "LOGOUT" });
        }
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        dispatch({ type: "LOGOUT" });
      }
    };
    
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "LOGIN_REQUEST" });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) throw error;
      
      // The onAuthStateChange handler will update the user state
      // No need to dispatch LOGIN_SUCCESS here
      
    } catch (error: any) {
      console.error("Login error:", error.message);
      
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message || "Invalid login credentials",
      });
      
      throw error; // Re-throw to handle in the component
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: "REGISTER_REQUEST" });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration successful",
        description: "Your account has been created and is pending admin approval.",
      });
      
      // For registration, we don't automatically log in the user since they need approval
      dispatch({ type: "LOGOUT" });
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.message || "An error occurred during registration",
      });
      
      throw error;
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ status: 'approved' })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "User approved",
        description: "The user can now log in.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const rejectUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ status: 'rejected' })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "User rejected",
        description: "The user's registration has been rejected.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const getAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      return data.map((profile): User => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as "admin" | "user",
        createdAt: profile.created_at,
        avatar: profile.avatar_url,
        status: profile.status as "pending" | "approved" | "rejected"
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      dispatch({ type: "LOGOUT" });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        clearError,
        approveUser,
        rejectUser,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
