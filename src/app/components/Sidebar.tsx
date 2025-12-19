"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Inventory", path: "/dashboard/inventory" },
  { name: "Reports", path: "/dashboard/reports" },
  { name: "Alerts", path: "/dashboard/alerts" },
  { name: "Complaints", path: "/dashboard/complaints" },
  { name: "Vendors", path: "/dashboard/vendors" },
  { name: "Settings", path: "/dashboard/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gradient-to-b from-[#14b86e] to-[#0f9d58] text-white flex flex-col h-screen sticky top-0 relative overflow-hidden">
      {/* Curved cutout background for the entire nav area */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 256 1000" preserveAspectRatio="none">
          <defs>
            <mask id="nav-mask">
              <rect width="100%" height="100%" fill="white" />
              {menu.map((_, index) => {
                const itemCount = menu.length
                const spacing = 48 // approx px-4 py-2.5 + space-y-2
                const y = 220 + index * spacing // starting after logo
                const curveHeight = 20
                const curveWidth = 48
                
                return (
                  <g key={index}>
                    {/* Top curve cutout */}
                    <path
                      d={`M0,${y + curveHeight} Q ${curveWidth/2},${y - curveHeight + 10} ${curveWidth},${y + curveHeight} L0,${y + curveHeight} Z`}
                      fill="black"
                    />
                    {/* Bottom curve cutout */}
                    <path
                      d={`M0,${y + 40 - curveHeight} Q ${curveWidth/2},${y + 40 + curveHeight - 10} ${curveWidth},${y + 40 - curveHeight} L0,${y + 40 - curveHeight} Z`}
                      fill="black"
                    />
                  </g>
                )
              })}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="white" mask="url(#nav-mask)" />
        </svg>
      </div>

      <div className="p-6 relative z-10">
        {/* Logo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div
                className="w-6 h-6 border-4 border-[#14b86e] rounded-full border-t-transparent animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
            <span className="text-2xl font-bold">GISPL</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-white text-[#14b86e] font-semibold shadow-md"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 text-xs text-white/70 relative z-10">© 2025 Web23</div>

      {/* Gradient overlay to ensure seamless blend */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#14b86e] to-[#0f9d58]" />
    </aside>
  )
}