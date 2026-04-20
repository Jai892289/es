"use client"

import { useState } from "react"
import { ChevronDown, Download, Share2 } from "lucide-react"

/* ---------------- DATA ---------------- */

const departmentData: any = {
  Revenue: {
    Laptops: 32,
    Smartphones: 18,
    Monitors: 12,
    Routers: 8,
  },
  Education: {
    Laptops: 20,
    Smartphones: 10,
    Monitors: 6,
    Routers: 4,
  },
  PWD: {
    Laptops: 12,
    Smartphones: 6,
    Monitors: 4,
    Routers: 2,
  },
}

const stockValueByYear: any = {
  2023: "72L",
  2024: "80L",
  2025: "84L",
}

/* ---------------- COMPONENT ---------------- */

export default function CategoryWiseSummary() {
  const [department, setDepartment] = useState("Revenue")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [year, setYear] = useState("2025")

  const categories = departmentData[department]
  const selectedCategory = Object.keys(categories)[0]
  const selectedValue = categories[selectedCategory]

  const total = Object.values(categories).reduce(
    (a: number, b: any) => a + b,
    0
  )

  const percentage = Math.round((selectedValue / total) * 100)

  const Dropdown = ({
    label,
    value,
    options,
    onChange,
  }: any) => (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === label ? null : label)
        }
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white text-sm
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
        <div className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 text-sm text-white bg-blue-600 rounded-t-xl">
            {label}
          </div>

          {options.map((opt: string) => (
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
    <div className="space-y-6  overflow-x-hidden">

      {/* FILTERS */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-gray-700">Filters</span>

        <Dropdown
          label="By Department"
          value={department}
          options={Object.keys(departmentData)}
          onChange={setDepartment}
        />

        <Dropdown
          label="By Category"
          value="Electronics"
          options={["Electronics"]}
          onChange={() => {}}
        />

        <Dropdown
          label="All Products"
          value="All Products"
          options={["All Products"]}
          onChange={() => {}}
        />

        <Dropdown
          label="Select Date"
          value="2025"
          options={["2023", "2024", "2025"]}
          onChange={() => {}}
        />

        <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm">
          Apply Filter
        </button>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-[#6c63ff]">
        Category-Wise Summary
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* DONUT */}
        <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium mb-4">{department}</p>

          <div className="flex items-center gap-6">
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full border-[14px] border-gray-200" />
              <div
                className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-blue-500 border-r-purple-500"
                style={{
                  transform: `rotate(${percentage * 3.6}deg)`,
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-500">
                  {selectedCategory}
                </span>
                <span className="text-3xl font-semibold text-blue-600">
                  {selectedValue}
                </span>
              </div>
            </div>

            <ul className="text-sm space-y-1 text-gray-600">
              {Object.keys(categories).map((c) => (
                <li key={c}>
                  {c} ({categories[c]})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* METRICS */}
        <div className="col-span-8 grid grid-cols-3 gap-4">
          {[
            { label: "Stock Value (INR)", value: stockValueByYear[year] },
            { label: "Total Items", value: total },
            { label: "Active Stock (%)", value: "85%" },
            { label: "Defective Stock (%)", value: "10%" },
            { label: "Avg. Product Life (Yrs)", value: "10%" },
            { label: "Missing Items", value: "52" },
            { label: "Utilization (%)", value: "78%" },
            { label: "Total Vendors", value: "21" },
            { label: "Complaints Raised", value: "263" },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-xl p-4 shadow-sm">
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
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Stock Value (INR)</p>

            <Dropdown
              label="Year"
              value={year}
              options={Object.keys(stockValueByYear)}
              onChange={setYear}
            />
          </div>

          <p className="text-3xl font-semibold text-green-600 mt-4">
            {stockValueByYear[year]}
          </p>

          <div className="h-1 bg-gray-200 rounded mt-6">
            <div className="h-1 bg-green-500 w-[85%] rounded" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Stock (%)</p>
          <p className="text-3xl font-semibold text-green-600 mt-4">
            85%
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-6 pt-0">
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