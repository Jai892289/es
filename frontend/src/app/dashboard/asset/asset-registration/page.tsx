"use client"

import { Calendar, Upload, Box } from "lucide-react"

export default function AssetRegistrationPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Asset Management &gt; Asset Registration
          </h2>
          <p className="text-sm text-gray-500">
            Municipal Asset Management System
          </p>
        </div>

        {/* <div className="text-right text-sm">
          <div className="text-gray-500">Today's Date</div>
          <div className="font-semibold">23 Jan 2026</div>
        </div> */}
      </div>

      {/* TITLE CARD */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Asset Registration
        </h3>
        <p className="text-sm text-gray-500">
          Register new assets with purchase details and documents
        </p>
      </div>

      {/* BASIC INFORMATION */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h4 className="font-semibold text-gray-800">
          Basic Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Asset Name *" placeholder="Enter asset name" />
          <Select label="Asset Category *" options={["Select Category", "Electronics", "Furniture"]} />
          <Select label="Department *" options={["Select Department", "IT", "Finance", "Revenue"]} />
          <Input label="Brand / Manufacturer" placeholder="e.g., Dell, HP" />
          <Input label="Model Number" placeholder="Enter model number" />
          <Input label="Serial Number" placeholder="Enter serial number" />
        </div>

        <Textarea
          label="Description"
          placeholder="Enter asset description and specifications"
        />
      </div>

      {/* PURCHASE INFORMATION */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h4 className="font-semibold text-gray-800">
          Purchase Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DateInput label="Date of Purchase *" />
          <DateInput label="Date of Expiry / Warranty End" />
          <Input label="Purchase Cost (₹) *" placeholder="0.00" />
          <Select label="Vendor / Supplier" options={["Select Vendor", "Global-Link", "TechNova"]} />
        </div>

        <Input label="Invoice Number" placeholder="Enter invoice/bill number" />
      </div>

      {/* LOCATION & ASSIGNMENT */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h4 className="font-semibold text-gray-800">
          Location & Assignment
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Location *"
            placeholder="e.g., Main Office - Floor 3, Room 305"
          />
          <Select label="Assigned To" options={["Select User", "Rajesh Kumar", "Priya Sharma"]} />
        </div>

        <Select label="Initial Status" options={["In Use", "In Store", "Disposed"]} />
      </div>

      {/* UPLOAD DOCUMENTS */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h4 className="font-semibold text-gray-800">
          Upload Documents
        </h4>

        <div className="border-2 border-dashed rounded-xl p-10 text-center text-sm text-gray-500">
          <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <p className="font-medium">
            Click to upload or drag and drop
          </p>
          <p className="text-xs">
            PDF, JPG, PNG up to 10MB each
          </p>
        </div>
      </div>

      {/* AMC DETAILS */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h4 className="font-semibold text-gray-800">
          AMC Details (Optional)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <DateInput label="AMC Start Date" />
          <DateInput label="AMC End Date" />
          <Input label="AMC Cost (₹)" placeholder="0.00" />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-[#14B86E] text-white hover:bg-[#14b86ebd] font-medium">
          <Box className="w-5 h-5" />
          Register Asset
        </button>

        <button className="h-12 px-6 rounded-full border text-gray-700 hover:bg-gray-100">
          Reset Form
        </button>
      </div>
    </div>
  )
}

/* ================= REUSABLE FIELDS ================= */

function Input({ label, placeholder }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="mt-1 w-full h-10 px-4 rounded-lg border text-sm"
      />
    </div>
  )
}

function Select({ label, options }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select className="mt-1 w-full h-10 px-4 rounded-lg border bg-white text-sm">
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
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
        className="mt-1 w-full px-4 py-3 rounded-lg border text-sm resize-none"
      />
    </div>
  )
}

function DateInput({ label }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          placeholder="dd-mm-yyyy"
          className="w-full h-10 px-4 pr-10 rounded-lg border text-sm"
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}
