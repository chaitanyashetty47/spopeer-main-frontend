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
  Shield,
  BarChart3,
  Trophy,
  Heart
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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
    icon: <BarChart3 className="size-4" />,
    label: "Profile overview",
    href: "/settings/profile-overview",
  },
  {
    icon: <User className="size-4" />,
    label: "Personal Information",
    href: "/settings/personal-information",
  },
  {
    icon: <Briefcase className="size-4" />,
    label: "Physical information",
    href: "/settings/physical-information",
  },
  {
    icon: <Target className="size-4" />,
    label: "Sport information",
    href: "/settings/sport-information",
  },
  {
    icon: <UserCheck className="size-4" />,
    label: "Training information",
    href: "/settings/training-information",
  },
  {
    icon: <Trophy className="size-4" />,
    label: "Competition information",
    href: "/settings/competition-information",
  },
  {
    icon: <Globe className="size-4" />,
    label: "Media and Social",
    href: "/settings/media-social",
  },
  {
    icon: <Heart className="size-4" />,
    label: "Health and Wellness",
    href: "/settings/health-wellness",
  },
  {
    icon: <Shield className="size-4" />,
    label: "Privacy and Sharing",
    href: "/settings/privacy-sharing",
  },
];

export function SettingsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={true} className="!min-h-fit !w-fit">
      <Sidebar 
        className={cn("bg-white h-fit", className)}
        variant="sidebar"
        collapsible="none"
      >
        <SidebarContent className="pt-3 h-fit">
          
          <SidebarMenu className="px-4 pb-3">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={index}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      className={cn(
                        "flex items-center gap-3 text-gray-600 hover:text-indigo-600 py-4",
                        isActive && "!bg-indigo-600 !text-white font-medium [&>svg]:!text-white"
                      )}
                      isActive={isActive}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
} 