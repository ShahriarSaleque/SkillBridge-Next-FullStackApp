"use client"
import { useState, useTransition } from "react"

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
  })

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | null>("")
  const [success, setSuccess] = useState<boolean>(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      try {
        const res = await fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!res.ok) throw new Error(await res.text())
        setSuccess(true)
      } catch (error) {
        setError(
          String(error) || "An error occurred while updating your profile."
        )
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
        <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Saved Changes"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">Profile updated!</p>}
      </div>
    </form>
  )
}

export default EditProfileForm

type EditProfileFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
}
