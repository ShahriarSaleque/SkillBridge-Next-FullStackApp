"use server"

import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "../api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

// Define Zod schema for signin validation
const GigActionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be at most 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be at most 300 characters"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required")
    .max(10, "No more than 10 skills allowed"),
})

// server action to handle adding a new gig form submission
export const createGig = async (
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return {
        success: false,
        error: {
          message: "Unauthorized",
          code: 401,
        } as ErrorMessage,
      }
    }

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      skills: formData.get("skills")
        ? (formData.get("skills") as string)
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0)
        : [],
    }

    const validationResult = GigActionSchema.safeParse(data)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      const errorString = Object.entries(fieldErrors)
        .map(
          ([field, messages]) =>
            `${field}: ${(messages as string[]).join(", ")}`
        )
        .join("; ")

      return {
        success: false,
        message: "Validation error",
        error: { message: errorString, code: 400 } as ErrorMessage,
      }
    }

    const { title, description, skills } = validationResult.data

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    })

    console.log("user", user)
    console.log("title", title)
    console.log("description", description)
    console.log("skills", skills)

    if (!user) {
      return {
        success: false,
        error: {
          message: "User not found",
          code: 404,
        } as ErrorMessage,
      }
    }

    const createdGig = await prisma.gig.create({
      data: {
        title,
        description,
        skills,
        userId: user.id,
      },
    })

    if (createdGig) {
      return {
        success: true,
        message: "Gig created successfully",
      }
    } else {
      return {
        success: false,
        error: {
          message: "Failed to create gig",
          code: 500,
        } as ErrorMessage,
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: `Error creating gig ${error}`,
        code: 400,
      } as ErrorMessage,
    }
  }
}
