"use client"
import Image from "next/image"
import { Link, Home, FileText, UserCircle, Bell, MessageSquare, Wallet, Settings, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HeaderComponent() {
  return (
    <header className="w-4/5 bg-white rounded-full border-black border-2 flex justify-between items-center px-3 md:px-6 py-3">
      {/* Left side - Logo and Brand */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={28} height={28} />
        <span className="text-xl font-semibold hidden md:block">Spopeer</span>
      </div>

      {/* Center - Search Bar (Hidden on mobile) */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            type="text"
            placeholder="search"
            className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side - Navigation Icons */}
      <div className="flex items-center gap-1 md:gap-4">
        {/* Desktop Icons with Labels */}
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <Home size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Home</span>
          </div>       
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <FileText size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Articles</span>
          </div>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full relative hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <UserCircle size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Profile</span>
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full relative hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <Bell size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Notifications</span>
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full relative hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <MessageSquare size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Messages</span>
          </div>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <Wallet size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Wallet</span>
          </div>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full hidden md:flex">
          <div className="flex flex-col items-center gap-1">
            <Settings size={20} className="text-primary"/>
            <span className="text-xs font-semibold">Settings</span>
          </div>
        </Button>

        {/* Mobile Icons (Compact, No Labels) */}
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full md:hidden">
          <Home size={16} className="text-primary"/>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full md:hidden">
          <FileText size={16} className="text-primary"/>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full relative md:hidden">
          <UserCircle size={16} className="text-primary"/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full relative md:hidden">
          <Bell size={16} className="text-primary"/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full relative md:hidden">
          <MessageSquare size={16} className="text-primary"/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
            2
          </span>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full md:hidden">
          <Wallet size={16} className="text-primary"/>
        </Button>
        
        <Button variant="ghost" size="sm" className="p-1 md:p-2 hover:bg-gray-100 rounded-full md:hidden">
          <Settings size={16} className="text-primary"/>
        </Button>
      </div>
    </header>
  )
}