"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Logo } from "@/components/Logo"
import { signIn } from "next-auth/react"
import { useState } from "react"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const response = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/profile",
    })

    if (response?.error) {
      setError(response?.error)
      toast.error(response.error)
    } else {
      toast.success("Login successful!")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 p-8 border rounded-xl bg-white shadow"
      >
        <Logo />

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Log in to your SkillBridge account
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
        {error && !error.includes("email") && !error.includes("Password") && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <Button type="submit" loading={loading}>
          Log In
        </Button>
        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
