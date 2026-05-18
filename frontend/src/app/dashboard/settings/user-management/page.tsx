"use client"

import { useState } from "react"

import {
  Pencil,
  UserX,
  Plus,
  ShieldCheck,
  Users,
  Activity,
  Search,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  UserPlus,
  Building2,
} from "lucide-react"

const permissionMatrix = [
  {
    module: "Dashboard",
    view: true,
    add: true,
    edit: true,
    delete: false,
  },
  {
    module: "Asset Management",
    view: true,
    add: true,
    edit: true,
    delete: true,
  },
  {
    module: "Maintenance",
    view: true,
    add: true,
    edit: true,
    delete: false,
  },
  {
    module: "Inspection",
    view: true,
    add: true,
    edit: true,
    delete: false,
  },
  {
    module: "Vendor Management",
    view: true,
    add: true,
    edit: false,
    delete: false,
  },
  {
    module: "Reports",
    view: true,
    add: false,
    edit: false,
    delete: false,
  },
  {
    module: "Settings",
    view: true,
    add: true,
    edit: true,
    delete: true,
  },
]

const usersData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email:
      "rajesh.kumar@gsampada.gov.in",
    phone: "+91 9876543210",
    department: "IT",
    designation:
      "Senior Officer",
    role: "Admin",
    status: "Active",
    lastLogin:
      "22 Jan 2026, 10:30 AM",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email:
      "priya.sharma@gsampada.gov.in",
    phone: "+91 9876543211",
    department:
      "Building / Nirman",
    designation: "Inspector",
    role:
      "Inspection Officer",
    status: "Active",
    lastLogin:
      "22 Jan 2026, 09:15 AM",
  },
  {
    id: 3,
    name: "Amit Patel",
    email:
      "amit.patel@gsampada.gov.in",
    phone: "+91 9876543212",
    department: "Finance",
    designation:
      "Junior Officer",
    role:
      "Inspection Officer",
    status: "Active",
    lastLogin:
      "21 Jan 2026, 04:20 PM",
  },
  {
    id: 4,
    name: "Sunita Verma",
    email:
      "sunita.verma@gsampada.gov.in",
    phone: "+91 9876543213",
    department: "Revenue",
    designation:
      "Department Head",
    role: "Admin",
    status: "Inactive",
    lastLogin:
      "18 Jan 2026, 11:45 AM",
  },
]

