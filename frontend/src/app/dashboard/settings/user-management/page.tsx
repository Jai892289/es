"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  Pencil,
  UserX,
  Plus,
  ShieldCheck,
  Users,
  Activity,
  Search,
  ArrowUpRight,
  UserPlus,
  Building2,
} from "lucide-react"

import {
  createUserApi,
  getUsersApi,
} from "@/lib/user.api"

export default function UserManagementPage() {

  const [search, setSearch] =
    useState("")

  const [role, setRole] =
    useState("")

  const [department, setDepartment] =
    useState("")

  const [openAddUser, setOpenAddUser] =
    useState(false)

  const [usersData, setUsersData] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [creating, setCreating] =
    useState(false)

  const [userForm, setUserForm] =
    useState({
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      designation: "",
      role: "",
      departmentId: "",
    })

  /* ---------------- FETCH USERS ---------------- */

  const fetchUsers =
    async () => {

      try {

        setLoading(true)

        const response =
          await getUsersApi()

        setUsersData(
          response?.data || []
        )

      } catch (error) {

        console.log(
          "GET USERS ERROR",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  useEffect(() => {

    fetchUsers()

  }, [])

  /* ---------------- CREATE USER ---------------- */

  const handleCreateUser =
    async () => {

      try {

        setCreating(true)

        await createUserApi(
          userForm
        )

        setOpenAddUser(false)

        setUserForm({
          name: "",
          email: "",
          password: "",
          mobileNumber: "",
          designation: "",
          role: "",
          departmentId: "",
        })

        await fetchUsers()

      } catch (error) {

        console.log(
          "CREATE USER ERROR",
          error
        )

      } finally {

        setCreating(false)
      }
    }

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-sm shrink-0">

                <Users className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl md:text-2xl font-bold break-words">
                  User Management
                </h1>

                <p className="text-green-50 mt-1 text-xs leading-5 break-words">
                  Manage users, roles & permissions efficiently
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">

              <div>

                <h2 className="text-2xl font-bold">
                  {
                    usersData.length
                  }
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Total Users
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  98%
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  System Health
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-3 w-full xl:w-[260px]">

            <MiniCard
              icon={ShieldCheck}
              title="Admins"
              value={
                usersData.filter(
                  (u: any) =>
                    u.role ===
                    "Admin"
                ).length
              }
            />

            <MiniCard
              icon={Activity}
              title="Active"
              value={
                usersData.length
              }
            />
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <OverviewCard
          title="Users"
          value={
            usersData.length
          }
          icon={Users}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Admins"
          value={
            usersData.filter(
              (u: any) =>
                u.role ===
                "Admin"
            ).length
          }
          icon={ShieldCheck}
          gradient="from-blue-500 to-cyan-500"
        />

        <OverviewCard
          title="Departments"
          value={
            new Set(
              usersData.map(
                (
                  u: any
                ) =>
                  u.department
                    ?.name
              )
            ).size
          }
          icon={Building2}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* SEARCH */}

          <div className="relative w-full xl:w-[320px] min-w-0">

            <Search className="absolute left-3 top-3.5 w-4 h-4 text-black" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search users..."
              className="
                w-full h-10 rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-3
                text-sm text-black
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
              "
            />
          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap items-center gap-2">

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
              className="
                h-10 px-3 rounded-xl
                border border-gray-200
                bg-white
                text-sm text-black
                outline-none
              "
            >

              <option>
                All Roles
              </option>

              <option>
                ADMIN
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
              className="
                h-10 px-3 rounded-xl
                border border-gray-200
                bg-white
                text-sm text-black
                outline-none
              "
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
              className="
                h-10 px-4 rounded-xl
                bg-gradient-to-r
                from-emerald-600
                to-green-600
                hover:opacity-95
                transition
                text-white text-sm font-medium
                flex items-center gap-2
                shadow-sm
                whitespace-nowrap
              "
            >

              <Plus className="w-4 h-4" />

              Add User
            </button>
          </div>
        </div>
      </div>

      {/* USER TABLE */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 gap-3">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              User Directory
            </h2>

            <p className="text-xs text-black mt-1">
              Manage registered users
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          {loading ? (

            <div className="py-10 text-center text-sm text-black">
              Loading users...
            </div>

          ) : (

            <table className="w-full min-w-[760px]">

              <thead className="bg-gray-50 border-b border-gray-100">

                <tr>

                  {[
                    "User",
                    "Department",
                    "Role",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (

                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-black whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {usersData.map(
                  (
                    user: any
                  ) => (

                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      {/* USER */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">

                            {
                              user.name?.[0]
                            }
                          </div>

                          <div className="min-w-0">

                            <h3 className="font-semibold text-sm text-black break-words">
                              {
                                user.name
                              }
                            </h3>

                            <p className="text-[11px] text-black mt-1 break-all">
                              {
                                user.email
                              }
                            </p>

                            <p className="text-[11px] text-black mt-1 break-words">
                              {
                                user.mobileNumber
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DEPARTMENT */}

                      <td className="px-4 py-4">

                        <div className="font-medium text-sm text-black break-words">
                          {
                            user
                              .department
                              ?.name || "-"
                          }
                        </div>

                        <div className="text-[11px] text-black mt-1 break-words">
                          {
                            user.designation
                          }
                        </div>
                      </td>

                      {/* ROLE */}

                      <td className="px-4 py-4 whitespace-nowrap">

                        <span
                          className={`
                            px-3 py-1 rounded-xl
                            text-[11px] font-medium
                            ${
                              user.role ===
                              "Admin"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >

                          {
                            user.role
                          }
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className="px-4 py-4 whitespace-nowrap">

                        <span className="px-3 py-1 rounded-xl text-[11px] font-medium bg-green-100 text-green-700">

                          Active
                        </span>
                      </td>

                      {/* CREATED */}

                      <td className="px-4 py-4 text-black text-xs whitespace-nowrap">

                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                      {/* ACTION */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <button className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center text-blue-700 shrink-0">

                            <Pencil className="w-4 h-4" />
                          </button>

                          <button className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 transition flex items-center justify-center text-red-700 shrink-0">

                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL */}

      {openAddUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() =>
              setOpenAddUser(
                false
              )
            }
          />

          {/* MODAL */}

          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-4 text-white">

              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">

                  <UserPlus className="w-6 h-6" />
                </div>

                <div className="min-w-0">

                  <h3 className="text-lg font-semibold break-words">
                    Add New User
                  </h3>

                  <p className="text-green-50 text-xs mt-1 break-words">
                    Create a new user account
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">

              <InputField
                label="Full Name"
                placeholder="Enter full name"
                value={userForm.name}
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    name:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Email"
                placeholder="Enter email"
                type="email"
                value={userForm.email}
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    email:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Password"
                placeholder="Enter password"
                type="password"
                value={userForm.password}
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    password:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Mobile Number"
                placeholder="Enter mobile number"
                value={
                  userForm.mobileNumber
                }
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    mobileNumber:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Designation"
                placeholder="Enter designation"
                value={
                  userForm.designation
                }
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    designation:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Department ID"
                placeholder="Enter department id"
                value={
                  userForm.departmentId
                }
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    departmentId:
                      e.target.value,
                  })
                }
              />

              <SelectField
                label="Role"
                value={userForm.role}
                onChange={(e: any) =>
                  setUserForm({
                    ...userForm,
                    role:
                      e.target.value,
                  })
                }
                options={[
                  "ADMIN",
                  "Inspection Officer",
                ]}
              />
            </div>

            {/* FOOTER */}

            <div className="px-4 py-4 border-t border-gray-100 flex flex-col-reverse md:flex-row md:justify-end gap-2">

              <button
                onClick={() =>
                  setOpenAddUser(
                    false
                  )
                }
                className="
                  h-10 px-4 rounded-xl
                  border border-gray-200
                  hover:bg-gray-100
                  transition
                  text-sm font-medium
                  text-black
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleCreateUser
                }
                disabled={creating}
                className="
                  h-10 px-4 rounded-xl
                  bg-gradient-to-r
                  from-emerald-600
                  to-green-600
                  hover:opacity-95
                  transition
                  text-white text-sm font-medium
                  shadow-sm
                  disabled:opacity-50
                "
              >

                {creating
                  ? "Creating..."
                  : "Add User"}
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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-sm shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-green-50 break-words">
            {title}
          </p>

          <h3 className="text-lg font-bold mt-1 text-white break-words">
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
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between gap-2">

          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
          >

            <Icon className="w-5 h-5" />
          </div>

          <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
        </div>

        <div className="mt-3 min-w-0">

          <p className="text-xs text-black break-words">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-black mt-1 break-words">
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
    <div className="min-w-0">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <input
        {...props}
        className="
          mt-2 w-full h-10
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-3
          text-sm text-black
          outline-none
          transition
          focus:border-emerald-500
          focus:bg-white
        "
      />
    </div>
  )
}

/* ---------------- SELECT ---------------- */

function SelectField({
  label,
  options,
  ...props
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <select
        {...props}
        className="
          mt-2 w-full h-10
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-3
          text-sm text-black
          outline-none
          transition
          focus:border-emerald-500
          focus:bg-white
        "
      >

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