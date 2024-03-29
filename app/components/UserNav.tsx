import { DropdownMenu, 
         DropdownMenuTrigger, 
         DropdownMenuContent, 
         DropdownMenuItem,
         DropdownMenuSeparator,
        } from "@/components/ui/dropdown-menu";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { createAtlasgoHome } from "../actions";


export async function UserNav() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    const createHomewithId = createAtlasgoHome.bind(null, {
        userId: user?.id as string,
    });

    return (
        <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="rounded-full borber px-2 py-2 lg:py-2 flex items-center gap-x-3">
                        <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                        <img 
                            src={
                                user?.picture ??
                                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            } 
                            alt="Image of the User" 
                            className="rounded-full h-8 w-8 hidden lg:block"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    {user ? (
                    <>
                        <DropdownMenuItem>
                            <form action={createHomewithId} className="w-full">
                                <button type="submit" className="w-full text-start">
                                    AtlasGo your Home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href= "/my-homes" className="=w-full">
                                My Listings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href= "/favorites" className="=w-full">
                                My Favorites
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href= "/reservations" className="=w-full">
                                My Reservations
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink className="=w-full">Logout</LogoutLink>
                        </DropdownMenuItem>
                    </>
                    ) : (
                    <>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">Register</RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="=w-full">Login</LoginLink>
                        </DropdownMenuItem>
                    </>
                    )}
                </DropdownMenuContent>
        </DropdownMenu>
    );
        
}