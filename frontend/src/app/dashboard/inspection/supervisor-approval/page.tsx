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
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="space-y-4 text-center">

          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-500">
            Loading approval reports...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 text-white shadow-xl">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <ClipboardCheck className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Supervisor Approval
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Review, verify & approve submitted inspection reports
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {reports.length}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Reports
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {stats.approved}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Approved Reports
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Approval Accuracy"
              value="98%"
            />

            <MiniCard
              icon={Activity}
              title="Pending Reviews"
              value={stats.pending}
            />

        
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Pending Review"
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

      <div className="space-y-6">

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
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">

          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">
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
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-8 h-8" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
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
    <div className="group bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

        <div className="space-y-4">

          <div className="flex flex-wrap items-center gap-3">

            <span className="font-semibold text-gray-800 text-lg">
              {id}
            </span>

            <span
              className={`px-4 py-2 rounded-2xl text-xs font-medium ${statusBadge}`}
            >
              {status}
            </span>
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-800">
              {title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Inspector:
              {" "}
              {inspector}
              {" • "}
              {date}
            </p>
          </div>
        </div>

        <span
          className={`px-5 py-3 rounded-2xl text-sm font-medium h-fit ${resultBadge}`}
        >
          {result || "N/A"}
        </span>
      </div>

      {/* DETAILS */}

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* LOCATION */}

        <div className="bg-gray-50 rounded-[24px] p-5 border border-gray-100">

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">

              <MapPin className="w-5 h-5 text-gray-600" />
            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Location
              </p>

              <p className="font-semibold text-gray-800 mt-2">
                {location}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {coords}
              </p>
            </div>
          </div>
        </div>

        {/* MEDIA */}

        <div className="bg-gray-50 rounded-[24px] p-5 border border-gray-100">

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">

              <ImageIcon className="w-5 h-5 text-gray-600" />
            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Media Uploads
              </p>

              <div className="flex gap-5 mt-2">

                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">

                  <ImageIcon className="w-4 h-4" />

                  {photos} Photos
                </div>

                <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">

                  <VideoIcon className="w-4 h-4" />

                  {videos} Videos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-7">

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
          title="Compliance Status"
          value={
            complianceStatus ||
            "N/A"
          }
          highlight
        />
      </div>

      {/* ACTIONS */}

      <div className="flex flex-col md:flex-row gap-4 mt-8">

        <button className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium shadow-lg">

          Approve Report
        </button>

        <button className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transition text-white text-sm font-medium shadow-lg">

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
      className={`rounded-[24px] p-5 border ${
        highlight
          ? "bg-emerald-50 border-emerald-100"
          : "bg-gray-50 border-gray-100"
      }`}
    >

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <p
        className={`mt-3 text-sm leading-7 ${
          highlight
            ? "text-emerald-700 font-semibold"
            : "text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  )
}