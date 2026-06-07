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

  const fetchTransfers =
    async () => {

      try {

        setLoading(true)

        const response =
          await getAssetTransfersApi()

        const data =
          response?.data || []

        setTransfers(data)

        const totalTransfers =
          data.length

        const currentMonth =
          new Date().getMonth()

        const currentYear =
          new Date().getFullYear()

        const thisMonth =
          data.filter(
            (item: any) => {

              const date =
                new Date(
                  item.transferDate
                )

              return (
                date.getMonth() ===
                  currentMonth &&
                date.getFullYear() ===
                  currentYear
              )
            }
          ).length

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

  /* ---------------- CREATE ---------------- */

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
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-6 shadow-xl">

  {/* Background Effects */}
  <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
  <div className="absolute top-10 right-20 h-24 w-24 rounded-full border border-white/10" />

  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* LEFT SECTION */}

    <div>

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

          <ArrowLeftRight className="w-8 h-8 text-white" />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-white">
            Asset Transfer
          </h1>

          <p className="text-emerald-100 mt-1">
            Track, transfer and monitor organizational assets
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <div className="flex flex-wrap gap-4 mt-6">

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {summary.totalTransfers}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Total Transfers
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {summary.thisMonth}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            This Month
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {summary?.today || 0}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Today
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SECTION */}

    <div className="flex flex-col gap-3 lg:min-w-[260px]">

      <button
        onClick={() => setOpenModal(true)}
        className="
          h-12
          px-6
          rounded-2xl
          bg-white
          text-emerald-600
          font-semibold
          shadow-lg
          hover:scale-105
          hover:bg-emerald-50
          transition-all
          flex items-center justify-center gap-2
        "
      >
        <Plus className="w-5 h-5" />
        New Transfer
      </button>

      <div className="grid grid-cols-2 gap-3">

        <MiniCard
          icon={TrendingUp}
          title="Efficiency"
          value="94%"
        />

        <MiniCard
          icon={Activity}
          title="Status"
          value="Active"
        />

      </div>

    </div>

  </div>
