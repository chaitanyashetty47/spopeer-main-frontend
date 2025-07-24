"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Session, 
  User, 
  SupabaseClient, 
  AuthTokenResponse 
} from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  supabase: SupabaseClient;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{
    user: User | null;
    session: Session | null;
  }>;
  signOut: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ 
    data: { user: User | null } | null; 
    error: Error | null;
  }>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  // isSubscriber: boolean;
};


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    console.log("AuthProvider mounted");


    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !mounted) {
          throw sessionError;
        }
        
        //Update session
        setSession(session);
        const sessionUser = session?.user || null;
        setUser(sessionUser);
       

      //Then set a listener for future changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
        if (!mounted) {
          return;
        }

        //Update session
        setSession(session);
        const sessionUser = session?.user || null;
        setUser(sessionUser);
      });

      //Cleanup subscription on unmount
      if (mounted) setIsLoading(false);

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
      }
      catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);
    

  const value = {
    user,
    session,
    isLoading,
    supabase,
    signInWithGoogle: async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    },
    signInWithEmail: async (email: string, password: string) => {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) throw authError;

      // Check if user was previously soft-deleted
      const { data: profile } = await supabase
        .from('users')
        .select('is_deleted, deleted_at')
        .eq('id', authData.user?.id)
        .single();

      if (profile?.is_deleted) {
        // Reactivate the account
        await supabase
          .from('users')
          .update({ 
            is_deleted: false, 
            deleted_at: null,
            reactivated_at: new Date().toISOString() 
          })
          .eq('id', authData.user?.id);

        // You could trigger a welcome back notification here
      }

      return authData;
    },
    signOut: async () => {
      try {
        // First cleanup all active connections/states
        window.dispatchEvent(new Event('cleanup-before-logout'));
        
        // Wait a small amount of time for cleanup
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Then perform the actual signout
        await supabase.auth.signOut(
          {
            scope: 'global'  //Chaitanya - Added this to prevent the signout from triggering the onAuthStateChange eventb
          }
        );
        
        // Force redirect to login
        window.location.assign('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    },
    signUpWithEmail: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      return { data, error };
    },
    updatePassword: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
    },
    updateEmail: async (newEmail: string) => {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      if (error) throw error;
    },
    resetPassword: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`
      });
      if (error) throw error;
    },
    // deleteAccount: async () => {
    //   // First delete user data from any related tables
    //   const { error: dataError } = await supabase
    //     .from('users')
    //     .delete()
    //     .eq('id', user?.id);
      
    //   if (dataError) throw dataError;

    //   // Then delete the user's subscription if it exists
    //   const { error: subscriptionError } = await supabase
    //     .from('subscriptions')
    //     .delete()
    //     .eq('user_id', user?.id);

    //   if (subscriptionError) throw subscriptionError;

    //   // Finally delete the user's auth account
    //   const { error: authError } = await supabase.auth.admin.deleteUser(
    //     user?.id as string
    //   );

    //   if (authError) throw authError;

    //   // Sign out after successful deletion
    //   await supabase.auth.signOut();
    // },
    // isSubscriber,
  };
    
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  }



