"use client"

import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
}  from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";


import { LayoutDashboard,ListTodo, CalendarClock,Goal,BarChart3,Mic,Settings} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: ListTodo,
    label: "My Tasks",
    href: "/my-tasks",
  },
  {
    icon: CalendarClock,
    label: "Smart Scheduler",
    href: "/smart-scheduler",
  },
  {
    icon: Goal,
    label: "Habits and Goals",
    href: "/habits-goals",
  },
  {
    icon: BarChart3,
    label: "Insights and Reports",
    href: "/insights-reports",
  },
  {
    icon: Mic,
    label: "Voice Assistant",
    href: "/voice-assistant",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export const DashboardSidebar = () => {
    const pathname = usePathname();
    return(
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" height={170} width={170} alt="ASTRA"/>
                        
                </Link>                  
            </SidebarHeader>

            <div>
                <Separator className="my-2" />
            </div>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "flex items-center gap-2.5 p-2.5 rounded-md font-medium text-neutral-500 hover:text-white transition h-10" ,
                                        /*"hver:bg-li-10 honear-to-r/oklch border border-transparent "
                                        +"from bg-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                        pathname === item.href && "bg-linear-to-r/oklch border border-[#5D6B68]/10 from bg-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"*/                                        
                                    )}isActive={pathname === item.href}
                                    >
                                    <Link href={item.href}> 
                                        <item.icon className="h-5 w-5 text-neutral-500 " />
                                        <span className="text-sm font-medium tracking-tight ">
                                            {item.label}
                                        </span>
                                        </Link>
                                    </SidebarMenuButton>    
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>
                
        </Sidebar>
    )
};