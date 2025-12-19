"use client"

import { ChevronDown } from "lucide-react"

export default function RaiseComplaintPage() {
  return (
    <div className="grid grid-cols-12 gap-8">

      {/* LEFT FORM */}
      <div className="col-span-8 space-y-6">

        {/* TITLE */}
        <h2 className="text-2xl font-medium text-green-600">
          Raise Complaint
        </h2>

        {/* DEPARTMENT DETAILS */}
        <section>
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            Department Details:
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Complaint Title" />
            <Select label="Urgency Level" placeholder="Select Priority" />

            <Input label="Full Name" />
            <Input label="Designation" />

            <Input label="Contact Number" />
            <Input label="Email" />

            <Input label="Department Name" />
            <Input label="Location" />
          </div>
        </section>

        {/* VENDOR DETAILS */}
        <section>
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            Vendor Details:
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Company Name" />
            <Input label="Full Name" />

            <Input label="Contact Number" />
            <Input label="WhatsApp Number" />
          </div>
        </section>
      </div>

      {/* RIGHT TEMPLATE PANEL */}
      <div className="col-span-4">
        <div className="bg-white rounded-xl border p-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-green-600 font-medium mb-3">
              Quick Complaint Templates
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Easily raise complaints using our pre-filled templates
              for WhatsApp and Email. Select a template, fill in the
              necessary details, and send it directly to the vendor
              for a faster resolution.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm">
              WhatsApp Templates
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm">
              Email Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- REUSABLE INPUT ---------- */
function Input({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        className="w-full h-10 px-4 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
      />
    </div>
  )
}

/* ---------- REUSABLE SELECT ---------- */
function Select({
  label,
  placeholder,
}: {
  label: string
  placeholder: string
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="relative">
        <select
          className="w-full h-10 px-4 pr-10 rounded-lg border bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500/30"
        >
          <option value="">{placeholder}</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600 pointer-events-none" />
      </div>
    </div>
  )
}
