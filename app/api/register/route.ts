import { z } from 'zod'
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Define Zod schema for register validation
const RegisterSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        name: z.string().min(3, 'Name must be at least 3 characters'),
        bio: z.string().max(20, 'Bio cannot exceed 20 characters'),
    })

export async function POST(req: NextRequest) {
    const { email, password, name, bio } = await req.json();

    if (!email || !password || !name || !bio) {
        return NextResponse.json({
            message: 'All fields are required',
        }, { status: 400 })
    }

    const { success, error } = RegisterSchema.safeParse({ email, password, name, bio })

    if (!success) {
        return NextResponse.json({
            message: 'Validation error',
            error: error.errors.map(error => error.message),
        }, { status: 400 })
    }

    // check if user already exists 
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return NextResponse.json({
            message: 'User already exists',
            error: 'User already exists',
        }, { status: 409 })
    }

    // create user with hashed password 
    const hashed = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
            bio
        }
    })

    return NextResponse.json({
        message: 'User created successfully',
    }, { status: 201 })
}