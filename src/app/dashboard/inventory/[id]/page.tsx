"use client"

import Link from "next/link"
import {
  ChevronLeft,
  Laptop,
  ShieldCheck,
  FileText,
  Pen,
  Trash2,
  MessageCircle,
  AlertTriangle,
} from "lucide-react"

export default function InventoryProductDetailsPage() {
  return (
    <div className="space-y-6">

      {/* BACK */}
      <Link
        href="/dashboard/inventory"
        className="flex items-center gap-2 text-sm text-green-600 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Inventory
      </Link>

      <div className="grid grid-cols-12 gap-8">

        {/* LEFT PRODUCT DETAILS */}
        <div className="col-span-8 bg-white rounded-xl border p-6 space-y-4">

          {/* HEADER */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Laptop className="text-green-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase">
                Category - Electronics & IT Equipment | Laptop
              </p>
              <h2 className="text-lg font-semibold">
                ThinkBook 16 40.64cms - AMD Ryzen 7
              </h2>
            </div>
          </div>

          {/* DATES */}
          <div className="flex gap-6 text-sm">
            <DateCard label="Procurement Date" value="Jan 12, 2025" />
            <DateCard label="Warranty Expiry Date" value="Jan 12, 2026" />
            <DateCard label="AMC" value="Till Jan 12, 2030" />
          </div>

          <hr />

          {/* SPEC LIST */}
          <div className="text-sm text-gray-700 space-y-1">
            <Spec label="Processor" value="AMD Ryzen™ 7 7730U Processor (2.0 GHz Up To 4.50 GHz)" />
            <Spec label="Operating System" value="Windows 11 Home Single Language 64" />
            <Spec label="Graphic Card" value="Integrated AMD Radeon™ Graphics" />
            <Spec label="Memory" value="16 GB DDR4-3200MHz (SODIMM)" />
            <Spec label="Storage" value="512 GB SSD M.2 2242 PCIe Gen 4 TLC" />
            <Spec label="Display" value="40.64cms 16" />
            <Spec label="Camera" value="720p HD with Dual Microphone and Privacy Shutter" />
            <Spec label="Battery" value="3 Cell Li-Polymer 45 Wh" />
            <Spec label="AC Adapter / Power Supply" value="65W" />
            <Spec label="Fingerprint Reader" value="Yes" />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6 pt-4 text-sm">
            <Action icon={<ShieldCheck />} text="Warranty" />
            <Action icon={<ShieldCheck />} text="AMC" />
            <Action icon={<FileText />} text="Purchase Order" />
            <Action icon={<Pen />} text="Edit Details" />
            <button className="flex items-center gap-1 text-red-500">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* RIGHT VENDOR DETAILS */}
        <div className="col-span-4 bg-white rounded-xl border p-6 space-y-4">

          <h3 className="text-green-600 font-medium">Vendor Details</h3>

          <Info label="Company" value="Global-Link Solutions" />
          <Info
            label="Address"
            value="15th Floor, Cyber Heights Tower, Sector 62,
Noida, Uttar Pradesh 201301, India"
          />
          <Info label="Contact Person" value="Lalit Singh" />
          <Info label="Phone" value="+91 12345 67810" />
          <Info label="Email" value="support@globallinksolutions.com" />
          <Info label="Website" value="www.globallinksolutions.com" />
          <Info label="GST Number" value="09AABCT1234M1ZP" />

          <div className="space-y-3 pt-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm">
              <MessageCircle className="w-4 h-4" />
              Message to Vendor
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Raise Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- COMPONENTS ---------- */

function DateCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <b>{label}:</b> {value}
    </p>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-gray-700 whitespace-pre-line">
      <b>{label}:</b> {value}
    </p>
  )
}

function Action({ icon, text }: { icon: any; text: string }) {
  return (
    <button className="flex items-center gap-1 text-green-600">
      {icon}
      {text}
    </button>
  )
}
