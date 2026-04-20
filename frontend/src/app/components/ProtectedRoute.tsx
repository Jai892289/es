"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem("auth")
    if (isAuth !== "true") {
      router.replace("/login")
    }
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("auth")
          router.push("/login")
        }}
      >
        Logout
      </button>
    </div>
  )
}
