"use client"

import { useEffect, useState } from "react"
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
  ResponsiveContainer,
} from "recharts"

import { getAnalyticsApi } from "@/lib/dashboard.api"

export default function ReportsPage() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      const response = await getAnalyticsApi()

      setAnalytics(response?.data || null)
    } catch (error) {
      console.log("Analytics Error", error)
    } finally {
      setLoading(false)
    }
  }

  const cards = analytics?.cards || {}

  const trendData =
    analytics?.monthlyTrend?.map((item: any) => ({
      month: item.month,
      value: item.count,
    })) || []

  const deptData =
    analytics?.departmentWise?.map(
      (item: any, index: number) => ({
        name: item.name,
        value: item._count.products,
        color: [
          "#3b82f6",
          "#10b981",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ][index % 5],
      })
    ) || []

  const statusData = [
    {
      name: "In Use",
      count: analytics?.statusOverview?.inUse || 0,
    },
    {
      name: "In Store",
      count:
        analytics?.statusOverview?.inStore || 0,
    },
    {
      name: "In Repair",
      count:
        analytics?.statusOverview?.inRepair || 0,
    },
    {
      name: "Retired",
      count:
        analytics?.statusOverview?.retired || 0,
    },
  ]

  const amcAlerts = analytics?.amcAlerts || []

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Reports & Analytics
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Comprehensive reports and analytics
            for asset management
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            PDF
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            XML
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Kpi
          title="Total Assets"
          value={cards.totalAssets || 0}
          sub="All assets"
        />

        <Kpi
          title="New Assets"
          value={cards.newAssets || 0}
          sub="Recently added"
          blue
        />

        <Kpi
          title="Expiring Soon"
          value={cards.expiringSoon || 0}
          sub="Within 30 days"
          warn
        />

        <Kpi
          title="Total Value"
          value={`₹${cards.totalValue || 0}`}
          sub="All assets value"
          green
        />
      </div>

      {/* TREND CHART */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Asset Insertion Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
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
        </ResponsiveContainer>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <ChartCard title="Department-wise Asset Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deptData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {deptData.map((e: any, i: number) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* BAR CHART */}
        <ChartCard title="Asset Status Overview">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="count"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* AMC ALERTS */}
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
              <Th>Status</Th>
              <Th>Value</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6"
                >
                  Loading...
                </td>
              </tr>
            ) : amcAlerts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6"
                >
                  No AMC alerts found
                </td>
              </tr>
            ) : (
              amcAlerts.map((item: any) => (
                <AlertRow
                  key={item.id}
                  asset={item.productName}
                  vendor={
                    item.vendor?.companyName ||
                    "N/A"
                  }
                  date={new Date(
                    item.warrantyExpiryDate
                  ).toLocaleDateString("en-GB")}
                  status={item.status}
                  value={`₹${item.unitPrice}`}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EXPIRY TRACKING */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">
          Asset Expiry Tracking
        </h3>

        <ExpiryBox
          title="Expiring Soon"
          count={cards.expiringSoon || 0}
          desc="Assets nearing warranty expiry"
          color="orange"
        />

        <ExpiryBox
          title="Total Assets"
          count={cards.totalAssets || 0}
          desc="Overall managed assets"
          color="yellow"
        />

        <ExpiryBox
          title="New Assets"
          count={cards.newAssets || 0}
          desc="Recently procured assets"
          color="red"
        />
      </div>
    </div>
  )
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Kpi({
  title,
  value,
  sub,
  blue,
  warn,
  green,
}: any) {
  const color = green
    ? "text-green-600"
    : warn
    ? "text-orange-600"
    : blue
    ? "text-blue-600"
    : "text-gray-800"

  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`text-2xl font-semibold mt-2 ${color}`}
      >
        {value}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        {sub}
      </p>
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

function AlertRow({
  asset,
  vendor,
  date,
  status,
  value,
}: any) {
  return (
    <tr>
      <td className="px-6 py-4">{asset}</td>

      <td className="px-6 py-4">{vendor}</td>

      <td className="px-6 py-4">{date}</td>

      <td className="px-6 py-4">
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
          {status}
        </span>
      </td>

      <td className="px-6 py-4">{value}</td>

      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">
        Renew AMC
      </td>
    </tr>
  )
}

function ExpiryBox({
  title,
  desc,
  count,
  color,
}: any) {
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

        <span className="text-xl font-semibold">
          {count}
        </span>
      </div>
    </div>
  )
}