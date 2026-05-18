"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  CheckCircle,
  Package,
  Wrench,
  Archive,
  AlertTriangle,
  XCircle,
} from "lucide-react"

import { getAssetStatusApi } from "@/lib/inventory.api"

export default function DashboardPage() {
  const [statusData, setStatusData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalAssets, setTotalAssets] = useState(0)

  useEffect(() => {
    fetchAssetStatus()
  }, [])

  const fetchAssetStatus = async () => {
    try {
      setLoading(true)

      const response = await getAssetStatusApi()

      setTotalAssets(response?.data?.totalAssets || 0)

      const mappedData = response?.data?.statuses?.map((item: any) => ({
        label: item.label,
        value: item.count,
        percent: item.percentage,
        color:
          item.status === "IN_USE"
            ? "bg-green-600"
            : item.status === "IN_STORE"
            ? "bg-blue-600"
            : item.status === "IN_REPAIR"
            ? "bg-orange-500"
            : item.status === "RETIRED"
            ? "bg-gray-500"
            : item.status === "DAMAGED"
            ? "bg-red-500"
            : "bg-red-700",
        icon:
          item.status === "IN_USE"
            ? CheckCircle
            : item.status === "IN_STORE"
            ? Package
            : item.status === "IN_REPAIR"
            ? Wrench
            : item.status === "RETIRED"
            ? Archive
            : item.status === "DAMAGED"
            ? AlertTriangle
            : XCircle,
        textColor:
          item.status === "IN_USE"
            ? "text-green-600"
            : item.status === "IN_STORE"
            ? "text-blue-600"
            : item.status === "IN_REPAIR"
            ? "text-orange-500"
            : item.status === "RETIRED"
            ? "text-gray-600"
            : item.status === "DAMAGED"
            ? "text-red-500"
            : "text-red-700",
      }))

      setStatusData(mappedData || [])
    } catch (error) {
      console.log("Asset Status Error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl border">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Asset Status Tracking
          </h2>

          <p className="text-sm text-gray-500">
            Monitor and manage asset status across the organization
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total Assets</p>
          <h3 className="text-2xl font-bold text-gray-800">
            {totalAssets}
          </h3>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statusData.map((item) => (
          <Stat
            key={item.label}
            icon={item.icon}
            color={item.textColor}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      {/* STATUS DISTRIBUTION */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading...
          </p>
        ) : (
          statusData.map((item) => (
            <StatusRow key={item.label} {...item} />
          ))
        )}
      </div>

      {/* RECENT UPDATES */}
      {/* <div className="bg-white rounded-xl border">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">
            Recent Status Updates
          </h3>

          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Asset ID</th>
              <th className="px-6 py-3 text-left">Asset Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Assigned To</th>
              <th className="px-6 py-3 text-left">Last Updated</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4">AST-2026-145</td>
              <td className="px-6 py-4">
                Desktop Computer – Dell OptiPlex
              </td>
              <td className="px-6 py-4">IT Assets</td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  In Use
                </span>
              </td>

              <td className="px-6 py-4">IT Dept – Floor 3</td>
              <td className="px-6 py-4">Rajesh Kumar</td>
              <td className="px-6 py-4">22 Jan 2026</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

/* ---------- STAT CARD ---------- */

function Stat({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: any
  value: number
  label: string
  color: string
}) {
  return (
    <div className="bg-white border rounded-xl p-5 text-center space-y-2">
      <Icon className={`w-6 h-6 mx-auto ${color}`} />

      <h3 className="text-xl font-semibold text-gray-800">
        {value}
      </h3>

      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

/* ---------- EMPTY STATE ---------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <Image
        src="/images/empty-state.svg"
        alt="No Data"
        width={180}
        height={180}
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        No Recent Updates
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Asset updates will appear here once activity starts.
      </p>
    </div>
  )
}

function StatusRow({
  label,
  value,
  percent,
  color,
}: {
  label: string
  value: number
  percent: number
  color: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-700 mb-1">
        <span>{label}</span>

        <span>
          {value} ({percent}%)
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}