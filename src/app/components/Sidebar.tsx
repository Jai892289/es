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
      { name: "Asset Registration", path: "/dashboard/asset/asset-registration", icon: Boxes },
      { name: "Asset Category", path: "/dashboard/asset/asset-category", icon: Boxes },
      { name: "Asset Status Tracking", path: "/dashboard/asset/asset-tracking", icon: BarChart3 },
      { name: "Asset Transfer", path: "/dashboard/asset/asset-transfer", icon: Boxes },
      { name: "Asset Mapping", path: "/dashboard/asset/asset-mapping", icon: Boxes },
      { name: "Asset Replacement", path: "/dashboard/asset/asset-replacement", icon: Boxes },
    ],
  },
  {
    name: "Reports & Analytics",
    path: "/dashboard/report/reports-analytics",
    icon: LayoutDashboard,
  },
  {
    name: "Inspection Management",
    icon: LayoutDashboard,
    children: [
      { name: "Inspection Planning", path: "/dashboard/inspection/inspection-planning", icon: BarChart3 },
      { name: "Inspection Reporting", path: "/dashboard/inspection/inspection-reporting", icon: BarChart3 },
      { name: "Supervisor Approval", path: "/dashboard/inspection/supervisor-approval", icon: BarChart3 },
    ],
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    children: [
      { name: "User Management", path: "/dashboard/settings/user-management", icon: Users },
      { name: "Department Management", path: "/dashboard/settings/department-management", icon: Users },
    ],
  },
]

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const activeParent = menu.find((item) =>
      item.children?.some((sub) => pathname === sub.path)
    )
    if (activeParent) setOpenMenu(activeParent.name)
  }, [pathname])

  return (
    <aside
      className={`bg-gradient-to-b from-[#14b86e] to-[#0f9d58]
      text-white h-screen fixed left-0 top-0 z-40
      transition-all duration-300
      ${collapsed ? "w-24" : "w-64"}`}
    >
      <div className="relative z-10 flex flex-col h-screen">

        {/* LOGO */}
        <div className="p-6 flex justify-center shrink-0">
          <Image
            src="/sidebarIcon.png"
            alt="logo"
            width={collapsed ? 0 : 100}
            height={100}
            className="object-contain transition-all duration-300"
          />
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {menu.map((item) => {
            const Icon = item.icon
            const hasChildren = !!item.children
            const isOpen = openMenu === item.name

            const isActive =
              pathname === item.path ||
              item.children?.some((sub) => pathname === sub.path)

            return (
              <div key={item.name}>
                {/* MAIN ITEM */}
                {hasChildren ? (
                  <div
                    onClick={() =>
                      setOpenMenu(isOpen ? null : item.name)
                    }
                    className={`ml-3 pl-5 py-3 transition-all flex items-center cursor-pointer
                    ${collapsed ? "justify-center" : "gap-3"}
                    ${isActive
                        ? "bg-white text-black rounded-bl-full rounded-tl-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-semibold"
                        : "text-white hover:bg-white/10 rounded-bl-full rounded-tl-full"
                      }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="text-sm">{item.name}</span>}
                  </div>
                ) : (
                  <Link href={item.path}>
                    <div
                      className={`ml-2 pl-5 py-3 transition-all flex items-center
                      ${collapsed ? "justify-center" : "gap-3"}
                      ${isActive
                          ? "bg-white text-black rounded-bl-full rounded-tl-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-semibold"
                          : "text-white hover:bg-white/10 rounded-bl-full rounded-tl-full"
                        }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.name}</span>}
                    </div>
                  </Link>
                )}

                {/* SUB MENU */}
                {/* SUB MENU */}
                {!collapsed && hasChildren && isOpen && (
                  <div className="ml-10 mt-2 space-y-2">
                    {item.children.map((sub) => {
                      const isSubActive = pathname === sub.path
                      const SubIcon = sub.icon

                      return (
                        <Link key={sub.path} href={sub.path}>
                          <div
                            className={`flex items-center gap-3 px-4 py-2 text-sm rounded-bl-full rounded-tl-full transition-all
            ${isSubActive
                                ? "bg-white text-black font-medium shadow"
                                : "text-white/80 hover:bg-white/10"
                              }`}
                          >
                            {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                            <span>{sub.name}</span>
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
      </div>
    </aside>
  )
}