export default function UserManagementPage() {

  const [search, setSearch] =
    useState("")

  const [role, setRole] =
    useState("")

  const [department, setDepartment] =
    useState("")

  const [openAddUser, setOpenAddUser] =
    useState(false)

  return (
    <div className="space-y-7">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <Users className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  User Management
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Manage system users, permissions & organizational access
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    usersData.length
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Users
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  98%
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Active System Health
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Admins"
              value="12"
            />

            <MiniCard
              icon={Activity}
              title="Active Users"
              value="84"
            />

            <MiniCard
              icon={UserPlus}
              title="New Requests"
              value="5"
            />
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Total Users"
          value={usersData.length}
          icon={Users}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Admins"
          value="12"
          icon={ShieldCheck}
          gradient="from-blue-500 to-cyan-500"
        />

        <OverviewCard
          title="Departments"
          value="8"
          icon={Building2}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* SEARCH */}

        <div className="relative w-full xl:w-[420px]">

          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search users..."
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap items-center gap-3">

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="h-12 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none"
          >
            <option>
              All Roles
            </option>

            <option>
              Admin
            </option>

            <option>
              Inspection Officer
            </option>
          </select>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
            className="h-12 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none"
          >
            <option>
              All Departments
            </option>

            <option>
              IT
            </option>

            <option>
              Finance
            </option>

            <option>
              Revenue
            </option>
          </select>

          <button
            onClick={() =>
              setOpenAddUser(true)
            }
            className="h-12 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg"
          >

            <Plus className="w-4 h-4" />

            Add User
          </button>
        </div>
      </div>

      {/* USER TABLE */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              User Directory
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage all registered system users
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                {[
                  "User",
                  "Department",
                  "Role",
                  "Status",
                  "Last Login",
                  "Actions",
                ].map((h) => (

                  <th
                    key={h}
                    className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {usersData.map(
                (user) => (

                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* USER */}

                    <td className="px-8 py-6">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">

                          {
                            user.name[0]
                          }
                        </div>

                        <div>

                          <h3 className="font-semibold text-gray-800">
                            {
                              user.name
                            }
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {
                              user.email
                            }
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {
                              user.phone
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-8 py-6">

                      <div className="font-medium text-gray-800">
                        {
                          user.department
                        }
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {
                          user.designation
                        }
                      </div>
                    </td>

                    {/* ROLE */}

                    <td className="px-8 py-6">

                      <span
                        className={`px-4 py-2 rounded-2xl text-xs font-medium
                        ${
                          user.role ===
                          "Admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {
                          user.role
                        }
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-8 py-6">

                      <span
                        className={`px-4 py-2 rounded-2xl text-xs font-medium
                        ${
                          user.status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {
                          user.status
                        }
                      </span>
                    </td>

                    {/* LOGIN */}

                    <td className="px-8 py-6 text-gray-600 text-sm">
                      {
                        user.lastLogin
                      }
                    </td>

                    {/* ACTION */}

                    <td className="px-8 py-6">

                      <div className="flex items-center gap-3">

                        <button className="w-11 h-11 rounded-2xl bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center text-blue-600">

                          <Pencil className="w-4 h-4" />
                        </button>

                        <button className="w-11 h-11 rounded-2xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center text-red-600">

                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PERMISSION MATRIX */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        <div className="px-8 py-6 border-b border-gray-100">

          <h2 className="text-2xl font-bold text-gray-800">
            Permission Matrix
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Role based access & permissions
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                {[
                  "Module",
                  "View",
                  "Add",
                  "Edit",
                  "Delete",
                ].map((h) => (

                  <th
                    key={h}
                    className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {permissionMatrix.map(
                (
                  row,
                  i
                ) => (

                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    <td className="px-8 py-6 font-semibold text-gray-800">
                      {
                        row.module
                      }
                    </td>

                    {[
                      "view",
                      "add",
                      "edit",
                      "delete",
                    ].map(
                      (key) => (

                        <td
                          key={key}
                          className="px-8 py-6"
                        >

                          {row[
                            key as keyof typeof row
                          ] ? (

                            <CheckCircle2 className="w-5 h-5 text-green-600" />

                          ) : (

                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}

      {openAddUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() =>
              setOpenAddUser(
                false
              )
            }
          />

          {/* MODAL */}

          <div className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-7 text-white">

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">

                  <UserPlus className="w-8 h-8" />
                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    Add New User
                  </h3>

                  <p className="text-green-50 text-sm mt-1">
                    Create a new system user account
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              <InputField
                label="Full Name"
                placeholder="Enter full name"
              />

              <InputField
                label="Email"
                placeholder="Enter email"
                type="email"
              />

              <InputField
                label="Mobile Number"
                placeholder="Enter mobile number"
              />

              <InputField
                label="Designation"
                placeholder="Enter designation"
              />

              <SelectField
                label="Department"
                options={[
                  "IT",
                  "Finance",
                  "Revenue",
                ]}
              />

              <SelectField
                label="Role"
                options={[
                  "Admin",
                  "Inspection Officer",
                ]}
              />
            </div>

            {/* FOOTER */}

            <div className="px-8 py-6 border-t border-gray-100 flex flex-col-reverse md:flex-row md:justify-end gap-3">

              <button
                onClick={() =>
                  setOpenAddUser(
                    false
                  )
                }
                className="h-12 px-6 rounded-2xl border border-gray-200 hover:bg-gray-100 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button className="h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium shadow-lg">

                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">

          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">
            {value}
          </h3>
        </div>
      </div>
    </div>
  )
}

/* ---------------- OVERVIEW CARD ---------------- */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-8 h-8" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            {value}
          </h2>
        </div>
      </div>
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function InputField({
  label,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="mt-2 w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  )
}

/* ---------------- SELECT ---------------- */

function SelectField({
  label,
  options,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select className="mt-2 w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100">

        <option>
          Select {label}
        </option>

        {options.map(
          (item: any) => (

            <option
              key={item}
            >
              {item}
            </option>
          )
        )}
      </select>
    </div>
  )
}