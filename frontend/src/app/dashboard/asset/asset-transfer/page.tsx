"use client"

import { useEffect, useState } from "react"
import { ArrowLeftRight, Clock } from "lucide-react"

import { getAssetTransfersApi } from "@/lib/inventory.api"

export default function AssetTransferPage() {
  const [transfers, setTransfers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [summary, setSummary] = useState({
    totalTransfers: 0,
    thisMonth: 0,
    pendingApproval: 0,
  })

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {
    try {
      setLoading(true)

      const response = await getAssetTransfersApi()

      const data = response?.data || []

      setTransfers(data)

      // TOTAL
      const totalTransfers = data.length

      // THIS MONTH
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      const thisMonth = data.filter((item: any) => {
        const date = new Date(item.transferDate)

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        )
      }).length

      // PENDING
      const pendingApproval = data.filter(
        (item: any) => item.status === "PENDING"
      ).length

      setSummary({
        totalTransfers,
        thisMonth,
        pendingApproval,
      })
    } catch (error) {
      console.log("Transfer Error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Transfers"
          value={summary.totalTransfers.toString()}
          subtitle="All time"
          color="text-gray-800"
        />

        <SummaryCard
          title="This Month"
          value={summary.thisMonth.toString()}
          subtitle={new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
          color="text-green-600"
        />

        <SummaryCard
          title="Pending Approval"
          value={summary.pendingApproval.toString()}
          subtitle={
            summary.pendingApproval > 0
              ? "Awaiting approval"
              : "No pending transfers"
          }
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
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading...
            </div>
          ) : transfers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No transfers found
            </div>
          ) : (
            transfers.map((item: any, index: number) => (
              <TransferCard
                key={item.id}
                id={`TRF-${index + 1}`}
                asset={`${item?.product?.productName} (${item?.product?.serialNumber})`}
                fromName={item?.transferredBy || "Admin"}
                fromDept={item?.fromDepartment?.name || "-"}
                toName={item?.approvedBy || "Pending Approval"}
                toDept={item?.toDepartment?.name || "-"}
                reason={item?.reason || "-"}
                date={new Date(item.transferDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
                status={item?.status}
              />
            ))
          )}
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
  status,
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

            <span
              className={`px-3 py-0.5 rounded-full text-xs
              ${
                status === "PENDING"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
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

          <p className="font-medium text-gray-800">
            {fromName}
          </p>

          <p className="text-xs text-gray-500">{fromDept}</p>
        </div>

        <ArrowLeftRight className="text-green-600 w-5 h-5" />

        <div className="text-right">
          <p className="text-xs text-gray-500">To</p>

          <p className="font-medium text-gray-800">
            {toName}
          </p>

          <p className="text-xs text-gray-500">{toDept}</p>
        </div>
      </div>

      {/* REASON */}
      <div className="text-sm">
        <p className="text-gray-500">Transfer Reason</p>

        <p className="text-gray-700">{reason}</p>

        <p className="text-xs text-gray-400 mt-1">
          Approved by: {toName}
        </p>
      </div>
    </div>
  )
}