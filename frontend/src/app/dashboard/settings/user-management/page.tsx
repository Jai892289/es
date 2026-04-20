"use client"

import { useState } from "react"
import { Plus, Pencil, UserX } from "lucide-react"
import { CheckCircle2, XCircle } from "lucide-react"

const permissionMatrix = [
  { module: "Dashboard", view: true, add: true, edit: true, delete: false },
  { module: "Asset Management", view: true, add: true, edit: true, delete: true },
  { module: "Maintenance", view: true, add: true, edit: true, delete: false },
  { module: "Inspection", view: true, add: true, edit: true, delete: false },
  { module: "Vendor Management", view: true, add: true, edit: false, delete: false },
  { module: "Reports", view: true, add: false, edit: false, delete: false },
  { module: "Settings", view: true, add: true, edit: true, delete: true },
]

const usersData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gsampada.gov.in",
    phone: "+91 9876543210",
    department: "IT",
    designation: "Senior Officer",
    role: "Admin",
    status: "Active",
    lastLogin: "22 Jan 2026, 10:30 AM",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@gsampada.gov.in",
    phone: "+91 9876543211",
    department: "Building / Nirman",
    designation: "Inspector",
    role: "Inspection Officer",
    status: "Active",
    lastLogin: "22 Jan 2026, 09:15 AM",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@gsampada.gov.in",
    phone: "+91 9876543212",
    department: "Finance",
    designation: "Junior Officer",
    role: "Inspection Officer",
    status: "Active",
    lastLogin: "21 Jan 2026, 04:20 PM",
  },
  {
    id: 4,
    name: "Sunita Verma",
    email: "sunita.verma@gsampada.gov.in",
    phone: "+91 9876543213",
    department: "Revenue",
    designation: "Department Head",
    role: "Admin",
    status: "Inactive",
    lastLogin: "18 Jan 2026, 11:45 AM",
  },
]

export default function UserManagementPage() {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("")
const [openAddUser, setOpenAddUser] = useState(false)

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage users, roles, and permissions
          </p>
        </div>

        <button
  onClick={() => setOpenAddUser(true)}
  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#14B86E] text-white hover:bg-[#14b86eb4] text-sm"
>
  + Add New User
</button>

      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or department..."
          className="h-10 px-4 rounded-full border w-full md:w-[420px] text-sm"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="inspection">Inspection Officer</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">All Departments</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#14b86e] text-white">
            <tr>
              {[
                "User Details",
                "Department",
                "Role",
                "Status",
                "Last Login",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                {/* USER */}
                <td className="px-4 py-3">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">
                    {user.email}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user.phone}
                  </div>
                </td>

                {/* DEPARTMENT */}
                <td className="px-4 py-3">
                  <div className="font-medium">{user.department}</div>
                  <div className="text-xs text-gray-500">
                    {user.designation}
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-4 py-3 font-medium">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* LAST LOGIN */}
                <td className="px-4 py-3 text-gray-600">
                  {user.lastLogin}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* ================= PERMISSION MATRIX ================= */}
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">
    Permission Matrix (Admin Role)
  </h3>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          {["Module", "View", "Add", "Edit", "Delete"].map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left font-semibold text-gray-700"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {permissionMatrix.map((row, i) => (
          <tr key={i} className="border-b last:border-none">
            <td className="px-4 py-3 font-medium text-gray-800">
              {row.module}
            </td>

            {["view", "add", "edit", "delete"].map((key) => (
              <td key={key} className="px-4 py-3">
                {row[key as keyof typeof row] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


{openAddUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60"
      onClick={() => setOpenAddUser(false)}
    />

    {/* MODAL */}
    <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Add New User
        </h3>
      </div>

      {/* BODY */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 w-full h-10 px-4 rounded-lg border text-sm"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full h-10 px-4 rounded-lg border text-sm"
            placeholder="Enter email"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            className="mt-1 w-full h-10 px-4 rounded-lg border text-sm"
            placeholder="Enter mobile number"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Designation
          </label>
          <input
            type="text"
            className="mt-1 w-full h-10 px-4 rounded-lg border text-sm"
            placeholder="Enter designation"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Department
          </label>
          <select className="mt-1 w-full h-10 px-4 rounded-lg border text-sm bg-white">
            <option>Select Department</option>
            <option>IT</option>
            <option>Finance</option>
            <option>Revenue</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Role
          </label>
          <select className="mt-1 w-full h-10 px-4 rounded-lg border text-sm bg-white">
            <option>Select Role</option>
            <option>Admin</option>
            <option>Inspection Officer</option>
          </select>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button
          onClick={() => setOpenAddUser(false)}
          className="px-5 py-2 rounded-4xl border text-sm hover:bg-gray-100"
        >
          Cancel
        </button>

        <button className="px-5 py-2 rounded-4xl bg-[#14B86E] text-white hover:bg-[#14b86eb6] text-sm">
          Add User
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  )
}
