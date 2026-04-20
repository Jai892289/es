"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("auth") !== "true") {
      router.replace("/login")
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-[#f6f8fa]">
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} />

      {/* RIGHT CONTENT */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Topbar
          onToggle={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
