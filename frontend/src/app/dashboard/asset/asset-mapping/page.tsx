"use client"

import { useEffect, useState } from "react"

import {
  Users,
  Building2,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Package2,
  TrendingUp,
  Boxes,
  Wrench,
  Search,
} from "lucide-react"

import {
  getUserWiseAssetMappingsApi,
  getDepartmentWiseAssetMappingsApi,
} from "@/lib/inventory.api"

export default function AssetMappingPage() {

  const [userMappings, setUserMappings] =
    useState<any[]>([])

  const [departmentMappings, setDepartmentMappings] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  useEffect(() => {
    fetchMappings()
  }, [])

  const fetchMappings = async () => {

    try {

      setLoading(true)

      const [
        userResponse,
        departmentResponse,
      ] = await Promise.all([
        getUserWiseAssetMappingsApi(),
        getDepartmentWiseAssetMappingsApi(),
      ])

      setUserMappings(
        userResponse?.data || []
      )

      setDepartmentMappings(
        departmentResponse?.data || []
      )

    } catch (error) {

      console.log(
        "Mappings Error",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  /* ---------------- FILTER ---------------- */

  const filteredUsers =
    userMappings.filter((item) =>
      item?.user
        ?.toLowerCase()
        ?.includes(
          search.toLowerCase()
        )
    )

  /* ---------------- STATS ---------------- */

  const totalAssets =
    departmentMappings.reduce(
      (acc, item) =>
        acc + item.totalAssets,
      0
    )

  const totalUsers =
    userMappings.length

  const totalDepartments =
    departmentMappings.length

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <Boxes className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Asset Mapping Intelligence
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Monitor asset allocation across users & departments
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {totalAssets}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Assets
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {totalUsers}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Users
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {totalDepartments}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Departments
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-4 min-w-[320px]">

            <MiniCard
              icon={TrendingUp}
              title="Asset Efficiency"
              value="96%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Asset Security"
              value="98%"
            />

            <MiniCard
              icon={Activity}
              title="System Status"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* ---------------- OVERVIEW ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Mapped Users"
          value={totalUsers}
          icon={Users}
          gradient="from-blue-500 to-cyan-500"
        />

        <OverviewCard
          title="Departments"
          value={totalDepartments}
          icon={Building2}
          gradient="from-purple-500 to-pink-500"
        />

        <OverviewCard
          title="Mapped Assets"
          value={totalAssets}
          icon={Package2}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* ---------------- USER SECTION ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-8 py-6 border-b border-gray-100">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Users className="w-7 h-7 text-blue-600" />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  User-wise Asset Mapping
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Assets assigned to employees
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-[320px]">

            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* BODY */}

        <div className="overflow-x-auto">

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading mappings...
            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="p-16 text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">

                <Users className="w-10 h-10 text-gray-400" />
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Mappings Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                No user asset mapping available
              </p>
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-100">

                <tr>

                  {[
                    "User",
                    "Department",
                    "Designation",
                    "Assets",
                    "Categories",
                    "",
                  ].map((head) => (

                    <th
                      key={head}
                      className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map(
                  (
                    item: any,
                    index: number
                  ) => (

                    <UserRow
                      key={index}
                      name={
                        item?.user
                      }
                      dept={
                        item?.department
                      }
                      role={
                        item?.designation
                      }
                      total={
                        item?.totalAssets
                      }
                      categories={Object.entries(
                        item?.categories ||
                          {}
                      )
                        .map(
                          ([
                            key,
                            value,
                          ]) =>
                            `${key}: ${value}`
                        )
                        .join(" • ")}
                    />
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ---------------- DEPARTMENT SECTION ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <Building2 className="w-7 h-7 text-emerald-600" />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Department-wise Asset Mapping
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Asset distribution by departments
                </p>
              </div>
            </div>
          </div>

          <button className="px-5 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
            View Analytics
          </button>
        </div>

        {/* BODY */}

        {loading ? (

          <div className="text-center text-gray-500 py-10">
            Loading...
          </div>

        ) : departmentMappings.length === 0 ? (

          <div className="text-center text-gray-500 py-10">
            No department mappings found
          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {departmentMappings.map(
              (
                item: any,
                index: number
              ) => (

                <DepartmentCard
                  key={index}
                  name={
                    item?.department
                  }
                  total={
                    item?.totalAssets
                  }
                  inUse={
                    item?.inUse
                  }
                  store={
                    item?.inStore
                  }
                  repair={
                    item?.inRepair
                  }
                />
              )
            )}
          </div>
        )}
      </div>
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
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">

          <Icon className="w-5 h-5" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1">
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

/* ---------------- USER ROW ---------------- */

function UserRow({
  name,
  dept,
  role,
  total,
  categories,
}: any) {

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">

      <td className="px-8 py-6">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center font-semibold text-blue-600">

            {name?.charAt(0)}
          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              {name}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Asset Assigned User
            </p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6 text-gray-700">
        {dept}
      </td>

      <td className="px-8 py-6 text-gray-700">
        {role}
      </td>

      <td className="px-8 py-6">

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
          {total}
        </div>
      </td>

      <td className="px-8 py-6">

        <p className="text-sm text-gray-600 leading-relaxed max-w-[350px]">
          {categories}
        </p>
      </td>

      <td className="px-8 py-6 text-right">

        <button className="px-5 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
          View Assets
        </button>
      </td>
    </tr>
  )
}

/* ---------------- DEPARTMENT CARD ---------------- */

function DepartmentCard({
  name,
  total,
  inUse,
  store,
  repair,
}: any) {

  return (
    <div className="group relative overflow-hidden border border-gray-100 rounded-[30px] p-7 bg-white hover:shadow-xl transition-all duration-300">

      {/* GLOW */}

      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* TOP */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

              <Building2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div>

              <h3 className="text-xl font-bold text-gray-800">
                {name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Department Assets
              </p>
            </div>
          </div>

          <button className="px-5 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
            View Details
          </button>
        </div>

        {/* TOTAL */}

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            Total Assets
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-2">
            {total}
          </h2>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-4 mt-8">

          <StatBox
            label="In Use"
            value={inUse}
            bg="bg-green-50"
            text="text-green-700"
            icon={Activity}
          />

          <StatBox
            label="In Store"
            value={store}
            bg="bg-blue-50"
            text="text-blue-700"
            icon={Package2}
          />

          <StatBox
            label="Repair"
            value={repair}
            bg="bg-orange-50"
            text="text-orange-700"
            icon={Wrench}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------------- STAT BOX ---------------- */

function StatBox({
  label,
  value,
  bg,
  text,
  icon: Icon,
}: any) {

  return (
    <div
      className={`rounded-2xl p-5 ${bg}`}
    >

      <div className="flex items-center justify-between">

        <Icon
          className={`w-5 h-5 ${text}`}
        />

        <span
          className={`text-2xl font-bold ${text}`}
        >
          {value}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        {label}
      </p>
    </div>
  )
}