</div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

        <SummaryCard
          title="Transfers"
          value={summary.totalTransfers}
          subtitle="All records"
          icon={Package2}
          gradient="from-emerald-500 to-green-600"
        />

        <SummaryCard
          title="This Month"
          value={summary.thisMonth}
          subtitle={new Date().toLocaleString(
            "default",
            {
              month: "short",
              year: "numeric",
            }
          )}
          icon={TrendingUp}
          gradient="from-blue-500 to-cyan-500"
        />

        <SummaryCard
          title="Pending"
          value={
            summary.pendingApproval
          }
          subtitle={
            summary.pendingApproval >
            0
              ? "Awaiting approval"
              : "No pending"
          }
          icon={Clock}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      {/* HISTORY */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100">

          <div className="min-w-0">

            <h2 className="text-base font-semibold text-black break-words">
              Transfer History
            </h2>

            <p className="text-[11px] text-black mt-1">
              Asset movement logs
            </p>
          </div>

          {/* <button className="h-9 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black whitespace-nowrap">

            View Analytics
          </button> */}
        </div>

        {/* BODY */}

        <div className="divide-y divide-gray-100">

          {loading ? (

            <div className="p-5 text-center text-black text-sm">
              Loading transfers...
            </div>

          ) : transfers.length ===
            0 ? (

            <div className="p-6 text-center overflow-hidden">

              <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">

                <ArrowLeftRight className="w-6 h-6 text-black" />
              </div>

              <h3 className="text-base font-semibold text-black">
                No Transfers Found
              </h3>

              <p className="text-sm text-black mt-1">
                No transfer records available
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
                    "Pending"
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

      {/* MODAL */}

      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 overflow-y-auto">

          <div className="relative overflow-hidden w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-100">

            {/* TOP */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white">

              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-sm shrink-0">

                  <ArrowLeftRight className="w-5 h-5" />
                </div>

                <div className="min-w-0">

                  <h2 className="text-base font-semibold break-words">
                    Create Transfer
                  </h2>

                  <p className="text-green-50 mt-1 text-[11px]">
                    Transfer assets securely
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}

            <div className="p-4 space-y-3 overflow-hidden">

              <InputField
                label="Product ID"
                placeholder="Enter Product ID"
                value={
                  transferForm.productId
                }
                onChange={(e: any) =>
                  setTransferForm({
                    ...transferForm,
                    productId:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Department ID"
                placeholder="Enter Department ID"
                value={
                  transferForm.toDepartmentId
                }
                onChange={(e: any) =>
                  setTransferForm({
                    ...transferForm,
                    toDepartmentId:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Transferred By"
                placeholder="Employee Name"
                value={
                  transferForm.transferredBy
                }
                onChange={(e: any) =>
                  setTransferForm({
                    ...transferForm,
                    transferredBy:
                      e.target.value,
                  })
                }
              />

              <div>

                <label className="text-sm font-medium text-black">
                  Reason
                </label>

                <textarea
                  rows={3}
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
                  placeholder="Enter reason..."
                  className="
                    w-full mt-2 p-3
                    border border-gray-200
                    rounded-xl
                    bg-gray-50
                    text-sm text-black
                    outline-none
                    resize-none
                    transition
                    focus:border-emerald-500
                    focus:bg-white
                  "
                />
              </div>

              {/* FOOTER */}

              <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="
                    h-10 px-4
                    rounded-xl
                    border border-gray-200
                    bg-white
                    hover:bg-gray-100
                    transition
                    text-sm font-medium
                    text-black
                    w-full
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
                    h-10 px-4
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    text-white
                    text-sm font-medium
                    shadow-sm
                    transition
                    disabled:opacity-50
                    w-full
                  "
                >
                  {submitting
                    ? "Creating..."
                    : "Create"}
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

/* ---------------- SUMMARY CARD ---------------- */

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative flex items-center justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-black mt-1 leading-none">
            {value}
          </h2>

          <p className="text-xs text-gray-500 mt-2 truncate">
            {subtitle}
          </p>
        </div>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
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
    <div className="p-4 hover:bg-gray-50 transition overflow-hidden">

      {/* TOP */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

        {/* LEFT */}

        <div className="flex items-start gap-3 min-w-0">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-sm shrink-0">

            <ArrowLeftRight className="w-4 h-4" />
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-sm font-semibold text-black break-words">
                {id}
              </h3>

              <span
                className={`
                  px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap
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

            <p className="text-sm text-black mt-1 break-words">
              {asset}
            </p>

            <div className="flex items-center gap-2 text-[10px] text-black mt-2 flex-wrap">

              <Clock className="w-3 h-3 shrink-0" />

              {date}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full xl:w-auto">

          <InfoBox
            title="From"
            name={fromName}
            dept={fromDept}
          />

          <InfoBox
            title="To"
            name={toName}
            dept={toDept}
          />
        </div>
      </div>

      {/* BOTTOM */}

      <div className="mt-4 border-t border-gray-100 pt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 overflow-hidden">

        <div className="min-w-0">

          <p className="text-[10px] uppercase tracking-wide text-black">
            Transfer Reason
          </p>

          <p className="text-sm text-black mt-1 leading-5 break-words">
            {reason}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-[11px] font-medium whitespace-nowrap shrink-0">

          <CheckCircle2 className="w-4 h-4" />

          Approved
        </div>
      </div>
    </div>
  )
}

/* ---------------- INFO BOX ---------------- */

function InfoBox({
  title,
  name,
  dept,
}: any) {

  return (
    <div className="bg-gray-50 rounded-xl p-3 min-w-0 sm:min-w-[160px] overflow-hidden">

      <p className="text-[10px] uppercase tracking-wide text-black">
        {title}
      </p>

      <h4 className="font-semibold text-sm text-black mt-1 break-words">
        {name}
      </h4>

      <p className="text-[11px] text-black mt-1 break-words">
        {dept}
      </p>
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
          w-full h-10 mt-2
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