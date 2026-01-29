"use client"

import { RefreshCw, AlertCircle, Calendar } from "lucide-react"

export default function AssetReplacementPage() {
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

      {/* REPLACEMENT CARDS */}
      <ReplacementCard
        id="REP-2026-008"
        department="IT Department"
        date="15 Jan 2026"
        oldAsset="Desktop Computer - Dell OptiPlex 3080"
        oldId="AST-2024-089"
        expiry="31 Dec 2025"
        newAsset="Desktop Computer - Dell OptiPlex 7090"
        newId="AST-2026-145"
        reason="Performance degradation, outdated hardware"
      />

      <ReplacementCard
        id="REP-2026-007"
        department="Finance Department"
        date="10 Jan 2026"
        oldAsset="Laser Printer - HP LaserJet P2035"
        oldId="AST-2023-156"
        expiry="20 Dec 2025"
        newAsset="Laser Printer - HP LaserJet Pro M404n"
        newId="AST-2026-132"
        reason="Frequent breakdowns, high maintenance cost"
      />
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
}: any) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-800">{id}</span>
            <span className="px-3 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
              Completed
            </span>
          </div>
          <p className="text-sm text-gray-500">{department}</p>
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
            <p className="font-semibold text-gray-800">{oldAsset}</p>
            <p className="text-xs text-gray-600 mt-1">
              Asset ID: {oldId}
            </p>
          </div>

          <div className="pt-2 border-t border-red-200">
            <p className="text-xs text-gray-500">Validity Expired</p>
            <p className="text-sm text-red-600 font-medium">{expiry}</p>
          </div>
        </div>

        {/* NEW ASSET */}
        <div className="border border-green-200 bg-green-50 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
            <RefreshCw className="w-4 h-4" />
            NEW ASSET (ACTIVE)
          </div>

          <div>
            <p className="font-semibold text-gray-800">{newAsset}</p>
            <p className="text-xs text-gray-600 mt-1">
              Asset ID: {newId}
            </p>
          </div>

          <div className="pt-2 border-t border-green-200">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm text-green-700 font-medium">In Use</p>
          </div>
        </div>
      </div>

      {/* REASON */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs text-gray-500">Replacement Reason</p>
        <p className="text-sm text-gray-700 mt-1">{reason}</p>
        <p className="text-xs text-gray-400 mt-2">
          Replaced by: Admin User
        </p>
      </div>
    </div>
  )
}
