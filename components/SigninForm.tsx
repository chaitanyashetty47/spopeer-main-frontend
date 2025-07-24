"use client"

import OAuthButton from "./OAuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Google Icon component
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

interface SigninFormProps {
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function SigninForm({ onSubmit, onGoogleSignIn, isLoading, error }: SigninFormProps) {
 
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSignUp);
  };

  return (
    <div className=" max-w-2xl w-[600px] space-y-8">
      {/* Login Card */}
      <div className="w-full bg-white rounded-lg shadow-lg px-10 py-10">
        <div className="flex flex-col gap-4 items-center">
          {/* Logo or Icon could go here */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <span className="text-blue-600 text-2xl font-bold">S</span>
          </div>

          <span className="text-2xl font-bold">CONNECT, SHARE AND PLAY</span>

          <span className="text-xl">Log in to your account</span>
          <span className="text-sm text-gray-500 mb-4">Welcome back! Please enter your details.</span>

          {/* OAuth Button */}
          <OAuthButton 
            onAuth={onGoogleSignIn} 
            message="Sign up with Google" 
            icon={<GoogleIcon />} 
          />

          {/* OR Divider */}
          <div className="flex items-center w-full mt-2 mb-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* Email Input */}
            <div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning
              />
            </div>

            {/* Password Input & Forgot Password */}
            <div className="space-y-1">
              <input 
                type="password" 
                placeholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning 
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 font-medium transition-colors"
              suppressHydrationWarning
            >
              Get Started
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      
      {/* This is a placeholder for where you would implement a modal */}
      {/* You can create a separate ForgotPasswordModal component */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <p className="mb-4">Enter your email address and we'll send you a link to reset your password.</p>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              suppressHydrationWarning
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setIsForgotPasswordOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
                suppressHydrationWarning
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                suppressHydrationWarning
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
