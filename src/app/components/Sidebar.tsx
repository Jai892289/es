"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Boxes,
  BarChart3,
  Bell,
  AlertCircle,
  Users,
  Settings,
} from "lucide-react"
import { useState, useEffect } from "react"

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", path: "/dashboard/inventory", icon: Boxes },
  { name: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  { name: "Alerts", path: "/dashboard/alerts", icon: Bell },
  { name: "Product Categories", path: "/dashboard/complaints", icon: AlertCircle },
  { name: "Vendors", path: "/dashboard/vendors", icon: Users },
  {
    name: "Asset Management",
    path: "/dashboard/asset-management",
    icon: Boxes,
    children: [
      {
        name: "Asset Registration",
        path: "/dashboard/asset/asset-registration",
      },
      {
        name: "Asset Category",
        path: "/dashboard/asset/asset-category",
      },
       {
        name: "Asset Status Tracking",
        path: "/dashboard/asset/asset-tracking",
      }, {
        name: "Asset Transfer",
        path: "/dashboard/asset/asset-tracking",
      }, {
        name: "Asset Mapping",
        path: "/dashboard/asset/asset-tracking",
      }, {
        name: "Asset Replacement",
        path: "/dashboard/asset/asset-tracking",
      },
    ],
  },

   {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    children: [
      {
        name: "User Management",
        path: "/dashboard/settings/user-management",
      },
      {
        name: "Department Management",
        path: "/dashboard/settings/department-management",
      },
    ],
  },

  
  // { name: "Settings", path: "/dashboard/settings", icon: Settings },
]
//  ssdf
export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()

  const [openMenu, setOpenMenu] = useState<string | null>(null)

  // Auto open settings if child route is active
  useEffect(() => {
    if (pathname.startsWith("/dashboard/settings")) {
      setOpenMenu("Settings")
    }
  }, [pathname])

  return (
    <aside
      className={`bg-linear-to-b from-[#14b86e] to-[#0f9d58]
      text-white h-screen fixed left-0 top-0 z-40
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* CURVED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 256 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="nav-mask">
              <rect width="100%" height="100%" fill="white" />
              {menu.map((_, index) => {
                const spacing = 48
                const y = 220 + index * spacing
                const curveHeight = 20
                const curveWidth = 48

                return (
                  <g key={index}>
                    <path
                      d={`M0,${y + curveHeight} Q ${curveWidth / 2},${
                        y - curveHeight + 10
                      } ${curveWidth},${y + curveHeight} L0,${
                        y + curveHeight
                      } Z`}
                      fill="black"
                    />
                    <path
                      d={`M0,${y + 40 - curveHeight} Q ${
                        curveWidth / 2
                      },${y + 40 + curveHeight - 10} ${curveWidth},${
                        y + 40 - curveHeight
                      } L0,${y + 40 - curveHeight} Z`}
                      fill="black"
                    />
                  </g>
                )
              })}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            mask="url(#nav-mask)"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="p-6 relative z-10 flex flex-col h-full">
        {/* LOGO */}
        <div className="backdrop-blur-sm rounded-2xl p-4 mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={collapsed ? 40 : 160}
            height={40}
            className="object-contain transition-all duration-300"
          />
        </div>

        {/* NAV */}
     <nav className="space-y-2">
  {menu.map((item) => {
    const Icon = item.icon
    const hasChildren = !!item.children
    const isOpen = openMenu === item.name

    const isActive =
      pathname === item.path ||
      item.children?.some((sub) => pathname === sub.path)

    return (
      <div key={item.name}>
        {/* ===== MAIN MENU ===== */}

        {hasChildren ? (
          /* SETTINGS (NO LINK, ONLY TOGGLE) */
          <div
            onClick={() =>
              setOpenMenu(isOpen ? null : item.name)
            }
            className={`mx-3 px-4 py-2.5 rounded-xl cursor-pointer
            transition-all flex items-center
            ${collapsed ? "justify-center" : "gap-3"}
            ${
              isActive
                ? "bg-white text-[#14b86e] font-semibold shadow-md"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span className="text-sm whitespace-nowrap">
                {item.name}
              </span>
            )}
          </div>
        ) : (
          /* NORMAL MENUS (WITH LINK) */
          <Link href={item.path}>
            <div
              className={`mx-3 px-4 py-2.5 rounded-xl
              transition-all flex items-center
              ${collapsed ? "justify-center" : "gap-3"}
              ${
                isActive
                  ? "bg-white text-[#14b86e] font-semibold shadow-md"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        )}

        {/* ===== SUB MENU ===== */}
        {!collapsed && hasChildren && isOpen && (
          <div className="ml-12 mt-1 space-y-1">
            {item.children.map((sub) => {
              const isSubActive = pathname === sub.path

              return (
                <Link key={sub.path} href={sub.path}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm transition-all
                    ${
                      isSubActive
                        ? "bg-white/90 text-[#14b86e] font-medium"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {sub.name}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  })}
</nav>




        {/* FOOTER */}
        {!collapsed && (
          <div className="mt-auto text-xs text-white/70">
            © 2025 Web23
          </div>
        )}
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#14b86e] to-[#0f9d58]" />
    </aside>
  )
}
