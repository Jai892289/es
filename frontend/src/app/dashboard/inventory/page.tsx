"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { getInventoryApi } from "@/lib/inventory.api"

export default function InventoryPage() {
const [inventoryData, setInventoryData] = useState<any[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
const fetchInventory = async () => {
try {
const res = await getInventoryApi()
setInventoryData(res.data)
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}
}


fetchInventory()


}, [])

if (loading) return <p>Loading inventory...</p>

return ( <div className="space-y-6">


  {/* FILTERS */}
  <div className="flex flex-wrap items-center gap-3">
    <span className="font-medium text-gray-700">Filters</span>

    {["By Department", "By Category", "By Product", "By Date"].map((f) => (
      <button
        key={f}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white text-sm text-gray-700 
                   hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition"
      >
        {f}
        <ChevronDown className="w-4 h-4 text-green-600" />
      </button>
    ))}

    <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 
                       hover:bg-blue-50 transition text-sm">
      Apply Filter
    </button>
  </div>

  {/* TABLE */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <table className="w-full text-sm border-collapse">
      
      <thead className="bg-green-500 text-white">
        <tr>
          {[
            "No.",
            "Item / Product",
            "Category",
            "Qty",
            "Procurement Date",
            "Warranty Expiry",
            "AMC",
            "Vendor",
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
            className="border-b border-gray-200 hover:bg-green-50 transition"
          >

            <td className="px-4 py-3 border-r border-gray-200">
              {index + 1}
            </td>

            <td className="px-4 py-3 border-r border-gray-200 font-medium">
              <p>{item.productName}</p>
              <p className="text-xs text-gray-500">
                {item.category}
              </p>
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              {item.category}
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              {item.quantity}
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              {new Date(item.procurementDate).toLocaleDateString()}
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              {item.warrantyExpiryDate
                ? new Date(item.warrantyExpiryDate).toLocaleDateString()
                : "-"}
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.amcAvailable
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {item.amcAvailable ? "Yes" : "No"}
              </span>
            </td>

            <td className="px-4 py-3 border-r border-gray-200">
              {item.vendor?.companyName || "-"}
            </td>

            <td className="px-4 py-3">
              <Link
                href={`/dashboard/inventory/${item.id}`}
                className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 text-xs
                           hover:bg-blue-500 hover:text-white transition"
              >
                Details
              </Link>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* FOOTER */}
  <div className="flex items-center justify-between">

    <Link
      href="/dashboard/inventory/add"
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 
                 hover:bg-green-500 hover:text-white transition text-sm"
    >
      <Plus className="w-4 h-4" />
      Add New Product
    </Link>

    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span>1 / 16</span>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 
                         hover:bg-gray-100 transition">
        Next Page
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>

</div>

)
}
