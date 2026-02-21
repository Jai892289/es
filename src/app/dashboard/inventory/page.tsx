"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"

const inventoryData = [
  {
    id: 1,
    item: "Laptop",
    category: "Electronics",
    qty: "32",
    procurementDate: "Jan 02, 2025",
    warrantyExpiry: "Jan 02, 2026",
    amc: "Yes",
    vendor: "Zen-Tek Services\nHyderabad",
  },
  {
    id: 2,
    item: "Routers",
    category: "Electronics",
    qty: "12",
    procurementDate: "Jan 02, 2025",
    warrantyExpiry: "Jan 02, 2026",
    amc: "Yes",
    vendor: "Zen-Tek Services\nHyderabad",
  },
  {
    id: 3,
    item: "Printers",
    category: "Electronics",
    qty: "04",
    procurementDate: "Dec 04, 2024",
    warrantyExpiry: "Dec 04, 2025",
    amc: "No",
    vendor: "Global Link Services\nDelhi",
  },
]

const departments = [
  "Revenue",
  "Health & Family Welfare",
  "Education",
  "PWD",
  "Law & Order / Police",
]

const categories = ["Electronics", "Furniture", "Software"]
const products = ["Laptop", "Monitor", "Printer"]
const dates = ["Today", "This Week", "This Month"]

export default function InventoryPage() {
  const [department, setDepartment] = useState("By Department")
  const [category, setCategory] = useState("By Category")
  const [product, setProduct] = useState("All Products")
  const [date, setDate] = useState("Select Date")

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const Dropdown = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string
    value: string
    options: string[]
    onChange: (val: string) => void
  }) => (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === label ? null : label)
        }
        className={`h-11 px-5 rounded-full border text-sm flex items-center gap-3 bg-white transition
        ${
          openDropdown === label
            ? "border-emerald-500 ring-2 ring-emerald-100"
            : "border-gray-300"
        }`}
      >
        {value}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            openDropdown === label ? "rotate-180 text-emerald-600" : ""
          }`}
        />
      </button>

      {openDropdown === label && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 text-sm text-white bg-blue-600 rounded-t-xl">
            {label}
          </div>

          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpenDropdown(null)
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col min-h-[calc(98vh-100px)]">

      {/* ---------------- FILTERS ---------------- */}

      <div className="flex flex-wrap items-center gap-4 mb-6 relative">
        <span className="font-semibold text-gray-700">Filters</span>

        <Dropdown
          label="By Department"
          value={department}
          options={departments}
          onChange={setDepartment}
        />

        <Dropdown
          label="By Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />

        <Dropdown
          label="All Products"
          value={product}
          options={products}
          onChange={setProduct}
        />

        <Dropdown
          label="Select Date"
          value={date}
          options={dates}
          onChange={setDate}
        />

        {/* APPLY FILTER BUTTON (Border Only) */}
        <button className="h-11 px-6 rounded-full border border-blue-600 text-blue-600 text-sm hover:bg-blue-50 transition">
          Apply Filter
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#14b86e] text-white">
            <tr>
              {[
                "No.",
                "Item / Product",
                "Category",
                "Qty",
                "Procurement Date",
                "Warranty Expiry Date",
                "AMC",
                "Vendor name",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold border-r border-white/20 last:border-r-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-4 border-r border-gray-200">
                  {index + 1}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 font-medium">
                  {item.item}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 text-gray-600">
                  {item.category}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 text-gray-600">
                  {item.qty}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 text-gray-600">
                  {item.procurementDate}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 text-gray-600">
                  {item.warrantyExpiry}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 text-gray-600">
                  {item.amc}
                </td>
                <td className="px-4 py-4 border-r border-gray-200 whitespace-pre-line text-gray-600">
                  {item.vendor}
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/dashboard/inventory/${item.id}`}
                    className="inline-block px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- FOOTER ---------------- */}

      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard/inventory/add"
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add new product
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-600">1 / 16</span>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100">
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}