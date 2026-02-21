"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronDown,
  Monitor,
  Smartphone,
  Laptop,
  Tv,
  Wifi,
  HardDrive,
  Printer,
} from "lucide-react"

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

/* ------------------ PRODUCT CATEGORIES ------------------ */

const productCategories = [
  { name: "Laptops", count: 34, icon: Laptop },
  { name: "Smartphones", count: 18, icon: Smartphone },
  { name: "Monitors", count: 12, icon: Monitor },
  { name: "LED Screens", count: 12, icon: Tv },
  { name: "Routers", count: 8, icon: Wifi },
  { name: "Hard Drives", count: 5, icon: HardDrive },
  { name: "Printers", count: 4, icon: Printer },
]

/* ------------------ PROCUREMENT DATA ------------------ */

const procurementData: any = {
  2022: {
    Laptops: [5,3,4,6,2,7,8,4,3,6,2,1],
    Smartphones: [2,1,3,2,4,3,2,1,2,3,1,1],
    Printers: Array(12).fill(1),
  },
  2023: {
    Laptops: [8,4,6,7,3,9,5,10,6,4,2,3],
    Smartphones: [4,2,5,3,6,4,3,2,4,5,2,2],
    Printers: [1,2,1,3,2,2,1,2,1,2,1,1],
  },
  2024: {
    Laptops: [12,0,5,8,0,10,2,15,7,0,1,0],
    Smartphones: [6,2,4,5,3,7,4,8,6,2,3,1],
    Printers: [2,1,2,3,1,4,2,3,2,1,1,2],
  }
}

export default function DashboardPage() {
  const router = useRouter()

  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedCategory, setSelectedCategory] = useState("Laptops")
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth !== "true") router.replace("/login")
  }, [])

  const chartData =
    procurementData[selectedYear]?.[selectedCategory] ||
    Array(12).fill(0)

  const maxValue = Math.max(...chartData, 10)
  const total = chartData.reduce((a: number, b: number) => a + b, 0)

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden p-6">      <div className="max-w-7xl mx-auto">

        {/* ------------------ PRODUCT CATEGORIES ------------------ */}

        {/* PRODUCT CATEGORIES */}
<div className="mb-8">
  <h2 className="text-sm font-semibold text-gray-700 mb-4">
    Product Categories
  </h2>

  <div className="w-full overflow-x-auto no-scrollbar">
    <div className="flex gap-4">
      {productCategories.map((cat) => {
        const Icon = cat.icon
        return (
          <div
            key={cat.name}
            className="flex items-center gap-3 
            bg-gray-50 border border-gray-200 
            rounded-2xl px-5 py-3 
            flex-shrink-0
            hover:bg-white hover:shadow-md 
            transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">
                {cat.name}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {cat.count.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
</div>

        {/* ------------------ OVERVIEW ------------------ */}

        <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-4">
          Overview
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Items Procured", value: 147, color: "text-emerald-600", border: "hover:border-emerald-500" },
            { label: "Warranty Ending Soon", value: 32, color: "text-blue-600", border: "hover:border-blue-500" },
            { label: "Pending Complaints", value: 46, color: "text-red-500", border: "hover:border-red-500" },
            { label: "Pending AMC Renewals", value: 12, color: "text-indigo-600", border: "hover:border-indigo-500" },
          ].map((item) => (
            <div
              key={item.label}
              className={`bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] ${item.border}`}
            >
              <p className="text-sm text-gray-600 mb-2">{item.label}</p>
              <h2 className={`text-4xl font-bold ${item.color}`}>
                {item.value}
              </h2>
              <button className="text-xs text-emerald-600 mt-3 flex items-center gap-1 group">
                View Details
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* ------------------ LOWER SECTION ------------------ */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ------------------ CHART SECTION ------------------ */}

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border-2 border-purple-400 shadow-sm relative">

            <div className="flex justify-between items-center mb-6">

              <h3 className="font-semibold text-blue-600">
                Yearly Procurement <br /> by Category
              </h3>

              <div className="flex gap-3 relative">

                {/* YEAR DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    {selectedYear}
                    <ChevronDown size={16} />
                  </button>

                  {showYearDropdown && (
                    <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border z-20">
                      {Object.keys(procurementData).map((year) => (
                        <div
                          key={year}
                          onClick={() => {
                            setSelectedYear(year)
                            setShowYearDropdown(false)
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CATEGORY DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    {selectedCategory}
                    <ChevronDown size={16} />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border p-3 space-y-2 z-20">
                      {productCategories.map((cat) => {
                        const Icon = cat.icon
                        return (
                          <div
                            key={cat.name}
                            onClick={() => {
                              setSelectedCategory(cat.name)
                              setShowCategoryDropdown(false)
                            }}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                              selectedCategory === cat.name
                                ? "text-emerald-600 font-medium"
                                : ""
                            }`}
                          >
                            <Icon size={18} />
                            {cat.name}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* BAR CHART */}
            <div className="flex items-end gap-4 h-64">
              {chartData.map((val: number, i: number) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="h-48 w-full flex flex-col justify-end items-center">
                    {val > 0 ? (
                      <>
                        <span className="text-xs font-semibold mb-1">
                          {val}
                        </span>
                        <div
                          style={{ height: `${(val / maxValue) * 100}%` }}
                          className="w-6 bg-emerald-500 rounded-t-lg transition-all duration-300"
                        />
                      </>
                    ) : (
                      <div className="w-6 h-1 bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {months[i]}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-6 pt-6 border-t flex items-center gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <Laptop className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Total {selectedCategory} Procured in {selectedYear}
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {total}
                </p>
              </div>
            </div>

          </div>

          {/* ------------------ COMPLAINTS ------------------ */}

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h3 className="font-semibold mb-6 text-gray-800">
              Recent Complaints
            </h3>

            <div className="space-y-4">
              {[
                {
                  text: "Laptop Malfunction Post-Warranty",
                  tag: "High Priority",
                  color: "bg-red-500",
                },
                {
                  text: "Delayed AMC Service for Printers",
                  tag: "Medium Priority",
                  color: "bg-yellow-500",
                },
                {
                  text: "Unresponsive Vendor for Software Licensing Renewal",
                  tag: "Low Priority",
                  color: "bg-blue-500",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 rounded-xl border hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium pr-3">{c.text}</p>
                    <span className={`${c.color} text-white text-[10px] px-2 py-1 rounded-md`}>
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    By Vinod | Jan 05, 2025
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full text-sm text-emerald-600 font-medium hover:underline">
              View all complaints →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}