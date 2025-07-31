"use client"

import HeaderComponent from "@/components/header/header-component"

export default function AthleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header Container with Centering and Padding */}
      <div className="w-full flex justify-center px-4 py-4">
        <HeaderComponent />
      </div>
      
      {/* Content Area */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}