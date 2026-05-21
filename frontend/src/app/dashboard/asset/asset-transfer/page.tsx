"use client"

import { useEffect, useState } from "react"

import {
  ArrowLeftRight,
  Clock,
  TrendingUp,
  Package2,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Activity,
} from "lucide-react"

import {
  getAssetTransfersApi,
  createAssetTransferApi,
} from "@/lib/inventory.api"

export default function AssetTransferPage() {

  const [transfers, setTransfers] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [openModal, setOpenModal] =
    useState(false)

  const [submitting, setSubmitting] =
    useState(false)

  const [summary, setSummary] =
    useState({
      totalTransfers: 0,
      thisMonth: 0,
      pendingApproval: 0,
    })

  const [transferForm, setTransferForm] =
    useState({
      productId: "",
      toDepartmentId: "",
      transferredBy: "",
      reason: "",
    })

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {

    try {

      setLoading(true)

      const response =
        await getAssetTransfersApi()

      const data =
        response?.data || []

      setTransfers(data)

      /* TOTAL */

      const totalTransfers =
        data.length

      /* THIS MONTH */

      const currentMonth =
        new Date().getMonth()

      const currentYear =
        new Date().getFullYear()

      const thisMonth =
        data.filter((item: any) => {

          const date = new Date(
            item.transferDate
          )

          return (
            date.getMonth() ===
              currentMonth &&
            date.getFullYear() ===
              currentYear
          )
        }).length

      /* PENDING */

      const pendingApproval =
        data.filter(
          (item: any) =>
            item.status ===
            "PENDING"
        ).length

      setSummary({
        totalTransfers,
        thisMonth,
        pendingApproval,
      })

    } catch (error) {

      console.log(
        "Transfer Error",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  /* ---------------- CREATE TRANSFER ---------------- */

  const handleCreateTransfer =
    async () => {

      try {

        setSubmitting(true)

        await createAssetTransferApi(
          transferForm
        )

        setOpenModal(false)

        setTransferForm({
          productId: "",
          toDepartmentId: "",
          transferredBy: "",
          reason: "",
        })

        fetchTransfers()

      } catch (error) {

        console.log(
          "TRANSFER CREATE ERROR",
          error
        )

      } finally {

        setSubmitting(false)
      }
    }

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <ArrowLeftRight className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Asset Transfer Management
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Track and manage internal asset movements
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    summary.totalTransfers
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Transfers
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    summary.thisMonth
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  This Month
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-4 min-w-[320px]">

            <button
              onClick={() =>
                setOpenModal(true)
              }
              className="
                h-14 px-6 rounded-2xl
                bg-white text-emerald-600
                hover:bg-green-50
                transition
                cursor-pointer
                font-semibold text-sm
                flex items-center justify-center gap-3
                shadow-xl
              "
            >

              <Plus className="w-5 h-5" />

              Add Asset Transfer
            </button>

            <MiniCard
              icon={TrendingUp}
              title="Transfer Efficiency"
              value="94%"
            />

            <MiniCard
              icon={Activity}
              title="Asset Movement"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Transfers"
          value={summary.totalTransfers.toString()}
          subtitle="All transfers"
          icon={Package2}
          gradient="from-emerald-500 to-green-600"
        />

        <SummaryCard
          title="This Month"
          value={summary.thisMonth.toString()}
          subtitle={new Date().toLocaleString(
            "default",
            {
              month: "long",
              year: "numeric",
            }
          )}
          icon={TrendingUp}
          gradient="from-blue-500 to-cyan-500"
        />

        <SummaryCard
          title="Pending Approval"
          value={summary.pendingApproval.toString()}
          subtitle={
            summary.pendingApproval > 0
              ? "Awaiting approval"
              : "No pending transfer"
          }
          icon={Clock}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      {/* ---------------- HISTORY ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Transfer History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete asset movement logs
            </p>
          </div>

          <button className="px-5 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
            View Analytics
          </button>
        </div>

        {/* BODY */}

        <div className="divide-y divide-gray-100">

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading transfers...
            </div>

          ) : transfers.length === 0 ? (

            <div className="p-16 text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">

                <ArrowLeftRight className="w-10 h-10 text-gray-400" />
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Transfers Found
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                No asset movement records available
              </p>
            </div>

          ) : (

            transfers.map(
              (
                item: any,
                index: number
              ) => (

                <TransferCard
                  key={item.id}
                  id={`TRF-${index + 1}`}
                  asset={`${item?.product?.productName} (${item?.product?.serialNumber})`}
                  fromName={
                    item?.transferredBy ||
                    "Admin"
                  }
                  fromDept={
                    item?.fromDepartment
                      ?.name || "-"
                  }
                  toName={
                    item?.approvedBy ||
                    "Pending Approval"
                  }
                  toDept={
                    item?.toDepartment
                      ?.name || "-"
                  }
                  reason={
                    item?.reason || "-"
                  }
                  date={new Date(
                    item.transferDate
                  ).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                  status={item?.status}
                />
              )
            )
          )}
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}

      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="relative overflow-hidden w-full max-w-2xl rounded-[36px] bg-white shadow-2xl border border-gray-100">

            {/* TOP */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white">

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center gap-5">

                <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-xl">

                  <ArrowLeftRight className="w-10 h-10" />
                </div>

                <div>

                  <h2 className="text-3xl font-bold tracking-tight">
                    Create Asset Transfer
                  </h2>

                  <p className="text-green-50 mt-2 text-sm">
                    Transfer assets between departments securely
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}

            <div className="p-8 space-y-6">

              {/* PRODUCT */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  Product ID
                </label>

                <input
                  value={
                    transferForm.productId
                  }
                  onChange={(e) =>
                    setTransferForm({
                      ...transferForm,
                      productId:
                        e.target.value,
                    })
                  }
                  placeholder="Enter Product ID"
                  className="
                    w-full h-14 mt-2
                    rounded-2xl
                    border border-gray-200
                    bg-gray-50
                    px-5
                    text-sm
                    outline-none
                    transition-all duration-300
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* DEPARTMENT */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  To Department ID
                </label>

                <input
                  value={
                    transferForm.toDepartmentId
                  }
                  onChange={(e) =>
                    setTransferForm({
                      ...transferForm,
                      toDepartmentId:
                        e.target.value,
                    })
                  }
                  placeholder="Enter Department ID"
                  className="
                    w-full h-14 mt-2
                    rounded-2xl
                    border border-gray-200
                    bg-gray-50
                    px-5
                    text-sm
                    outline-none
                    transition-all duration-300
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* TRANSFERRED BY */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  Transferred By
                </label>

                <input
                  value={
                    transferForm.transferredBy
                  }
                  onChange={(e) =>
                    setTransferForm({
                      ...transferForm,
                      transferredBy:
                        e.target.value,
                    })
                  }
                  placeholder="Enter Employee Name"
                  className="
                    w-full h-14 mt-2
                    rounded-2xl
                    border border-gray-200
                    bg-gray-50
                    px-5
                    text-sm
                    outline-none
                    transition-all duration-300
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* REASON */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  Transfer Reason
                </label>

                <textarea
                  rows={5}
                  value={
                    transferForm.reason
                  }
                  onChange={(e) =>
                    setTransferForm({
                      ...transferForm,
                      reason:
                        e.target.value,
                    })
                  }
                  placeholder="Enter transfer reason..."
                  className="
                    w-full mt-2 p-5
                    border border-gray-200
                    rounded-2xl
                    bg-gray-50
                    outline-none
                    transition-all duration-300
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="
                    h-14 px-7
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    hover:bg-gray-100
                    transition-all duration-300
                    text-sm font-medium
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleCreateTransfer
                  }
                  disabled={submitting}
                  className="
                    h-14 px-8
                    rounded-2xl
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    hover:from-emerald-700
                    hover:to-green-700
                    text-white
                    font-medium
                    shadow-xl shadow-emerald-500/20
                    transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-50
                  "
                >
                  {submitting
                    ? "Creating..."
                    : "Create Transfer"}
                </button>
              </div>
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

/* ---------------- SUMMARY CARD ---------------- */

function SummaryCard({
  title,
  value,
  subtitle,
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
            className={`w-8 h-8 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-4 h-4" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

        <div className="mt-4">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------------- TRANSFER CARD ---------------- */

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
    <div className="group p-8 hover:bg-gray-50 transition-all duration-300">

      {/* TOP */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT */}

        <div className="flex items-start gap-5">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">

            <ArrowLeftRight className="w-7 h-7" />
          </div>

          <div>

            <div className="flex items-center gap-3 flex-wrap">

              <h3 className="text-lg font-bold text-gray-800">
                {id}
              </h3>

              <span
                className={`
                  px-4 py-1 rounded-full text-xs font-semibold
                  ${
                    status ===
                    "PENDING"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {status}
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              {asset}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">

              <Clock className="w-4 h-4" />

              {date}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* FROM */}

          <div className="bg-gray-50 rounded-3xl p-5 min-w-[220px]">

            <p className="text-xs uppercase tracking-wide text-gray-400">
              From
            </p>

            <h4 className="font-semibold text-gray-800 mt-2">
              {fromName}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {fromDept}
            </p>
          </div>

          {/* ARROW */}

          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">

            <ArrowLeftRight className="w-6 h-6 text-emerald-600" />
          </div>

          {/* TO */}

          <div className="bg-gray-50 rounded-3xl p-5 min-w-[220px]">

            <p className="text-xs uppercase tracking-wide text-gray-400">
              To
            </p>

            <h4 className="font-semibold text-gray-800 mt-2">
              {toName}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {toDept}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="mt-7 border-t border-gray-100 pt-5 flex items-start justify-between gap-6">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-400">
            Transfer Reason
          </p>

          <p className="text-gray-700 mt-2 leading-relaxed">
            {reason}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-medium whitespace-nowrap">

          <CheckCircle2 className="w-4 h-4" />

          Approved by {toName}
        </div>
      </div>
    </div>
  )
}