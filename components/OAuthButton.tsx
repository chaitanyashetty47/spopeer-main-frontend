import { Button } from "@/components/ui/button";
import React from "react";

interface OAuthButtonProps {
  onAuth: () => Promise<void>;
  message: string;
  icon: React.ReactNode;
}

export default function OAuthButton({ onAuth, message, icon }: OAuthButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onAuth}
      className="w-full p-1 bg-white text-blue-600 border-blue-600 space-y-2 flex items-center justify-center gap-2"
      asChild
    >
      <span>
        {icon}
        {message}
      </span>
      
    </Button>
  )
}
