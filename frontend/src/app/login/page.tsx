

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

//   const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError("");

//   // 🔴 STATIC CREDENTIALS
//   const STATIC_USERNAME = "admin";
//   const STATIC_PASSWORD = "123456";

//   try {
//     // ❌ COMMENTED API CALL
//     // const res = await loginApi({
//     //   email: username,
//     //   password: password,
//     // });

//     // ✅ STATIC CHECK
//     if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
//       // mock data
//       const mockUser = {
//         name: "Admin User",
//         email: "admin@example.com",
//       };

//       const mockToken = "static-token-123";

//       localStorage.setItem("token", mockToken);
//       localStorage.setItem("auth", "true");
//       localStorage.setItem("user", JSON.stringify(mockUser));

//       router.push("/dashboard");
//     } else {
//       throw new Error("Invalid username or password");
//     }

//   } catch (err: any) {
//     setError(err.message || "Login failed");
//   }
// };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi({
        email: username,
        password: password,
      });

      localStorage.setItem("token", res.token || res.data?.token);
      localStorage.setItem("auth", "true")
      localStorage.setItem("user", JSON.stringify(res.user || res.data?.user));
      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-no-repeat "
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
     {/* ================= RIGHT SIDE ================= */}

<div className="flex items-center justify-center px-4 py-4">

  <div
    className="
      relative overflow-hidden
      w-full max-w-md
      rounded-[24px]
      border border-white/10
      bg-white/10
      backdrop-blur-2xl
      shadow-[0_10px_40px_rgba(16,185,129,0.18)]
      p-5 md:p-6
    "
  >

    {/* GLOW EFFECTS */}

    <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl" />

    <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-green-500/20 rounded-full blur-3xl" />

    {/* LOGO */}

    <div className="relative z-10 text-center">

      <div
        className="
          w-20 h-20
          rounded-[20px]
          bg-white/10
          border border-white/10
          backdrop-blur
          flex items-center justify-center
          mx-auto
          shadow-xl
        "
      >

        <Image
          src="/eccentriclogo.png"
          alt="logo"
          width={75}
          height={45}
          className="object-contain"
        />
      </div>

      <h2 className="text-3xl font-black text-white mt-3 tracking-tight">
        Welcome Back
      </h2>
    </div>

    {/* FORM */}

    <form
      onSubmit={handleLogin}
      className="relative z-10 mt-5 space-y-4"
    >

      {/* USERNAME */}

      <div>

        <label className="text-sm font-medium text-white/80 mb-2 block">
          Username or Email
        </label>

        <div className="relative group">

          <div
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-lg
              bg-emerald-500/10
              border border-emerald-400/10
              flex items-center justify-center
            "
          >

            <User className="h-4 w-4 text-emerald-200" />
          </div>

          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full h-12
              rounded-xl
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              pl-14 pr-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all duration-300
              focus:border-emerald-400
              focus:ring-4
              focus:ring-emerald-500/20
            "
            required
          />
        </div>
      </div>

      {/* PASSWORD */}

      <div>

        <label className="text-sm font-medium text-white/80 mb-2 block">
          Password
        </label>

        <div className="relative">

          <div
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-lg
              bg-emerald-500/10
              border border-emerald-400/10
              flex items-center justify-center
            "
          >

            <Lock className="h-4 w-4 text-emerald-200" />
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full h-12
              rounded-xl
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              pl-14 pr-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all duration-300
              focus:border-emerald-400
              focus:ring-4
              focus:ring-emerald-500/20
            "
            required
          />
        </div>
      </div>

      {/* REMEMBER */}

      <div className="flex items-center justify-between pt-1">

        <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">

          <div className="relative">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
              className="
                peer appearance-none
                w-4 h-4 rounded
                border border-white/20
                bg-white/10
                checked:bg-emerald-500
                checked:border-emerald-500
                transition-all
              "
            />

            <svg
              className="
                absolute inset-0 m-auto
                w-2.5 h-2.5 text-white
                hidden peer-checked:block
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          Remember me
        </label>

        <button
          type="button"
          className="text-xs text-emerald-200 hover:text-white transition-all hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* ERROR */}

      {error && (

        <div
          className="
            rounded-xl
            border border-red-400/20
            bg-red-500/10
            px-3 py-3
            text-sm text-red-100
            backdrop-blur
          "
        >
          {error}
        </div>
      )}

      {/* LOGIN BUTTON */}

      <button
        type="submit"
        className="
          group relative overflow-hidden
          w-full h-12
          rounded-xl
          bg-gradient-to-r
          from-white
          to-emerald-50
          hover:from-emerald-50
          hover:to-white
          text-emerald-700
          text-sm
          font-bold
          shadow-xl
          cursor-pointer
          transition-all duration-300
          hover:scale-[1.01]
          active:scale-[0.98]
          flex items-center justify-center gap-2
        "
      >

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        <span className="relative z-10">
          Login to Dashboard
        </span>

        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* DIVIDER */}

      <div className="flex items-center gap-3 py-1">

        <div className="flex-1 h-px bg-white/10" />

        <span className="text-[10px] text-white/40 uppercase tracking-[2px]">
          Continue
        </span>

        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* SIGNUP */}

      <div className="text-center">

        <p className="text-sm text-white/70">

          Don’t have an account?

          <button
            type="button"
            className="
              ml-2
              font-semibold
              text-white
              hover:text-emerald-200
              transition-all
            "
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  </div>
</div>
      </div>
    </div>
  )
}
