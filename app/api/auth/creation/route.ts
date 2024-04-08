import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import {unstable_noStore as noStore } from 'next/cache';


export async function GET() {
    noStore();
    const {getUser} = getKindeServerSession()
    
    const user = await getUser();

    if(!user || user === null || !user.id) {
        throw new Error("something went wrong, i am sorry....");
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                id: user.id,
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            },
        });
    }

    // const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    // console.log("Current URL:", currentUrl);

    // return NextResponse.redirect(currentUrl);

    return NextResponse.redirect("https://atlas-go.vercel.app");
    // return NextResponse.redirect("http://3.77.235.151:3000");
    // return NextResponse.redirect("http://localhost:3000");
} 