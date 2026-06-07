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

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 text-white shadow-md overflow-hidden relative">

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">

                <Activity className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl font-semibold leading-tight break-words">
                  Asset Status Dashboard
                </h1>

                <p className="text-green-50 text-xs mt-1 break-words">
                  Monitor organization assets
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-4">

              <div>

                <p className="text-2xl font-bold leading-none">
                  {totalAssets}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Total Assets
                </p>
              </div>

              <div>

                <p className="text-2xl font-bold leading-none">
                  {statusData.length}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Status Types
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full lg:w-auto">

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

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 min-w-0 overflow-hidden">

      <div className="flex items-center gap-2">

        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">

          <Icon className="w-4 h-4" />
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-white break-words">
            {title}
          </p>

          <h3 className="text-sm font-semibold mt-1 break-words">
            {value}
          </h3>
        </div>
      </div>
    </div>
  )
}

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