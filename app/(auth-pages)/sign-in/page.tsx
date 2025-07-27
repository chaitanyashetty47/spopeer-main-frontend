'use client';

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const {user, signInWithEmail, signInWithGoogle, signUpWithEmail} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Convert searchParams to Message format
  const message: Message = {
    message: searchParams?.get('message') || '',
    error: searchParams?.get('error') || ''
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      setIsLoading(false)
    }
    
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-[400px] px-10 py-4 rounded-xl shadow-xl space-y-8 border border-black">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">CONNECT, SHARE AND PLAY</h1>
          <div className="flex justify-center">
            {/* Placeholder for logo - replace src with actual logo path */}
            {/* <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">S</span>
            </div> */}
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </div>
          <h2 className="text-xl">Log in to your account</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-primary rounded-lg hover:bg-accent">
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="text-secondary-foreground">Sign up with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-primary rounded-lg hover:bg-accent">
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
            <span className="text-secondary-foreground">Sign up with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-primary rounded-lg hover:bg-accent">
            <Image src="/apple.svg" alt="Apple" width={20} height={20} />
            <span className="text-secondary-foreground">Sign up with Apple</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <SubmitButton
            formAction={signInAction}
            pendingText="Signing in..."
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg"
          >
            Get Started
          </SubmitButton>
          <FormMessage message={message} />
        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}



