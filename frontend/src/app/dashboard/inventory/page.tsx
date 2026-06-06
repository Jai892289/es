"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import {
  ChevronRight,
  RotateCcw,
  Search,
  Package2,
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

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 text-white shadow-md">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Package2 className="w-5 h-5" />
              </div>

              <div>

                <h1 className="text-xl font-semibold tracking-tight leading-none">
                  Inventory Management
                </h1>

                <p className="text-green-50 text-xs mt-1">
                  Manage products & AMC
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-4">

              <div>
                <p className="text-2xl font-bold leading-none">
                  {inventoryData.length}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold leading-none">
                  {
                    inventoryData.filter(
                      (i) => i.amcAvailable
                    ).length
                  }
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  AMC Active
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/inventory/add"
            className="h-10 px-4 rounded-xl bg-white text-green-600 hover:bg-green-50 transition text-sm font-semibold shadow-sm flex items-center justify-center"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* ---------------- FILTERS ---------------- */}

      <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">

        <div className="flex flex-wrap items-center gap-2">

          {/* SEARCH */}

          <div className="relative flex-1 min-w-[220px]">

            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
            />
          </div>

          {/* DEPARTMENT */}

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* CATEGORY */}

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* VENDOR */}

          <input
            type="text"
            placeholder="Vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* AMC */}

          <select
            value={amc}
            onChange={(e) => setAmc(e.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
          >
            <option value="">
              AMC Status
            </option>

            <option value="true">
              AMC Active 
            </option>

            <option value="false">
              No AMC
            </option>
          </select>

          {/* RESET */}

          <button
            onClick={() => {
              setSearch("")
              setDepartment("")
              setCategory("")
              setVendor("")
              setAmc("")
            }}
            className="h-10 px-4 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center gap-2 text-sm font-medium"
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
                  "",
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