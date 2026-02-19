// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { ArrowRight, User, Lock } from "lucide-react"
// import Image from "next/image"

// export default function LoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (username === "admin" && password === "password123") {
//   localStorage.setItem("auth", "true") 
//     router.push("/dashboard")    } else {
//       setError("Invalid username or password")
//     }
//   }

//   return (
//     <div
//   className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
//   style={{
//     backgroundImage: "url('/banner.png')",
//   }}
// >

   
//       <div className="relative min-h-screen flex flex-col">
//         <div className="p-8">
//           <div className="flex items-center gap-3">
           
//             <div className="text-white">
            
//               <Image
//                           src="/main.png"
//                           alt="logo"
//                           width={150}
//                           height={40}
//                           className="object-contain transition-all duration-300"
//                         />
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 flex items-center justify-center px-8 pb-16">
//           <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left Side - Welcome Text */}
//             <div className="text-white space-y-6">
//               <h1 className="text-5xl font-bold leading-tight">Welcome to G-Sampada</h1>
//               <p className="text-lg leading-relaxed opacity-90">
//               An online monitoring system, End to End AI & Blockchain based Portal for Monitoring all the Inventories Supplied, Raising Complaints & Suggesting better Vendors/Suppliers.
//               </p>
//             </div>

//             {/* Right Side - Login Form */}
//             <div className="bg-white backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl">
//               <div className="text-center mb-8">
//   <div className="flex justify-center mb-4">
//     <Image
//       src="/mainIconnew.png"
//       alt="logo"
//       width={150}
//       height={40}
//       className="object-contain transition-all duration-300"
//     />
//   </div>

//   <p className="text-gray-800 text-sm leading-relaxed">
//     Login now to access real-time insights and
//     <br />
//     keep operations running smoothly.
//   </p>
// </div>


//               <form onSubmit={handleLogin} className="space-y-5">
//                 {/* Username Field with icon */}
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 z-10" />
//                   <input
//                     type="text"
//                     placeholder="User Name / E-mail"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="w-full border h-12 pl-12 pr-4 bg-white rounded-full  text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
//                     required
//                   />
//                 </div>

//                 {/* Password Field with icon */}
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 z-10" />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full h-12 pl-12 pr-4 bg-white rounded-full border text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
//                     required
//                   />
//                 </div>

//                 {/* Remember Me & Forgot Password */}
//                 <div className="flex items-center justify-between text-sm">
//                   <label className="flex items-center gap-2 text-gray-800 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="w-4 h-4 text-gray-800 rounded border-white/30 bg-white/20 checked:bg-white checked:border-white cursor-pointer"
//                     />
//                     Remember me
//                   </label>
//                   <button type="button" className="text-gray-800 hover:underline">
//                     Forgot Password?
//                   </button>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="bg-red-500/20 border border-red-400/50 text-white px-4 py-3 rounded-lg text-sm text-center">
//                     {error}
//                   </div>
//                 )}

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   className="w-full h-12 bg-green-600 text-white hover:bg-green-400 rounded-full font-semibold flex items-center justify-center gap-2 transition-all group"
//                 >
//                   Login
//                   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </button>

//                 {/* Sign Up Link */}
//                 <p className="text-center text-gray-800 text-sm mt-6">
//                   {"Don't have an account yet? "}
//                   <button type="button" className="font-semibold hover:underline underline-offset-2">
//                     Sign up
//                   </button>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, User, Lock } from "lucide-react"
import Image from "next/image"
import imag1 from "../../../public/banner.png"


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
      localStorage.setItem("auth", "true")
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div
  className="min-h-screen relative overflow-hidden bg-cover bg-no-repeat"
  style={{
    backgroundImage: `
      url('/banner.png')
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
          <div className="max-w-2xl z-10">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome to <span className="font-extrabold">G-Sampada</span>
            </h1>

            <p className="text-lg leading-relaxed opacity-90">
              An online monitoring system, End to End AI & Blockchain based
              Portal for Monitoring all the Inventories Supplied, Raising
              Complaints & Suggesting better Vendors/Suppliers.
            </p>
          </div>

          {/* Worker Illustration BELOW text */}
          {/* <div className="absolute bottom-0 left-0 w-full">
            <Image
              src={imag1}
              alt="Worker Illustration"
              width={1000}
              height={700}
              className="w-full object-cover"
              priority
            />
          </div> */}

          {/* Worker Illustration BELOW text */}
<div className="absolute bottom-0 left-0 w-[90%]">
  {/* <Image
    src={imag1}
    alt="Worker Illustration"
    priority
    className="w-full h-auto object-contain"
  /> */}
</div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-6">

          <div className="bg-gray-100 rounded-2xl p-10 shadow-2xl border border-green-400 w-full max-w-md">

            {/* Logo + Text */}
            <div className="text-center mb-8">
              <Image
                src="/mainIconnew.png"
                alt="logo"
                width={120}
                height={40}
                className="mx-auto mb-4"
              />

              <p className="text-gray-700 text-sm">
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
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-green-500 w-4 h-4"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-gray-600 hover:text-green-600 hover:underline"
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
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
              >
                Login
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Signup */}
              <p className="text-center text-gray-700 text-sm mt-6">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  className="text-green-600 font-semibold hover:underline"
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
