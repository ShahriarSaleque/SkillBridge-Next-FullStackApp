"use client"
import { createGig } from "@/app/actions/gig-actions"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const initialState = {
  success: false,
  error: undefined,
}

const AddNewGig = () => {
  const [state, formAction, isPending] = useActionState(createGig, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push("/gig")
    }
  }, [state.success, router])

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Gig</h1>
      <form action={formAction} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Gig title"
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={isPending}
        >
          Post Gig
        </button>

        {state.error && (
          <p className="text-red-600 mt-2 text-sm">
            {state.error.message as string}
          </p>
        )}
      </form>
    </div>
  )
}

export default AddNewGig
