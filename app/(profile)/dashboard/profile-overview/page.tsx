import React from 'react';

export default function ProfileOverviewPage() {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile Overview</h1>
      
      <div className="space-y-6">
        {/* Profile Progress */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Profile Completion</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Your profile is 45% complete. Complete all sections to increase visibility.</p>
        </div>
        
        {/* Basic Info Section */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">First name</p>
            <p className="font-medium">Racheal</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Last name</p>
            <p className="font-medium">Miles</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">racheal_track</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">rachealmilez@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 