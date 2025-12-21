"use client"

import Link from "next/link"
import { ChevronLeft, ChevronDown } from "lucide-react"

export default function AddProductInventoryPage() {
  return (
    <div className="space-y-8">

      {/* BACK */}
      <Link
        href="/dashboard/inventory"
        className="flex items-center gap-2 text-sm text-green-600 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Inventory
      </Link>

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-green-600 text-center">
        Add Product to Inventory
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* DEPARTMENT DETAILS */}
        <section>
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            Department Details:
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <Select label="Department Name" placeholder="Select Department" />
            <Input label="Purpose" />

            <Input label="Full Name" />
            <Input label="Designation" />

            <Input label="Contact Number" />
            <Input label="Email" />

            <Input label="Location" />
            <Input label="City" />

            <Input label="State" />
            <Input label="Pincode" />
          </div>
        </section>

        {/* VENDOR DETAILS */}
        <section>
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            Vendor Details:
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <Input label="Company Name" />
            <Input label="Full Name" />

            <Input label="Contact Number" />
            <Input label="WhatsApp Number" />

            <Input label="Email" />
            <Input label="Website" />
          </div>
        </section>

        {/* PRODUCT DETAILS */}
        <section>
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            Product Details:
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <Input label="Product Name" />
            <Select label="Category" placeholder="Select Category" />

            <Input label="Quantity" />
            <Input label="Serial Number" />

            <Input label="Procurement Date" type="date" />
            <Input label="Warranty Expiry Date" type="date" />

            <Select label="AMC Available" placeholder="Yes / No" />
            <Input label="Invoice Number" />
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100 text-sm">
            Cancel
          </button>

          <button className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-sm">
            Save Product
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- INPUT ---------- */
function Input({
  label,
  type = "text",
}: {
  label: string
  type?: string
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
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

        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-4 h-4 text-green-600 pointer-events-none"
        />
      </div>
    </div>
  )
}
