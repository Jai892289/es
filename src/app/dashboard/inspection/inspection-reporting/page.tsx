"use client"

import {
  MapPin,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

export default function InspectionReportingPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Inspection Reporting
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Submit real-time inspection data with geo-tagged media
        </p>
      </div>

      {/* ACTIVE INSPECTION */}
      <div className="border border-blue-200 bg-blue-50 rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-800">
              Active Inspection
            </h3>
            <p className="text-sm text-gray-600">
              INS-2026-003 • Road Construction Quality Check
            </p>
            <p className="text-xs text-gray-500">
              MG Road Extension • Surface Laying Phase
            </p>
          </div>

          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
            In Progress
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-sm">
          <Info label="Date" value="24 Jan 2026" />
          <Info label="Time" value="09:00 AM" />
          <Info label="Inspector" value="Amit Patel" />
        </div>
      </div>

      {/* REPORT FORM */}
      <div className="bg-white border rounded-xl p-6 space-y-8">

        <h3 className="font-semibold text-gray-800">
          Inspection Report Form
        </h3>

        {/* PHOTO UPLOAD */}
        <UploadBox
          title="Upload Geo-tagged Photos"
          subtitle="Photos will be automatically geo-tagged with location"
        />

        {/* VIDEO UPLOAD */}
        <UploadBox
          title="Upload Geo-tagged Videos"
          subtitle="Maximum file size: 100MB per video"
        />

        {/* LOCATION */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <MapPin className="text-green-600 w-5 h-5" />
          <div>
            <p className="text-sm font-medium text-green-800">
              Location Captured
            </p>
            <p className="text-xs text-green-700">
              19.0760° N, 72.8777° E • Mumbai, Maharashtra
            </p>
          </div>
        </div>

        {/* OBSERVATIONS */}
        <Textarea
          label="Observations *"
          placeholder="Enter detailed observations from the inspection..."
        />

        {/* COMPLIANCE */}
        <RadioGroup
          label="Compliance Status *"
          options={[
            { label: "Compliant", icon: <CheckCircle />, color: "green" },
            { label: "Partial", icon: <AlertTriangle />, color: "yellow" },
            { label: "Non-Compliant", icon: <XCircle />, color: "red" },
          ]}
        />

        {/* RECOMMENDATIONS */}
        <Textarea
          label="Recommendations"
          placeholder="Enter recommendations for improvement or corrective actions..."
        />

        {/* RESULT */}
        <RadioGroup
          label="Inspection Result *"
          options={[
            { label: "Passed", icon: <CheckCircle />, color: "green" },
            { label: "Failed", icon: <XCircle />, color: "red" },
            { label: "Needs Rework", icon: <AlertTriangle />, color: "orange" },
          ]}
        />

        {/* SIGNATURE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Inspector Signature
          </label>
          <div className="mt-2 border border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
            Digital signature will be captured
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
            Submit Inspection Report
          </button>
          <button className="border px-6 py-3 rounded-lg text-gray-700">
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- SMALL COMPONENTS ---------- */

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  )
}

function UploadBox({ title, subtitle }: any) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">
        {title}
      </p>
      <div className="border border-dashed rounded-lg p-8 text-center space-y-2">
        <Upload className="mx-auto text-gray-400" />
        <p className="text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

function Textarea({ label, placeholder }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="mt-2 w-full border rounded-lg p-3 text-sm"
      />
    </div>
  )
}

function RadioGroup({ label, options }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {options.map((o: any) => (
          <div
            key={o.label}
            className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-blue-400"
          >
            <input type="radio" />
            <div className={`text-${o.color}-600`}>
              {o.icon}
            </div>
            <span className="text-sm font-medium">
              {o.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
