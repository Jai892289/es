"use client"

import { useEffect, useState } from "react"
import { Users, Building2 } from "lucide-react"

import {
  getUserWiseAssetMappingsApi,
  getDepartmentWiseAssetMappingsApi,
} from "@/lib/inventory.api"

export default function AssetMappingPage() {
  const [userMappings, setUserMappings] = useState<any[]>([])
  const [departmentMappings, setDepartmentMappings] =
    useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMappings()
  }, [])

  const fetchMappings = async () => {
    try {
      setLoading(true)

      const [userResponse, departmentResponse] =
        await Promise.all([
          getUserWiseAssetMappingsApi(),
          getDepartmentWiseAssetMappingsApi(),
        ])

      setUserMappings(userResponse?.data || [])
      setDepartmentMappings(departmentResponse?.data || [])
    } catch (error) {
      console.log("Mappings Error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Asset Mapping
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View assets mapped to users and departments
        </p>
      </div>

      {/* USER WISE MAPPING */}
      <div className="bg-white border rounded-xl">
        <SectionHeader
          icon={<Users className="w-5 h-5 text-blue-600" />}
          title="User-wise Asset Mapping"
        />

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">
                Department
              </th>
              <th className="px-6 py-3 text-left">
                Designation
              </th>
              <th className="px-6 py-3 text-left">
                Total Assets
              </th>
              <th className="px-6 py-3 text-left">
                Categories
              </th>
              <th className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-6 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : userMappings.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-6 text-center text-gray-500"
                >
                  No mappings found
                </td>
              </tr>
            ) : (
              userMappings.map((item: any, index: number) => (
                <UserRow
                  key={index}
                  name={item?.user}
                  dept={item?.department}
                  role={item?.designation}
                  total={item?.totalAssets}
                  categories={Object.entries(
                    item?.categories || {}
                  )
                    .map(
                      ([key, value]) =>
                        `${key}: ${value}`
                    )
                    .join(" • ")}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* DEPARTMENT WISE MAPPING */}
      <div className="bg-white border rounded-xl space-y-6 p-6">
        <SectionHeader
          icon={
            <Building2 className="w-5 h-5 text-green-600" />
          }
          title="Department-wise Asset Mapping"
          noBorder
        />

        {loading ? (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        ) : departmentMappings.length === 0 ? (
          <div className="text-center text-gray-500">
            No department mappings found
          </div>
        ) : (
          departmentMappings.map((item: any, index: number) => (
            <DepartmentCard
              key={index}
              name={item?.department}
              total={item?.totalAssets}
              inUse={item?.inUse}
              store={item?.inStore}
              repair={item?.inRepair}
            />
          ))
        )}
      </div>
    </div>
  )
}

/* ---------- SECTION HEADER ---------- */

function SectionHeader({
  icon,
  title,
  noBorder,
}: any) {
  return (
    <div
      className={`flex items-center gap-2 px-6 py-4 ${
        noBorder ? "" : "border-b"
      }`}
    >
      {icon}

      <h3 className="font-semibold text-gray-800">
        {title}
      </h3>
    </div>
  )
}

/* ---------- USER ROW ---------- */

function UserRow({
  name,
  dept,
  role,
  total,
  categories,
}: any) {
  return (
    <tr>
      <td className="px-6 py-4 font-medium text-gray-800">
        {name}
      </td>

      <td className="px-6 py-4">{dept}</td>

      <td className="px-6 py-4">{role}</td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold">
          {total}
        </span>
      </td>

      <td className="px-6 py-4 text-xs text-gray-600">
        {categories}
      </td>

      <td className="px-6 py-4 text-right">
        <button className="text-blue-600 text-sm hover:underline">
          View Assets
        </button>
      </td>
    </tr>
  )
}

/* ---------- DEPARTMENT CARD ---------- */

function DepartmentCard({
  name,
  total,
  inUse,
  store,
  repair,
}: any) {
  return (
    <div className="border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-800">
            {name}
          </h4>

          <p className="text-sm text-gray-500">
            Total Assets: {total}
          </p>
        </div>

        <button className="text-blue-600 text-sm bg-blue-50 px-4 py-1.5 rounded-lg">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox
          label="In Use"
          value={inUse}
          bg="bg-green-50"
          text="text-green-700"
        />

        <StatBox
          label="In Store"
          value={store}
          bg="bg-blue-50"
          text="text-blue-700"
        />

        <StatBox
          label="In Repair"
          value={repair}
          bg="bg-orange-50"
          text="text-orange-700"
        />
      </div>
    </div>
  )
}

/* ---------- STAT BOX ---------- */

function StatBox({
  label,
  value,
  bg,
  text,
}: any) {
  return (
    <div className={`rounded-lg p-4 ${bg}`}>
      <p className="text-xs text-gray-500">{label}</p>

      <p className={`text-xl font-semibold mt-1 ${text}`}>
        {value}
      </p>
    </div>
  )
}