"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"

export const DashboardNavbar = () => {
    const {state, toggleSidebar,isMobile}=useSidebar();
    return(
        <nav className="flex px-4 gap-x-2 py-3 border-b items-center bg-background">
            <Button className="size-9" variant="outline" onClick={toggleSidebar}>
                {(state=="collapsed"||isMobile)?
                 <PanelLeftIcon className="size-4"/>:
                 <PanelLeftCloseIcon className="size-4"/>
                }
            </Button>
            <h1 className="text-2xl font-semibold">Home</h1>
        </nav>
    )
}