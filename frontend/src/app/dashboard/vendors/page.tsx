"use client"

import { ChevronDown, Plus, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getVendorsApi } from "@/lib/vendor.api"

export default function VendorsPage() {

const [vendors, setVendors] = useState<any[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
const fetchVendors = async () => {
try {
const res = await getVendorsApi()
setVendors(res.data)
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}
}


fetchVendors()


}, [])

if (loading) return <p>Loading vendors...</p>

const rating = 5; // later → v.rating


return ( <div className="space-y-6">


  {/* FILTERS */}
  <div className="flex items-center gap-3 flex-wrap">
    <span className="font-medium text-gray-700">Filters</span>

    {["By Department", "By Rating", "By Credibility", "By Product"].map((f) => (
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
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
<table className="w-full text-sm border border-gray-200">
        <thead className="bg-green-500 text-white">
        <tr>
          <th className="px-4 py-3 text-left border border-gray-200">#</th>
          <th className="px-4 py-3 text-left border border-gray-200">Vendor / Manufacturer</th>
          <th className="px-4 py-3 text-left border border-gray-200">City</th>
          <th className="px-4 py-3 text-left border border-gray-200">Items Supplied</th>
          <th className="px-4 py-3 text-left border border-gray-200">Complaints</th>
          <th className="px-4 py-3 text-left border border-gray-200">Ratings</th>
          <th className="px-4 py-3 text-left border border-gray-200">Actions</th>
        </tr>
      </thead>

      <tbody>
        {vendors.map((v, index) => (
          <tr
            key={v.id}
            className="border-b hover:bg-green-50 transition"
          >

            {/* INDEX */}
            <td className="px-4 py-3 font-medium border border-gray-200">
              {index + 1}
            </td>

            {/* NAME */}
            <td className="px-4 py-3 font-medium border border-gray-200">
              <p>{v.companyName}</p>
              <p className="text-xs text-gray-500">{v.city || "-"}</p>
            </td>

            {/* CITY */}
            <td className="px-4 py-3 border border-gray-200">
              {v.city || "-"}
            </td>

            {/* PRODUCTS */}
            <td className="px-4 py-3 border border-gray-200">
              {v.products?.length || 0}
            </td>

            {/* COMPLAINTS */}
            <td className="px-4 py-3 border border-gray-200">0</td>

            {/* RATING */}
 <td className="px-4 py-3 border border-gray-200">
<div className="flex gap-1">
  {Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-300"
      }`}
    />
  ))}
</div></td>
           

            {/* ACTION */}
            <td className="px-4 py-3 border border-gray-200">
              <Link
                href={`/dashboard/vendors/${v.id}`}
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
      href="/dashboard/vendors/add"
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 
                 hover:bg-green-500 hover:text-white transition text-sm"
    >
      <Plus className="w-4 h-4" />
      Add New Vendor
    </Link>

    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span>1 / 1</span>
      <button className="flex items-center gap-1 text-green-600 hover:underline">
        Next Page <ChevronDown className="rotate-[-90deg] w-4 h-4" />
      </button>
    </div>
  </div>

</div>

)
}
