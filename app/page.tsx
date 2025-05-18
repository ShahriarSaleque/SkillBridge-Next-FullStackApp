import Link from "next/link"

export default function Home() {
  return (
    <div>
      <main
        className="
       flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-12
      "
      >
        <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-800">
              Connect your skills with the right opportunities
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              SkillBridge connects students and professionals with real-world
              projects to help them grow, collaborate, and thrive.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/gigs"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-all"
              >
                Browse Gigs
              </Link>
              <Link
                href="/auth/login"
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                Post a Gig
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12 text-blue-800">
              Why Use SkillBridge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  Real-World Experience
                </h3>
                <p className="text-gray-600">
                  Work on actual projects that enhance your resume and skills.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  Skill-Based Matching
                </h3>
                <p className="text-gray-600">
                  Get matched to gigs that suit your unique skills and growth
                  path.
                </p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  Built for Growth
                </h3>
                <p className="text-gray-600">
                  A platform for students, freelancers, and early-career
                  professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-12">
              What People Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-700 mb-4">
                  “I got my first freelance project through SkillBridge. It was
                  easy and rewarding!”
                </p>
                <h4 className="font-semibold text-blue-800">
                  — Shahriar Saleque, Developer
                </h4>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-700 mb-4">
                  “Perfect platform for getting help on small projects while
                  supporting new talent.”
                </p>
                <h4 className="font-semibold text-blue-800">
                  — Zuhain Yasa, CTO
                </h4>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <p className="text-gray-700 mb-4">
                  “I used SkillBridge to build portfolio pieces that landed me a
                  full-time job.”
                </p>
                <h4 className="font-semibold text-blue-800">
                  — Farhat Maliha, Designer
                </h4>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t mt-20 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} SkillBridge. All rights
              reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
