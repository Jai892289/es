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
} from "lucide-react"

import { getInspectionApprovalApi } from "@/lib/inspection.api"

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

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-sm shrink-0">

                <ClipboardCheck className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl md:text-2xl font-bold break-words">
                  Supervisor Approval
                </h1>

                <p className="text-green-50 mt-1 text-xs leading-5 break-words">
                  Review & approve inspection reports efficiently
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">

              <div>

                <h2 className="text-2xl font-bold">
                  {reports.length}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Total Reports
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {stats.approved}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Approved
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-3 w-full xl:w-[280px]">

            <MiniCard
              icon={ShieldCheck}
              title="Accuracy"
              value="98%"
            />

            <MiniCard
              icon={Activity}
              title="Pending"
              value={stats.pending}
            />
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
              id={
                report.inspection
                  ?.inspectionId
              }
              status={
                report.supervisorStatus
              }
              result={
                report.inspectionResult
              }
              title={
                report.inspection
                  ?.title
              }
              inspector={
                report.inspection
                  ?.inspectorName
              }
              date={new Date(
                report.createdAt
              ).toLocaleDateString()}
              location={
                report.address
              }
              coords={`${report.latitude}° , ${report.longitude}°`}
              photos={
                report.photoUrls
                  ?.length || 0
              }
              videos={
                report.videoUrls
                  ?.length || 0
              }
              observation={
                report.observation
              }
              recommendation={
                report.recommendation
              }
              complianceStatus={
                report.complianceStatus
              }
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
}: any) {

  const statusBadge =
    status === "APPROVED"
      ? "bg-green-100 text-green-700"
      : status === "REJECTED"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700"

  const resultBadge =
    result === "PASSED"
      ? "bg-green-100 text-green-700"
      : result === "FAILED"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700"

  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">

        <div className="space-y-3 min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <span className="font-semibold text-black text-sm break-words">
              {id}
            </span>

            <span
              className={`px-3 py-1 rounded-xl text-[11px] font-medium whitespace-nowrap ${statusBadge}`}
            >
              {status}
            </span>
          </div>

          <div className="min-w-0">

            <h3 className="text-lg font-semibold text-black break-words">
              {title}
            </h3>

            <p className="text-xs text-black mt-1 break-words">
              Inspector: {inspector}
              {" • "}
              {date}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-2 rounded-xl text-xs font-medium h-fit whitespace-nowrap ${resultBadge}`}
        >
          {result || "N/A"}
        </span>
      </div>

      {/* DETAILS */}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* LOCATION */}

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 overflow-hidden">

          <div className="flex gap-3">

            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">

              <MapPin className="w-4 h-4 text-black" />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-semibold uppercase tracking-wide text-black break-words">
                Location
              </p>

              <p className="font-semibold text-sm text-black mt-2 break-words">
                {location}
              </p>

              <p className="text-[11px] text-black mt-1 break-all">
                {coords}
              </p>
            </div>
          </div>
        </div>

        {/* MEDIA */}

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 overflow-hidden">

          <div className="flex gap-3">

            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">

              <ImageIcon className="w-4 h-4 text-black" />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-semibold uppercase tracking-wide text-black break-words">
                Media Uploads
              </p>

              <div className="flex flex-wrap gap-3 mt-2">

                <div className="flex items-center gap-2 text-blue-700 text-xs font-medium whitespace-nowrap">

                  <ImageIcon className="w-4 h-4" />

                  {photos} Photos
                </div>

                <div className="flex items-center gap-2 text-purple-700 text-xs font-medium whitespace-nowrap">

                  <VideoIcon className="w-4 h-4" />

                  {videos} Videos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 mt-4">

        <InfoBox
          title="Observation"
          value={
            observation || "N/A"
          }
        />

        <InfoBox
          title="Recommendation"
          value={
            recommendation ||
            "N/A"
          }
        />

        <InfoBox
          title="Compliance"
          value={
            complianceStatus ||
            "N/A"
          }
          highlight
        />
      </div>

      {/* ACTIONS */}

      <div className="flex flex-col md:flex-row gap-3 mt-4">

        <button className="flex-1 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-white text-sm font-medium shadow-sm whitespace-nowrap">

          Approve Report
        </button>

        <button className="flex-1 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-95 transition text-white text-sm font-medium shadow-sm whitespace-nowrap">

          Reject Report
        </button>
      </div>
    </div>
  )
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