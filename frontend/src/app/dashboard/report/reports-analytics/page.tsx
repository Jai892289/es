"use client"

import { useEffect, useState } from "react"

import {
  FileDown,
  FileCode,
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
  ResponsiveContainer,
} from "recharts"

import { getAnalyticsApi } from "@/lib/dashboard.api"

export default function ReportsPage() {

  const [analytics, setAnalytics] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics =
    async () => {

      try {

        setLoading(true)

        const response =
          await getAnalyticsApi()

        setAnalytics(
          response?.data || null
        )

      } catch (error) {

        console.log(
          "Analytics Error",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  const cards =
    analytics?.cards || {}

  const trendData =
    analytics?.monthlyTrend?.map(
      (item: any) => ({
        month: item.month,
        value: item.count,
      })
    ) || []

  const deptData =
    analytics?.departmentWise?.map(
      (
        item: any,
        index: number
      ) => ({
        name: item.name,
        value:
          item._count.products,
        color: [
          "#10b981",
          "#3b82f6",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ][index % 5],
      })
    ) || []

  const statusData = [
    {
      name: "In Use",
      count:
        analytics?.statusOverview
          ?.inUse || 0,
    },
    {
      name: "In Store",
      count:
        analytics?.statusOverview
          ?.inStore || 0,
    },
    {
      name: "In Repair",
      count:
        analytics?.statusOverview
          ?.inRepair || 0,
    },
    {
      name: "Retired",
      count:
        analytics?.statusOverview
          ?.retired || 0,
    },
  ]

  const amcAlerts =
    analytics?.amcAlerts || []

  if (loading) {

    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="space-y-4 text-center">

          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-500">
            Loading Reports...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl font-bold tracking-tight">
              Reports & Analytics
            </h1>

            <p className="text-green-50 mt-3 text-sm max-w-xl">
              Comprehensive insights,
              asset tracking,
              analytics &
              AMC monitoring dashboard
            </p>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    cards.totalAssets
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Assets
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  ₹
                  {
                    cards.totalValue
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Asset Value
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              title="New Assets"
              value={
                cards.newAssets ||
                0
              }
            />

            <MiniCard
              title="Expiring Soon"
              value={
                cards.expiringSoon ||
                0
              }
            />

            <MiniCard
              title="System Status"
              value="Healthy"
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex flex-wrap items-center justify-end gap-3">

        <button className="h-12 px-5 rounded-2xl bg-red-600 hover:bg-red-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg">

          <FileDown className="w-4 h-4" />

          PDF
        </button>

        <button className="h-12 px-5 rounded-2xl bg-green-600 hover:bg-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg">

          <FileCode className="w-4 h-4" />

          XML
        </button>
      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <PremiumKpi
          title="Total Assets"
          value={
            cards.totalAssets || 0
          }
          color="emerald"
        />

        <PremiumKpi
          title="New Assets"
          value={
            cards.newAssets || 0
          }
          color="blue"
        />

        <PremiumKpi
          title="Expiring Soon"
          value={
            cards.expiringSoon ||
            0
          }
          color="orange"
        />

        <PremiumKpi
          title="Total Value"
          value={`₹${cards.totalValue || 0}`}
          color="green"
        />
      </div>

      {/* TREND */}

      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Asset Insertion Trend
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Monthly asset analytics
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={trendData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <ChartCard title="Department-wise Distribution">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={deptData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {deptData.map(
                  (
                    e: any,
                    i: number
                  ) => (

                    <Cell
                      key={i}
                      fill={e.color}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Asset Status Overview">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={statusData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#10b981"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* AMC TABLE */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              AMC Renewal Alerts
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upcoming warranty &
              AMC renewals
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                {[
                  "Asset",
                  "Vendor",
                  "Expiry Date",
                  "Status",
                  "Value",
                  "Action",
                ].map((head) => (

                  <th
                    key={head}
                    className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {amcAlerts.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No AMC alerts found
                  </td>
                </tr>
              ) : (

                amcAlerts.map(
                  (
                    item: any
                  ) => (

                    <tr
                      key={
                        item.id
                      }
                      className="hover:bg-gray-50 transition"
                    >

                      <td className="px-8 py-6 font-medium text-gray-800">
                        {
                          item.productName
                        }
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        {item
                          .vendor
                          ?.companyName ||
                          "N/A"}
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        {new Date(
                          item.warrantyExpiryDate
                        ).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>

                      <td className="px-8 py-6">

                        <span className="px-4 py-2 rounded-2xl bg-orange-50 text-orange-700 text-sm font-medium">
                          {
                            item.status
                          }
                        </span>
                      </td>

                      <td className="px-8 py-6 font-semibold text-gray-800">
                        ₹
                        {
                          item.unitPrice
                        }
                      </td>

                      <td className="px-8 py-6">

                        <button className="h-11 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-medium">

                          Renew AMC
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

      <p className="text-sm text-green-50">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2 text-white">
        {value}
      </h3>
    </div>
  )
}

/* ---------------- KPI ---------------- */

function PremiumKpi({
  title,
  value,
  color,
}: any) {

  const styles =
    color === "blue"
      ? "from-blue-500 to-cyan-500"
      : color === "orange"
      ? "from-orange-500 to-amber-500"
      : color === "green"
      ? "from-green-500 to-emerald-600"
      : "from-emerald-500 to-green-600"

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${styles} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${styles} shadow-lg`}
        />

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            {value}
          </h2>
        </div>
      </div>
    </div>
  )
}

/* ---------------- CHART CARD ---------------- */

function ChartCard({
  title,
  children,
}: any) {

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h2>

      {children}
    </div>
  )
}