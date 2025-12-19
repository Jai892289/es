"use client"

import { useState } from "react"

const alertCards = [
  { label: "Warranty Ending Soon", value: 12, active: true },
  { label: "Pending Complaints", value: 342 },
  { label: "AMC Ending", value: 30 },
  { label: "Vendor Payment Dues", value: "02" },
  { label: "New requests", value: 14 },
  { label: "Missing Items", value: 61 },
]

const warrantyData = [
  {
    id: 1,
    item: "Laptops",
    category: "Electronic Goods",
    qty: 16,
    date: "Jan 12, 2025",
    vendor: "Global-Link Solutions\nDelhi",
  },
  {
    id: 2,
    item: "Smartphones",
    category: "Electronic Goods",
    qty: 10,
    date: "Feb 18, 2025",
    vendor: "Zentech Services\nHyderabad",
  },
  {
    id: 3,
    item: "Laptops",
    category: "Electronic Goods",
    qty: 16,
    date: "Feb 22, 2025",
    vendor: "Global-Link Solutions\nDelhi",
  },
  {
    id: 4,
    item: "Routers",
    category: "Electronic Goods",
    qty: 3,
    date: "Feb 28, 2025",
    vendor: "Zentech Services\nHyderabad",
  },
  {
    id: 5,
    item: "Monitors",
    category: "Electronic Goods",
    qty: 6,
    date: "Mar 01, 2025",
    vendor: "Global-Link Solutions\nDelhi",
  },
  {
    id: 6,
    item: "Computers",
    category: "Electronic Goods",
    qty: 22,
    date: "Mar 09, 2025",
    vendor: "iGlobal Inc.\nBangalore",
  },
]

export default function AlertsPage() {
  const [email, setEmail] = useState(false)
  const [whatsapp, setWhatsapp] = useState(true)
  const [screen, setScreen] = useState(true)

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="text-center text-sm text-gray-600">
        <span className="font-medium text-purple-700">Alerts</span> – Feb 03, 2025
      </div>

      {/* ALERT CARDS */}
      <div className="grid grid-cols-6 gap-4">
        {alertCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border p-4 text-center ${
              card.active
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            <p className="text-xs font-medium">{card.label}</p>
            <p className="text-2xl font-bold mt-1">{card.value}</p>
            {!card.active && (
              <div className="h-1 w-10 mx-auto mt-2 rounded bg-green-500" />
            )}
          </div>
        ))}
      </div>

      {/* SECTION TITLE */}
      <h3 className="text-center font-semibold text-purple-700">
        Warranty Ending Soon
      </h3>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Item / Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Warranty Date</th>
              <th className="px-4 py-3 text-left">Vendor Name</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {warrantyData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.id}</td>
                <td className="px-4 py-3 font-medium">{row.item}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.qty}</td>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3 whitespace-pre-line text-sm">
                  {row.vendor}
                </td>
                <td className="px-4 py-3">
                  <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs">
                    View Warranty
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PUSH ALERTS */}
      <div className="flex justify-center items-center gap-6 text-sm pt-2">
        <span className="font-medium">Push Alerts Via:</span>

        <Toggle label="Email" value={email} setValue={setEmail} />
        <Toggle label="WhatsApp" value={whatsapp} setValue={setWhatsapp} />
        <Toggle label="On Screen Notifications" value={screen} setValue={setScreen} />
      </div>
    </div>
  )
}

/* TOGGLE COMPONENT */
function Toggle({
  label,
  value,
  setValue,
}: {
  label: string
  value: boolean
  setValue: (v: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span>{label}</span>
      <div
        onClick={() => setValue(!value)}
        className={`w-10 h-5 rounded-full p-1 transition ${
          value ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-3.5 h-3.5 rounded-full bg-white transition ${
            value ? "translate-x-5" : ""
          }`}
        />
      </div>
    </label>
  )
}
