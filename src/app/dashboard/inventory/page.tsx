"use client"

import { useState } from "react"
import { ChevronRight, Plus } from "lucide-react"

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

export default function InventoryPage() {
  const [department, setDepartment] = useState("")
  const [category, setCategory] = useState("")
  const [product, setProduct] = useState("")
  const [date, setDate] = useState("")

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-semibold text-gray-700">Filters</span>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">By Department</option>
          <option value="it">IT</option>
          <option value="hr">HR</option>
          <option value="finance">Finance</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">By Category</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="software">Software</option>
        </select>

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">All Products</option>
          <option value="laptop">Laptop</option>
          <option value="monitor">Monitor</option>
          <option value="printer">Printer</option>
        </select>

        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-10 px-4 rounded-full border bg-white text-sm"
        >
          <option value="">Select Date</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <button className="h-10 px-6 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm">
          Apply Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
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
                "Vendor Name",
                "",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.id}</td>
                <td className="px-4 py-3 font-medium">{item.item}</td>
                <td className="px-4 py-3 text-gray-600">{item.category}</td>
                <td className="px-4 py-3 text-gray-600">{item.qty}</td>
                <td className="px-4 py-3 text-gray-600">{item.procurementDate}</td>
                <td className="px-4 py-3 text-gray-600">{item.warrantyExpiry}</td>
                <td className="px-4 py-3 text-gray-600">{item.amc}</td>
                <td className="px-4 py-3 text-gray-600 whitespace-pre-line">
                  {item.vendor}
                </td>
                <td className="px-4 py-3">
                  <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#14b86e] text-[#14b86e] hover:bg-[#14b86e]/10 text-sm">
          <Plus className="w-4 h-4" />
          Add new product
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">1 / 16</span>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full border text-sm hover:bg-gray-100">
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
