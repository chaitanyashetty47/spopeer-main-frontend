import Image from "next/image";
import { Bell, FileText, Home, MessageSquare, Settings, UserCircle, Wallet } from "lucide-react";
import Link from "next/link";
import { ProfileSidebar } from "../components/profile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                {/* <Image src="/logo.png" alt="logo" width={32} height={32} priority /> */}
                <span className="text-lg font-semibold text-indigo-700">Spopeer</span>
              </Link>
            </div>

            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden sm:block flex-1 max-w-xs mx-8">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-10 pr-3 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Navigation Items - Using a flex container with even spacing */}
            <nav className="flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
              >
                <Home className="h-5 w-5" />
                <span className="mt-1 text-xs">Home</span>
              </Link>
              
              <Link 
                href="/articles" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
              >
                <FileText className="h-5 w-5" />
                <span className="mt-1 text-xs">Articles</span>
              </Link>
              
              <Link 
                href="/friend-requests" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600 relative"
              >
                <UserCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  2
                </span>
                <span className="mt-1 text-xs">Friend requests</span>
              </Link>
              
              <Link 
                href="/notifications" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  2
                </span>
                <span className="mt-1 text-xs">Notifications</span>
              </Link>
              
              <Link 
                href="/messages" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600 relative"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="mt-1 text-xs">Messages</span>
              </Link>
              
              <Link 
                href="/wallet" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
              >
                <Wallet className="h-5 w-5" />
                <span className="mt-1 text-xs">Wallet</span>
              </Link>

              <Link 
                href="/settings" 
                className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
              >
                <Settings className="h-5 w-5" />
                <span className="mt-1 text-xs">Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <ProfileSidebar className="w-64 h-[calc(100vh-4rem)] sticky top-16" />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

