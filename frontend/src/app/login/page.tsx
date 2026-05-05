

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, User, Lock, CloudCog } from "lucide-react"
import Image from "next/image"
import imag1 from "../../../public/banner.png"
import { loginApi } from "@/lib/auth.api";

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  // 🔴 STATIC CREDENTIALS
  const STATIC_USERNAME = "admin";
  const STATIC_PASSWORD = "123456";

  try {
    // ❌ COMMENTED API CALL
    // const res = await loginApi({
    //   email: username,
    //   password: password,
    // });

    // ✅ STATIC CHECK
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
      // mock data
      const mockUser = {
        name: "Admin User",
        email: "admin@example.com",
      };

      const mockToken = "static-token-123";

      localStorage.setItem("token", mockToken);
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(mockUser));

      router.push("/dashboard");
    } else {
      throw new Error("Invalid username or password");
    }

  } catch (err: any) {
    setError(err.message || "Login failed");
  }
};


  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await loginApi({
  //       email: username,
  //       password: password,
  //     });

  //     localStorage.setItem("token", res.token || res.data?.token);
  //     localStorage.setItem("auth", "true")
  //     localStorage.setItem("user", JSON.stringify(res.user || res.data?.user));
  //     router.push("/dashboard");

  //   } catch (err: any) {
  //     setError(err.message || "Login failed");
  //   }
  // };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-no-repeat"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
      url('/banner1.png')
    `,
        backgroundPosition: "left bottom",
        backgroundSize: "cover",
      }}
    >
      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative flex flex-col justify-start pt-24 pl-20 text-white min-h-screen overflow-hidden">

          {/* Text Content */}
          <div className="max-w-2xl z-10 ">
            <h1 className="text-5xl font-bold leading-tight mb-0">
              Welcome to <span className="font-extrabold">E-Sampada</span>
            </h1>

            <p className="text-lg leading-relaxed opacity-90">
              An online monitoring system, End to End AI & Blockchain based
              Portal for Monitoring all the Inventories Supplied, Raising
              Complaints & Suggesting better Vendors/Suppliers.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-6">

          <div className="bg-green-500 rounded-2xl p-10 shadow-2xl border border-green-400 w-full max-w-md">

            {/* Logo + Text */}
            <div className="text-center mb-8">
              <Image
                src="/eccentriclogo.png"
                alt="logo"
                width={120}
                height={40}
                className="mx-auto mb-4"
              />

              <p className="text-white text-sm">
                Login now to access real-time insights and
                <br />
                keep operations running smoothly.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="User Name / E-mail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-green-400 bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-green-400 bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-green-500 w-4 h-4 cursor-pointer"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-white hover:text-green-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 border border-gray-100 bg-green-500 hover:bg-green-600 text-white cursor-pointer rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
              >
                Login
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Signup */}
              <p className="text-center text-white text-sm mt-6">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
