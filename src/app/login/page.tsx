"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, User, Lock } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (username === "admin" && password === "password123") {
  localStorage.setItem("auth", "true") // ✅ IMPORTANT
    router.push("/dashboard")    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a9d5f] via-[#52a867] to-[#3d8b52] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-white rounded-full blur-[100px]" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <path d="M50 10 L70 30 L50 50 L30 30 Z" fill="white" opacity="0.9" />
              <path d="M50 50 L70 70 L50 90 L30 70 Z" fill="white" opacity="0.7" />
              <path d="M30 30 L50 50 L30 70 L10 50 Z" fill="white" opacity="0.8" />
              <path d="M70 30 L90 50 L70 70 L50 50 Z" fill="white" opacity="0.6" />
            </svg>
            <div className="text-white">
              <div className="text-2xl font-bold tracking-wide">GISPL</div>
              <div className="text-[8px] tracking-widest opacity-80">
                POWERUNG MOTION. INSPIRING INNOVATION
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 pb-16">
          <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Welcome Text */}
            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold leading-tight">Welcome to eSampada</h1>
              <p className="text-lg leading-relaxed opacity-90">
                Streamline inventory management with eSampada!
                <br />
                Track procurement, monitor stock utilization,
                <br />
                manage vendor interactions, and stay updated
                <br />
                with automated alerts.
              </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl">
              <div className="text-center mb-8">
                <p className="text-white text-sm leading-relaxed">
                  Login now to access real-time insights and
                  <br />
                  keep operations running smoothly.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Field with icon */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 z-10" />
                  <input
                    type="text"
                    placeholder="User Name / E-mail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-white rounded-full border-0 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>

                {/* Password Field with icon */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 z-10" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-white rounded-full border-0 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/30 bg-white/20 checked:bg-white checked:border-white cursor-pointer"
                    />
                    Remember me
                  </label>
                  <button type="button" className="text-white hover:underline">
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-400/50 text-white px-4 py-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-white text-green-600 hover:bg-gray-50 rounded-full font-semibold flex items-center justify-center gap-2 transition-all group"
                >
                  Login
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-white text-sm mt-6">
                  {"Don't have an account yet? "}
                  <button type="button" className="font-semibold hover:underline underline-offset-2">
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="absolute bottom-6 left-8 text-white/70 text-sm">© 2025 Web23</div>
      </div>
    </div>
  )
}
