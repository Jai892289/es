"use client"

import { useEffect, useState } from "react"

import {
  ChevronDown,
  Download,
  Share2,
  TrendingUp,
  ShieldCheck,
  Package2,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Wallet,
  Boxes,
  Building2,
} from "lucide-react"

import { getDashboardSummaryApi } from "@/lib/dashboard.api"

export default function CategoryWiseSummary() {

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null)

  const [year, setYear] =
    useState("2025")

  const [summaryData, setSummaryData] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchDashboardSummary()
  }, [])

  const fetchDashboardSummary = async () => {

    try {

      setLoading(true)

      const response =
        await getDashboardSummaryApi()

      setSummaryData(
        response?.data
      )

    } catch (error) {

      console.log(
        "Dashboard Summary Error",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  const categorySummary =
    summaryData?.categorySummary || []

  const overview =
    summaryData?.overview || {}

  const stockValueChart =
    summaryData?.stockValueChart || []

  const selectedCategory =
    categorySummary[0]?.name ||
    "Category"

  const selectedValue =
    categorySummary[0]?.count || 0

  const total =
    categorySummary.reduce(
      (
        acc: number,
        item: any
      ) => acc + item.count,
      0
    )

  const percentage =
    total > 0
      ? Math.round(
          (selectedValue / total) *
            100
        )
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
    )?.value ||
    overview.stockValue

  /* ---------------- DROPDOWN ---------------- */

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
            openDropdown === label
              ? null
              : label
          )
        }
        className={`
          h-12 px-5 rounded-2xl
          bg-white border text-sm font-medium
          flex items-center gap-3
          transition
          ${
            openDropdown === label
              ? "border-emerald-500 ring-4 ring-emerald-100"
              : "border-gray-200 hover:border-gray-300"
          }
        `}
      >
        {value}

        <ChevronDown
          className={`
            w-4 h-4 transition-transform
            ${
              openDropdown === label
                ? "rotate-180 text-emerald-600"
                : ""
            }
          `}
        />
      </button>

      {openDropdown === label && (

        <div className="absolute left-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 py-3 z-50 overflow-hidden">

          <div className="px-5 pb-3 border-b border-gray-100">

            <p className="text-sm font-semibold text-gray-700">
              {label}
            </p>
          </div>

          {options.map(
            (opt: string) => (

              <div
                key={opt}
                onClick={() => {

                  onChange(opt)

                  setOpenDropdown(
                    null
                  )
                }}
                className={`
                  px-5 py-3 text-sm cursor-pointer transition
                  ${
                    value === opt
                      ? "bg-emerald-50 text-emerald-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                {opt}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <Boxes className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Category Analytics
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Smart insights into inventory categories & stock performance
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  ₹
                  {overview.stockValue ||
                    0}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Stock Value
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    overview.totalItems
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Items
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-4 min-w-[320px]">

            <MiniCard
              icon={TrendingUp}
              title="Stock Growth"
              value="92%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Asset Health"
              value="Stable"
            />

            <MiniCard
              icon={Activity}
              title="System Status"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* ---------------- FILTERS ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="flex items-center gap-4 flex-wrap">

          <div>

            <h3 className="text-lg font-semibold text-gray-800">
              Dashboard Filters
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Analyze inventory trends by year
            </p>
          </div>

          <Dropdown
            label="Select Year"
            value={year}
            options={[
              "2023",
              "2024",
              "2025",
            ]}
            onChange={setYear}
          />
        </div>

        <div className="flex items-center gap-3">

          <button className="h-12 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium flex items-center gap-2">

            <Download className="w-4 h-4" />

            Export
          </button>

          <button className="h-12 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg">

            <Share2 className="w-4 h-4" />

            Share Report
          </button>
        </div>
      </div>

      {loading ? (

        <div className="bg-white rounded-[30px] p-16 text-center text-gray-500 shadow-sm">
          Loading dashboard summary...
        </div>

      ) : (

        <>
          {/* ---------------- OVERVIEW CARDS ---------------- */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <OverviewCard
              title="Stock Value"
              value={`₹${overview.stockValue || 0}`}
              icon={Wallet}
              gradient="from-emerald-500 to-green-600"
            />

            <OverviewCard
              title="Total Items"
              value={
                overview.totalItems || 0
              }
              icon={Package2}
              gradient="from-blue-500 to-cyan-500"
            />

            <OverviewCard
              title="Active Stock"
              value={`${overview.activeStock || 0}%`}
              icon={ShieldCheck}
              gradient="from-purple-500 to-pink-500"
            />

            <OverviewCard
              title="Complaints Raised"
              value={
                overview.complaintsRaised || 0
              }
              icon={AlertTriangle}
              gradient="from-red-500 to-rose-500"
            />
          </div>

          {/* ---------------- MAIN GRID ---------------- */}

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-7">

            {/* ---------------- DONUT ---------------- */}

            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Category Summary
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Asset distribution overview
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <Boxes className="w-7 h-7 text-emerald-600" />
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center gap-10">

                {/* DONUT */}

                <div className="relative w-[240px] h-[240px]">

                  {/* OUTER */}

                  <div className="absolute inset-0 rounded-full border-[18px] border-gray-100" />

                  {/* ACTIVE */}

                  <div
                    className="absolute inset-0 rounded-full border-[18px] border-transparent border-t-emerald-500 border-r-green-400 transition-all duration-700"
                    style={{
                      transform: `rotate(${percentage * 3.6}deg)`,
                    }}
                  />

                  {/* CENTER */}

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-sm text-gray-500">
                      {selectedCategory}
                    </span>

                    <span className="text-6xl font-bold text-emerald-600 mt-2">
                      {selectedValue}
                    </span>

                    <span className="text-sm text-gray-400 mt-2">
                      {percentage}% Share
                    </span>
                  </div>
                </div>

                {/* LIST */}

                <div className="flex-1 space-y-4 w-full">

                  {categorySummary.map(
                    (item: any) => {

                      const itemPercentage =
                        total > 0
                          ? Math.round(
                              (item.count /
                                total) *
                                100
                            )
                          : 0

                      return (
                        <div
                          key={item.name}
                          className="rounded-2xl border border-gray-100 p-5 hover:shadow-md transition"
                        >

                          <div className="flex items-center justify-between mb-3">

                            <div className="flex items-center gap-3">

                              <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">

                                <Building2 className="w-5 h-5 text-emerald-600" />
                              </div>

                              <div>

                                <h3 className="font-semibold text-gray-800">
                                  {item.name}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                  Category Assets
                                </p>
                              </div>
                            </div>

                            <div className="text-right">

                              <h4 className="text-2xl font-bold text-gray-900">
                                {item.count}
                              </h4>

                              <p className="text-xs text-gray-400">
                                Assets
                              </p>
                            </div>
                          </div>

                          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                            <div
                              className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                              style={{
                                width: `${itemPercentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            </div>

            {/* ---------------- ANALYTICS ---------------- */}

            <div className="space-y-6">

              {/* STOCK VALUE */}

              <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      Stock Value
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Inventory valuation overview
                    </p>
                  </div>

                  <Dropdown
                    label="Year"
                    value={year}
                    options={[
                      "2023",
                      "2024",
                      "2025",
                    ]}
                    onChange={setYear}
                  />
                </div>

                <div className="mt-10">

                  <h2 className="text-6xl font-bold text-emerald-600">
                    ₹
                    {
                      selectedYearValue
                    }
                  </h2>

                  <p className="text-sm text-gray-500 mt-3">
                    Updated valuation for{" "}
                    {year}
                  </p>
                </div>

                {/* BAR */}

                <div className="mt-10">

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">

                    <span>Performance</span>

                    <span>85%</span>
                  </div>

                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">

                    <div className="h-4 w-[85%] rounded-full bg-gradient-to-r from-emerald-500 to-green-600" />
                  </div>
                </div>
              </div>

              {/* EXTRA METRICS */}

              <div className="grid grid-cols-2 gap-6">

                <MetricCard
                  label="Utilization"
                  value={`${overview.utilization || 0}%`}
                  icon={TrendingUp}
                  color="emerald"
                />

                <MetricCard
                  label="Defective Stock"
                  value={`${overview.defectiveStock || 0}%`}
                  icon={AlertTriangle}
                  color="red"
                />

                <MetricCard
                  label="Vendors"
                  value={
                    overview.totalVendors || 0
                  }
                  icon={Building2}
                  color="blue"
                />

                <MetricCard
                  label="Warranty Ending"
                  value={
                    overview.warrantyEndingSoon || 0
                  }
                  icon={ShieldCheck}
                  color="orange"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">

          <Icon className="w-5 h-5" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {value}
          </h3>
        </div>
      </div>
    </div>
  )
}

/* ---------------- OVERVIEW CARD ---------------- */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-8 h-8" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            {value}
          </h2>
        </div>
      </div>
    </div>
  )
}

/* ---------------- METRIC CARD ---------------- */

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
}: any) {

  const colors: any = {
    emerald:
      "bg-emerald-100 text-emerald-600",

    red:
      "bg-red-100 text-red-600",

    blue:
      "bg-blue-100 text-blue-600",

    orange:
      "bg-orange-100 text-orange-600",
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}
        >

          <Icon className="w-7 h-7" />
        </div>

        <ArrowUpRight className="w-5 h-5 text-gray-400" />
      </div>

      <div className="mt-7">

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          {value}
        </h2>
      </div>
    </div>
  )
}