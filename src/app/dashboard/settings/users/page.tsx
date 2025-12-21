"use client"

import Link from "next/link"
import { ChevronLeft, User, Phone, Mail, Calendar, Trash2 } from "lucide-react"
import { useState } from "react"

export default function UserProfilePage() {
  const [role, setRole] = useState<"admin" | "manager" | "consultant">("manager")

  return (
    <div className="space-y-8">

      {/* BACK */}
      <Link
        href="/dashboard/settings"
        className="flex items-center gap-2 text-sm text-green-600 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Settings
      </Link>

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-green-600">
        User Profile
      </h2>

      <div className="grid grid-cols-12 gap-10">

        {/* LEFT PROFILE */}
        <div className="col-span-7 space-y-6">

          <div className="flex items-start gap-6">
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="w-28 h-28 rounded-full object-cover"
            />

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Pavan Das</h3>

              <Info icon={<User />} text="Pavan Das" />
              <Info icon={<Phone />} text="+91 12345 12789" />
              <Info icon={<Mail />} text="pavan.das@gmail.com" />
              <Info icon={<Calendar />} text="Joined on Jan 02, 2025" />
            </div>
          </div>

          {/* DETAILS */}
          <div className="text-sm text-gray-700 space-y-1 pl-1">
            <p><b>Department Name:</b> Revenue</p>
            <p><b>Designation:</b> Sr. Manager</p>
            <p><b>Reporting Manager:</b> Dist. Manager</p>
            <p><b>District:</b> Bangalore East</p>
            <p><b>City:</b> Bangalore</p>
            <p><b>State:</b> Karnataka</p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6 pt-10">
            <button className="flex items-center gap-2 text-green-600 text-sm">
              Deactivate User
            </button>

            <button className="flex items-center gap-2 text-red-500 text-sm">
              <Trash2 className="w-4 h-4" />
              Delete User
            </button>
          </div>
        </div>

        {/* RIGHT ROLE PANEL */}
        <div className="col-span-5">
          <div className="bg-white rounded-xl border p-6 space-y-6">

            <h3 className="text-blue-600 font-medium">
              Change Role
            </h3>

            <RoleOption
              title="Administrator"
              active={role === "admin"}
              onClick={() => setRole("admin")}
              description="Full control over the dashboard and inventory. Can add, edit, delete users, categories, products and manage all platform settings."
            />

            <RoleOption
              title="Manager"
              active={role === "manager"}
              onClick={() => setRole("manager")}
              description="Has moderate access. Can add and update products, monitor inventory, generate reports and manage daily operations but cannot delete users or categories."
            />

            <RoleOption
              title="Consultant"
              active={role === "consultant"}
              onClick={() => setRole("consultant")}
              description="Limited access to view reports, monitor inventory and track stock status. Ensures informed decision-making without modification rights."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------- INFO ROW -------- */
function Info({
  icon,
  text,
}: {
  icon: any
  text: string
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span className="text-green-500">{icon}</span>
      {text}
    </div>
  )
}

/* -------- ROLE OPTION -------- */
function RoleOption({
  title,
  description,
  active,
  onClick,
}: {
  title: string
  description: string
  active: boolean
  onClick: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className={`w-11 h-6 rounded-full p-1 transition ${
          active ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition ${
            active ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  )
}
