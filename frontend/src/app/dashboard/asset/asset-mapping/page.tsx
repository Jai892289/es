"use client"

import { useEffect, useState } from "react"

import {
  Users,
  Building2,
  ArrowUpRight,
  ShieldCheck,
  Package2,
  TrendingUp,
  Boxes,
  Wrench,
  Search,
  Activity,
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
    <div className="space-y-4 overflow-hidden">

      {/* ---------------- HERO ---------------- */}

   
<div
  className="
    relative
    overflow-hidden
    rounded-[28px]
    bg-[#0f172a]
    border
    border-slate-800
    shadow-xl
    p-5
  "
>

  {/* Glow */}

  <div
    className="
      absolute
      top-0
      right-0
      h-48
      w-48
      rounded-full
      bg-blue-500/10
      blur-3xl
    "
  />

  <div
    className="
      absolute
      bottom-0
      left-0
      h-32
      w-32
      rounded-full
      bg-cyan-500/10
      blur-3xl
    "
  />

  <div className="relative z-10">

    {/* Header */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div className="flex items-center gap-3">

        <div
          className="
            h-11
            w-11
            rounded-xl
            bg-blue-500/15
            border
            border-blue-500/20
            flex
            items-center
            justify-center
          "
        >
          <Boxes className="h-5 w-5 text-blue-400" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-lg font-semibold text-white">
              Asset Mapping
            </h1>

            <span
              className="
                px-2
                py-0.5
                rounded-full
                bg-blue-500/10
                text-blue-400
                text-[10px]
                font-medium
              "
            >
              Live
            </span>

          </div>

          <p className="text-sm text-slate-400 mt-1">
            Manage asset allocation across users and departments
          </p>

        </div>

      </div>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-3 gap-3 mt-5">

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Assets Mapped
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {totalAssets}
        </h3>
      </div>

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Assigned Users
        </p>

        <h3 className="text-2xl font-bold text-cyan-400 mt-2">
          {totalUsers}
        </h3>
      </div>

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Departments
        </p>

        <h3 className="text-2xl font-bold text-blue-400 mt-2">
          {totalDepartments}
        </h3>
      </div>

    </div>

  </div>

</div>

      {/* ---------------- OVERVIEW ---------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

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
          title="Assets"
          value={totalAssets}
          icon={Package2}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* ---------------- USER SECTION ---------------- */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 py-4 border-b border-gray-100">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">

                <Users className="w-5 h-5 text-blue-600" />
              </div>

              <div className="min-w-0">

                <h2 className="text-lg font-semibold text-black break-words">
                  User Asset Mapping
                </h2>

                <p className="text-xs text-black mt-1 break-words">
                  Assets assigned to employees
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-[260px]">

            <Search className="absolute left-3 top-3 w-4 h-4 text-black" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-black outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* BODY */}

        <div className="overflow-x-auto">

          {loading ? (

            <div className="p-6 text-center text-black text-sm">
              Loading mappings...
            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">

                <Users className="w-7 h-7 text-black" />
              </div>

              <h3 className="text-base font-semibold text-black">
                No Mappings Found
              </h3>

              <p className="text-sm text-black mt-1">
                No user mapping available
              </p>
            </div>

          ) : (

            <table className="w-full min-w-[850px]">

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
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-black whitespace-nowrap"
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

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="min-w-0">

                <h2 className="text-lg font-semibold text-black break-words">
                  Department Mapping
                </h2>

                <p className="text-xs text-black mt-1">
                  Asset distribution overview
                </p>
              </div>
            </div>
          </div>
{/* 
          <button className="px-4 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black whitespace-nowrap">
            View Analytics
          </button> */}
        </div>

        {/* BODY */}

        {loading ? (

          <div className="text-center text-black py-6 text-sm">
            Loading...
          </div>

        ) : departmentMappings.length === 0 ? (

          <div className="text-center text-black py-6 text-sm">
            No department mappings found
          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

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

const MiniCard = ({
  icon: Icon,
  title,
  value,
}: any) => (
  <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-4">

    <div className="flex items-center justify-between">

      <Icon className="w-5 h-5 text-white" />

      <span className="text-lg font-bold text-white">
        {value}
      </span>

    </div>

    <p className="text-[11px] uppercase tracking-wider text-emerald-100 mt-3">
      {title}
    </p>

  </div>
);
/* ---------------- OVERVIEW CARD ---------------- */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
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

      <td className="px-4 py-4">

        <div className="flex items-center gap-3 min-w-0">

          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-semibold text-blue-600 shrink-0">

            {name?.charAt(0)}
          </div>

          <div className="min-w-0">

            <h3 className="font-semibold text-sm text-black break-words">
              {name}
            </h3>

            <p className="text-[11px] text-black mt-1">
              Assigned User
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
        {dept}
      </td>

      <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
        {role}
      </td>

      <td className="px-4 py-4">

        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
          {total}
        </div>
      </td>

      <td className="px-4 py-4">

        <p className="text-xs text-black leading-6 max-w-[260px] break-words">
          {categories}
        </p>
      </td>

      {/* <td className="px-4 py-4 text-right whitespace-nowrap">

        <button className="px-4 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black">
          View 
        </button>
      </td> */}
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
    <div className="group relative overflow-hidden border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-all duration-300">

      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* TOP */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">

            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="min-w-0">

              <h3 className="text-base font-semibold text-black break-words">
                {name}
              </h3>

              <p className="text-xs text-black mt-1">
                Department Assets
              </p>
            </div>
          </div>

          {/* <button className="px-4 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black whitespace-nowrap">
            View
          </button> */}
        </div>

        {/* TOTAL */}

        <div className="mt-4">

          <p className="text-xs text-black">
            Total Assets
          </p>

          <h2 className="text-2xl font-bold text-black mt-1">
            {total}
          </h2>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-2 mt-4">

          <StatBox
            label="Use"
            value={inUse}
            bg="bg-green-50"
            text="text-green-700"
            icon={Activity}
          />

          <StatBox
            label="Store"
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
      className={`rounded-xl p-3 overflow-hidden ${bg}`}
    >

      <div className="flex items-center justify-between gap-2">

        <Icon
          className={`w-4 h-4 shrink-0 ${text}`}
        />

        <span
          className={`text-lg font-bold ${text}`}
        >
          {value}
        </span>
      </div>

      <p className="text-[11px] text-black mt-2 break-words">
        {label}
      </p>
    </div>
  )
}