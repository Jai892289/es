"use client"

import {
  Box,
  Building2,
  Book,
  Laptop,
  Printer,
  Dumbbell,
  Zap,
  PencilRuler,
  Car,
  Trees,
} from "lucide-react"

const stats = [
  { label: "Total Categories", value: "11" },
  { label: "Total Assets", value: "14,599", highlight: true },
  { label: "Total Value", value: "₹20.2 Cr", green: true },
]

const categories = [
  {
    name: "Furniture & Fixtures",
    assets: 1250,
    value: "₹45,00,000",
    icon: Box,
    color: "blue",
  },
  {
    name: "Land / Property",
    assets: 8,
    value: "₹5,50,00,000",
    icon: Building2,
    color: "green",
  },
  {
    name: "Books",
    assets: 3450,
    value: "₹12,00,000",
    icon: Book,
    color: "purple",
  },
  {
    name: "IT Assets - Hardware",
    assets: 2450,
    value: "₹1,20,00,000",
    icon: Laptop,
    color: "gray",
  },
  {
    name: "IT Assets - Software",
    assets: 180,
    value: "₹35,00,000",
    icon: Laptop,
    color: "gray",
  },
  {
    name: "Office Equipment",
    assets: 890,
    value: "₹28,00,000",
    icon: Printer,
    color: "orange",
  },
  {
    name: "Sports Equipment",
    assets: 320,
    value: "₹8,50,000",
    icon: Dumbbell,
    color: "red",
  },
  {
    name: "Electrical Appliances",
    assets: 650,
    value: "₹42,00,000",
    icon: Zap,
    color: "yellow",
  },
  {
    name: "Stationery",
    assets: 5200,
    value: "₹6,50,000",
    icon: PencilRuler,
    color: "slate",
  },
  {
    name: "Vehicles",
    assets: 45,
    value: "₹2,80,00,000",
    icon: Car,
    color: "black",
  },
  {
    name: "Campus Infrastructure",
    assets: 156,
    value: "₹8,90,00,000",
    icon: Trees,
    color: "emerald",
  },
]

export default function AssetCategoryPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Asset Category Management
        </h2>
        <p className="text-sm text-gray-500">
          View and manage assets organized by categories
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="text-sm text-gray-500">{s.label}</div>
            <div
              className={`text-3xl font-bold mt-1
              ${s.green ? "text-green-600" : s.highlight ? "text-blue-600" : "text-gray-800"}`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center
                ${
                  c.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : c.color === "green"
                    ? "bg-green-100 text-green-600"
                    : c.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                    : c.color === "orange"
                    ? "bg-orange-100 text-orange-600"
                    : c.color === "yellow"
                    ? "bg-yellow-100 text-yellow-600"
                    : c.color === "red"
                    ? "bg-red-100 text-red-600"
                    : c.color === "emerald"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <c.icon className="w-5 h-5" />
              </div>

              <button className="text-blue-600 text-sm hover:underline">
                View All
              </button>
            </div>

            {/* CONTENT */}
            <div className="mt-4">
              <div className="font-semibold text-gray-800">
                {c.name}
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Assets:</span>
                  <span className="font-medium">{c.assets}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total Value:</span>
                  <span className="font-medium">{c.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
