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
  Archive,
} from "lucide-react"

import { createAssetReplacementApi, getAssetReplacementsApi } from "@/lib/inventory.api"

export default function AssetReplacementPage() {

  const [replacements, setReplacements] =
    useState<any[]>([])

    const [showModal, setShowModal] =
  useState(false)

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


<div
  className="
    relative
    overflow-hidden
    rounded-[28px]
    bg-[#0f172a]
    border
    border-slate-800
    shadow-xl
    p-5
  "
>

  {/* Glow Effects */}

  <div
    className="
      absolute
      top-0
      right-0
      h-48
      w-48
      rounded-full
      bg-amber-500/10
      blur-3xl
    "
  />

  <div
    className="
      absolute
      bottom-0
      left-0
      h-32
      w-32
      rounded-full
      bg-orange-500/10
      blur-3xl
    "
  />

  <div className="relative z-10">

    {/* Header */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div className="flex items-center gap-3">

        <div
          className="
            h-11
            w-11
            rounded-xl
            bg-amber-500/15
            border
            border-amber-500/20
            flex
            items-center
            justify-center
          "
        >
          <RefreshCw className="h-5 w-5 text-amber-400" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-lg font-semibold text-white">
              Asset Replacement
            </h1>

            <span
              className="
                px-2
                py-0.5
                rounded-full
                bg-amber-500/10
                text-amber-400
                text-[10px]
                font-medium
              "
            >
              Lifecycle
            </span>

          </div>

          <p className="text-sm text-slate-400 mt-1">
            Manage upgrades, retirements and replacement planning
          </p>

        </div>

      </div>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-3 gap-3 mt-5">

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Total Replacements
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {stats.total}
        </h3>
      </div>

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Active Assets
        </p>

        <h3 className="text-2xl font-bold text-emerald-400 mt-2">
          {stats.active}
        </h3>
      </div>

      <div
        className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
      >
        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Retired Assets
        </p>

        <h3 className="text-2xl font-bold text-amber-400 mt-2">
          {stats.retired}
        </h3>
      </div>

    </div>

  </div>

</div>


      {/* ---------------- OVERVIEW ---------------- */}
<button
  onClick={() =>
    setShowModal(true)
  }
  className="px-4 h-10 rounded-xl cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-sm font-medium text-white whitespace-nowrap"
>
  Apply For Replacement
</button>


{showModal && (
  <ReplacementModal
    onClose={() =>
      setShowModal(false)
    }
    onSuccess={() => {
      setShowModal(false)
      fetchReplacements()
    }}
  />
)}
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

          {/* <button className="px-4 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-sm font-medium text-black whitespace-nowrap">
            View Analytics
          </button> */}
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

import {
  Package,
  Building2,
  User,
  FileText,
  X,
} from "lucide-react";

function ReplacementModal({
  onClose,
  onSuccess,
}: any) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      oldProductId: "",
      newProductId: "",
      departmentId: "",
      reason: "",
      replacedBy: "",
    });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAssetReplacementApi(
        form
      );

      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-5 text-white">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

                <RefreshCw className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Asset Replacement Request
                </h2>

                <p className="text-emerald-100 text-sm mt-1">
                  Submit a replacement request for an asset
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">

            {/* OLD PRODUCT */}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Old Product ID
              </label>

              <div className="relative">
                <Package className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

                <input
                  value={form.oldProductId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      oldProductId:
                        e.target.value,
                    })
                  }
                  placeholder="Enter old asset ID"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* NEW PRODUCT */}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                New Product ID
              </label>

              <div className="relative">
                <Package className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

                <input
                  value={form.newProductId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newProductId:
                        e.target.value,
                    })
                  }
                  placeholder="Enter new asset ID"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* DEPARTMENT */}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Department ID
              </label>

              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

                <input
                  value={form.departmentId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      departmentId:
                        e.target.value,
                    })
                  }
                  placeholder="Department ID"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* REPLACED BY */}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Replaced By
              </label>

              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

                <input
                  value={form.replacedBy}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      replacedBy:
                        e.target.value,
                    })
                  }
                  placeholder="Employee Name"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>
          </div>

          {/* REASON */}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Replacement Reason
            </label>

            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />

              <textarea
                rows={4}
                value={form.reason}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reason:
                      e.target.value,
                  })
                }
                placeholder="Describe the reason for replacement..."
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none resize-none"
              />
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 text-white font-medium shadow-sm transition disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// function ReplacementModal({
//   onClose,
//   onSuccess,
// }: any) {
//   const [loading, setLoading] =
//     useState(false);

//   const [form, setForm] =
//     useState({
//       oldProductId: "",
//       newProductId: "",
//       departmentId: "",
//       reason: "",
//       replacedBy: "",
//     });

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       console.log("Payload", form);

//       await createAssetReplacementApi(
//         form
//       );

//       onSuccess();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
//       <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="font-semibold text-lg">
//             Apply Asset Replacement
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-xl"
//           >
//             ×
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="p-4 space-y-4"
//         >
//           <input
//             placeholder="Old Product Id"
//             className="w-full h-11 border rounded-xl px-3"
//             value={form.oldProductId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 oldProductId:
//                   e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="New Product Id"
//             className="w-full h-11 border rounded-xl px-3"
//             value={form.newProductId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 newProductId:
//                   e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Department Id"
//             className="w-full h-11 border rounded-xl px-3"
//             value={form.departmentId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 departmentId:
//                   e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Replaced By"
//             className="w-full h-11 border rounded-xl px-3"
//             value={form.replacedBy}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 replacedBy:
//                   e.target.value,
//               })
//             }
//           />

//           <textarea
//             placeholder="Replacement Reason"
//             rows={4}
//             className="w-full border rounded-xl p-3"
//             value={form.reason}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 reason:
//                   e.target.value,
//               })
//             }
//           />

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 h-11 border rounded-xl"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white"
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

/* ---------------- MINI CARD ---------------- */

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

/* ---------------- OVERVIEW CARD ---------------- */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300">
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
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