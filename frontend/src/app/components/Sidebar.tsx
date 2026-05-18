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
  ChevronDown,
} from "lucide-react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },

  {
    name: "Inventory",
    path: "/dashboard/inventory",
    icon: Boxes,
    children: [
      { name: "Asset Registration", path: "/dashboard/inventory", icon: Boxes },
      { name: "Asset Category", path: "/dashboard/asset/asset-category", icon: Boxes },
      { name: "Asset Status Tracking", path: "/dashboard/asset/asset-tracking", icon: BarChart3 },
      { name: "Asset Transfer", path: "/dashboard/asset/asset-transfer", icon: Boxes },
      { name: "Asset Mapping", path: "/dashboard/asset/asset-mapping", icon: Boxes },
      { name: "Asset Replacement", path: "/dashboard/asset/asset-replacement", icon: Boxes },
    ],
  },

  { name: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  { name: "Alerts", path: "/dashboard/alerts", icon: Bell },
  { name: "Maintenance Management", path: "/dashboard/complaints", icon: AlertCircle },
  { name: "Vendors", path: "/dashboard/vendors", icon: Users },
  { name: "Project Management", path: "/dashboard/project-management", icon: Boxes },

  {
    name: "Reports & Analytics",
    path: "/dashboard/report/reports-analytics",
    icon: LayoutDashboard,
  },

  {
    name: "Inspection Management",
    icon: LayoutDashboard,
    children: [
      {
        name: "Inspection Planning",
        path: "/dashboard/inspection/inspection-planning",
        icon: BarChart3,
      },
      {
        name: "Inspection Reporting",
        path: "/dashboard/inspection/inspection-reporting",
        icon: BarChart3,
      },
      {
        name: "Supervisor Approval",
        path: "/dashboard/inspection/supervisor-approval",
        icon: BarChart3,
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
        icon: Users,
      },
      {
        name: "Department Management",
        path: "/dashboard/settings/department-management",
        icon: Users,
      },
    ],
  },
]

export default function Sidebar({
  collapsed,
}: {
  collapsed: boolean
}) {
  const pathname = usePathname()

  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const activeParent = menu.find((item) =>
      item.children?.some((sub) => pathname === sub.path)
    )

    if (activeParent) {
      setOpenMenu(activeParent.name)
    }
  }, [pathname])

  return (
    <aside
      className={`bg-gradient-to-b from-[#14b86e] to-[#0f9d58]
      text-white h-screen fixed left-0 top-0 z-40
      transition-all duration-300 overflow-y-auto no-scrollbar
      ${collapsed ? "w-24" : "w-68"}`}
    >
      <div className="flex flex-col h-screen">

        {/* LOGO */}
        <div className="p-6 flex justify-center shrink-0">
          <Image
            src="/eccentriclogo.png"
            alt="logo"
            width={collapsed ? 0 : 180}
            height={100}
            className="object-contain transition-all duration-300"
          />
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-0">

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
                    className="relative cursor-pointer"
                  >
                    <div
                      className={`ml-3 pl-5 py-3 flex items-center transition-all duration-200
                      ${collapsed ? "justify-center" : "gap-3"}
                      ${
                        isActive
                          ? "bg-white text-black rounded-bl-full rounded-tl-full shadow-sm"
                          : "hover:bg-white/10 rounded-bl-full rounded-tl-full"
                      }`}
                    >
                      <Icon className="w-5 h-5" />

                      {!collapsed && (
                        <>
                          <span className="text-xs flex-1">
                            {item.name}
                          </span>

                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="mr-3"
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link href={item.path}>
                    <div
                      className={`ml-3 pl-5 py-3 flex items-center transition-all duration-200
                      ${collapsed ? "justify-center" : "gap-3"}
                      ${
                        isActive
                          ? "bg-white text-black rounded-bl-full rounded-tl-full shadow-sm"
                          : "hover:bg-white/10 rounded-bl-full rounded-tl-full"
                      }`}
                    >
                      <Icon className="w-5 h-5" />

                      {!collapsed && (
                        <span className="text-xs">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </Link>
                )}

                {/* SUB MENU */}
                <AnimatePresence initial={false}>
                  {!collapsed && hasChildren && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="ml-10 mt-2 space-y-2">

                        {item.children.map((sub) => {
                          const SubIcon = sub.icon

                          const isSubActive =
                            pathname === sub.path

                          return (
                            <Link key={sub.path} href={sub.path}>
                              <div
                                className={`flex items-center gap-3 px-4 py-4 text-xs rounded-bl-full rounded-tl-full transition-all duration-200
                                ${
                                  isSubActive
                                    ? "bg-white text-black font-medium shadow-sm"
                                    : "text-white/80 hover:bg-white/10"
                                }`}
                              >
                                <SubIcon className="w-4 h-4" />
                                {sub.name}
                              </div>
                            </Link>
                          )
                        })}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )
          })}

        </nav>
      </div>
    </aside>
  )
}