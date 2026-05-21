"use client"

import {
  Menu,
  LogOut,
  ChevronDown,
} from "lucide-react"

import {
  useState,
  useRef,
  useEffect,
} from "react"

import { useRouter } from "next/navigation"

export default function Topbar({
  onToggle,
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
    <header
      className="
        sticky top-0 z-40
        h-16
        bg-white/90 backdrop-blur-xl
        border-b border-gray-100
        flex items-center
        px-3 md:px-4
        gap-3
        shadow-sm
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-3 min-w-0">

        {/* SIDEBAR BUTTON */}

        <button
          onClick={onToggle}
          className="
            group
            w-10 h-10
            rounded-xl
            bg-gray-50
            hover:bg-emerald-50
            border border-gray-100
            hover:border-emerald-200
            transition
            flex items-center justify-center
            shrink-0
          "
        >

          <Menu className="w-4 h-4 text-black group-hover:text-emerald-600 transition" />
        </button>

        {/* TITLE */}

        <div className="hidden lg:block min-w-0">

          <h2 className="text-base font-semibold text-black break-words">
            Dashboard
          </h2>

          <p className="text-[11px] text-black mt-0.5 break-words">
            Asset & Department Management
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="ml-auto flex items-center gap-2 min-w-0">

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
              flex items-center gap-2
              bg-gray-50 hover:bg-emerald-50
              border border-gray-100 hover:border-emerald-200
              rounded-xl
              px-2 py-1.5
              transition
            "
          >

            {/* AVATAR */}

            <div className="relative shrink-0">

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-600
                  text-white
                  flex items-center justify-center
                  font-bold text-sm
                "
              >
                AD
              </div>

              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
            </div>

            {/* INFO */}

            <div className="hidden sm:block text-left min-w-0">

              <h4 className="text-sm font-semibold text-black truncate">
                Admin
              </h4>

              <p className="text-[11px] text-black mt-0.5 truncate">
                Super Administrator
              </p>
            </div>

            <ChevronDown
              className={`
                w-4 h-4 text-black shrink-0 transition-transform duration-300
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
                absolute right-0 top-full mt-2
                w-[260px]
                bg-white
                border border-gray-100
                rounded-2xl
                shadow-2xl
                overflow-hidden
                z-[999]
                animate-in fade-in zoom-in duration-200
              "
            >

              {/* TOP */}

              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white">

                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-sm font-bold shrink-0">

                    AD
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-base font-semibold break-words">
                      Admin
                    </h3>

                    <p className="text-green-50 text-[11px] mt-1 break-all">
                      admin@gsampada.gov.in
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU */}

              <div className="p-2">

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    w-full
                    flex items-center gap-3
                    px-3 py-3
                    rounded-xl
                    text-red-600
                    hover:bg-red-50
                    transition
                    text-sm font-medium
                  "
                >

                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">

                    <LogOut className="w-4 h-4" />
                  </div>

                  <div className="text-left min-w-0">

                    <p className="font-semibold break-words">
                      Logout
                    </p>

                    <p className="text-[11px] text-red-500 mt-0.5 break-words">
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