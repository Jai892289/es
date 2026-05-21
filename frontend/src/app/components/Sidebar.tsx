"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Boxes,
  BarChart3,
  AlertCircle,
  Users,
  Settings,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"

import {
  useState,
  useEffect,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Inventory",
    path: "/dashboard/inventory",
    icon: Boxes,

    children: [
      {
        name: "Asset Registration",
        path: "/dashboard/inventory",
        icon: Boxes,
      },

      {
        name: "Asset Category",
        path: "/dashboard/asset/asset-category",
        icon: Boxes,
      },

      {
        name: "Asset Tracking",
        path: "/dashboard/asset/asset-tracking",
        icon: BarChart3,
      },

      {
        name: "Asset Transfer",
        path: "/dashboard/asset/asset-transfer",
        icon: Boxes,
      },

      {
        name: "Asset Mapping",
        path: "/dashboard/asset/asset-mapping",
        icon: Boxes,
      },

      {
        name: "Asset Replacement",
        path: "/dashboard/asset/asset-replacement",
        icon: Boxes,
      },
    ],
  },

  {
    name: "Reports",
    path: "/dashboard/reports",
    icon: BarChart3,
  },

  {
    name: "Maintenance M",
    path: "/dashboard/complaints",
    icon: AlertCircle,
  },

  {
    name: "Vendors",
    path: "/dashboard/vendors",
    icon: Users,
  },

  {
    name: "Project Management",
    path: "/dashboard/project-management",
    icon: Boxes,
  },

  {
    name: "Reports & Analytics",
    path: "/dashboard/report/reports-analytics",
    icon: LayoutDashboard,
  },

  {
    name: "Inspection M",
    icon: ShieldCheck,

    children: [
      {
        name: "Inspection Planning",
        path: "/dashboard/inspection/inspection-planning",
        icon: BarChart3,
      },

      {
        name: "Reporting",
        path: "/dashboard/inspection/inspection-reporting",
        icon: BarChart3,
      },

      {
        name: "Approval",
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
        name: "Department M",
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

  const [openMenu, setOpenMenu] =
    useState<string | null>(null)

  useEffect(() => {

    const activeParent =
      menu.find((item) =>
        item.children?.some(
          (sub) =>
            pathname === sub.path
        )
      )

    if (activeParent) {
      setOpenMenu(activeParent.name)
    }

  }, [pathname])

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        transition-all duration-300
        ${
          collapsed
            ? "w-[78px]"
            : "w-[230px]"
        }
      `}
    >

      {/* MAIN PANEL */}

      <div
        className="
          relative h-full overflow-hidden
          bg-gradient-to-b
          from-[#0b1220]
          via-[#111827]
          to-[#071019]
          border-r border-white/[0.06]
          shadow-2xl
        "
      >

        {/* BACKGROUND GLOW */}

        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col h-full">

          {/* LOGO */}

          <div className="px-4 pt-4 pb-3 shrink-0">

            <div
              className={`
                flex items-center justify-center
              `}
            >

              {!collapsed ? (

                <div
                  className="
                    w-full h-[78px]
                    rounded-[22px]
                    bg-white/[0.04]
                    border border-white/[0.08]
                    backdrop-blur-xl
                    flex items-center justify-center
                    overflow-hidden
                    px-4
                  "
                >

                  <Image
                    src="/eccentriclogo.png"
                    alt="logo"
                    width={160}
                    height={60}
                    className="
                      object-contain
                      w-auto
                      h-auto
                      max-h-[52px]
                    "
                    priority
                  />
                </div>

              ) : (

                <div
                  className="
                    w-14 h-14
                    rounded-[18px]
                    bg-white
                    shadow-xl
                    flex items-center justify-center
                    overflow-hidden
                    p-2
                  "
                >

                  <Image
                    src="/eccentriclogo.png"
                    alt="logo"
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 overflow-y-auto px-3 pb-4 no-scrollbar space-y-1.5">

            {menu.map((item) => {

              const Icon = item.icon

              const hasChildren =
                !!item.children

              const isOpen =
                openMenu === item.name

              const isActive =
                pathname === item.path ||
                item.children?.some(
                  (sub) =>
                    pathname === sub.path
                )

              return (
                <div key={item.name}>

                  {/* MAIN MENU */}

                  {hasChildren ? (

                    <button
                      onClick={() =>
                        setOpenMenu(
                          isOpen
                            ? null
                            : item.name
                        )
                      }
                      className={`
                        group relative w-full
                        flex items-center
                        ${
                          collapsed
                            ? "justify-center"
                            : "justify-between"
                        }
                        px-3 py-2.5 min-h-[48px]
                        rounded-[16px]
                        transition-all duration-300
                        overflow-hidden
                        ${
                          isActive
                            ? `
                              bg-gradient-to-r
                              from-emerald-500
                              to-green-600
                              text-white
                              shadow-lg shadow-emerald-500/20
                            `
                            : `
                              text-gray-300
                              hover:bg-white/[0.06]
                              hover:text-white
                            `
                        }
                      `}
                    >

                      {isActive && (
                        <div className="absolute inset-0 bg-white/[0.06]" />
                      )}

                      <div className="relative z-10 flex items-center gap-3">

                        <div
                          className={`
                            w-9 h-9 rounded-xl
                            flex items-center justify-center
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                            }
                          `}
                        >

                          <Icon className="w-[17px] h-[17px]" />
                        </div>

                        {!collapsed && (

                          <span className="text-[13px] font-semibold tracking-[0.2px] leading-none">
                            {item.name}
                          </span>
                        )}
                      </div>

                      {!collapsed && (

                        <motion.div
                          animate={{
                            rotate:
                              isOpen
                                ? 180
                                : 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="relative z-10"
                        >

                          <ChevronDown size={15} />
                        </motion.div>
                      )}
                    </button>

                  ) : (

                    <Link href={item.path}>

                      <div
                        className={`
                          group relative
                          flex items-center
                          ${
                            collapsed
                              ? "justify-center"
                              : "gap-3"
                          }
                          px-3 py-2.5 min-h-[48px]
                          rounded-[16px]
                          transition-all duration-300
                          overflow-hidden
                          ${
                            isActive
                              ? `
                                bg-gradient-to-r
                                from-emerald-500
                                to-green-600
                                text-white
                                shadow-lg shadow-emerald-500/20
                              `
                            : `
                                text-gray-300
                                hover:bg-white/[0.06]
                                hover:text-white
                              `
                          }
                        `}
                      >

                        {isActive && (
                          <div className="absolute inset-0 bg-white/[0.06]" />
                        )}

                        <div
                          className={`
                            relative z-10
                            w-9 h-9 rounded-xl
                            flex items-center justify-center
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                            }
                          `}
                        >

                          <Icon className="w-[17px] h-[17px]" />
                        </div>

                        {!collapsed && (

                          <span className="relative z-10 text-[13px] font-semibold tracking-[0.2px] leading-none">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* SUBMENU */}

                  <AnimatePresence initial={false}>

                    {!collapsed &&
                      hasChildren &&
                      isOpen && (

                        <motion.div
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden"
                        >

                          <div className="ml-4 mt-2 space-y-1 border-l border-white/[0.08] pl-3">

                            {item.children.map((sub) => {

                              const SubIcon =
                                sub.icon

                              const isSubActive =
                                pathname === sub.path

                              return (
                                <Link
                                  key={sub.path}
                                  href={sub.path}
                                >

                                  <div
                                    className={`
                                      group flex items-center gap-3
                                      px-3 py-2
                                      rounded-xl
                                      transition-all duration-300
                                      ${
                                        isSubActive
                                          ? `
                                            bg-white
                                            text-gray-900
                                            shadow-lg
                                          `
                                          : `
                                            text-gray-400
                                            hover:bg-white/[0.05]
                                            hover:text-white
                                          `
                                      }
                                    `}
                                  >

                                    <div
                                      className={`
                                        w-8 h-8 rounded-lg
                                        flex items-center justify-center
                                        transition-all duration-300
                                        ${
                                          isSubActive
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-white/[0.05]"
                                        }
                                      `}
                                    >

                                      <SubIcon className="w-4 h-4" />
                                    </div>

                                    <span className="text-[12px] font-medium leading-none">
                                      {sub.name}
                                    </span>
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

          {/* FOOTER */}

          {!collapsed && (

            <div className="p-2 border-t border-white/[0.08]">

              <div className="rounded-[20px] bg-gradient-to-r from-emerald-500 to-green-600 p-4 shadow-xl shadow-emerald-500/20">

                <h3 className="text-white font-semibold text-[14px]">
                  System Health
                </h3>

                {/* <p className="text-green-50 text-[11px] mt-1 leading-relaxed">
                  All assets & services are operating normally
                </p> */}

                <div className="mt-2">

                  <div className="flex items-center justify-between text-[11px] text-white/90 mb-2">

                    <span>
                      Performance
                    </span>

                    <span className="font-semibold">
                      92%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">

                    <div className="w-[92%] h-2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}