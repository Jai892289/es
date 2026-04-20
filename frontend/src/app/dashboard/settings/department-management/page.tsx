"use client"

import { Plus, Search, Building2, Users, CheckCircle, AlertCircle, Pencil } from "lucide-react"

const stats = [
  { title: "Total Departments", value: "10", icon: Building2, color: "blue" },
  { title: "Total Staff", value: "966", icon: Users, color: "green" },
  { title: "Total Assets", value: "14,250", icon: CheckCircle, color: "purple" },
  { title: "Active Depts", value: "10", icon: AlertCircle, color: "orange" },
]

const departments = [
  {
    name: "Advertisement",
    code: "ADV",
    desc: "Manages all advertising and promotional activities",
    admin: "Suresh Mehta",
    staff: 45,
    assets: 320,
    status: "Active",
  },
  {
    name: "Building / Nirman",
    code: "BLD",
    desc: "Oversees construction and building projects",
    admin: "Priya Sharma",
    staff: 120,
    assets: 1850,
    status: "Active",
  },
  {
    name: "Finance",
    code: "FIN",
    desc: "Financial management and budgeting",
    admin: "Rajesh Kumar",
    staff: 78,
    assets: 890,
    status: "Active",
  },
]

export default function DepartmentManagementPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Department Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage departments, administrators, and resources
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm">
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* SEARCH + TOGGLE */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search departments..."
            className="w-full h-10 pl-10 pr-4 rounded-full border text-sm"
          />
        </div>

        {/* <div className="flex rounded-full border overflow-hidden text-sm">
          <button className="px-5 py-2 bg-blue-600 text-white">
            Cards
          </button>
          <button className="px-5 py-2 hover:bg-gray-50">
            Table
          </button>
        </div> */}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <div className="text-sm text-gray-500">{s.title}</div>
              <div className="text-3xl font-bold text-gray-800">
                {s.value}
              </div>
            </div>

            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl
              ${
                s.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : s.color === "green"
                  ? "bg-green-100 text-green-600"
                  : s.color === "purple"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              <s.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* DEPARTMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((d, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>

                <div>
                  <div className="font-semibold text-gray-800">
                    {d.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Code: {d.code}
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                {d.status}
              </span>
            </div>

            {/* DESC */}
            <p className="text-sm text-gray-600 mt-4">
              {d.desc}
            </p>

            <hr className="my-4" />

            {/* DETAILS */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Admin:</span>
                <span className="font-medium">{d.admin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Staff:</span>
                <span className="font-medium">{d.staff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assets:</span>
                <span className="font-medium">{d.assets}</span>
              </div>
            </div>

            {/* ACTION */}
            <button className="mt-5 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm">
              <Pencil className="w-4 h-4" />
              Edit Department
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
