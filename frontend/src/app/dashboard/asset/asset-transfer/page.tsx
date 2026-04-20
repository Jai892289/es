"use client"

import { ArrowLeftRight, Clock } from "lucide-react"

export default function AssetTransferPage() {
  return (
    <div className="space-y-8">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Transfers"
          value="245"
          subtitle="All time"
          color="text-gray-800"
        />
        <SummaryCard
          title="This Month"
          value="12"
          subtitle="January 2026"
          color="text-green-600"
        />
        <SummaryCard
          title="Pending Approval"
          value="0"
          subtitle="No pending transfers"
          color="text-orange-600"
        />
      </div>

      {/* TRANSFER HISTORY */}
      <div className="bg-white border rounded-xl">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Transfer History
          </h2>
        </div>

        <div className="divide-y">
          <TransferCard
            id="TRF-2026-012"
            asset="Desktop Computer - Dell OptiPlex (AST-2024-145)"
            fromName="Sunita Verma"
            fromDept="Revenue Dept"
            toName="Rajesh Kumar"
            toDept="IT Dept"
            reason="Department reorganization"
            date="20 Jan 2026"
          />

          <TransferCard
            id="TRF-2026-011"
            asset="Office Chair - Ergonomic (AST-2024-132)"
            fromName="Amit Patel"
            fromDept="Finance Dept"
            toName="Priya Sharma"
            toDept="Building Dept"
            reason="Staff relocation"
            date="18 Jan 2026"
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- SUMMARY CARD ---------- */
function SummaryCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string
  value: string
  subtitle: string
  color: string
}) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-3xl font-semibold mt-2 ${color}`}>
        {value}
      </h3>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  )
}

/* ---------- TRANSFER CARD ---------- */
function TransferCard({
  id,
  asset,
  fromName,
  fromDept,
  toName,
  toDept,
  reason,
  date,
}: any) {
  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-800">
              {id}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
              Completed
            </span>
          </div>
          <p className="text-sm text-gray-600">{asset}</p>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-4 h-4" />
          {date}
        </div>
      </div>

      {/* FROM → TO */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">From</p>
          <p className="font-medium text-gray-800">{fromName}</p>
          <p className="text-xs text-gray-500">{fromDept}</p>
        </div>

        <ArrowLeftRight className="text-green-600 w-5 h-5" />

        <div className="text-right">
          <p className="text-xs text-gray-500">To</p>
          <p className="font-medium text-gray-800">{toName}</p>
          <p className="text-xs text-gray-500">{toDept}</p>
        </div>
      </div>

      {/* REASON */}
      <div className="text-sm">
        <p className="text-gray-500">Transfer Reason</p>
        <p className="text-gray-700">{reason}</p>
        <p className="text-xs text-gray-400 mt-1">
          Approved by: Admin User
        </p>
      </div>
    </div>
  )
}
