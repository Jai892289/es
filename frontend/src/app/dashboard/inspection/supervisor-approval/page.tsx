"use client"

import { useEffect, useState } from "react"

import {
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  ImageIcon,
  VideoIcon,
} from "lucide-react"

import { getInspectionApprovalApi } from "@/lib/inspection.api"

export default function SupervisorApprovalPage() {
  const [loading, setLoading] =
    useState(true)

  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  const [reports, setReports] = useState<any[]>(
    []
  )

  useEffect(() => {
    fetchApprovalReports()
  }, [])

  const fetchApprovalReports =
    async () => {
      try {
        setLoading(true)

        const response =
          await getInspectionApprovalApi()

        console.log(
          "Approval Reports",
          response
        )

        setStats(response.data.stats)

        setReports(response.data.reports)
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
      <div className="p-10 text-center">
        Loading approval reports...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Supervisor Approval
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review and approve inspection
          reports submitted by inspectors
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Pending Review"
          value={stats.pending}
          icon={
            <Clock className="text-orange-600" />
          }
        />

        <SummaryCard
          title="Approved"
          value={stats.approved}
          valueColor="text-green-600"
          icon={
            <CheckCircle className="text-green-600" />
          }
        />

        <SummaryCard
          title="Rejected"
          value={stats.rejected}
          valueColor="text-red-600"
          icon={
            <XCircle className="text-red-600" />
          }
        />
      </div>

      {/* REPORTS */}
      <div className="space-y-6">
        {reports.map((report) => (
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
              report.inspection?.title
            }
            inspector={
              report.inspection
                ?.inspectorName
            }
            date={new Date(
              report.createdAt
            ).toLocaleDateString()}
            location={report.address}
            coords={`${report.latitude}° , ${report.longitude}°`}
            photos={
              report.photoUrls?.length ||
              0
            }
            videos={
              report.videoUrls?.length ||
              0
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
        ))}
      </div>
    </div>
  )
}

/* ---------- SUMMARY CARD ---------- */

function SummaryCard({
  title,
  value,
  icon,
  valueColor = "text-gray-800",
}: any) {
  return (
    <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">
          {title}
        </p>

        <p
          className={`text-2xl font-semibold mt-2 ${valueColor}`}
        >
          {value}
        </p>
      </div>

      <div>{icon}</div>
    </div>
  )
}

/* ---------- APPROVAL CARD ---------- */

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
    <div className="bg-white border rounded-xl p-6 space-y-5">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-800">
              {id}
            </span>

            <span
              className={`px-3 py-0.5 rounded-full text-xs ${statusBadge}`}
            >
              {status}
            </span>
          </div>

          <h3 className="font-semibold text-gray-800 mt-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            Inspector: {inspector} •{" "}
            {date}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${resultBadge}`}
        >
          {result || "N/A"}
        </span>
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap justify-between gap-4 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Location
          </p>

          <p className="font-medium text-gray-800 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            {location}
          </p>

          <p className="text-xs text-gray-500">
            {coords}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">
            Media Uploads
          </p>

          <div className="flex gap-4 text-blue-600">
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              {photos} Photos
            </span>

            <span className="flex items-center gap-1">
              <VideoIcon className="w-4 h-4" />
              {videos} Videos
            </span>
          </div>
        </div>
      </div>

      {/* OBSERVATION */}
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500">
            Observation
          </p>

          <p className="text-gray-700">
            {observation || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Recommendation
          </p>

          <p className="text-gray-700">
            {recommendation || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Compliance Status
          </p>

          <p className="text-gray-700 font-medium">
            {complianceStatus ||
              "N/A"}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
          Approve
        </button>

        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
          Reject
        </button>
      </div>
    </div>
  )
}