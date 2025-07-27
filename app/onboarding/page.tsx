"use client";
import Image from "next/image";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateUserRole } from "@/actions/onboarding.action";
import { role } from "@prisma/client";
import { useRouter } from "next/navigation";

const options = [
  { key: "ATHLETE", label: "I am a Player", img: "/athlete.png" },
  { key: "COACH", label: "I am a Coach", img: "/coachs.png" },
  { key: "CLUB", label: "We are a Team", img: "/team.png" },
  { key: "SUPPORTIVE_PROFESSIONAL", label: "I am a Supportive Professional", img: "/pro.png" },
];

export default function Onboarding() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  
  const { execute, result, isExecuting } = useAction(updateUserRole, {
    onSuccess: (data) => {
      console.log("Role updated successfully:", data);
      // Redirect to home page after successful role update
      router.push("/home");
    },
    onError: (error) => {
      console.error("Failed to update role:", error);
      // You can show a toast notification here
    },
  });

  const handleContinue = async () => {
    if (!selected) {
      // Show error message that user needs to select a role
      return;
    }

    // Execute the action with the selected role
    execute({ role: selected as role });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="flex flex-col items-center justify-center w-full px-10 py-4 rounded-xl shadow-xl space-y-8 border border-black">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-2xl font-extrabold mb-4">Welcome To Spopeer!</span>
            <span className="text-sm text-center font-semibold text-gray-700">
              To tailor your experience, please choose the<br />
              category that best defines you
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <div key={option.key} className="relative">
              <button
                type="button"
                onClick={() => setSelected(option.key)}
                disabled={isExecuting}
                className={`bg-white border rounded-xl p-4 flex flex-col items-center justify-center w-full h-full transition-colors
                  ${selected === option.key
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-black"
                  }
                  ${isExecuting ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400"}
                `}
              >
                <Image src={option.img} alt={option.label} width={100} height={100} />
                <span className="text-sm mt-2">{option.label}</span>
              </button>
              {selected === option.key && (
                <span className="absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Error message */}
        {(result?.serverError || result?.validationErrors) && (
          <div className="text-red-500 text-sm text-center">
            {result.serverError || 
             (result.validationErrors?.role?._errors?.[0]) ||
             (result.validationErrors?._errors?.[0]) ||
             "An error occurred"}
          </div>
        )}
        
        <button 
          onClick={handleContinue}
          disabled={!selected || isExecuting}
          className={`bg-primary text-white rounded-md p-4 flex flex-col items-center justify-center w-full transition-colors
            ${!selected || isExecuting ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"}
          `}
        >
          <span className="text-sm">
            {isExecuting ? "Updating..." : "Continue"}
          </span>
        </button>
      </div>
    </div>
  );
}