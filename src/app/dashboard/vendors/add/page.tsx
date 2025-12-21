"use client"

import { ChevronLeft, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function AddNewVendorPage() {
  return (
    <div className="space-y-8">

      {/* BACK LINK */}
      <Link
        href="/dashboard/vendors"
        className="flex items-center gap-2 text-sm text-green-600 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Vendor List
      </Link>

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-green-600 text-center">
        Add New Vendor
      </h2>

      {/* FORM */}
      <div className="max-w-4xl mx-auto space-y-6">

        {/* SECTION TITLE */}
        <h3 className="text-sm font-semibold text-blue-600">
          Vendor Details:
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <Input label="Company Name" />
          <Input label="Full Name" />

          <Input label="Contact Number" />
          <Input label="WhatsApp Number" />

          <Input label="Email" />
          <Input label="Website" />

          <Input label="Address Line 1" />
          <Input label="Address Line 2" />

          <Select label="City" placeholder="Select City" />
          <Select label="State" placeholder="Select State" />

          <Input label="Pincode" />
          <Input label="GST Number" />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100 text-sm">
            Cancel
          </button>

          <button className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-sm">
            Save Vendor
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- INPUT ---------- */
function Input({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        className="w-full h-10 px-4 rounded-lg border bg-white text-sm
                   focus:outline-none focus:ring-2 focus:ring-green-500/30"
      />
    </div>
  )
}

/* ---------- SELECT ---------- */
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
          className="w-full h-10 px-4 pr-10 rounded-lg border bg-white text-sm appearance-none
                     focus:outline-none focus:ring-2 focus:ring-green-500/30"
        >
          <option value="">{placeholder}</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                                w-4 h-4 text-green-600 pointer-events-none" />
      </div>
    </div>
  )
}
