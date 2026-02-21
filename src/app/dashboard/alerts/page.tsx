"use client"

import { useState } from "react"

const alertCards = [
  { label: "Warranty Ending Soon", value: 12, color: "bg-yellow-400" },
  { label: "Pending Complaints", value: 342, color: "bg-green-500" },
  { label: "AMC Ending", value: 30, color: "bg-yellow-400" },
  { label: "Vendor Payment Dues", value: "02", color: "bg-red-500" },
  { label: "New requests", value: 14, color: "bg-blue-500" },
  { label: "Missing Items", value: 61, color: "bg-red-500" },
]

const tableData = [
  {
    id: 1,
    item: "Laptops",
    category: "Electronic Goods",
    qty: 16,
    date: "Jan 12, 2025",
    complaint: "Laptop Malfunction Post-Warranty",
    priority: "high",
  },
  {
    id: 2,
    item: "Printers",
    category: "Electronic Goods",
    qty: 4,
    date: "Jan 12, 2025",
    complaint: "Delayed AMC Service for Printers",
    priority: "high",
  },
  {
    id: 3,
    item: "Desktops",
    category: "Electronic Goods",
    qty: 8,
    date: "Jan 12, 2025",
    complaint: "Defective Desktops Delivered",
    priority: "medium",
  },
  {
    id: 4,
    item: "Projector",
    category: "Electronic Goods",
    qty: 2,
    date: "Jan 12, 2025",
    complaint: "Projector Warranty Claim Rejected",
    priority: "low",
  },
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("Pending Complaints")

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="text-center text-sm text-gray-600">
        <span className="font-semibold text-purple-700">Alerts</span> - Feb 03, 2025
      </div>

      {/* ALERT CARDS */}
      <div className="grid grid-cols-6 gap-4">
        {alertCards.map((card) => {
          const isActive = activeTab === card.label

          return (
            <div
              key={card.label}
              onClick={() => setActiveTab(card.label)}
              className={`rounded-xl border p-4 text-center cursor-pointer transition-all duration-200
              ${
                isActive
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-white hover:shadow-sm"
              }`}
            >
              <p className="text-xs font-medium">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>

              {!isActive && (
                <div
                  className={`h-1 w-12 mx-auto mt-3 rounded ${card.color}`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* SECTION TITLE */}
      <h3 className="text-center font-semibold text-purple-700">
        {activeTab}
      </h3>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3 border border-green-400">#</th>
              <th className="px-4 py-3 border border-green-400 text-left">Item / Product</th>
              <th className="px-4 py-3 border border-green-400 text-left">Category</th>
              <th className="px-4 py-3 border border-green-400 text-left">Qty</th>
              <th className="px-4 py-3 border border-green-400 text-left">Complaint Date</th>
              <th className="px-4 py-3 border border-green-400 text-left">Complaint</th>
              <th className="px-4 py-3 border border-green-400"></th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border border-gray-200">{row.id}</td>
                <td className="px-4 py-3 border border-gray-200 font-medium">{row.item}</td>
                <td className="px-4 py-3 border border-gray-200">{row.category}</td>
                <td className="px-4 py-3 border border-gray-200">{row.qty}</td>
                <td className="px-4 py-3 border border-gray-200">{row.date}</td>

                <td className="px-4 py-3 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <span
                      className={`w-1.5 h-full rounded
                      ${
                        row.priority === "high"
                          ? "bg-red-500"
                          : row.priority === "medium"
                          ? "bg-yellow-400"
                          : "bg-blue-500"
                      }`}
                    />
                    <span>{row.complaint}</span>
                  </div>
                </td>

                <td className="px-4 py-3 border border-gray-200">
                  <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs">
                    View Complaint
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PRIORITY LEGEND */}
      <div className="flex items-center gap-6 text-sm pt-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-4 bg-red-500 rounded-sm" />
          High Priority
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-4 bg-yellow-400 rounded-sm" />
          Medium Priority
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-4 bg-blue-500 rounded-sm" />
          Low Priority
        </div>
      </div>
    </div>
  )
}