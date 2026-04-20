"use client"

import Image from "next/image"
import {
  CheckCircle,
  Package,
  Wrench,
  Archive,
  AlertTriangle,
  XCircle,
} from "lucide-react"

export default function DashboardPage() {

  const STATUS_DATA = [
  { label: "In Use", value: 12450, percent: 85.3, color: "bg-green-600" },
  { label: "In Store", value: 1250, percent: 8.6, color: "bg-blue-600" },
  { label: "In Repair", value: 180, percent: 1.2, color: "bg-orange-500" },
  { label: "Retired / Abandoned", value: 425, percent: 2.9, color: "bg-gray-500" },
  { label: "Damaged", value: 142, percent: 1.0, color: "bg-red-500" },
  { label: "Non-Functional", value: 152, percent: 1.0, color: "bg-red-600" },
]



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

       
      </div>

      {/* STATS */}
      <div className="grid grid-cols-6 gap-4">
        <Stat
          icon={CheckCircle}
          color="text-green-600"
          value="12,450"
          label="In Use"
        />
        <Stat
          icon={Package}
          color="text-blue-600"
          value="1,250"
          label="In Store"
        />
        <Stat
          icon={Wrench}
          color="text-orange-500"
          value="180"
          label="In Repair"
        />
        <Stat
          icon={Archive}
          color="text-gray-600"
          value="425"
          label="Retired"
        />
        <Stat
          icon={AlertTriangle}
          color="text-red-500"
          value="142"
          label="Damaged"
        />
        <Stat
          icon={XCircle}
          color="text-red-600"
          value="152"
          label="Non-Functional"
        />
      </div>

      {/* EMPTY STATE */}
          <div className="space-y-8">

      {/* HEADER */}
     

      {/* STATUS DISTRIBUTION */}
      <div className="bg-white rounded-xl border p-6 space-y-5">
        {STATUS_DATA.map((item) => (
          <StatusRow key={item.label} {...item} />
        ))}
      </div>

      {/* RECENT UPDATES */}
      <div className="bg-white rounded-xl border">
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
              <td className="px-6 py-4">Desktop Computer – Dell OptiPlex</td>
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
      </div>
    </div>

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
  value: string
  label: string
  color: string
}) {
  return (
    <div className="bg-white border rounded-xl p-5 text-center space-y-2">
      <Icon className={`w-6 h-6 mx-auto ${color}`} />
      <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
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
          {value.toLocaleString()} ({percent}%)
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