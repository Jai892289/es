"use client"

import { useEffect, useState } from "react"

import {
  RefreshCw,
  AlertCircle,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Package2,
  Activity,
  ArrowRight,
  ArrowUpRight,
  Wrench,
} from "lucide-react"

import { getAssetReplacementsApi } from "@/lib/inventory.api"

export default function AssetReplacementPage() {

  const [replacements, setReplacements] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [stats, setStats] =
    useState({
      total: 0,
      active: 0,
      retired: 0,
    })

  useEffect(() => {
    fetchReplacements()
  }, [])

  const fetchReplacements = async () => {

    try {

      setLoading(true)

      const response =
        await getAssetReplacementsApi()

      const data =
        response?.data || []

      setReplacements(data)

      setStats({
        total: data.length,

        active: data.filter(
          (item: any) =>
            item?.newProduct
              ?.status ===
            "ACTIVE"
        ).length,

        retired: data.length,
      })

    } catch (error) {

      console.log(
        "Replacement Error",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <RefreshCw className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Asset Replacement Center
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Track asset lifecycle replacements and upgrades
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {stats.total}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Replacements
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {stats.active}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Active Assets
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {stats.retired}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Retired Assets
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-4 min-w-[320px]">

            <MiniCard
              icon={TrendingUp}
              title="Replacement Efficiency"
              value="96%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Lifecycle Monitoring"
              value="Active"
            />

            {/* <MiniCard
              icon={Activity}
              title="Asset Health"
              value="Stable"
            /> */}
          </div>
        </div>
      </div>

      {/* ---------------- OVERVIEW ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Total Replacements"
          value={stats.total}
          icon={Package2}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Active Assets"
          value={stats.active}
          icon={ShieldCheck}
          gradient="from-blue-500 to-cyan-500"
        />

        <OverviewCard
          title="Retired Assets"
          value={stats.retired}
          icon={AlertCircle}
          gradient="from-red-500 to-rose-500"
        />
      </div>

      {/* ---------------- REPLACEMENT LIST ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Replacement History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete replacement records across departments
            </p>
          </div>

          <button className="px-5 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium">
            View Analytics
          </button>
        </div>

        {/* BODY */}

        <div className="divide-y divide-gray-100">

          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading replacement history...
            </div>

          ) : replacements.length === 0 ? (

            <div className="p-16 text-center">

              <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">

                <RefreshCw className="w-10 h-10 text-gray-400" />
              </div>

              <h3 className="text-xl font-semibold text-gray-700">
                No Replacement History
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                No asset replacement data available
              </p>
            </div>

          ) : (

            replacements.map(
              (
                item: any,
                index: number
              ) => (

                <ReplacementCard
                  key={
                    item.id || index
                  }
                  id={`REP-${index + 1}`}
                  department={
                    item?.department
                      ?.name ||
                    item?.department ||
                    "N/A"
                  }
                  date={new Date(
                    item?.replacementDate ||
                      item?.createdAt
                  ).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                  oldAsset={
                    item?.oldProduct
                      ?.productName ||
                    item?.oldAsset ||
                    "Old Asset"
                  }
                  oldId={
                    item?.oldProduct
                      ?.serialNumber ||
                    item?.oldAssetId ||
                    "-"
                  }
                  expiry={
                    item?.oldProduct
                      ?.warrantyExpiryDate
                      ? new Date(
                          item.oldProduct.warrantyExpiryDate
                        ).toLocaleDateString(
                          "en-GB"
                        )
                      : "-"
                  }
                  newAsset={
                    item?.newProduct
                      ?.productName ||
                    item?.newAsset ||
                    "New Asset"
                  }
                  newId={
                    item?.newProduct
                      ?.serialNumber ||
                    item?.newAssetId ||
                    "-"
                  }
                  reason={
                    item?.reason || "-"
                  }
                  status={
                    item?.newProduct
                      ?.status ||
                    "ACTIVE"
                  }
                  replacedBy={
                    item?.replacedBy ||
                    "Admin User"
                  }
                />
              )
            )
          )}
        </div>
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

/* ---------------- REPLACEMENT CARD ---------------- */

function ReplacementCard({
  id,
  department,
  date,
  oldAsset,
  oldId,
  expiry,
  newAsset,
  newId,
  reason,
  status,
  replacedBy,
}: any) {

  return (
    <div className="group p-8 hover:bg-gray-50 transition-all duration-300">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* LEFT */}

        <div className="flex items-start gap-5">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">

            <RefreshCw className="w-7 h-7" />
          </div>

          <div>

            <div className="flex items-center gap-3 flex-wrap">

              <h3 className="text-lg font-bold text-gray-800">
                {id}
              </h3>

              <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Completed
              </span>
            </div>

            <p className="text-gray-500 mt-2">
              {department}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">

              <Calendar className="w-4 h-4" />

              {date}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="px-5 py-3 rounded-2xl bg-gray-100 text-sm text-gray-700 font-medium">
          Replaced By:{" "}
          {replacedBy}
        </div>
      </div>

      {/* OLD → NEW */}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 items-center mt-8">

        {/* OLD */}

        <div className="relative overflow-hidden border border-red-200 bg-red-50 rounded-[28px] p-6">

          <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">

              <AlertCircle className="w-5 h-5" />

              OLD ASSET
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-5">
              {oldAsset}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Asset ID: {oldId}
            </p>

            <div className="mt-6 pt-5 border-t border-red-200">

              <p className="text-xs text-gray-500">
                Warranty Expired
              </p>

              <p className="text-lg font-semibold text-red-600 mt-1">
                {expiry}
              </p>
            </div>
          </div>
        </div>

        {/* ARROW */}

        <div className="flex items-center justify-center">

          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-md">

            <ArrowRight className="w-7 h-7 text-emerald-600" />
          </div>
        </div>

        {/* NEW */}

        <div className="relative overflow-hidden border border-green-200 bg-green-50 rounded-[28px] p-6">

          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">

              <RefreshCw className="w-5 h-5" />

              NEW ASSET
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-5">
              {newAsset}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Asset ID: {newId}
            </p>

            <div className="mt-6 pt-5 border-t border-green-200 flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-500">
                  Status
                </p>

                <p className="text-lg font-semibold text-green-700 mt-1">
                  {status}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                <ShieldCheck className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REASON */}

      <div className="mt-7 rounded-[24px] bg-gray-50 p-6">

        <div className="flex items-start gap-4">

          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

            <Wrench className="w-7 h-7 text-orange-600" />
          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Replacement Reason
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}