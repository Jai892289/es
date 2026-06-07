"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import {
  ChevronRight,
  RotateCcw,
  Search,
  Package2,
   Filter,
  ChevronDown,
} from "lucide-react"



import { getInventoryApi } from "@/lib/inventory.api"

export default function InventoryPage() {

  const [inventoryData, setInventoryData] = useState<any[]>([])

  const [search, setSearch] = useState("")

  const [department, setDepartment] = useState("")

  const [category, setCategory] = useState("")

  const [vendor, setVendor] = useState("")

  const [amc, setAmc] = useState("")

  const [loading, setLoading] = useState(false)


const [status, setStatus] =
  useState("");

const [selectedDate, setSelectedDate] =
  useState("");

  /* ---------------- FETCH ---------------- */

  useEffect(() => {

    const fetchInventory = async () => {

      try {

        setLoading(true)

        const query: any = new URLSearchParams()

        if (search) query.append("search", search)

        if (department) query.append("department", department)

        if (category) query.append("category", category)

        if (vendor) query.append("vendor", vendor)

        if (amc) query.append("amc", amc)

        const res = await getInventoryApi(
          query.toString()
        )

        setInventoryData(res?.data || [])

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchInventory()
    }, 350)

    return () => clearTimeout(debounce)

  }, [search, department, category, vendor, amc])

  return (
    <div className="space-y-4">

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
      bg-emerald-500/10
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
      bg-cyan-500/5
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
            bg-emerald-500/15
            border
            border-emerald-500/20
            flex
            items-center
            justify-center
          "
        >
          <Package2 className="h-5 w-5 text-emerald-400" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-lg font-semibold text-white">
              Inventory Management
            </h1>

            <span
              className="
                px-2
                py-0.5
                rounded-full
                bg-emerald-500/10
                text-emerald-400
                text-[10px]
                font-medium
              "
            >
              Active
            </span>

          </div>

          <p className="text-sm text-slate-400 mt-1">
            Manage assets, inventory, AMC and warranty lifecycle
          </p>

        </div>

      </div>

      <Link
        href="/dashboard/inventory/add"
        className="
          h-10
          px-4
          rounded-xl
          bg-white
          text-slate-900
          text-sm
          font-medium
          flex
          items-center
          gap-2
          hover:bg-slate-100
          transition-all
        "
      >
        <Package2 className="h-4 w-4" />
        Add Inventory
      </Link>

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
          Total Assets
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {inventoryData.length}
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
          AMC Active
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {
            inventoryData.filter(
              (i) => i.amcAvailable
            ).length
          }
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
          Total Stock
        </p>

        <h3 className="text-2xl font-bold text-white mt-2">
          {
            inventoryData.reduce(
              (sum, item) =>
                sum + (item.quantity || 0),
              0
            )
          }
        </h3>
      </div>

    </div>

  </div>

</div>


      {/* ---------------- FILTERS ---------------- */}

     <div className="bg-[#f8f9fb] rounded-3xl border border-gray-200 p-6 shadow-sm">

  <div className="flex flex-wrap items-center gap-4">

    {/* Filter Title */}

    <div className="flex items-center gap-3 mr-2">

      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
        <Filter className="w-5 h-5 text-gray-600" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800">
        Filters
      </h3>

    </div>

    {/* Department */}

    <div className="relative">

      <select
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
        className="
          appearance-none
          h-12
          min-w-[240px]
          rounded-full
          border
          border-gray-300
          bg-white
          pl-6
          pr-12
          text-[15px]
          font-medium
          text-[#24124d]
          shadow-sm
          hover:border-emerald-400
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-100
          outline-none
          transition
        "
      >
        <option value="">
          By Department
        </option>

        {[...new Set(
          inventoryData.map(
            (i) => i.department?.name
          )
        )].map(
          (dept: any) =>
            dept && (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            )
        )}
      </select>

      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />

    </div>

    {/* Category */}

    <div className="relative">

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="
          appearance-none
          h-12
          min-w-[220px]
          rounded-full
          border
          border-gray-300
          bg-white
          pl-6
          pr-12
          text-[15px]
          font-medium
          text-[#24124d]
          shadow-sm
          hover:border-emerald-400
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-100
          outline-none
          transition
        "
      >
        <option value="">
          By Category
        </option>

        {[...new Set(
          inventoryData.map(
            (i) => i.category?.name
          )
        )].map(
          (cat: any) =>
            cat && (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            )
        )}
      </select>

      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />

    </div>

    

    {/* Date */}

    {/* <input
      type="date"
      value={selectedDate}
      onChange={(e) =>
        setSelectedDate(
          e.target.value
        )
      }
      className="
        h-12
        min-w-[200px]
        rounded-full
        border
        border-gray-300
        bg-white
        px-6
        text-[15px]
        font-medium
        text-[#24124d]
        shadow-sm
        hover:border-emerald-400
        focus:border-emerald-500
        focus:ring-2
        focus:ring-emerald-100
        outline-none
        transition
      "
    /> */}

    {/* Apply Button */}

    <button
      className="
        h-12
        px-8
        rounded-full
        bg-blue-600
        text-white
        font-medium
        shadow-md
        hover:bg-blue-700
        transition-all
      "
    >
      Apply Filter
    </button>

    {/* Reset */}

    <button
      onClick={() => {
        setDepartment("");
        setCategory("");
        setStatus("");
        setSelectedDate("");
      }}
      className="
        h-12
        px-5
        rounded-full
        bg-white
        border
        border-red-200
        text-red-500
        font-medium
        hover:bg-red-50
        transition
        flex items-center gap-2
      "
    >
      <RotateCcw className="w-4 h-4" />
      Reset
    </button>

  </div>

</div>

      {/* ---------------- LOADING ---------------- */}

      {loading && (

        <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-black shadow-sm">
          Loading inventory...
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                {[
                  "Product",
                  "Category",
                  "Department",
                  "Vendor",
                  "Qty",
                  "Procurement",
                  "Warranty",
                  "AMC",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-black"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {inventoryData.length > 0 ? (

                inventoryData.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >

                    {/* PRODUCT */}

                    <td className="px-4 py-3">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

                          <Package2 className="w-4 h-4 text-green-600" />
                        </div>

                        <div>

                          <p className="font-semibold text-sm text-black leading-none">
                            {item.productName}
                          </p>

                          <p className="text-[11px] text-black mt-1">
                            {item.serialNumber || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-4 py-3 text-sm text-black">
                      {item?.category?.name || "-"}
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-4 py-3 text-sm text-black">
                      {item?.department?.name || "-"}
                    </td>

                    {/* VENDOR */}

                    <td className="px-4 py-3 text-sm text-black">
                      {item?.vendor?.companyName || "-"}
                    </td>

                    {/* QTY */}

                    <td className="px-4 py-3">

                      <span className="px-2 py-1 rounded-full bg-gray-100 text-black text-[11px] font-semibold">
                        {item.quantity}
                      </span>
                    </td>

                    {/* PROCUREMENT */}

                    <td className="px-4 py-3 text-sm text-black">

                      {item.procurementDate
                        ? new Date(
                            item.procurementDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* WARRANTY */}

                    <td className="px-4 py-3 text-sm text-black">

                      {item.warrantyExpiryDate
                        ? new Date(
                            item.warrantyExpiryDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* AMC */}

                    <td className="px-4 py-3">

                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                          item.amcAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {item.amcAvailable
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="px-4 py-3">

                      <Link
                        href={`/dashboard/inventory/${item.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition"
                      >
                        View

                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan={9}
                    className="py-12 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">

                        <Package2 className="w-7 h-7 text-gray-500" />
                      </div>

                      <h3 className="text-base font-semibold text-black">
                        No Inventory Found
                      </h3>

                      <p className="text-sm text-black mt-1">
                        Try changing filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}