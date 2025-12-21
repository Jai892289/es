"use client"

import { ChevronDown, Plus, Star } from "lucide-react"
import Link from "next/link"

const vendors = [
  {
    id: 1,
    name: "Global-Link Solutions\nDelhi",
    category: "Electronics",
    supplied: 251,
    complaints: 10,
    rating: 5,
  },
  {
    id: 2,
    name: "TechNova Systems Pvt. Ltd.\nMumbai",
    category: "Electronics",
    supplied: 161,
    complaints: 52,
    rating: 2,
  },
  {
    id: 3,
    name: "Quantum IT Solutions\nHyderabad",
    category: "Electronics",
    supplied: 25,
    complaints: 38,
    rating: 3,
  },
  {
    id: 4,
    name: "Global-Link Solutions\nDelhi",
    category: "Electronics",
    supplied: 176,
    complaints: 0,
    rating: 5,
  },
  {
    id: 5,
    name: "Global-Link Solutions\nDelhi",
    category: "Electronics",
    supplied: 64,
    complaints: 5,
    rating: 5,
  },
  {
    id: 6,
    name: "Elite Hardware Solution\nDelhi",
    category: "Electronics",
    supplied: 32,
    complaints: 2,
    rating: 5,
  },
  {
    id: 7,
    name: "Balaji Technologies\nMumbai",
    category: "Electronics",
    supplied: 18,
    complaints: 32,
    rating: 1,
  },
  {
    id: 8,
    name: "Global-Link Solutions\nDelhi",
    category: "Electronics",
    supplied: 194,
    complaints: 46,
    rating: 3,
  },
]

export default function VendorsPage() {
  return (
    <div className="space-y-6">

      {/* FILTERS */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-gray-700">Filters</span>

        {["By Department", "By Rating", "By Credibility", "By Product"].map(
          (f) => (
            <button
              key={f}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              {f}
              <ChevronDown className="w-4 h-4 text-green-600" />
            </button>
          )
        )}

        <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm">
          Apply Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">
                Vendor / Manufacturer Details
              </th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Total Items Supplied</th>
              <th className="px-4 py-3 text-left">Complaints Logged</th>
              <th className="px-4 py-3 text-left">Ratings</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr
                key={v.id}
                className="border-b hover:bg-gray-50 align-top"
              >
                <td className="px-4 py-3 font-medium">{v.id}</td>

                <td className="px-4 py-3 whitespace-pre-line font-medium">
                  {v.name}
                </td>

                <td className="px-4 py-3">{v.category}</td>

                <td className="px-4 py-3">{v.supplied}</td>

                <td className="px-4 py-3">{v.complaints}</td>

                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < v.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
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

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        {/* <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm">
          <Plus className="w-4 h-4" />
          Add New Vendor
        </button> */}

        <Link
  href="/dashboard/vendors/add"
  className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm"
>
  <Plus className="w-4 h-4" />
  Add New Vendor
</Link>


        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>1 / 16</span>
          <button className="flex items-center gap-1 text-green-600 hover:underline">
            Next Page <ChevronDown className="rotate-[-90deg] w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
