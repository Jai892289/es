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
    useState("2026")

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
          "2026": "May",
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
          h-10 px-4 rounded-xl
          bg-white border text-sm font-medium text-black
          flex items-center gap-2
          transition whitespace-nowrap
          ${
            openDropdown === label
              ? "border-emerald-500 ring-2 ring-emerald-100"
              : "border-gray-200"
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
                : "text-black"
            }
          `}
        />
      </button>

      {openDropdown === label && (

        <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden">

          <div className="px-4 pb-2 border-b border-gray-100">

            <p className="text-sm font-semibold text-black">
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
                  px-4 py-2 text-sm cursor-pointer transition
                  ${
                    value === opt
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-black hover:bg-gray-50"
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
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

   <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-6 shadow-xl">

  {/* Decorative Background */}
  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
  <div className="absolute top-10 right-20 h-24 w-24 rounded-full border border-white/10" />

  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* LEFT SIDE */}

    <div>

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

          <Boxes className="w-8 h-8 text-white" />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-white">
            Category Analytics
          </h1>

          <p className="text-emerald-100 mt-1">
            Inventory insights, stock trends & category performance
          </p>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="flex flex-wrap gap-4 mt-6">

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[170px]">

          <p className="text-3xl font-bold text-white">
            ₹{overview.stockValue?.toLocaleString() || 0}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Stock Value
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[150px]">

          <p className="text-3xl font-bold text-white">
            {overview.totalItems}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Total Items
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[150px]">

          <p className="text-3xl font-bold text-white">
            {overview?.length || 0}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Categories
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="grid grid-cols-2 gap-3 lg:min-w-[320px]">

      <MiniCard
        icon={TrendingUp}
        title="Growth"
        value="92%"
      />

      <MiniCard
        icon={ShieldCheck}
        title="Health"
        value="Stable"
      />

      <MiniCard
        icon={Boxes}
        title="Categories"
        value={`${overview?.length || 0}`}
      />

      <MiniCard
        icon={Package2}
        title="Inventory"
        value={`${overview.totalItems || 0}`}
      />

    </div>

  </div>
</div>

      {/* FILTERS */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">

          <div className="min-w-0">

            <h3 className="text-base font-semibold text-black">
              Dashboard Filters
            </h3>

            <p className="text-xs text-black mt-1">
              Analyze trends by year
            </p>
          </div>

          {/* <Dropdown
            label="Select Year"
            value={year}
            options={[
              "2023",
              "2024",
              "2025",
              "2026",
            ]}
            onChange={setYear}
          /> */}
        </div>

        <div className="flex items-center gap-2 flex-wrap">

          {/* <button className="h-10 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black flex items-center gap-2 whitespace-nowrap">

            <Download className="w-4 h-4" />

            Export
          </button> */}

          {/* <button className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-medium flex items-center gap-2 whitespace-nowrap">

            <Share2 className="w-4 h-4" />

            Share
          </button> */}
        </div>
      </div>

      {loading ? (

        <div className="bg-white rounded-xl p-10 text-center text-black shadow-sm">
          Loading dashboard summary...
        </div>

      ) : (

        <>
          {/* OVERVIEW */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

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
              title="Complaints"
              value={
                overview.complaintsRaised || 0
              }
              icon={AlertTriangle}
              gradient="from-red-500 to-rose-500"
            />
          </div>

          {/* MAIN */}

          <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.1fr] gap-4">

            {/* DONUT */}

            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

              <div className="flex items-center justify-between mb-5 gap-3">

                <div className="min-w-0">

                  <h2 className="text-lg font-semibold text-black break-words">
                    Category Summary
                  </h2>

                  <p className="text-xs text-black mt-1">
                    Asset distribution
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

                  <Boxes className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center gap-5 overflow-hidden">

                {/* DONUT */}

                <div className="relative w-[180px] h-[180px] shrink-0">

                  <div className="absolute inset-0 rounded-full border-[14px] border-gray-100" />

                  <div
                    className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-emerald-500 border-r-green-400 transition-all duration-700"
                    style={{
                      transform: `rotate(${percentage * 3.6}deg)`,
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-2">

                    <span className="text-xs text-black text-center break-words">
                      {selectedCategory}
                    </span>

                    <span className="text-3xl font-bold text-emerald-600 mt-1">
                      {selectedValue}
                    </span>

                    <span className="text-[11px] text-black mt-1">
                      {percentage}% Share
                    </span>
                  </div>
                </div>

                {/* LIST */}

                <div className="flex-1 space-y-3 w-full min-w-0">

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
                          className="rounded-xl border border-gray-100 p-3 hover:shadow-sm transition overflow-hidden"
                        >

                          <div className="flex items-center justify-between gap-3 mb-3">

                            <div className="flex items-center gap-3 min-w-0">

                              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

                                <Building2 className="w-4 h-4 text-emerald-600" />
                              </div>

                              <div className="min-w-0">

                                <h3 className="font-semibold text-sm text-black break-words">
                                  {item.name}
                                </h3>

                                <p className="text-[10px] text-black mt-1">
                                  Category Assets
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0">

                              <h4 className="text-xl font-bold text-black">
                                {item.count}
                              </h4>

                              <p className="text-[10px] text-black">
                                Assets
                              </p>
                            </div>
                          </div>

                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
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

            {/* ANALYTICS */}

            <div className="space-y-4 overflow-hidden">

              {/* STOCK VALUE */}

              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <div className="min-w-0">

                    <h2 className="text-lg font-semibold text-black break-words">
                      Stock Value 
                    </h2>

                    <p className="text-xs text-black mt-1">
                      Inventory valuation
                    </p>
                  </div>

                  <Dropdown
                    label="Year"
                    value={year}
                    options={[
                      "2024",
                      "2025",
                      "2026"
                    ]}
                    onChange={setYear}
                  />
                </div>

                <div className="mt-5">

                  <h2 className="text-3xl font-bold text-emerald-600 break-words">
                    ₹
                    {
                      selectedYearValue
                    }
                  </h2>

                  <p className="text-xs text-black mt-2">
                    Updated valuation for {year}
                  </p>
                </div>

                {/* BAR */}

                <div className="mt-5">

                  <div className="flex items-center justify-between text-[11px] text-black mb-2">

                    <span>Performance</span>

                    <span>95%</span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                    <div className="h-3 w-[85%] rounded-full bg-gradient-to-r from-emerald-500 to-green-600" />
                  </div>
                </div>
              </div>

              {/* EXTRA */}

              <div className="grid grid-cols-2 gap-3">

                <MetricCard
                  label="Utilization"
                  value={`${overview.utilization || 0}%`}
                  icon={TrendingUp}
                  color="emerald"
                />

                <MetricCard
                  label="Defective"
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
                  label="Warranty"
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

/* MINI CARD */

const MiniCard = ({
  icon: Icon,
  title,
  value,
}: any) => (
  <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-4">

    <div className="flex items-center justify-between">

      <Icon className="w-5 h-5 text-white" />

      <span className="text-lg font-bold text-white">
        {value}
      </span>

    </div>

    <p className="text-[11px] uppercase tracking-wider text-emerald-100 mt-3">
      {title}
    </p>

  </div>
);

/* OVERVIEW CARD */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-md shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

/* METRIC CARD */

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
}: any) {
  const colors: any = {
    emerald: "bg-emerald-100 text-emerald-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <h2 className="text-3xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}