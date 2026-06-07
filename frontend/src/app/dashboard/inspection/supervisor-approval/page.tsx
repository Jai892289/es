"use client"

import { useEffect, useState } from "react"

import {
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  ImageIcon,
  VideoIcon,
  ShieldCheck,
  Activity,
  ClipboardCheck,
  ArrowUpRight,
  CheckCircle2,
  FileCheck,
} from "lucide-react"

import {
  getInspectionApprovalApi,
  approveInspectionReportApi,
  rejectInspectionReportApi,
} from "@/lib/inspection.api";


export default function SupervisorApprovalPage() {

  const [loading, setLoading] =
    useState(true)

  const [stats, setStats] =
    useState({
      pending: 0,
      approved: 0,
      rejected: 0,
    })

  const [reports, setReports] =
    useState<any[]>([])

  useEffect(() => {
    fetchApprovalReports()
  }, [])

  const handleApprove = async (
  id: string
) => {
  await approveInspectionReportApi(id);
  fetchApprovalReports();
};

const handleReject = async (
  id: string
) => {
  await rejectInspectionReportApi(id);
  fetchApprovalReports();
};


  const fetchApprovalReports =
    async () => {

      try {

        setLoading(true)

        const response =
          await getInspectionApprovalApi()

        setStats(
          response.data.stats
        )

        setReports(
          response.data.reports
        )

      } catch (error) {

        console.log(
          "Approval Fetch Error",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  if (loading) {

    return (
      <div className="min-h-[45vh] flex items-center justify-center overflow-x-hidden">

        <div className="space-y-3 text-center">

          <div className="w-12 h-12 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-sm text-black">
            Loading approval reports...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

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

  {/* Approval Glow */}

  <div
    className="
      absolute
      top-0
      right-0
      h-56
      w-56
      rounded-full
      bg-violet-500/10
      blur-3xl
    "
  />

  <div
    className="
      absolute
      bottom-0
      left-0
      h-40
      w-40
      rounded-full
      bg-fuchsia-500/10
      blur-3xl
    "
  />

  <div className="relative z-10">

    {/* Header */}

    <div className="flex items-center gap-3">

      <div
        className="
          h-11
          w-11
          rounded-xl
          bg-violet-500/15
          border
          border-violet-500/20
          flex
          items-center
          justify-center
        "
      >
        <ClipboardCheck className="h-5 w-5 text-violet-400" />
      </div>

      <div>

        <div className="flex items-center gap-2">

          <h1 className="text-lg font-semibold text-white">
            Supervisor Approval
          </h1>

          <span
            className="
              px-2
              py-0.5
              rounded-full
              bg-violet-500/10
              text-violet-400
              text-[10px]
              font-medium
            "
          >
            Workflow
          </span>

        </div>

        <p className="text-sm text-slate-400 mt-1">
          Review, verify and approve inspection reports efficiently
        </p>

      </div>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

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
          Total Reports
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {reports.length}
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
          Approved
        </p>

        <h3 className="text-2xl font-bold text-emerald-400 mt-2">
          {stats.approved}
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
          Pending Review
        </p>

        <h3 className="text-2xl font-bold text-amber-400 mt-2">
          {stats.pending}
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
          Approval Rate
        </p>

        <h3 className="text-2xl font-bold text-violet-400 mt-2">
          {reports.length
            ? Math.round(
                (stats.approved / reports.length) * 100
              )
            : 0}
          %
        </h3>
      </div>

    </div>

  </div>

</div>
      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <OverviewCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          gradient="from-orange-500 to-amber-500"
        />

        <OverviewCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          gradient="from-red-500 to-rose-500"
        />
      </div>

      {/* REPORTS */}

      <div className="space-y-4">

        {reports.map(
          (report) => (

            <ApprovalCard
  key={report.id}
  reportId={report.id}
  id={report.inspection?.inspectionId}
  status={report.supervisorStatus}
  result={report.inspectionResult}
  title={report.inspection?.title}
  inspector={report.inspection?.inspectorName}
  date={new Date(report.createdAt).toLocaleDateString()}
  location={report.address}
  coords={`${report.latitude}, ${report.longitude}`}
  photos={report.photoUrls?.length || 0}
  videos={report.videoUrls?.length || 0}
  observation={report.observation}
  recommendation={report.recommendation}
  complianceStatus={report.complianceStatus}
  onApprove={handleApprove}
  onReject={handleReject}
/>
          )
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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-sm shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-green-50 break-words">
            {title}
          </p>

          <h3 className="text-lg font-bold mt-1 text-white break-words">
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
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between gap-2">

          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}
          >

            <Icon className="w-5 h-5" />
          </div>

          <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
        </div>

        <div className="mt-3 min-w-0">

          <p className="text-xs text-black break-words">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-black mt-1 break-words">
            {value}
          </h2>
        </div>
      </div>
    </div>
  )
}

/* ---------------- APPROVAL CARD ---------------- */

function ApprovalCard({
  reportId,
  id,
  status,
  result,
  title,
  inspector,
  date,
  location,
  coords,
  photos,
  videos,
  observation,
  recommendation,
  complianceStatus,
  onApprove,
  onReject,
}: any) {
  const statusBadge =
    status === "APPROVED"
      ? "bg-green-100 text-green-700"
      : status === "REJECTED"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  const resultBadge =
    result === "PASSED"
      ? "bg-green-100 text-green-700"
      : result === "FAILED"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-black text-sm">
              {id}
            </span>

            <span
              className={`px-3 py-1 rounded-xl text-[11px] font-medium ${statusBadge}`}
            >
              {status}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black">
              {title}
            </h3>

            <p className="text-xs text-gray-600 mt-1">
              Inspector: {inspector} • {date}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-2 rounded-xl text-xs font-medium h-fit ${resultBadge}`}
        >
          {result || "N/A"}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoBox
          title="Location"
          value={`${location} (${coords})`}
        />

        <InfoBox
          title="Media"
          value={`${photos} Photos • ${videos} Videos`}
        />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mt-4">
        <InfoBox
          title="Observation"
          value={observation || "N/A"}
        />

        <InfoBox
          title="Recommendation"
          value={recommendation || "N/A"}
        />

        <InfoBox
          title="Compliance"
          value={complianceStatus || "N/A"}
          highlight
        />
      </div>

      {/* ACTIONS */}
      {status === "PENDING" && (
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button
            onClick={() => onApprove(reportId)}
            className="flex-1 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-white text-sm font-medium shadow-sm"
          >
            Approve Report
          </button>

          <button
            onClick={() => onReject(reportId)}
            className="flex-1 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-95 transition text-white text-sm font-medium shadow-sm"
          >
            Reject Report
          </button>
        </div>
      )}

      {status === "APPROVED" && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-3 text-center">
          <p className="text-sm font-medium text-green-700">
            ✓ Report Approved
          </p>
        </div>
      )}

      {status === "REJECTED" && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-100 p-3 text-center">
          <p className="text-sm font-medium text-red-700">
            ✕ Report Rejected
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------- INFO BOX ---------------- */

function InfoBox({
  title,
  value,
  highlight,
}: any) {

  return (
    <div
      className={`
        rounded-xl p-4 border overflow-hidden
        ${
          highlight
            ? "bg-emerald-50 border-emerald-100"
            : "bg-gray-50 border-gray-100"
        }
      `}
    >

      <p className="text-[10px] font-semibold uppercase tracking-wide text-black break-words">
        {title}
      </p>

      <p
        className={`
          mt-2 text-sm leading-5 break-words
          ${
            highlight
              ? "text-emerald-700 font-semibold"
              : "text-black"
          }
        `}
      >
        {value}
      </p>
    </div>
  )
}