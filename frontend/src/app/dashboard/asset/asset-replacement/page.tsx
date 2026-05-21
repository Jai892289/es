"use client"

import { useEffect, useState } from "react"

import {
  RefreshCw,
  AlertCircle,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Package2,
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
    <div className="space-y-4 overflow-hidden">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-5 text-white shadow-md">

        <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow shrink-0">

                <RefreshCw className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl font-semibold leading-tight break-words">
                  Asset Replacement
                </h1>

                <p className="text-green-50 mt-1 text-xs break-words">
                  Track lifecycle upgrades & replacements
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-5 mt-4">

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  {stats.total}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Replacements
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  {stats.active}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Active
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  {stats.retired}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Retired
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-2 w-full lg:w-[240px]">

            <MiniCard
              icon={TrendingUp}
              title="Efficiency"
              value="96%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Monitoring"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* ---------------- OVERVIEW ---------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

        <OverviewCard
          title="Replacements"
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

      {/* ---------------- LIST ---------------- */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-gray-100">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Replacement History
            </h2>

            <p className="text-xs text-black mt-1">
              Asset replacement records
            </p>
          </div>

          <button className="px-4 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black whitespace-nowrap">
            View Analytics
          </button>
        </div>

        {/* BODY */}

        <div className="divide-y divide-gray-100">

          {loading ? (

            <div className="p-6 text-center text-black text-sm">
              Loading replacement history...
            </div>

          ) : replacements.length === 0 ? (

            <div className="p-8 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-3">

                <RefreshCw className="w-7 h-7 text-black" />
              </div>

              <h3 className="text-base font-semibold text-black">
                No Replacement History
              </h3>

              <p className="text-sm text-black mt-1">
                No replacement data available
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
    <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 overflow-hidden">

      <div className="flex items-center gap-2">

        <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">

          <Icon className="w-4 h-4" />
        </div>

        <div className="min-w-0">

          <p className="text-xs text-white break-words">
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

/* ---------------- OVERVIEW CARD ---------------- */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between gap-2">

          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow`}
          >

            <Icon className="w-5 h-5" />
          </div>

          <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
        </div>

        <div className="mt-3">

          <p className="text-xs text-black">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-black mt-1">
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
    <div className="group p-4 hover:bg-gray-50 transition-all duration-300 overflow-hidden">

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

        {/* LEFT */}

        <div className="flex items-start gap-3 min-w-0">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow shrink-0">

            <RefreshCw className="w-5 h-5" />
          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="text-base font-semibold text-black break-words">
                {id}
              </h3>

              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-700 whitespace-nowrap">
                Completed
              </span>
            </div>

            <p className="text-sm text-black mt-1 break-words">
              {department}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-black mt-2 flex-wrap">

              <Calendar className="w-3 h-3 shrink-0" />

              {date}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="px-3 py-2 rounded-xl bg-gray-100 text-xs text-black font-medium break-words max-w-full">
          Replaced By: {replacedBy}
        </div>
      </div>

      {/* OLD → NEW */}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-5">

        {/* OLD */}

        <div className="relative overflow-hidden border border-red-200 bg-red-50 rounded-2xl p-4">

          <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/30 rounded-full blur-3xl" />

          <div className="relative z-10 min-w-0">

            <div className="flex items-center gap-2 text-red-600 font-semibold text-xs">

              <AlertCircle className="w-4 h-4 shrink-0" />

              OLD ASSET
            </div>

            <h3 className="text-lg font-semibold text-black mt-4 break-words">
              {oldAsset}
            </h3>

            <p className="text-xs text-black mt-2 break-all">
              Asset ID: {oldId}
            </p>

            <div className="mt-4 pt-4 border-t border-red-200">

              <p className="text-[11px] text-black">
                Warranty Expired
              </p>

              <p className="text-sm font-semibold text-red-600 mt-1 break-words">
                {expiry}
              </p>
            </div>
          </div>
        </div>

        {/* ARROW */}

        <div className="flex items-center justify-center">

          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm shrink-0">

            <ArrowRight className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        {/* NEW */}

        <div className="relative overflow-hidden border border-green-200 bg-green-50 rounded-2xl p-4">

          <div className="absolute top-0 right-0 w-24 h-24 bg-green-200/30 rounded-full blur-3xl" />

          <div className="relative z-10 min-w-0">

            <div className="flex items-center gap-2 text-green-700 font-semibold text-xs">

              <RefreshCw className="w-4 h-4 shrink-0" />

              NEW ASSET
            </div>

            <h3 className="text-lg font-semibold text-black mt-4 break-words">
              {newAsset}
            </h3>

            <p className="text-xs text-black mt-2 break-all">
              Asset ID: {newId}
            </p>

            <div className="mt-4 pt-4 border-t border-green-200 flex items-center justify-between gap-3">

              <div className="min-w-0">

                <p className="text-[11px] text-black">
                  Status
                </p>

                <p className="text-sm font-semibold text-green-700 mt-1 break-words">
                  {status}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">

                <ShieldCheck className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REASON */}

      <div className="mt-4 rounded-xl bg-gray-50 p-4 overflow-hidden">

        <div className="flex items-start gap-3">

          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">

            <Wrench className="w-5 h-5 text-orange-600" />
          </div>

          <div className="min-w-0">

            <p className="text-[11px] uppercase tracking-wide text-black">
              Replacement Reason
            </p>

            <p className="text-sm text-black mt-2 leading-6 break-words">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}