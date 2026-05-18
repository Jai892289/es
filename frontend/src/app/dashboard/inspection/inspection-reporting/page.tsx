"use client"

import { useState } from "react"

import {
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  ClipboardCheck,
} from "lucide-react"

import { createInspectionReportApi } from "@/lib/inspection.api"

export default function InspectionReportingPage() {

  const initialFormData = {
    inspectionId:
      "3bdbf692-6287-4fea-a0ae-7eabb684e0ae",

    observation: "",

    complianceStatus: "",

    recommendation: "",

    inspectionResult: "",

    latitude: "",

    longitude: "",

    address: "",

    photoUrls: [] as string[],

    videoUrls: [] as string[],

    signatureUrl: "",

    status: "SUBMITTED",
  }

  const [formData, setFormData] =
    useState(initialFormData)

  const [errors, setErrors] =
    useState<any>({})

  const [loading, setLoading] =
    useState(false)

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (
    field: string,
    value: any
  ) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }))
  }

  /* ---------------- LOCATION ---------------- */

  const getCurrentLocation =
    () => {

      if (
        !navigator.geolocation
      ) {

        alert(
          "Geolocation is not supported"
        )

        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {

          handleChange(
            "latitude",
            position.coords.latitude.toString()
          )

          handleChange(
            "longitude",
            position.coords.longitude.toString()
          )
        },

        (error) => {

          console.log(
            "Location Error",
            error
          )

          alert(
            "Unable to fetch location"
          )
        }
      )
    }

  /* ---------------- FILE UPLOAD ---------------- */

  const handleFileUpload = (
    field: string,
    files: FileList | null
  ) => {

    if (
      !files ||
      files.length === 0
    )
      return

    const uploadedFiles =
      Array.from(files).map(
        (file) =>
          URL.createObjectURL(
            file
          )
      )

    handleChange(
      field,
      uploadedFiles
    )
  }

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {

    let newErrors: any = {}

    if (
      !formData.inspectionId.trim()
    ) {

      newErrors.inspectionId =
        "Inspection ID is required"
    }

    if (
      !formData.observation.trim()
    ) {

      newErrors.observation =
        "Observation is required"
    }

    if (
      !formData.complianceStatus.trim()
    ) {

      newErrors.complianceStatus =
        "Compliance status is required"
    }

    if (
      !formData.inspectionResult.trim()
    ) {

      newErrors.inspectionResult =
        "Inspection result is required"
    }

    if (
      !formData.latitude.trim()
    ) {

      newErrors.latitude =
        "Latitude is required"
    }

    if (
      !formData.longitude.trim()
    ) {

      newErrors.longitude =
        "Longitude is required"
    }

    if (
      !formData.address.trim()
    ) {

      newErrors.address =
        "Address is required"
    }

    if (
      formData.photoUrls
        .length === 0
    ) {

      newErrors.photoUrls =
        "Photo upload is required"
    }

    if (
      formData.videoUrls
        .length === 0
    ) {

      newErrors.videoUrls =
        "Video upload is required"
    }

    if (
      !formData.signatureUrl.trim()
    ) {

      newErrors.signatureUrl =
        "Signature upload is required"
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors)
        .length === 0
    )
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit =
    async (e: any) => {

      e.preventDefault()

      const isValid =
        validateForm()

      if (!isValid) return

      try {

        setLoading(true)

        const response =
          await createInspectionReportApi(
            formData
          )

        console.log(
          "Inspection Report Submitted",
          response
        )

        alert(
          "Inspection report submitted successfully"
        )

        setFormData(
          initialFormData
        )

        setErrors({})

      } catch (error) {

        console.log(
          "Inspection Report Error",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

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
                  Inspection Reporting
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Submit geo-tagged inspection reports with media evidence
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  24
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Reports Submitted
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  98%
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Compliance Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              title="Live Tracking"
              value="Enabled"
            />

            <MiniCard
              title="Media Upload"
              value="Ready"
            />

            <MiniCard
              title="Report Status"
              value="Draft"
            />
          </div>
        </div>
      </div>

      {/* FORM */}

      <div className="bg-white border border-gray-100 rounded-[34px] shadow-sm overflow-hidden">

        {/* TOP BAR */}

        <div className="px-8 py-6 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Inspection Report Form
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fill all mandatory details before submitting
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">

            <button
              type="button"
              onClick={
                getCurrentLocation
              }
              className="h-12 px-5 rounded-2xl bg-blue-50 hover:bg-blue-100 transition text-blue-600 text-sm font-medium"
            >
              Auto Detect Location
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium shadow-lg disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Report"}
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="p-8 space-y-10">

          {/* BASIC INFO */}

          <Section title="Basic Information">

            <InputField
              label="Inspection ID *"
              placeholder="Enter inspection ID"
              value={
                formData.inspectionId
              }
              onChange={(
                e: any
              ) =>
                handleChange(
                  "inspectionId",
                  e.target.value
                )
              }
              error={
                errors.inspectionId
              }
            />

            <Textarea
              label="Observation *"
              placeholder="Enter detailed observations"
              value={
                formData.observation
              }
              onChange={(
                e: any
              ) =>
                handleChange(
                  "observation",
                  e.target.value
                )
              }
            />

            <Textarea
              label="Recommendation"
              placeholder="Enter recommendations"
              value={
                formData.recommendation
              }
              onChange={(
                e: any
              ) =>
                handleChange(
                  "recommendation",
                  e.target.value
                )
              }
            />
          </Section>

          {/* COMPLIANCE */}

          <Section title="Compliance & Result">

            <RadioGroup
              label="Compliance Status *"
              value={
                formData.complianceStatus
              }
              onChange={(
                value: string
              ) =>
                handleChange(
                  "complianceStatus",
                  value
                )
              }
              options={[
                {
                  label:
                    "COMPLIANT",
                  icon:
                    <CheckCircle />,
                },
                {
                  label:
                    "PARTIAL",
                  icon:
                    <AlertTriangle />,
                },
                {
                  label:
                    "NON_COMPLIANT",
                  icon:
                    <XCircle />,
                },
              ]}
            />

            <RadioGroup
              label="Inspection Result *"
              value={
                formData.inspectionResult
              }
              onChange={(
                value: string
              ) =>
                handleChange(
                  "inspectionResult",
                  value
                )
              }
              options={[
                {
                  label:
                    "PASSED",
                  icon:
                    <CheckCircle />,
                },
                {
                  label:
                    "FAILED",
                  icon:
                    <XCircle />,
                },
                {
                  label:
                    "NEEDS_REWORK",
                  icon:
                    <AlertTriangle />,
                },
              ]}
            />
          </Section>

          {/* LOCATION */}

          <Section title="Geo Location">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <InputField
                label="Latitude *"
                placeholder="Enter latitude"
                value={
                  formData.latitude
                }
                onChange={(
                  e: any
                ) =>
                  handleChange(
                    "latitude",
                    e.target.value
                  )
                }
                error={
                  errors.latitude
                }
              />

              <InputField
                label="Longitude *"
                placeholder="Enter longitude"
                value={
                  formData.longitude
                }
                onChange={(
                  e: any
                ) =>
                  handleChange(
                    "longitude",
                    e.target.value
                  )
                }
                error={
                  errors.longitude
                }
              />
            </div>

            <InputField
              label="Address *"
              placeholder="Enter address"
              value={
                formData.address
              }
              onChange={(
                e: any
              ) =>
                handleChange(
                  "address",
                  e.target.value
                )
              }
              error={
                errors.address
              }
            />

            {formData.latitude &&
              formData.longitude && (

                <div className="bg-green-50 border border-green-200 rounded-[24px] p-5 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">

                    <MapPin className="text-green-600 w-7 h-7" />
                  </div>

                  <div>

                    <p className="font-semibold text-green-800">
                      Location Captured Successfully
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                      {
                        formData.latitude
                      }
                      ,
                      {" "}
                      {
                        formData.longitude
                      }
                    </p>
                  </div>
                </div>
              )}
          </Section>

          {/* MEDIA */}

          <Section title="Evidence Upload">

            <UploadBox
              title="Upload Photos *"
              subtitle="Upload site images & evidence"
              accept="image/*"
              multiple
              onChange={(
                e: any
              ) =>
                handleFileUpload(
                  "photoUrls",
                  e.target.files
                )
              }
            />

            <UploadBox
              title="Upload Videos *"
              subtitle="Upload inspection videos"
              accept="video/*"
              multiple
              onChange={(
                e: any
              ) =>
                handleFileUpload(
                  "videoUrls",
                  e.target.files
                )
              }
            />

            <UploadBox
              title="Upload Signature *"
              subtitle="Authorized inspector signature"
              accept="image/*"
              onChange={(
                e: any
              ) => {

                const files =
                  e.target.files

                if (
                  !files ||
                  files.length ===
                    0
                )
                  return

                handleChange(
                  "signatureUrl",
                  URL.createObjectURL(
                    files[0]
                  )
                )
              }}
            />
          </Section>
        </div>
      </div>
    </form>
  )
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  children,
}: any) {

  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-3" />
      </div>

      {children}
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

      <p className="text-sm text-green-50">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2 text-white">
        {value}
      </h3>
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function InputField({
  label,
  error,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="mt-2 w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />

      {error && (

        <p className="text-red-500 text-xs mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

/* ---------------- TEXTAREA ---------------- */

function Textarea({
  label,
  placeholder,
  value,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  )
}

/* ---------------- RADIO ---------------- */

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        {options.map(
          (o: any) => (

            <div
              key={o.label}
              onClick={() =>
                onChange(
                  o.label
                )
              }
              className={`group border rounded-[24px] p-5 flex items-center gap-4 cursor-pointer transition-all duration-300
              ${
                value ===
                o.label
                  ? "border-emerald-500 bg-emerald-50 shadow-lg"
                  : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40"
              }`}
            >

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center
                ${
                  value ===
                  o.label
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {o.icon}
              </div>

              <div>

                <p className="font-semibold text-gray-800">
                  {o.label}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Select status
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

/* ---------------- UPLOAD ---------------- */

function UploadBox({
  title,
  subtitle,
  accept,
  multiple,
  onChange,
}: any) {

  return (
    <label className="group border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-[28px] p-10 flex flex-col items-center justify-center text-center cursor-pointer transition bg-gray-50 hover:bg-emerald-50">

      <div className="w-20 h-20 rounded-[28px] bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition">

        <Upload className="w-10 h-10 text-emerald-600" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {subtitle}
      </p>

      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />
    </label>
  )
}