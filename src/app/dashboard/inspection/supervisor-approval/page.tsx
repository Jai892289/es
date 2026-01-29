"use client"

import {
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  ImageIcon,
  VideoIcon,
} from "lucide-react"

export default function SupervisorApprovalPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Supervisor Approval
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Review and approve inspection reports submitted by inspectors
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Pending Review"
          value="5"
          icon={<Clock className="text-orange-600" />}
        />
        <SummaryCard
          title="Approved"
          value="42"
          valueColor="text-green-600"
          icon={<CheckCircle className="text-green-600" />}
        />
        <SummaryCard
          title="Rejected"
          value="3"
          valueColor="text-red-600"
          icon={<XCircle className="text-red-600" />}
        />
      </div>

      {/* INSPECTION CARDS */}
      <ApprovalCard
        id="INS-2026-003"
        status="Pending Approval"
        statusColor="orange"
        result="Passed"
        title="Road Construction Quality Check"
        inspector="Amit Patel"
        date="24 Jan 2026"
        location="MG Road Extension"
        coords="19.0760° N, 72.8777° E"
        photos={4}
        videos={2}
      />

      <ApprovalCard
        id="INS-2026-001"
        status="Approved"
        statusColor="green"
        result="Needs Rework"
        title="Building Safety Inspection - Ward 5"
        inspector="Priya Sharma"
        date="23 Jan 2026"
        location="Ward 5, Municipal Building Site"
        coords="19.0856° N, 72.8906° E"
        photos={8}
        videos={1}
      />
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
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-semibold mt-2 ${valueColor}`}>
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
  statusColor,
  result,
  title,
  inspector,
  date,
  location,
  coords,
  photos,
  videos,
}: any) {
  const statusBadge =
    statusColor === "green"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700"

  const resultBadge =
    result === "Passed"
      ? "bg-green-100 text-green-700"
      : "bg-orange-100 text-orange-700"

  return (
    <div className="bg-white border rounded-xl p-6 space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-800">{id}</span>
            <span className={`px-3 py-0.5 rounded-full text-xs ${statusBadge}`}>
              {status}
            </span>
          </div>

          <h3 className="font-semibold text-gray-800 mt-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            Inspector: {inspector} • {date}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs ${resultBadge}`}>
          {result}
        </span>
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 rounded-lg p-4 flex flex-wrap justify-between gap-4 text-sm">
        <div>
          <p className="text-xs text-gray-500 mb-1">Location</p>
          <p className="font-medium text-gray-800 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            {location}
          </p>
          <p className="text-xs text-gray-500">{coords}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Media Uploads</p>
          <div className="flex gap-4 text-blue-600">
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" /> {photos} Photos
            </span>
            <span className="flex items-center gap-1">
              <VideoIcon className="w-4 h-4" /> {videos} Videos
            </span>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="text-center">
        <button className="text-blue-600 text-sm hover:underline">
          View Full Report
        </button>
      </div>
    </div>
  )
}
