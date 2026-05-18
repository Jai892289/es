"use client"

import { useState } from "react"

import {
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
} from "lucide-react"

import { createInspectionReportApi } from "@/lib/inspection.api"

export default function InspectionReportingPage() {
  const initialFormData = {
    inspectionId: "3bdbf692-6287-4fea-a0ae-7eabb684e0ae",

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

  const [errors, setErrors] = useState<any>({})

  const [loading, setLoading] = useState(false)

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

  /* ---------------- GEO LOCATION ---------------- */

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported")
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
        console.log("Location Error", error)

        alert("Unable to fetch location")
      }
    )
  }

  /* ---------------- FILE UPLOAD ---------------- */

  const handleFileUpload = (
    field: string,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return

    const uploadedFiles = Array.from(files).map(
      (file) => URL.createObjectURL(file)
    )

    handleChange(field, uploadedFiles)
  }

  /* ---------------- VALIDATION ---------------- */

  const validateForm = () => {
    let newErrors: any = {}

    if (!formData.inspectionId.trim()) {
      newErrors.inspectionId =
        "Inspection ID is required"
    }

    if (!formData.observation.trim()) {
      newErrors.observation =
        "Observation is required"
    }

    if (!formData.complianceStatus.trim()) {
      newErrors.complianceStatus =
        "Compliance status is required"
    }

    if (!formData.inspectionResult.trim()) {
      newErrors.inspectionResult =
        "Inspection result is required"
    }

    if (!formData.latitude.trim()) {
      newErrors.latitude =
        "Latitude is required"
    }

    if (!formData.longitude.trim()) {
      newErrors.longitude =
        "Longitude is required"
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required"
    }

    if (formData.photoUrls.length === 0) {
      newErrors.photoUrls =
        "Photo upload is required"
    }

    if (formData.videoUrls.length === 0) {
      newErrors.videoUrls =
        "Video upload is required"
    }

    if (!formData.signatureUrl.trim()) {
      newErrors.signatureUrl =
        "Signature upload is required"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault()

    const isValid = validateForm()

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

      // RESET FORM
      setFormData(initialFormData)

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
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Inspection Reporting
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Submit inspection report with
          geo-tagged details
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* INSPECTION ID */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Inspection ID *
          </label>

          <input
            type="text"
            placeholder="Enter inspection ID"
            value={formData.inspectionId}
            onChange={(e) =>
              handleChange(
                "inspectionId",
                e.target.value
              )
            }
            className="mt-2 w-full border rounded-lg p-3 text-sm"
          />

          {errors.inspectionId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.inspectionId}
            </p>
          )}
        </div>

        {/* OBSERVATION */}
        <Textarea
          label="Observation *"
          placeholder="Enter observations"
          value={formData.observation}
          onChange={(e: any) =>
            handleChange(
              "observation",
              e.target.value
            )
          }
        />

        {errors.observation && (
          <p className="text-red-500 text-xs -mt-4">
            {errors.observation}
          </p>
        )}

        {/* COMPLIANCE STATUS */}
        <RadioGroup
          label="Compliance Status *"
          value={formData.complianceStatus}
          onChange={(value: string) =>
            handleChange(
              "complianceStatus",
              value
            )
          }
          options={[
            {
              label: "COMPLIANT",
              icon: <CheckCircle />,
            },
            {
              label: "PARTIAL",
              icon: <AlertTriangle />,
            },
            {
              label: "NON_COMPLIANT",
              icon: <XCircle />,
            },
          ]}
        />

        {errors.complianceStatus && (
          <p className="text-red-500 text-xs -mt-4">
            {errors.complianceStatus}
          </p>
        )}

        {/* INSPECTION RESULT */}
        <RadioGroup
          label="Inspection Result *"
          value={formData.inspectionResult}
          onChange={(value: string) =>
            handleChange(
              "inspectionResult",
              value
            )
          }
          options={[
            {
              label: "PASSED",
              icon: <CheckCircle />,
            },
            {
              label: "FAILED",
              icon: <XCircle />,
            },
            {
              label: "NEEDS_REWORK",
              icon: <AlertTriangle />,
            },
          ]}
        />

        {errors.inspectionResult && (
          <p className="text-red-500 text-xs -mt-4">
            {errors.inspectionResult}
          </p>
        )}

        {/* RECOMMENDATION */}
        <Textarea
          label="Recommendation"
          placeholder="Enter recommendation"
          value={formData.recommendation}
          onChange={(e: any) =>
            handleChange(
              "recommendation",
              e.target.value
            )
          }
        />

        {/* LOCATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Location *
            </label>

            <button
              type="button"
              onClick={getCurrentLocation}
              className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg"
            >
              Auto Detect Location
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LATITUDE */}
            <div>
              <input
                type="text"
                placeholder="Enter latitude"
                value={formData.latitude}
                onChange={(e) =>
                  handleChange(
                    "latitude",
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3 text-sm"
              />

              {errors.latitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.latitude}
                </p>
              )}
            </div>

            {/* LONGITUDE */}
            <div>
              <input
                type="text"
                placeholder="Enter longitude"
                value={formData.longitude}
                onChange={(e) =>
                  handleChange(
                    "longitude",
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3 text-sm"
              />

              {errors.longitude && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.longitude}
                </p>
              )}
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) =>
                handleChange(
                  "address",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 text-sm"
            />

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* LOCATION PREVIEW */}
          {formData.latitude &&
            formData.longitude && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <MapPin className="text-green-600 w-5 h-5" />

                <div>
                  <p className="text-sm font-medium text-green-800">
                    Location Captured
                  </p>

                  <p className="text-xs text-green-700">
                    {formData.latitude} ,
                    {formData.longitude} •{" "}
                    {formData.address}
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* PHOTO UPLOAD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload Photos *
          </label>

          <label className="mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
            <Upload className="w-8 h-8 text-gray-400" />

            <p className="text-sm text-gray-600 mt-2">
              Click to upload photos
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(
                  "photoUrls",
                  e.target.files
                )
              }
            />
          </label>

          {formData.photoUrls.length > 0 && (
            <div className="mt-3 space-y-1">
              {formData.photoUrls.map(
                (
                  file: string,
                  index: number
                ) => (
                  <p
                    key={index}
                    className="text-xs text-green-600"
                  >
                    Uploaded Photo{" "}
                    {index + 1}
                  </p>
                )
              )}
            </div>
          )}

          {errors.photoUrls && (
            <p className="text-red-500 text-xs mt-1">
              {errors.photoUrls}
            </p>
          )}
        </div>

        {/* VIDEO UPLOAD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload Videos *
          </label>

          <label className="mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
            <Upload className="w-8 h-8 text-gray-400" />

            <p className="text-sm text-gray-600 mt-2">
              Click to upload videos
            </p>

            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) =>
                handleFileUpload(
                  "videoUrls",
                  e.target.files
                )
              }
            />
          </label>

          {formData.videoUrls.length > 0 && (
            <div className="mt-3 space-y-1">
              {formData.videoUrls.map(
                (
                  file: string,
                  index: number
                ) => (
                  <p
                    key={index}
                    className="text-xs text-green-600"
                  >
                    Uploaded Video{" "}
                    {index + 1}
                  </p>
                )
              )}
            </div>
          )}

          {errors.videoUrls && (
            <p className="text-red-500 text-xs mt-1">
              {errors.videoUrls}
            </p>
          )}
        </div>

        {/* SIGNATURE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload Signature *
          </label>

          <label className="mt-2 border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
            <Upload className="w-8 h-8 text-gray-400" />

            <p className="text-sm text-gray-600 mt-2">
              Click to upload signature
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files =
                  e.target.files

                if (
                  !files ||
                  files.length === 0
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
          </label>

          {formData.signatureUrl && (
            <p className="text-xs text-green-600 mt-2">
              Signature uploaded
              successfully
            </p>
          )}

          {errors.signatureUrl && (
            <p className="text-red-500 text-xs mt-1">
              {errors.signatureUrl}
            </p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 cursor-pointer"
          >
            {loading
              ? "Submitting..."
              : "Submit Inspection Report"}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData(
                initialFormData
              )

              setErrors({})
            }}
            className="border px-6 py-3 rounded-lg text-gray-700 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}

/* ---------- TEXTAREA ---------- */

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
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full border rounded-lg p-3 text-sm"
      />
    </div>
  )
}

/* ---------- RADIO GROUP ---------- */

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {options.map((o: any) => (
          <div
            key={o.label}
            onClick={() =>
              onChange(o.label)
            }
            className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer
            ${
              value === o.label
                ? "border-blue-500 bg-blue-50"
                : "hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              checked={value === o.label}
              readOnly
            />

            <div>{o.icon}</div>

            <span className="text-sm font-medium">
              {o.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}