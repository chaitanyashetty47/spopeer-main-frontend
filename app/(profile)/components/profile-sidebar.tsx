"use client";

import { 
  User, 
  FileText, 
  Briefcase, 
  Target, 
  PhoneCall, 
  Globe, 
  UserCheck, 
  CreditCard, 
  LifeBuoy, 
  BookOpen, 
  Shield
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";

const menuItems = [
  {
    icon: <FileText className="size-4" />,
    label: "Profile overview",
    href: "/dashboard/profile-overview",
    active: true,
  },
  {
    icon: <User className="size-4" />,
    label: "Personal Information",
    href: "/dashboard/personal-information",
  },
  {
    icon: <Briefcase className="size-4" />,
    label: "Professional information",
    href: "/dashboard/professional-information",
  },
  {
    icon: <Target className="size-4" />,
    label: "Area of Expertise",
    href: "/dashboard/expertise",
  },
  {
    icon: <PhoneCall className="size-4" />,
    label: "Contact and Communication",
    href: "/dashboard/contact",
  },
  {
    icon: <Globe className="size-4" />,
    label: "Media and Online Presence",
    href: "/dashboard/online-presence",
  },
  {
    icon: <UserCheck className="size-4" />,
    label: "Client Testimonials and References",
    href: "/dashboard/testimonials",
  },
  {
    icon: <CreditCard className="size-4" />,
    label: "Payment and Rates",
    href: "/dashboard/payment",
  },
  {
    icon: <LifeBuoy className="size-4" />,
    label: "Supportive Services",
    href: "/dashboard/services",
  },
  {
    icon: <BookOpen className="size-4" />,
    label: "Legal and Compliance",
    href: "/dashboard/legal",
  },
  {
    icon: <Shield className="size-4" />,
    label: "Privacy and Data Handling",
    href: "/dashboard/privacy",
  },
];

export function ProfileSidebar({ className }: { className?: string }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar 
        className={cn("border-r border-gray-200 bg-white", className)}
        variant="sidebar"
        collapsible="none"
      >
        <SidebarContent className="pt-6">
          <div className="px-4 mb-4">
            <div className="h-10 mb-2 flex items-center">
              <div className="bg-blue-100 w-2 h-full rounded-l-md"></div>
              <h2 className="text-sm font-medium pl-3">Profile overview</h2>
            </div>
          </div>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    className={cn(
                      "flex items-center gap-3 text-gray-600 hover:text-indigo-600",
                      item.active && "bg-blue-50 text-indigo-600 font-medium"
                    )}
                    isActive={item.active}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
} 