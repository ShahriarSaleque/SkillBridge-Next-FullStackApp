import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import EditProfileForm from "./EditProfileForm"

const Profile = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  })

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <EditProfileForm user={user} />
    </div>
  )
}

export default Profile
