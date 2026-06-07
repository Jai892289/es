"use client"

import { useEffect, useState } from "react"

import {
  CheckCircle,
  Package,
  Wrench,
  Archive,
  AlertTriangle,
  XCircle,
  Activity,
  TrendingUp,
  ShieldCheck,
  Layers3,
  CheckCircle2,
} from "lucide-react"

import { getAssetStatusApi } from "@/lib/inventory.api"

export default function DashboardPage() {

  const [statusData, setStatusData] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  const [totalAssets, setTotalAssets] = useState(0)

  useEffect(() => {
    fetchAssetStatus()
  }, [])

  const fetchAssetStatus = async () => {

    try {

      setLoading(true)

      const response = await getAssetStatusApi()

      setTotalAssets(
        response?.data?.totalAssets || 0
      )

      const mappedData =
        response?.data?.statuses?.map(
          (item: any) => ({

            label: item.label,

            value: item.count,

            percent: item.percentage,

            gradient:
              item.status === "IN_USE"
                ? "from-green-500 to-emerald-500"
                : item.status === "IN_STORE"
                ? "from-blue-500 to-cyan-500"
                : item.status === "IN_REPAIR"
                ? "from-orange-500 to-amber-500"
                : item.status === "RETIRED"
                ? "from-gray-500 to-gray-700"
                : item.status === "DAMAGED"
                ? "from-red-500 to-rose-500"
                : "from-red-700 to-red-900",

            bg:
              item.status === "IN_USE"
                ? "bg-green-100 text-green-600"
                : item.status === "IN_STORE"
                ? "bg-blue-100 text-blue-600"
                : item.status === "IN_REPAIR"
                ? "bg-orange-100 text-orange-600"
                : item.status === "RETIRED"
                ? "bg-gray-100 text-gray-700"
                : item.status === "DAMAGED"
                ? "bg-red-100 text-red-600"
                : "bg-red-100 text-red-700",

            icon:
              item.status === "IN_USE"
                ? CheckCircle
                : item.status === "IN_STORE"
                ? Package
                : item.status === "IN_REPAIR"
                ? Wrench
                : item.status === "RETIRED"
                ? Archive
                : item.status === "DAMAGED"
                ? AlertTriangle
                : XCircle,
          })
        )

      setStatusData(mappedData || [])

    } catch (error) {

      console.log("Asset Status Error", error)

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 overflow-hidden">

      {/* ---------------- HERO ---------------- */}

 <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-6 shadow-xl">

  {/* Decorative Elements */}
  <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full" />

  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    {/* Left Side */}
    <div>

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

          <Activity className="w-8 h-8 text-white" />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-white">
            Asset Status Dashboard
          </h1>

          <p className="text-emerald-100 mt-1">
            Real-time monitoring of inventory health & asset lifecycle
          </p>

        </div>

      </div>

      {/* KPI Cards */}
      <div className="flex flex-wrap gap-4 mt-6">

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {totalAssets}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Total Assets
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {statusData.length}
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Status Types
          </p>

        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 min-w-[140px]">

          <p className="text-3xl font-bold text-white">
            {
              statusData.find(
                (s) => s.status === "IN_USE"
              )?.count || 0
            }
          </p>

          <p className="text-xs uppercase tracking-wider text-emerald-100 mt-1">
            Active Assets
          </p>

        </div>

      </div>

    </div>

    {/* Right Side Metrics */}
    <div className="grid grid-cols-2 gap-3 lg:min-w-[320px]">

      <MiniCard
        icon={TrendingUp}
        title="Efficiency"
        value="92%"
      />

      <MiniCard
        icon={ShieldCheck}
        title="Compliance"
        value="98%"
      />

      <MiniCard
        icon={CheckCircle2}
        title="Operational"
        value={`${statusData.find(
          (s) => s.status === "IN_USE"
        )?.count || 0}`}
      />

      <MiniCard
        icon={AlertTriangle}
        title="Repair Queue"
        value={`${statusData.find(
          (s) => s.status === "IN_REPAIR"
        )?.count || 0}`}
      />

    </div>

  </div>
</div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">

        {statusData.map((item) => {

          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >

              <div className="flex items-start justify-between gap-2">

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[11px] font-semibold text-black shrink-0">
                  {item.percent}%
                </span>
              </div>

              <div className="mt-3 min-w-0">

                <h3 className="text-2xl font-bold text-black leading-none">
                  {item.value}
                </h3>

                <p className="text-xs text-black mt-1 break-words">
                  {item.label}
                </p>
              </div>

              <div className="mt-3">

                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">

                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}
                    style={{
                      width: `${item.percent}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------------- STATUS DISTRIBUTION ---------------- */}

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Asset Distribution 
            </h2>

            <p className="text-xs text-black mt-1 break-words">
              Asset health overview
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">

            <Layers3 className="w-5 h-5 text-green-600" />
          </div>
        </div>

        {loading ? (

          <div className="space-y-4">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse"
              >

                <div className="h-3 w-28 bg-gray-200 rounded mb-2" />

                <div className="h-2 w-full bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>

        ) : (

          <div className="space-y-5">

            {statusData.map((item) => (

              <StatusRow
                key={item.label}
                {...item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

const MiniCard = ({
  icon: Icon,
  title,
  value,
}: any) => (
  <div className="bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-4">

    <div className="flex items-center justify-between">

      <Icon className="w-5 h-5 text-white" />

      <span className="text-xl font-bold text-white">
        {value}
      </span>

    </div>

    <p className="text-xs uppercase tracking-wider text-emerald-100 mt-3">
      {title}
    </p>

  </div>
);

/* ---------------- STATUS ROW ---------------- */

function StatusRow({
  label,
  value,
  percent,
  gradient,
  icon: Icon,
  bg,
}: any) {

  return (
    <div className="group overflow-hidden">

      <div className="flex items-center justify-between gap-3 mb-2">

        <div className="flex items-center gap-3 min-w-0">

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
          >
            <Icon className="w-4 h-4" />
          </div>

          <div className="min-w-0">

            <h4 className="font-semibold text-sm text-black break-words">
              {label}
            </h4>

            <p className="text-xs text-black break-words">
              {value} assets
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">

          <h4 className="text-base font-bold text-black">
            {percent}%
          </h4>

          <p className="text-[10px] text-black">
            Distribution
          </p>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

        <div
          className={`h-2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  )
}