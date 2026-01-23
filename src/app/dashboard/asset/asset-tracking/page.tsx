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

        <Image
          src="/images/asset-tracking.svg"
          alt="Asset Tracking"
          width={140}
          height={140}
          priority
        />
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
      <div className="bg-white rounded-xl border p-10">
        <EmptyState />
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
