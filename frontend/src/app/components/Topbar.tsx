"use client"

import {
  Menu,
  LogOut,
  ChevronDown,
  Search,
  Bell,
  Settings2,
} from "lucide-react"

import {
  useState,
  useRef,
  useEffect,
} from "react"

import { useRouter } from "next/navigation"

export default function Topbar({
  onToggle,
  collapsed,
}: {
  onToggle: () => void
  collapsed: boolean
}) {

  const [open, setOpen] =
    useState(false)

  const router = useRouter()

  const dropdownRef =
    useRef<HTMLDivElement>(null)

  /* ---------------- CLOSE DROPDOWN ---------------- */

  useEffect(() => {

    const handler = (
      e: MouseEvent
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target as Node
        )
      ) {

        setOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handler
    )

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      )
  }, [])

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {

    localStorage.removeItem(
      "auth"
    )

    localStorage.removeItem(
      "token"
    )

    router.replace("/login")
  }

  return (
    <header className="sticky top-0 z-40 h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center px-4 md:px-7 gap-4 shadow-sm">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        {/* SIDEBAR TOGGLE */}

        <button
          onClick={onToggle}
          className="group w-12 h-12 rounded-2xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 transition-all duration-300 flex items-center justify-center shadow-sm"
        >

          <Menu className="w-5 h-5 cursor-pointer text-gray-700 group-hover:text-emerald-600 transition" />
        </button>

        {/* PAGE TITLE */}

        <div className="hidden lg:block">

          <h2 className="text-lg font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Smart Asset &
            Department Management
          </p>
        </div>
      </div>

      {/* SEARCH */}

      {/* <div className="hidden md:flex flex-1 justify-center px-4">

        <div className="relative w-full max-w-2xl">

          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            placeholder="Search users, assets, inspections..."
            className="
              w-full h-14
              rounded-2xl
              border border-gray-200
              bg-gray-50
              pl-14 pr-5
              text-sm
              outline-none
              transition-all duration-300
              focus:border-emerald-500
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-100
            "
          />
        </div>
      </div> */}

      {/* RIGHT */}

      <div className="ml-auto flex items-center gap-3">

        {/* NOTIFICATION */}

        {/* <button
          className="
            relative
            w-12 h-12
            rounded-2xl
            bg-gray-50
            hover:bg-emerald-50
            border border-gray-100
            hover:border-emerald-200
            transition-all duration-300
            flex items-center justify-center
            shadow-sm
          "
        >

          <Bell className="w-5 h-5 text-gray-700" />

          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
        </button> */}

        {/* SETTINGS */}

        {/* <button
          className="
            hidden md:flex
            w-12 h-12
            rounded-2xl
            bg-gray-50
            hover:bg-emerald-50
            border border-gray-100
            hover:border-emerald-200
            transition-all duration-300
            items-center justify-center
            shadow-sm
          "
        >

          <Settings2 className="w-5 h-5 text-gray-700" />
        </button> */}

        {/* PROFILE */}

        <div
          className="relative"
          ref={dropdownRef}
        >

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              group
              flex items-center gap-3
              bg-gray-50 hover:bg-emerald-50
              border border-gray-100 hover:border-emerald-200
              rounded-2xl
              pl-2 pr-2 py-2
              transition-all duration-300
              shadow-sm
            "
          >

            {/* AVATAR */}

            <div className="relative">

              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-gradient-to-r from-emerald-500 to-green-600
                  text-white
                  flex items-center justify-center
                  font-bold text-sm
                  shadow-lg
                "
              >
                AD
              </div>

              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
            </div>

            {/* INFO */}

            <div className="hidden sm:block text-left">

              <h4 className="text-sm font-semibold text-gray-800">
                Admin
              </h4>

              <p className="text-xs text-gray-500 mt-0.5">
                Super Administrator
              </p>
            </div>

            <ChevronDown
              className={`
                w-4 h-4 text-gray-500 transition-transform duration-300
                ${
                  open
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* DROPDOWN */}

          {open && (

            <div
              className="
                absolute right-0 mt-3
                w-72
                bg-white/95 backdrop-blur-xl
                border border-gray-100
                rounded-[28px]
                shadow-2xl
                overflow-hidden
                animate-in fade-in zoom-in duration-200
                z-50
              "
            >

              {/* TOP */}

              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-6 text-white">

                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-xl font-bold shadow-lg">

                    AD
                  </div>

                  <div>

                    <h3 className="text-lg font-bold">
                      Admin
                    </h3>

                    <p className="text-green-50 text-sm mt-1">
                      admin@gsampada.gov.in
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU */}

              <div className="p-3">

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-4
                    rounded-2xl
                    text-red-600
                    hover:bg-red-50
                    transition-all duration-300
                    text-sm font-medium
                  "
                >

                  <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center">

                    <LogOut className="w-5 h-5" />
                  </div>

                  <div className="text-left">

                    <p className="font-semibold">
                      Logout
                    </p>

                    <p className="text-xs text-red-400 mt-1">
                      Sign out from dashboard
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}