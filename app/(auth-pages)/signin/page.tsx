"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SigninForm from "@/components/SigninForm";

export default function SignIn() {
  const { user, signInWithEmail, signInWithGoogle, signUpWithEmail } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }else{
      setIsLoading(false);
    }
  }, [user, router]);

  const handleSubmit = async (email: string, password: string, isSignUp: boolean) => {
    setError("");
    setIsLoading(true);
    
    try{
      if(isSignUp){
        const {data, error} = await signUpWithEmail(email, password);
        if(error){
          setError(error.message);
          setIsLoading(false);
          return;
        }
        if(data?.user && !data.user.email_confirmed_at){
          router.replace(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        } 
        router.replace("/dashboard");
        
      } else {
        await signInWithEmail(email, password);
        router.replace("/dashboard");
        return;
      }

    } catch(error){
      console.error(error);
      setError("An error occurred while signing in");
      setIsLoading(false);
    }
    
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <SigninForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        onGoogleSignIn={signInWithGoogle}
      />
    </div>
  )
}
