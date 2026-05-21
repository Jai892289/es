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
      className="space-y-4 overflow-x-hidden"
    >

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
                  Inspection Reporting
                </h1>

                <p className="text-green-50 mt-1 text-xs leading-5 break-words">
                  Submit geo-tagged inspection reports with media evidence
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">

              <div>

                <h2 className="text-2xl font-bold">
                  24
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Reports Submitted
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  98%
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Compliance Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-3 w-full xl:w-[220px]">

            <MiniCard
              title="Tracking"
              value="Live"
            />

            <MiniCard
              title="Upload"
              value="Ready"
            />
          </div>
        </div>
      </div>

      {/* FORM */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        {/* TOP BAR */}

        <div className="px-4 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Inspection Report Form
            </h2>

            <p className="text-xs text-black mt-1">
              Fill mandatory details before submitting
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">

            <button
              type="button"
              onClick={
                getCurrentLocation
              }
              className="h-10 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition text-blue-700 text-sm font-medium whitespace-nowrap"
            >
              Detect Location
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-white text-sm font-medium shadow-sm disabled:opacity-50 whitespace-nowrap"
            >
              {loading
                ? "Submitting..."
                : "Submit"}
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="p-4 space-y-5 overflow-hidden">

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
              placeholder="Enter observations"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

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

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 overflow-hidden">

                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">

                    <MapPin className="text-green-600 w-5 h-5" />
                  </div>

                  <div className="min-w-0">

                    <p className="font-semibold text-green-800 text-sm break-words">
                      Location Captured
                    </p>

                    <p className="text-xs text-green-700 mt-1 break-all">
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
              subtitle="Upload site images"
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
              subtitle="Inspector signature"
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
    <div className="space-y-4 overflow-hidden">

      <div>

        <h3 className="text-base font-semibold text-black break-words">
          {title}
        </h3>

        <div className="w-14 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-2" />
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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <p className="text-[11px] text-green-50 break-words">
        {title}
      </p>

      <h3 className="text-lg font-bold mt-1 text-white break-words">
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
    <div className="min-w-0">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <input
        {...props}
        className="
          mt-2 w-full h-10
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-3
          text-sm text-black
          outline-none
          transition
          focus:border-emerald-500
          focus:bg-white
          focus:ring-2
          focus:ring-emerald-100
        "
      />

      {error && (

        <p className="text-red-500 text-xs mt-2 break-words">
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
    <div className="min-w-0">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <textarea
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          mt-2 w-full
          rounded-xl
          border border-gray-200
          bg-gray-50
          p-3
          text-sm text-black
          outline-none
          resize-none
          transition
          focus:border-emerald-500
          focus:bg-white
          focus:ring-2
          focus:ring-emerald-100
        "
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
    <div className="overflow-hidden">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">

        {options.map(
          (o: any) => (

            <div
              key={o.label}
              onClick={() =>
                onChange(
                  o.label
                )
              }
              className={`
                border rounded-xl p-4
                flex items-center gap-3
                cursor-pointer transition-all
                overflow-hidden
                ${
                  value ===
                  o.label
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40"
                }
              `}
            >

              <div
                className={`
                  w-10 h-10 rounded-xl
                  flex items-center justify-center shrink-0
                  ${
                    value ===
                    o.label
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-black"
                  }
                `}
              >
                {o.icon}
              </div>

              <div className="min-w-0">

                <p className="font-semibold text-sm text-black break-words">
                  {o.label}
                </p>

                <p className="text-[11px] text-black mt-1">
                  Select option
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
    <label className="group border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition bg-gray-50 hover:bg-emerald-50 overflow-hidden">

      <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition shrink-0">

        <Upload className="w-6 h-6 text-emerald-600" />
      </div>

      <h3 className="text-sm font-semibold text-black mt-4 break-words">
        {title}
      </h3>

      <p className="text-xs text-black mt-1 break-words">
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