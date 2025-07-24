import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/google-signin-button";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">CONNECT, SHARE AND PLAY</h1>
          <div className="flex justify-center">
            {/* Placeholder for logo - replace src with actual logo path */}
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">S</span>
            </div>
          </div>
          <h2 className="text-xl">Create an account</h2>
        </div>

        <div className="space-y-4">
          <GoogleSignInButton />
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border rounded-lg hover:bg-accent">
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
            <span>Sign up with Facebook</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border rounded-lg hover:bg-accent">
            <Image src="/apple.svg" alt="Apple" width={20} height={20} />
            <span>Sign up with Apple</span>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              minLength={6}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg"
          >
            Get Started
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
