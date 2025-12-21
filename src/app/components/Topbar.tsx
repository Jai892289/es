"use client"

import { Menu, LogOut, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Topbar({
  onToggle,
  collapsed,
}: {
  onToggle: () => void
  collapsed: boolean
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth")     // clear auth flag
    localStorage.removeItem("token")    // clear token (if used)
    router.replace("/login")
  }

  return (
    <header className="h-16 bg-white border-b flex items-center px-6 gap-4 relative">
      {/* SIDEBAR TOGGLE */}
      <button
        onClick={onToggle}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Menu />
      </button>

      {/* SEARCH */}
      <input
        placeholder="Search"
        className="w-80 px-4 py-2 border rounded-full"
      />

      {/* PROFILE */}
      <div
        className="ml-auto relative"
        ref={dropdownRef}
      >
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100"
        >
          <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
            VG
          </div>
          <span className="font-medium text-sm">Vinod Gupta</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
