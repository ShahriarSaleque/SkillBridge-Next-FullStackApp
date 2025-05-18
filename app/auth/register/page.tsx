"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Logo } from "@/components/Logo"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    })

    console.log("client", response)

    if (response.ok) {
      toast.success("Registration successful! Please log in.")
      router.push("/auth/login")
    } else {
      setError("Registration failed. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-6 p-8 border rounded-xl bg-white shadow"
      >
        <Logo />

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Register to your SkillBridge account
        </h2>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error?.includes("email") ? error : ""}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error?.includes("Password") ? error : ""}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error?.includes("ConfirmPassWord") ? error : ""}
        />
        {error && !error.includes("email") && !error.includes("Password") && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <Button type="submit" loading={loading}>
          Register
        </Button>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
