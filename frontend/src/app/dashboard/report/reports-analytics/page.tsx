"use client"

import {
  FileDown,
  FileCode,
  AlertTriangle,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts"

/* ---------------- MOCK DATA ---------------- */

const trendData = [
  { month: "Jul 25", value: 120 },
  { month: "Aug 25", value: 95 },
  { month: "Sep 25", value: 145 },
  { month: "Oct 25", value: 180 },
  { month: "Nov 25", value: 155 },
  { month: "Dec 25", value: 195 },
  { month: "Jan 26", value: 85 },
]

const deptData = [
  { name: "IT", value: 34, color: "#3b82f6" },
  { name: "Building", value: 26, color: "#10b981" },
  { name: "Public Health", value: 19, color: "#8b5cf6" },
  { name: "Finance", value: 12, color: "#f59e0b" },
  { name: "Revenue", value: 9, color: "#ef4444" },
]

const statusData = [
  { name: "In Use", count: 12450 },
  { name: "In Store", count: 1250 },
  { name: "In Repair", count: 180 },
  { name: "Retired", count: 425 },
]

/* ---------------- PAGE ---------------- */

export default function ReportsPage() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Reports & Analytics
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive reports and analytics for asset management
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <FileDown className="w-4 h-4" /> PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <FileCode className="w-4 h-4" /> XML
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gray-500" />
          Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select label="Date Range" />
          <Select label="Department" />
          <Select label="Category" />
          <Select label="Status" />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Kpi title="Total Assets" value="15,847" sub="+12% this month" />
        <Kpi title="New Assets" value="85" sub="This month" blue />
        <Kpi title="Expiring Soon" value="18" sub="Within 30 days" warn />
        <Kpi title="Total Value" value="₹20.2Cr" sub="All assets" green />
      </div>

      {/* CHARTS ROW 1 */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Asset Insertion Trend
        </h3>

        <LineChart width={1000} height={300} data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Department-wise Asset Distribution">
          <PieChart width={400} height={300}>
            <Pie
              data={deptData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {deptData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="Asset Status Overview">
          <BarChart width={400} height={300} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ChartCard>
      </div>

      {/* AMC RENEWAL ALERTS */}
      <div className="bg-white border rounded-xl">
        <div className="px-6 py-4 border-b flex items-center gap-2">
          <AlertTriangle className="text-orange-500 w-5 h-5" />
          <h3 className="font-semibold text-gray-800">
            AMC Renewal Alerts
          </h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <Th>Asset / Equipment</Th>
              <Th>Vendor</Th>
              <Th>Expiry Date</Th>
              <Th>Days Left</Th>
              <Th>Priority</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <AlertRow
              asset="Fire Safety Equipment"
              vendor="Safety Pro Services"
              date="30 Jan 2026"
              days="8 days"
              priority="HIGH"
            />
            <AlertRow
              asset="CCTV System - Building A"
              vendor="SecureTech Solutions"
              date="15 Feb 2026"
              days="24 days"
              priority="MEDIUM"
            />
            <AlertRow
              asset="Air Conditioning Units (10)"
              vendor="Blue Star Ltd"
              date="05 Feb 2026"
              days="14 days"
              priority="HIGH"
            />
            <AlertRow
              asset="Elevator Maintenance"
              vendor="Otis India"
              date="28 Feb 2026"
              days="37 days"
              priority="MEDIUM"
            />
          </tbody>
        </table>
      </div>

      {/* ASSET EXPIRY TRACKING */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">
          Asset Expiry Tracking
        </h3>

        <ExpiryBox
          title="Expired (Last 30 days)"
          count="12"
          desc="Immediate attention required"
          color="red"
        />
        <ExpiryBox
          title="Expiring Soon (Next 30 days)"
          count="18"
          desc="Plan renewal or replacement"
          color="orange"
        />
        <ExpiryBox
          title="Expiring in 60-90 days"
          count="34"
          desc="Monitor and prepare"
          color="yellow"
        />
      </div>
    </div>
  )
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Select({ label }: any) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select className="w-full border rounded-lg px-3 py-2 text-sm">
        <option>All</option>
      </select>
    </div>
  )
}

function Kpi({ title, value, sub, blue, warn, green }: any) {
  const color = green
    ? "text-green-600"
    : warn
    ? "text-orange-600"
    : blue
    ? "text-blue-600"
    : "text-gray-800"

  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-semibold mt-2 ${color}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  )
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Th({ children }: any) {
  return (
    <th className="px-6 py-3 text-left text-xs text-gray-500">
      {children}
    </th>
  )
}

function AlertRow({ asset, vendor, date, days, priority }: any) {
  const badge =
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"

  return (
    <tr>
      <td className="px-6 py-4">{asset}</td>
      <td className="px-6 py-4">{vendor}</td>
      <td className="px-6 py-4">{date}</td>
      <td className="px-6 py-4">
        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">
          {days}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-0.5 rounded-full text-xs ${badge}`}>
          {priority}
        </span>
      </td>
      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
        Renew AMC
      </td>
    </tr>
  )
}

function ExpiryBox({ title, desc, count, color }: any) {
  const styles =
    color === "red"
      ? "bg-red-50 border-red-200 text-red-700"
      : color === "orange"
      ? "bg-orange-50 border-orange-200 text-orange-700"
      : "bg-yellow-50 border-yellow-200 text-yellow-700"

  return (
    <div className={`border rounded-lg p-4 ${styles}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs mt-1">{desc}</p>
        </div>
        <span className="text-xl font-semibold">{count}</span>
      </div>
    </div>
  )
}
