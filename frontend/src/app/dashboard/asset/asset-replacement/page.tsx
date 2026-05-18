"use client"

import { useEffect, useState } from "react"
import {
  RefreshCw,
  AlertCircle,
  Calendar,
} from "lucide-react"

import { getAssetReplacementsApi } from "@/lib/inventory.api"

export default function AssetReplacementPage() {
  const [replacements, setReplacements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReplacements()
  }, [])

  const fetchReplacements = async () => {
    try {
      setLoading(true)

      const response = await getAssetReplacementsApi()

      setReplacements(response?.data || [])
    } catch (error) {
      console.log("Replacement Error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Replacement History
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Track asset replacements across departments
        </p>
      </div>

      {/* REPLACEMENT LIST */}
      {loading ? (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          Loading...
        </div>
      ) : replacements.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          No replacement history found
        </div>
      ) : (
        replacements.map((item: any, index: number) => (
          <ReplacementCard
            key={item.id || index}
            id={`REP-${index + 1}`}
            department={
              item?.department?.name ||
              item?.department ||
              "N/A"
            }
            date={new Date(
              item?.replacementDate || item?.createdAt
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            oldAsset={
              item?.oldProduct?.productName ||
              item?.oldAsset ||
              "Old Asset"
            }
            oldId={
              item?.oldProduct?.serialNumber ||
              item?.oldAssetId ||
              "-"
            }
            expiry={
              item?.oldProduct?.warrantyExpiryDate
                ? new Date(
                    item.oldProduct.warrantyExpiryDate
                  ).toLocaleDateString("en-GB")
                : "-"
            }
            newAsset={
              item?.newProduct?.productName ||
              item?.newAsset ||
              "New Asset"
            }
            newId={
              item?.newProduct?.serialNumber ||
              item?.newAssetId ||
              "-"
            }
            reason={item?.reason || "-"}
            status={
              item?.newProduct?.status || "ACTIVE"
            }
            replacedBy={
              item?.replacedBy || "Admin User"
            }
          />
        ))
      )}
    </div>
  )
}

/* ---------- REPLACEMENT CARD ---------- */

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
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-800">
              {id}
            </span>

            <span className="px-3 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
              Completed
            </span>
          </div>

          <p className="text-sm text-gray-500">
            {department}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
      </div>

      {/* OLD → NEW ASSETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OLD ASSET */}
        <div className="border border-red-200 bg-red-50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-red-600 font-medium text-sm">
            <AlertCircle className="w-4 h-4" />
            OLD ASSET (RETIRED)
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {oldAsset}
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Asset ID: {oldId}
            </p>
          </div>

          <div className="pt-2 border-t border-red-200">
            <p className="text-xs text-gray-500">
              Validity Expired
            </p>

            <p className="text-sm text-red-600 font-medium">
              {expiry}
            </p>
          </div>
        </div>

        {/* NEW ASSET */}
        <div className="border border-green-200 bg-green-50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
            <RefreshCw className="w-4 h-4" />
            NEW ASSET (ACTIVE)
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {newAsset}
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Asset ID: {newId}
            </p>
          </div>

          <div className="pt-2 border-t border-green-200">
            <p className="text-xs text-gray-500">
              Status
            </p>

            <p className="text-sm text-green-700 font-medium">
              {status}
            </p>
          </div>
        </div>
      </div>

      {/* REASON */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-500">
          Replacement Reason
        </p>

        <p className="text-sm text-gray-700 mt-1">
          {reason}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Replaced by: {replacedBy}
        </p>
      </div>
    </div>
  )
}