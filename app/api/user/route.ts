import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const {name, bio} = await request.json();

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