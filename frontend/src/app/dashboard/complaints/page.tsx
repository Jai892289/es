"use client"

import { useState } from "react"

import {
  ChevronDown,
  Upload,
  Building2,
  ShieldAlert,
  User2,
  Package2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from "lucide-react"

import { createComplaintApi } from "@/lib/complaint.api"

import { useRouter } from "next/navigation"

export default function RaiseComplaintPage() {

  const router = useRouter()

  const [form, setForm] =
    useState<any>({
      title: "",
      urgency: "",

      fullName: "",
      designation: "",
      contactNumber: "",
      email: "",
      departmentName: "",
      location: "",

      vendorCompanyName: "",
      vendorContactName: "",
      vendorContactNumber: "",
      vendorWhatsapp: "",
      vendorEmail: "",
      vendorLocation: "",

      category: "",
      productName: "",
      otherProduct: "",
      serialNumber: "",
      amcContractNumber: "",
      warrantyExpiryDate: "",
      issueDate: "",
      description: "",

      sendWhatsapp: false,
      sendEmail: false,
    })

  const [loading, setLoading] =
    useState(false)

  const [attachments, setAttachments] =
    useState<any[]>([])

  const handleChange = (
    key: string,
    value: any
  ) => {

    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleFileUpload = (
    e: any
  ) => {

    const files = Array.from(
      e.target.files
    )

    const mapped = files.map(
      (file: any) => ({
        fileUrl:
          URL.createObjectURL(file),

        fileType: file.type,

        file,
      })
    )

    setAttachments((prev) => [
      ...prev,
      ...mapped,
    ])
  }

  const handleSubmit =
    async () => {

      if (
        !form.title ||
        !form.urgency ||
        !form.fullName
      ) {

        alert(
          "Please fill required fields"
        )

        return
      }

      try {

        setLoading(true)

        const payload = {
          complaint: {
            title: form.title,
            description:
              form.description,

            urgency:
              form.urgency,

            fullName:
              form.fullName,

            designation:
              form.designation,

            contactNumber:
              form.contactNumber,

            email: form.email,

            location:
              form.location,

            departmentName:
              form.departmentName,

            vendorCompanyName:
              form.vendorCompanyName,

            vendorContactName:
              form.vendorContactName,

            vendorContactNumber:
              form.vendorContactNumber,

            vendorWhatsapp:
              form.vendorWhatsapp,

            vendorEmail:
              form.vendorEmail,

            vendorLocation:
              form.vendorLocation,

            category:
              form.category,

            productName:
              form.productName,

            otherProduct:
              form.otherProduct,

            serialNumber:
              form.serialNumber,

            amcContractNumber:
              form.amcContractNumber,

            warrantyExpiryDate:
              form.warrantyExpiryDate
                ? new Date(
                    form.warrantyExpiryDate
                  ).toISOString()
                : null,

            issueDate: new Date(
              form.issueDate
            ).toISOString(),

            sendWhatsapp:
              form.sendWhatsapp,

            sendEmail:
              form.sendEmail,
          },

          attachments:
            attachments.map(
              (f) => ({
                fileUrl:
                  f.fileUrl,

                fileType:
                  f.fileType,
              })
            ),
        }

        await createComplaintApi(
          payload
        )

        alert(
          "Complaint submitted successfully"
        )

        router.push(
          "/dashboard"
        )

      } catch (err: any) {

        console.error(err)

        alert(
          err.message ||
            "Error submitting complaint"
        )

      } finally {

        setLoading(false)
      }
    }

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <ShieldAlert className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Raise Complaint
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Register maintenance & asset related complaints quickly
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  24/7
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Complaint Support
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  SLA
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Priority Monitoring
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={CheckCircle2}
              title="Resolution Rate"
              value="96%"
            />

            <MiniCard
              icon={AlertTriangle}
              title="Critical Support"
              value="Active"
            />

            <MiniCard
              icon={Package2}
              title="Asset Tracking"
              value="Enabled"
            />
          </div>
        </div>
      </div>

      {/* ---------------- FORM ---------------- */}

      <div className="space-y-7">

        {/* ---------------- DEPARTMENT ---------------- */}

        <Section
          title="Department Details"
          icon={Building2}
        >

          <Grid>

            <Input
              label="Complaint Title"
              icon={FileText}
              onChange={(v: any) =>
                handleChange(
                  "title",
                  v
                )
              }
            />

            <Select
              label="Urgency Level"
              onChange={(v: any) =>
                handleChange(
                  "urgency",
                  v
                )
              }
            />

            <Input
              label="Full Name"
              icon={User2}
              onChange={(v: any) =>
                handleChange(
                  "fullName",
                  v
                )
              }
            />

            <Input
              label="Designation"
              icon={User2}
              onChange={(v: any) =>
                handleChange(
                  "designation",
                  v
                )
              }
            />

            <Input
              label="Contact Number"
              icon={Phone}
              onChange={(v: any) =>
                handleChange(
                  "contactNumber",
                  v
                )
              }
            />

            <Input
              label="Email"
              icon={Mail}
              onChange={(v: any) =>
                handleChange(
                  "email",
                  v
                )
              }
            />

            <Input
              label="Department Name"
              icon={Building2}
              onChange={(v: any) =>
                handleChange(
                  "departmentName",
                  v
                )
              }
            />

            <Input
              label="Location"
              icon={MapPin}
              onChange={(v: any) =>
                handleChange(
                  "location",
                  v
                )
              }
            />
          </Grid>
        </Section>

        {/* ---------------- VENDOR ---------------- */}

        <Section
          title="Vendor Details"
          icon={Package2}
        >

          <Grid>

            <Input
              label="Company Name"
              icon={Building2}
              onChange={(v: any) =>
                handleChange(
                  "vendorCompanyName",
                  v
                )
              }
            />

            <Input
              label="Vendor Name"
              icon={User2}
              onChange={(v: any) =>
                handleChange(
                  "vendorContactName",
                  v
                )
              }
            />

            <Input
              label="Contact Number"
              icon={Phone}
              onChange={(v: any) =>
                handleChange(
                  "vendorContactNumber",
                  v
                )
              }
            />

            <Input
              label="WhatsApp Number"
              icon={Phone}
              onChange={(v: any) =>
                handleChange(
                  "vendorWhatsapp",
                  v
                )
              }
            />

            <Input
              label="Email"
              icon={Mail}
              onChange={(v: any) =>
                handleChange(
                  "vendorEmail",
                  v
                )
              }
            />

            <Input
              label="Location"
              icon={MapPin}
              onChange={(v: any) =>
                handleChange(
                  "vendorLocation",
                  v
                )
              }
            />
          </Grid>
        </Section>

        {/* ---------------- ISSUE ---------------- */}

        <Section
          title="Issue Details"
          icon={AlertTriangle}
        >

          <Grid>

            <Select
              label="Category"
              onChange={(v: any) =>
                handleChange(
                  "category",
                  v
                )
              }
            />

            <Input
              label="Item / Product"
              icon={Package2}
              onChange={(v: any) =>
                handleChange(
                  "productName",
                  v
                )
              }
            />

            <Input
              label="Other Products"
              icon={Package2}
              onChange={(v: any) =>
                handleChange(
                  "otherProduct",
                  v
                )
              }
            />

            <Input
              label="Serial Number"
              icon={FileText}
              onChange={(v: any) =>
                handleChange(
                  "serialNumber",
                  v
                )
              }
            />

            <Input
              label="AMC Contract Number"
              icon={FileText}
              onChange={(v: any) =>
                handleChange(
                  "amcContractNumber",
                  v
                )
              }
            />

            <Input
              type="date"
              label="Warranty Expiry Date"
              icon={Calendar}
              onChange={(v: any) =>
                handleChange(
                  "warrantyExpiryDate",
                  v
                )
              }
            />

            <Input
              type="date"
              label="Issue Occurrence Date"
              icon={Calendar}
              onChange={(v: any) =>
                handleChange(
                  "issueDate",
                  v
                )
              }
            />
          </Grid>

          <div className="mt-6">

            <Textarea
              label="Issue Description"
              onChange={(v: any) =>
                handleChange(
                  "description",
                  v
                )
              }
            />
          </div>
        </Section>

        {/* ---------------- ATTACHMENTS ---------------- */}

        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

          <div className="flex items-center justify-between gap-5 flex-wrap">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Attachments
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Upload invoices, warranty docs, screenshots or issue photos
              </p>
            </div>

            <label className="h-12 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-medium flex items-center gap-2 cursor-pointer shadow-lg">

              <Upload className="w-4 h-4" />

              Upload Files

              <input
                type="file"
                multiple
                onChange={
                  handleFileUpload
                }
                className="hidden"
              />
            </label>
          </div>

          {/* FILES */}

          {attachments.length >
            0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">

              {attachments.map(
                (
                  file,
                  i
                ) => (

                  <div
                    key={i}
                    className="rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">

                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>

                      <div>

                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {
                            file
                              .file
                              .name
                          }
                        </h3>

                        <p className="text-xs text-gray-400 mt-1">
                          {
                            file
                              .fileType
                          }
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-gray-400" />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* ---------------- COMMUNICATION ---------------- */}

        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Vendor Communication
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Notify vendors instantly via email or WhatsApp
            </p>
          </div>

          <div className="flex items-center gap-8">

            <Checkbox
              label="WhatsApp"
              checked={
                form.sendWhatsapp
              }
              onChange={() =>
                handleChange(
                  "sendWhatsapp",
                  !form.sendWhatsapp
                )
              }
            />

            <Checkbox
              label="E-Mail"
              checked={
                form.sendEmail
              }
              onChange={() =>
                handleChange(
                  "sendEmail",
                  !form.sendEmail
                )
              }
            />
          </div>
        </div>

        {/* ---------------- ACTION ---------------- */}

        <div className="flex justify-end">

          <button
            onClick={handleSubmit}
            className="
              h-14 px-8 rounded-2xl
              bg-gradient-to-r from-emerald-600 to-green-600
              hover:from-emerald-700 hover:to-green-700
              transition text-white font-semibold
              shadow-xl
            "
          >

            {loading
              ? "Submitting..."
              : "Submit Complaint"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  children,
  icon: Icon,
}: any) {

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center">

          <Icon className="w-8 h-8 text-emerald-600" />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Fill all required information carefully
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}

/* ---------------- GRID ---------------- */

function Grid({
  children,
}: any) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {children}
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function Input({
  label,
  onChange,
  type = "text",
  icon: Icon,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>

      <div className="relative">

        {Icon && (

          <Icon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
        )}

        <input
          type={type}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            w-full h-14 rounded-2xl
            border border-gray-200
            bg-gray-50
            px-12
            text-sm
            outline-none
            transition
            focus:border-emerald-500
            focus:bg-white
            focus:ring-4
            focus:ring-emerald-100
          "
        />
      </div>
    </div>
  )
}

/* ---------------- SELECT ---------------- */

function Select({
  label,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>

      <div className="relative">

        <select
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            w-full h-14 rounded-2xl
            border border-gray-200
            bg-gray-50
            px-5 pr-12
            text-sm
            appearance-none
            outline-none
            transition
            focus:border-emerald-500
            focus:bg-white
            focus:ring-4
            focus:ring-emerald-100
          "
        >

          <option value="">
            Select
          </option>

          <option value="LOW">
            Low
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="HIGH">
            High
          </option>
        </select>

        <ChevronDown className="absolute right-4 top-5 w-5 h-5 text-emerald-600" />
      </div>
    </div>
  )
}

/* ---------------- TEXTAREA ---------------- */

function Textarea({
  label,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>

      <textarea
        rows={6}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
          w-full rounded-3xl
          border border-gray-200
          bg-gray-50
          p-5 text-sm
          outline-none
          transition
          focus:border-emerald-500
          focus:bg-white
          focus:ring-4
          focus:ring-emerald-100
        "
      />
    </div>
  )
}

/* ---------------- CHECKBOX ---------------- */

function Checkbox({
  label,
  checked,
  onChange,
}: any) {

  return (
    <label className="flex items-center gap-3 cursor-pointer">

      <div
        className={`
          w-6 h-6 rounded-lg border-2 flex items-center justify-center transition
          ${
            checked
              ? "bg-emerald-600 border-emerald-600"
              : "border-gray-300 bg-white"
          }
        `}
        onClick={onChange}
      >

        {checked && (

          <CheckCircle2 className="w-4 h-4 text-white" />
        )}
      </div>

      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </label>
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