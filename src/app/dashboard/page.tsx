"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ChevronDown,
  Monitor,
  Smartphone,
  Laptop,
  Tv,
  Wifi,
  HardDrive,
  Printer,
  MoreHorizontal,
} from "lucide-react"

const productCategories = [
  { name: "Laptops", count: 34, icon: Laptop, color: "text-emerald-600 bg-emerald-50" },
  { name: "Smartphones", count: 18, icon: Smartphone, color: "text-lime-600 bg-lime-50" },
  { name: "Monitors", count: 12, icon: Monitor, color: "text-emerald-600 bg-emerald-50" },
  { name: "LED Screens", count: 12, icon: Tv, color: "text-emerald-600 bg-emerald-50" },
  { name: "Routers", count: 8, icon: Wifi, color: "text-emerald-600 bg-emerald-50" },
  { name: "Hard Drives", count: 5, icon: HardDrive, color: "text-emerald-600 bg-emerald-50" },
  { name: "Printers", count: 4, icon: Printer, color: "text-emerald-600 bg-emerald-50" },
]

const chartData = [12, 5, 8, 10, 2, 15, 7, 1, 0, 14, 0, 0]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth !== "true") {
      router.replace("/login")
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
      

<div className="overflow-hidden mx-auto w-full">
          {/* Product Categories */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Product Categories</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {productCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div
                    key={category.name}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer flex-shrink-0 min-w-[140px]"
                  >
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{category.name}</p>
                    <p className="text-lg font-bold text-gray-800">{category.count}</p>
                  </div>
                )
              })}
              {/* <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer flex-shrink-0 min-w-[140px] flex items-center justify-center">
                <MoreHorizontal className="w-6 h-6 text-gray-400" />
              </div> */}
            </div>
          </div>

          {/* Overview */}
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Overview</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Items Procured", value: 147, color: "text-emerald-600" },
              { label: "Warranty Ending Soon", value: 32, color: "text-blue-600" },
              { label: "Pending Complaints", value: 46, color: "text-red-500" },
              { label: "Pending AMC Renewals", value: 12, color: "text-indigo-600" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all group"
              >
                <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                <h2 className={`text-4xl font-bold ${item.color} mb-3`}>{item.value}</h2>
                <button className="text-xs text-emerald-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Lower Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Yearly Procurement by Category</h3>
                  <p className="text-xs text-gray-500">by Category</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    2024 <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors bg-emerald-50 text-emerald-700 border-emerald-200">
                    <Laptop className="w-4 h-4" />
                    Laptops <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 h-64 px-4">
                {chartData.map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col justify-end h-48">
                      {value > 0 && (
                        <>
                          <div className="text-xs font-semibold text-gray-700 mb-1 text-center">{value}</div>
                          <div
                            style={{ height: `${(value / 15) * 100}%` }}
                            className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-600 hover:to-emerald-500"
                          />
                        </>
                      )}
                      {value === 0 && <div className="h-1 w-full bg-gray-200 rounded-full" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-medium">{months[index]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-center">
                  <Laptop className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Laptops Procured in 2024</p>
                  <p className="text-3xl font-bold text-emerald-600">60</p>
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-6">Recent Complaints</h3>

              <div className="space-y-4">
                {[
                  {
                    text: "Laptop Malfunction Post-Warranty",
                    tag: "High Priority",
                    color: "bg-red-500",
                    user: "Vinod",
                  },
                  {
                    text: "Delayed AMC Service for Printers",
                    tag: "Medium Priority",
                    color: "bg-yellow-500",
                    user: "Vinod",
                  },
                  {
                    text: "Unresponsive Vendor for Software Licensing Renewal",
                    tag: "Low Priority",
                    color: "bg-blue-500",
                    user: "Vinod",
                  },
                ].map((complaint, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-gray-800 leading-snug pr-2">{complaint.text}</h4>
                      <span
                        className={`${complaint.color} text-white px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap flex-shrink-0`}
                      >
                        {complaint.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">By {complaint.user} | Jan 05, 2025</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 text-sm text-emerald-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                View all complaints
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
