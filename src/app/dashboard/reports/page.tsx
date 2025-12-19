"use client"

import { ChevronDown, Download, Share2 } from "lucide-react"

export default function CategoryWiseSummary() {
  return (
    <div className="space-y-6">

      {/* FILTERS */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-gray-700">Filters</span>

        {["By Department", "By Category", "All Products", "Select Date"].map(
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

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-[#6c63ff]">
        Category-Wise Summary
      </h2>

      {/* TOP GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* DONUT + CATEGORY LIST */}
        <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium mb-4">Electronic Goods</p>

          <div className="flex items-center gap-6">
            {/* Donut */}
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full border-[12px] border-gray-200" />
              <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-blue-500 border-r-purple-500 rotate-45" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500">Laptops</span>
                <span className="text-3xl font-semibold text-blue-600">32</span>
              </div>
            </div>

            {/* Category List */}
            <ul className="text-sm space-y-1 text-gray-600">
              {[
                "Laptops",
                "Smartphones",
                "Monitors",
                "LED Screens",
                "Routers",
                "Hard Drives",
                "Printers",
                "Projectors",
              ].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* METRICS */}
        <div className="col-span-8 grid grid-cols-3 gap-4">
          {[
            { label: "Stock Value (INR)", value: "84L" },
            { label: "Total Items", value: "632" },
            { label: "Active Stock (%)", value: "85%" },
            { label: "Defective Stock (%)", value: "10%" },
            { label: "Avg. Product Life (Yrs)", value: "10%" },
            { label: "Missing Items", value: "52" },
            { label: "Utilization (%)", value: "78%" },
            { label: "Total Vendors", value: "21" },
            { label: "Complaints Raised", value: "263" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-gray-500">{m.label}</p>
              <p className="text-2xl font-semibold text-green-600">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SUMMARY */}
      <div className="grid grid-cols-2 gap-6">
        {[
          { title: "Stock Value (INR)", value: "84L" },
          { title: "Active Stock (%)", value: "85%" },
        ].map((b) => (
          <div
            key={b.title}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{b.title}</p>
              <button className="px-3 py-1 rounded-full border text-sm">
                2025 <ChevronDown className="inline w-4 h-4 ml-1" />
              </button>
            </div>

            <p className="text-3xl font-semibold text-green-600 mt-4">
              {b.value}
            </p>

            <div className="h-1 bg-gray-200 rounded mt-6">
              <div className="h-1 bg-green-500 w-[85%] rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-6 pt-4">
        <button className="flex items-center gap-2 text-green-600 text-sm">
          <Download className="w-4 h-4" />
          Download Report
        </button>

        <button className="flex items-center gap-2 text-green-600 text-sm">
          <Share2 className="w-4 h-4" />
          Share Report Via Email
        </button>
      </div>
    </div>
  )
}
