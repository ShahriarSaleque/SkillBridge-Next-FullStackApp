import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);

    // put the validation for name and bio here 
    const validateName = (name: string) => {
        return typeof name === "string" && name.length > 2 && name.length <= 50
    }

    const validateBio = (bio: string) => {
        return typeof bio === "string" && bio.length <= 300
    }

    if(!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const {name, bio} = await request.json();

    if(!validateName(name)) {
        return new NextResponse("Invalid name", { status: 400 });
    }

    if(!validateBio(bio)) {
        return new NextResponse("Invalid bio", { status: 400 });
    }

    if(!name || !bio) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
        where: {email: session.user?.email as string},
        data: {
            name,
            bio
        }
    });

    return NextResponse.json(updatedUser);
}