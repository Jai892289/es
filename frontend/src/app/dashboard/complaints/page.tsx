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
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow shrink-0">

                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl font-semibold leading-tight break-words">
                  Raise Complaint
                </h1>

                <p className="text-green-50 mt-1 text-xs break-words">
                  Register maintenance & issue complaints
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-4">

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  24/7
                </h2>

                <p className="text-green-100 text-[10px] mt-1">
                  Support
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  SLA
                </h2>

                <p className="text-green-100 text-[10px] mt-1">
                  Monitoring
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-2 w-full xl:w-[220px]">

            <MiniCard
              icon={CheckCircle2}
              title="Resolution"
              value="96%"
            />

            <MiniCard
              icon={AlertTriangle}
              title="Support"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* FORM */}

      <div className="space-y-4 overflow-hidden">

        {/* DEPARTMENT */}

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
              label="Urgency"
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
              label="Contact"
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
              label="Department"
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

        {/* VENDOR */}

        <Section
          title="Vendor Details"
          icon={Package2}
        >

          <Grid>

            <Input
              label="Company"
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
              label="Contact"
              icon={Phone}
              onChange={(v: any) =>
                handleChange(
                  "vendorContactNumber",
                  v
                )
              }
            />

            <Input
              label="WhatsApp"
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

        {/* ISSUE */}

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
              label="Product"
              icon={Package2}
              onChange={(v: any) =>
                handleChange(
                  "productName",
                  v
                )
              }
            />

            <Input
              label="Other Product"
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
              label="AMC Number"
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
              label="Warranty Expiry"
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
              label="Issue Date"
              icon={Calendar}
              onChange={(v: any) =>
                handleChange(
                  "issueDate",
                  v
                )
              }
            />
          </Grid>

          <div className="mt-4">

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

        {/* ATTACHMENT */}

        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div className="min-w-0">

              <h2 className="text-lg font-semibold text-black break-words">
                Attachments
              </h2>

              <p className="text-xs text-black mt-1 break-words">
                Upload screenshots, warranty docs or invoices
              </p>
            </div>

            <label className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">

              <Upload className="w-4 h-4" />

              Upload

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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">

              {attachments.map(
                (
                  file,
                  i
                ) => (

                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 p-3 flex items-center justify-between gap-3 hover:shadow-sm transition overflow-hidden"
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-semibold text-black truncate">
                          {
                            file
                              .file
                              .name
                          }
                        </h3>

                        <p className="text-[10px] text-black mt-1 truncate">
                          {
                            file
                              .fileType
                          }
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* COMMUNICATION */}

        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 overflow-hidden">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Vendor Communication
            </h2>

            <p className="text-xs text-black mt-1">
              Notify vendors instantly
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap">

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

        {/* ACTION */}

        <div className="flex justify-end">

          <button
            onClick={handleSubmit}
            className="
              h-11 px-6 rounded-xl
              bg-gradient-to-r from-emerald-600 to-green-600
              hover:from-emerald-700 hover:to-green-700
              transition text-white text-sm font-semibold
              shadow-sm
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

/* SECTION */

function Section({
  title,
  children,
  icon: Icon,
}: any) {

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

      <div className="flex items-center gap-3 mb-5">

        <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="min-w-0">

          <h2 className="text-lg font-semibold text-black break-words">
            {title}
          </h2>

          <p className="text-xs text-black mt-1">
            Fill required information
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}

/* GRID */

function Grid({
  children,
}: any) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {children}
    </div>
  )
}

/* INPUT */

function Input({
  label,
  onChange,
  type = "text",
  icon: Icon,
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-xs font-medium text-black mb-2 block break-words">
        {label}
      </label>

      <div className="relative">

        {Icon && (

          <Icon className="absolute left-3 top-3 w-4 h-4 text-black" />
        )}

        <input
          type={type}
          onChange={(e) =>
            onChange(
              e.target.value
            )
          }
          className="
            w-full h-10 rounded-xl
            border border-gray-200
            bg-gray-50
            px-10
            text-sm text-black
            outline-none
            transition
            focus:border-emerald-500
            focus:bg-white
          "
        />
      </div>
    </div>
  )
}

/* SELECT */

function Select({
  label,
  onChange,
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-xs font-medium text-black mb-2 block">
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
            w-full h-10 rounded-xl
            border border-gray-200
            bg-gray-50
            px-3 pr-10
            text-sm text-black
            appearance-none
            outline-none
            transition
            focus:border-emerald-500
            focus:bg-white
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

        <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-emerald-600" />
      </div>
    </div>
  )
}

/* TEXTAREA */

function Textarea({
  label,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-xs font-medium text-black mb-2 block">
        {label}
      </label>

      <textarea
        rows={4}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
          w-full rounded-xl
          border border-gray-200
          bg-gray-50
          p-3 text-sm text-black
          outline-none
          transition
          resize-none
          focus:border-emerald-500
          focus:bg-white
        "
      />
    </div>
  )
}

/* CHECKBOX */

function Checkbox({
  label,
  checked,
  onChange,
}: any) {

  return (
    <label className="flex items-center gap-2 cursor-pointer">

      <div
        className={`
          w-5 h-5 rounded-md border flex items-center justify-center transition
          ${
            checked
              ? "bg-emerald-600 border-emerald-600"
              : "border-gray-300 bg-white"
          }
        `}
        onClick={onChange}
      >

        {checked && (

          <CheckCircle2 className="w-3 h-3 text-white" />
        )}
      </div>

      <span className="text-sm font-medium text-black">
        {label}
      </span>
    </label>
  )
}

/* MINI CARD */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-xs text-green-50 break-words">
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