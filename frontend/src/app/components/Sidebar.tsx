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
        path:
          "/dashboard/asset/asset-category",
        icon: Boxes,
      },

      {
        name:
          "Asset Tracking",
        path:
          "/dashboard/asset/asset-tracking",
        icon: BarChart3,
      },

      {
        name: "Asset Transfer",
        path:
          "/dashboard/asset/asset-transfer",
        icon: Boxes,
      },

      {
        name: "Asset Mapping",
        path:
          "/dashboard/asset/asset-mapping",
        icon: Boxes,
      },

      {
        name:
          "Asset Replacement",
        path:
          "/dashboard/asset/asset-replacement",
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
    name:
      "Maintenance M",
    path: "/dashboard/complaints",
    icon: AlertCircle,
  },

  {
    name: "Vendors",
    path: "/dashboard/vendors",
    icon: Users,
  },

  {
    name:
      "Project Management",
    path:
      "/dashboard/project-management",
    icon: Boxes,
  },

  {
    name:
      "Reports & Analytics",
    path:
      "/dashboard/report/reports-analytics",
    icon: LayoutDashboard,
  },

  {
    name:
      "Inspection M",
    icon: ShieldCheck,

    children: [
      {
        name:
          "Inspection Planning",
        path:
          "/dashboard/inspection/inspection-planning",
        icon: BarChart3,
      },

      {
        name:
          "Reporting",
        path:
          "/dashboard/inspection/inspection-reporting",
        icon: BarChart3,
      },

      {
        name:
          "Approval",
        path:
          "/dashboard/inspection/supervisor-approval",
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
        name:
          "User Management",
        path:
          "/dashboard/settings/user-management",
        icon: Users,
      },

      {
        name:
          "Department M",
        path:
          "/dashboard/settings/department-management",
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

  const pathname =
    usePathname()

  const [openMenu, setOpenMenu] =
    useState<string | null>(
      null
    )

  useEffect(() => {

    const activeParent =
      menu.find((item) =>
        item.children?.some(
          (sub) =>
            pathname === sub.path
        )
      )

    if (activeParent) {

      setOpenMenu(
        activeParent.name
      )
    }
  }, [pathname])

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen
        transition-all duration-300
        ${
          collapsed
            ? "w-24"
            : "w-[290px]"
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

        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col h-full">

          {/* LOGO */}

          <div className="px-5 pt-6 pb-5 shrink-0">

            <div
              className={`
                flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-center"
                }
              `}
            >

              {!collapsed ? (

                <div
                  className="
                    w-full h-[95px]
                    rounded-[28px]
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
                    width={180}
                    height={70}
                    className="
                      object-contain
                      w-auto
                      h-auto
                      max-h-[62px]
                    "
                    priority
                  />
                </div>

              ) : (

                <div
                  className="
                    w-16 h-16
                    rounded-[22px]
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
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 overflow-y-auto px-4 pb-6 no-scrollbar space-y-2.5">

            {menu.map((item) => {

              const Icon =
                item.icon

              const hasChildren =
                !!item.children

              const isOpen =
                openMenu ===
                item.name

              const isActive =
                pathname ===
                  item.path ||
                item.children?.some(
                  (sub) =>
                    pathname ===
                    sub.path
                )

              return (
                <div
                  key={item.name}
                >

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
                        px-4 py-3.5 min-h-[58px]
                        rounded-[22px]
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

                        <div className="absolute inset-0 bg-white/[0.08]" />
                      )}

                      <div className="relative z-10 flex items-center gap-3.5">

                        <div
                          className={`
                            w-11 h-11 rounded-2xl
                            flex items-center justify-center
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                            }
                          `}
                        >

                          <Icon className="w-[19px] h-[19px]" />
                        </div>

                        {!collapsed && (

                          <span className="text-[14px] font-semibold tracking-[0.2px] leading-none">
                            {
                              item.name
                            }
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

                          <ChevronDown
                            size={17}
                          />
                        </motion.div>
                      )}
                    </button>

                  ) : (

                    <Link
                      href={
                        item.path
                      }
                    >

                      <div
                        className={`
                          group relative
                          flex items-center
                          ${
                            collapsed
                              ? "justify-center"
                              : "gap-3.5"
                          }
                          px-4 py-3.5 min-h-[58px]
                          rounded-[22px]
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

                          <div className="absolute inset-0 bg-white/[0.08]" />
                        )}

                        <div
                          className={`
                            relative z-10
                            w-11 h-11 rounded-2xl
                            flex items-center justify-center
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                            }
                          `}
                        >

                          <Icon className="w-[19px] h-[19px]" />
                        </div>

                        {!collapsed && (

                          <span className="relative z-10 text-[14px] font-semibold tracking-[0.2px] leading-none">
                            {
                              item.name
                            }
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
                            duration: 0.28,
                          }}
                          className="overflow-hidden"
                        >

                          <div className="ml-6 mt-3 space-y-2 border-l border-white/[0.08] pl-4">

                            {item.children.map(
                              (
                                sub
                              ) => {

                                const SubIcon =
                                  sub.icon

                                const isSubActive =
                                  pathname ===
                                  sub.path

                                return (
                                  <Link
                                    key={
                                      sub.path
                                    }
                                    href={
                                      sub.path
                                    }
                                  >

                                    <div
                                      className={`
                                        group flex items-center gap-3
                                        px-3.5 py-3
                                        rounded-2xl
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
                                          w-9 h-9 rounded-xl
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

                                      <span className="text-[13px] font-medium leading-none">
                                        {
                                          sub.name
                                        }
                                      </span>
                                    </div>
                                  </Link>
                                )
                              }
                            )}
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

            <div className="p-5 border-t border-white/[0.08]">

              <div className="rounded-[28px] bg-gradient-to-r from-emerald-500 to-green-600 p-5 shadow-2xl shadow-emerald-500/20">

                <h3 className="text-white font-semibold text-[15px]">
                  System Health
                </h3>

                <p className="text-green-50 text-[12px] mt-1 leading-relaxed">
                  All assets &
                  services are
                  operating normally
                </p>

                <div className="mt-5">

                  <div className="flex items-center justify-between text-[12px] text-white/90 mb-2">

                    <span>
                      Performance
                    </span>

                    <span className="font-semibold">
                      92%
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">

                    <div className="w-[92%] h-2.5 rounded-full bg-white" />
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