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
      <div className="min-h-[45vh] flex items-center justify-center overflow-x-hidden">

        <div className="space-y-3 text-center">

          <div className="w-12 h-12 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-sm text-black">
            Loading Reports...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <h1 className="text-xl md:text-2xl font-bold break-words">
              Reports & Analytics
            </h1>

            <p className="text-white/90 mt-2 text-xs leading-5 max-w-xl break-words">
              Asset tracking, analytics & AMC monitoring dashboard
            </p>

            <div className="flex flex-wrap gap-4 mt-4">

              <div>

                <h2 className="text-2xl font-bold break-words">
                  {
                    cards.totalAssets
                  }
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Total Assets
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold break-words">
                  ₹
                  {
                    cards.totalValue
                  }
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Asset Value
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-3 w-full xl:w-[230px]">

            <MiniCard
              title="New Assets"
              value={
                cards.newAssets ||
                0
              }
            />

            <MiniCard
              title="Expiring"
              value={
                cards.expiringSoon ||
                0
              }
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
{/* 
      <div className="flex flex-wrap items-center justify-end gap-2 overflow-hidden">

        <button className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-sm whitespace-nowrap">

          <FileDown className="w-4 h-4" />

          PDF
        </button>

        <button className="h-10 px-4 rounded-xl bg-green-600 hover:bg-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-sm whitespace-nowrap">

          <FileCode className="w-4 h-4" />

          XML
        </button>
      </div> */}

      {/* KPI */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

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

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-black break-words">
            Asset Insertion Trend
          </h2>

          <p className="text-xs text-black mt-1">
            Monthly asset analytics
          </p>
        </div>

        <ResponsiveContainer
          width="100%"
          height={220}
        >

          <LineChart
            data={trendData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 11,
              }}
            />

            <YAxis
              tick={{
                fontSize: 11,
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

        <ChartCard title="Department Distribution">

          <ResponsiveContainer
            width="100%"
            height={240}
          >

            <PieChart>

              <Pie
                data={deptData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
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

        <ChartCard title="Asset Status">

          <ResponsiveContainer
            width="100%"
            height={240}
          >

            <BarChart
              data={statusData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 11,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                }}
              />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#10b981"
                radius={[
                  6,
                  6,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* AMC TABLE */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 gap-3">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              AMC Renewal Alerts
            </h2>

            <p className="text-xs text-black mt-1">
              Upcoming warranty & AMC renewals
            </p>
          </div>
        </div>

       <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[850px]">
      <thead className="bg-gray-50 border-b border-gray-100">
        <tr>
          {[
            "Asset",
            "Vendor",
            "Expiry Date",
            "Days Left",
            "Status",
            "Value",
          ].map((head) => (
            <th
              key={head}
              className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {amcAlerts.length === 0 ? (
          <tr>
            <td
              colSpan={6}
              className="py-12 text-center text-sm text-gray-500"
            >
              No AMC alerts found
            </td>
          </tr>
        ) : (
          amcAlerts.map((item: any) => {
            const expiryDate = new Date(
              item.warrantyExpiryDate
            );

            const daysLeft = Math.max(
              0,
              Math.ceil(
                (expiryDate.getTime() -
                  Date.now()) /
                  (1000 * 60 * 60 * 24)
              )
            );

            return (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {/* Asset */}
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-black">
                      {item.productName}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Asset Item
                    </p>
                  </div>
                </td>

                {/* Vendor */}
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-black">
                      {item.vendor?.companyName ||
                        "N/A"}
                    </p>
                  </div>
                </td>

                {/* Expiry */}
                <td className="px-5 py-4 text-sm text-black">
                  {expiryDate.toLocaleDateString(
                    "en-GB"
                  )}
                </td>

                {/* Days Left */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-xl text-xs font-medium ${
                      daysLeft <= 30
                        ? "bg-red-50 text-red-600"
                        : daysLeft <= 90
                        ? "bg-orange-50 text-orange-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {daysLeft} Days
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span className="inline-flex px-3 py-1 rounded-xl bg-orange-50 text-orange-700 text-xs font-medium">
                    {item.status}
                  </span>
                </td>

                {/* Value */}
                <td className="px-5 py-4">
                  <span className="font-semibold text-black">
                    ₹
                    {Number(
                      item.unitPrice || 0
                    ).toLocaleString()}
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <p className="text-[11px] text-green-50 break-words">
        {title}
      </p>

      <h3 className="text-lg font-bold mt-1 text-white break-words">
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
      : "from-emerald-500 to-green-600";

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">

      <div
        className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${styles} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10 flex items-center justify-between">

        <div className="flex-1 min-w-0">

          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>

        </div>

        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${styles} shadow-sm shrink-0`}
        />
      </div>
    </div>
  );
}

/* ---------------- CHART CARD ---------------- */

function ChartCard({
  title,
  children,
}: any) {

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

      <h2 className="text-lg font-semibold text-black mb-3 break-words">
        {title}
      </h2>

      {children}
    </div>
  )
}