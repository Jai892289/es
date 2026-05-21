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
                ? "bg-gray-100 text-gray-600"
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
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[32px] p-4 text-white shadow-lg overflow-hidden relative">

        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Activity className="w-8 h-8" />
              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  Asset Status Dashboard
                </h1>

                <p className="text-green-50 text-sm mt-1">
                  Monitor and manage organization assets efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-8">

              <div>

                <p className="text-4xl font-bold">
                  {totalAssets}
                </p>

                <p className="text-sm text-green-100 mt-1">
                  Total Assets
                </p>
              </div>

              <div>

                <p className="text-4xl font-bold">
                  {statusData.length}
                </p>

                <p className="text-sm text-green-100 mt-1">
                  Status Types
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">

            <MiniCard
              icon={TrendingUp}
              title="Operational Efficiency"
              value="92%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Asset Compliance"
              value="98%"
            />
          </div>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

        {statusData.map((item) => {

          const Icon = item.icon

          return (
            <div
              key={item.label}
              className="group bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-xs font-semibold text-gray-400">
                  {item.percent}%
                </span>
              </div>

              <div className="mt-3">

                <h3 className="text-3xl font-bold text-gray-800">
                  {item.value}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.label}
                </p>
              </div>

              <div className="mt-3">

                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">

                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
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

      <div className="bg-white border border-gray-100 rounded-[32px] p-4 shadow-sm">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Asset Distribution
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current asset health and status overview
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

            <Layers3 className="w-7 h-7 text-green-600" />
          </div>
        </div>

        {loading ? (

          <div className="space-y-5">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse"
              >

                <div className="h-4 w-32 bg-gray-200 rounded mb-3" />

                <div className="h-3 w-full bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>

        ) : (

          <div className="space-y-7">

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
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 min-w-[220px]">

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
    <div className="group">

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-4">

          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg}`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div>

            <h4 className="font-semibold text-gray-800">
              {label}
            </h4>

            <p className="text-sm text-gray-500">
              {value} assets
            </p>
          </div>
        </div>

        <div className="text-right">

          <h4 className="text-xl font-bold text-gray-800">
            {percent}%
          </h4>

          <p className="text-xs text-gray-400">
            Distribution
          </p>
        </div>
      </div>

      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">

        <div
          className={`h-4 rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  )
}