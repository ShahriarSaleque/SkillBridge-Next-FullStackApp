"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleLogin}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {" "}
        Login{" "}
      </button>
    </div>
  )
}

export default LoginPage
