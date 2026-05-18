"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  Download,
  Share2,
} from "lucide-react"

import { getDashboardSummaryApi } from "@/lib/dashboard.api"

export default function CategoryWiseSummary() {
  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null)

  const [year, setYear] = useState("2025")

  const [summaryData, setSummaryData] =
    useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardSummary()
  }, [])

  const fetchDashboardSummary = async () => {
    try {
      setLoading(true)

      const response = await getDashboardSummaryApi()

      setSummaryData(response?.data)
    } catch (error) {
      console.log("Dashboard Summary Error", error)
    } finally {
      setLoading(false)
    }
  }

  const categorySummary =
    summaryData?.categorySummary || []

  const overview = summaryData?.overview || {}

  const stockValueChart =
    summaryData?.stockValueChart || []

  const selectedCategory =
    categorySummary[0]?.name || "Category"

  const selectedValue =
    categorySummary[0]?.count || 0

  const total = categorySummary.reduce(
    (acc: number, item: any) => acc + item.count,
    0
  )

  const percentage =
    total > 0
      ? Math.round((selectedValue / total) * 100)
      : 0

  const selectedYearValue =
    stockValueChart.find(
      (item: any) =>
        item.month ===
        {
          "2023": "Jan",
          "2024": "Apr",
          "2025": "May",
        }[year]
    )?.value || overview.stockValue

  const Dropdown = ({
    label,
    value,
    options,
    onChange,
  }: any) => (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(
            openDropdown === label ? null : label
          )
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
            openDropdown === label
              ? "rotate-180 text-emerald-600"
              : ""
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
    <div className="space-y-6 overflow-x-hidden">
      {/* FILTERS */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-medium text-gray-700">
          Filters
        </span>

        <Dropdown
          label="Select Year"
          value={year}
          options={["2023", "2024", "2025"]}
          onChange={setYear}
        />

        <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm">
          Apply Filter
        </button>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-medium text-[#6c63ff]">
        Category-Wise Summary
      </h2>

      {loading ? (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500">
          Loading...
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-12 gap-6">
            {/* DONUT */}
            <div className="col-span-4 bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm font-medium mb-4">
                Category Summary
              </p>

              <div className="flex items-center gap-6">
                <div className="relative w-40 h-40">
                  <div className="w-full h-full rounded-full border-[14px] border-gray-200" />

                  <div
                    className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-blue-500 border-r-purple-500"
                    style={{
                      transform: `rotate(${
                        percentage * 3.6
                      }deg)`,
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
                  {categorySummary.map((item: any) => (
                    <li key={item.name}>
                      {item.name} ({item.count})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* METRICS */}
            <div className="col-span-8 grid grid-cols-3 gap-4">
              {[
                {
                  label: "Stock Value (INR)",
                  value: `₹${overview.stockValue || 0}`,
                },
                {
                  label: "Total Items",
                  value: overview.totalItems || 0,
                },
                {
                  label: "Active Stock (%)",
                  value: `${overview.activeStock || 0}%`,
                },
                {
                  label: "Defective Stock (%)",
                  value: `${overview.defectiveStock || 0}%`,
                },
                {
                  label: "Utilization (%)",
                  value: `${overview.utilization || 0}%`,
                },
                {
                  label: "Warranty Ending Soon",
                  value:
                    overview.warrantyEndingSoon || 0,
                },
                {
                  label: "Total Vendors",
                  value: overview.totalVendors || 0,
                },
                {
                  label: "Complaints Raised",
                  value:
                    overview.complaintsRaised || 0,
                },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <p className="text-xs text-gray-500">
                    {m.label}
                  </p>

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
                <p className="text-sm text-gray-500">
                  Stock Value (INR)
                </p>

                <Dropdown
                  label="Year"
                  value={year}
                  options={["2023", "2024", "2025"]}
                  onChange={setYear}
                />
              </div>

              <p className="text-3xl font-semibold text-green-600 mt-4">
                ₹{selectedYearValue}
              </p>

              <div className="h-1 bg-gray-200 rounded mt-6">
                <div className="h-1 bg-green-500 w-[85%] rounded" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Active Stock (%)
              </p>

              <p className="text-3xl font-semibold text-green-600 mt-4">
                {overview.activeStock || 0}%
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
        </>
      )}
    </div>
  )
}