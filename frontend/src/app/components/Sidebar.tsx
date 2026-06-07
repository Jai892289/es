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
    name: "Maintenance",
    path: "/dashboard/complaints",
    icon: AlertCircle,
  },

  {
    name: "Vendors",
    path: "/dashboard/vendors",
    icon: Users,
  },

  {
    name: "Project",
    path: "/dashboard/project-management",
    icon: Boxes,
  },

  {
    name: "Analytics",
    path: "/dashboard/report/reports-analytics",
    icon: LayoutDashboard,
  },

  {
    name: "Inspection",
    icon: ShieldCheck,

    children: [
      {
        name: "Planning",
        path: "/dashboard/inspection/inspection-planning",
        icon: BarChart3,
      },

      // {
      //   name: "Reporting",
      //   path: "/dashboard/inspection/inspection-reporting",
      //   icon: BarChart3,
      // },

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
        name: "Users",
        path: "/dashboard/settings/user-management",
        icon: Users,
      },

      {
        name: "Departments",
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
            pathname ===
            sub.path
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
        overflow-hidden
        ${
          collapsed
  ? "w-[72px]"
  : "w-[260px]"
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
          shadow-xl
        "
      >

        {/* BG */}

        <div className="absolute top-0 left-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl" />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col h-full overflow-hidden">

          {/* LOGO */}

          <div className="px-3 pt-3 pb-2 shrink-0">

            <div className="flex items-center justify-center">

              {!collapsed ? (

                <div
                  className="
                    w-full h-[72px]
rounded-2xl
bg-gradient-to-r
from-emerald-500/10
to-cyan-500/10
border border-white/[0.08]
shadow-[0_0_20px_rgba(16,185,129,0.1)]
                    backdrop-blur-xl
                    flex items-center justify-center
                    overflow-hidden
                    px-3
                  "
                >

                  <Image
                    src="/eccentriclogo.png"
                    alt="logo"
                    width={140}
                    height={48}
                    className="
                      object-contain
                      w-auto
                      h-auto
                      max-h-[42px]
                    "
                    priority
                  />
                </div>

              ) : (
<></>
                // <div
                //   className="
                //     w-12 h-12
                //     rounded-xl
                //     bg-white
                //     shadow-sm
                //     flex items-center justify-center
                //     overflow-hidden
                //     p-2
                //   "
                // >

                //   <Image
                //     src="/eccentriclogo.png"
                //     alt="logo"
                //     width={30}
                //     height={30}
                //     className="object-contain"
                //   />
                // </div>
              )}
            </div>
          </div>

          {/* NAV */}

          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-3 no-scrollbar space-y-1">

            {menu.map((item) => {

              const Icon =
                item.icon

              const hasChildren =
                !!item.children

              const isOpen =
                openMenu ===
                item.name

               const isActive =
  item.path === "/dashboard"
    ? pathname === "/dashboard"
    : item.children
      ? item.children.some(
          (sub) =>
            pathname === sub.path ||
            pathname.startsWith(`${sub.path}/`)
        )
      : pathname === item.path ||
        pathname.startsWith(`${item.path}/`);

              // const isActive =
              //   pathname ===
              //     item.path ||
              //   item.children?.some(
              //     (sub) =>
              //       pathname ===
              //       sub.path
              //   )

              return (
                <div
                  key={item.name}
                >

                  {/* MENU */}

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
                        px-2.5 py-2 min-h-[42px]
                        rounded-xl
                        transition-all duration-300
                        overflow-hidden
                        ${
                          isActive
                            ? `
                              bg-green-600
border border-emerald-500/25
text-white
shadow-[0_0_20px_rgba(16,185,129,0.15)]
                            `
                            : `
                              text-gray-300
                              hover:bg-white/[0.06]
                              hover:text-white
                            `
                        }
                      `}
                    >

                      <div className="relative z-10 flex items-center gap-2.5 min-w-0">

                        <div
                          className={`
                            w-8 h-8 rounded-lg
                            flex items-center justify-center
                            transition-all duration-300 shrink-0
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05]"
                            }
                          `}
                        >

                          <Icon className="w-4 h-4" />
                        </div>

                        {!collapsed && (

                          <span className="text-[12px] font-medium truncate">
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
                            duration: 0.2,
                          }}
                          className="shrink-0"
                        >

                          <ChevronDown className="w-4 h-4" />
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
                              : "gap-2.5"
                          }
                          px-2.5 py-2 min-h-[42px]
                          rounded-xl
                          transition-all duration-300
                          overflow-hidden
                          ${
                            isActive
                              ? `
                                bg-gradient-to-r
                                from-emerald-500
                                to-green-600
                                text-white
                                shadow-sm
                              `
                              : `
                                text-gray-300
                                hover:bg-white/[0.06]
                                hover:text-white
                              `
                          }
                        `}
                      >

                        <div
                          className={`
                            relative z-10
                            w-8 h-8 rounded-lg
                            flex items-center justify-center
                            transition-all duration-300 shrink-0
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.05]"
                            }
                          `}
                        >

                          <Icon className="w-4 h-4" />
                        </div>

                        {!collapsed && (

                          <span className="relative z-10 text-[12px] font-medium truncate">
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
                            duration: 0.2,
                          }}
                          className="overflow-hidden"
                        >

                          <div className="ml-3 mt-1 space-y-1 border-l border-white/[0.08] pl-2">

                            {item.children.map(
                              (sub) => {

                                const SubIcon =
                                  sub.icon

                                  const isSubActive =
  pathname === sub.path ||
  pathname.startsWith(
    `${sub.path}/`
  );

                                // const isSubActive =
                                //   pathname ===
                                //   sub.path

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
                                        group flex items-center gap-2
                                        px-2 py-2
                                        rounded-lg
                                        transition-all duration-300
                                        overflow-hidden
                                        ${
                                          isSubActive
                                            ? `
                                              bg-white
                                              text-black
                                              shadow-sm
                                            `
                                            : `
                                              text-gray-300
                                              hover:bg-white/[0.05]
                                              hover:text-white
                                            `
                                        }
                                      `}
                                    >

                                      <div
                                        className={`
                                          w-7 h-7 rounded-lg
                                          flex items-center justify-center
                                          shrink-0
                                          ${
                                            isSubActive
                                              ? "bg-emerald-100 text-emerald-600"
                                              : "bg-white/[0.05]"
                                          }
                                        `}
                                      >

                                        <SubIcon className="w-3.5 h-3.5" />
                                      </div>

                                      <span className="text-[11px] font-medium truncate">
                                        {sub.name}
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

            <div className="p-2 border-t border-white/[0.08] shrink-0">

              <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-3 shadow-sm overflow-hidden">

                <h3 className="text-white font-semibold text-[12px]">
                  System Health
                </h3>

                <div className="mt-2">

                  <div className="flex items-center justify-between text-[10px] text-white/90 mb-1">

                    <span>
                      Performance
                    </span>

                    <span className="font-semibold">
                      92%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">

                    <div className="w-[92%] h-1.5 rounded-full bg-white" />
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