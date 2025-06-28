import { authClient } from "@/lib/auth-client"
import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { GeneratedAvatar } from "@/components/ui/generated-avatar";


import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton=()=>{
    const router = useRouter();
    const {data, isPending} = authClient.useSession();

    const onLogout=()=>{
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    router.push("/sign-in")
                }
            }
        })
    }
    if(!data?.user || isPending){
        return  null;
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-accent-foreground p-3 w-full flex
                items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                {data.user.image ?(
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ):(
                    <GeneratedAvatar
                    seed={data.user.name}
                    variant="initials"
                    className="size-9 mr-3"
                    />
                )}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 ">
                    <p className="text-l truncate w-full text-black">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full text-black">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                onClick={onLogout}
                className="cursor-pointer flex items-center justify-between">
                    Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}