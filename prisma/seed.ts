import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash("test123", 10)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password,
    },
  })
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())