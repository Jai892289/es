"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import {
  ChevronRight,
  Plus,
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
    }, 400)

    return () => clearTimeout(debounce)

  }, [search, department, category, vendor, amc])

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[30px] p-8 text-white shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3 mb-3">

              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Package2 className="w-7 h-7" />
              </div>

              <div>

                <h1 className="text-3xl font-bold tracking-tight">
                  Inventory Management
                </h1>

                <p className="text-green-50 text-sm mt-1">
                  Manage products, departments, vendors & AMC
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 mt-6">

              <div>
                <p className="text-3xl font-bold">
                  {inventoryData.length}
                </p>

                <p className="text-sm text-green-100">
                  Total Products
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  {
                    inventoryData.filter(
                      (i) => i.amcAvailable
                    ).length
                  }
                </p>

                <p className="text-sm text-green-100">
                  AMC Active
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/inventory/add"
            className="px-6 py-3 rounded-2xl bg-white text-green-600 hover:bg-green-50 transition text-sm font-semibold shadow-md"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* ---------------- FILTERS ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm">

        <div className="flex flex-wrap items-center gap-4">

          {/* SEARCH */}

          <div className="relative flex-1 min-w-[240px]">

            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
            />
          </div>

          {/* DEPARTMENT */}

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* CATEGORY */}

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* VENDOR */}

          <input
            type="text"
            placeholder="Vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
          />

          {/* AMC */}

          <select
            value={amc}
            onChange={(e) => setAmc(e.target.value)}
            className="h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
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
            className="h-12 px-5 rounded-2xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center gap-2 text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* ---------------- LOADING ---------------- */}

      {loading && (

        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-sm text-gray-500 shadow-sm">
          Loading inventory...
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-sm">

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
                    className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
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

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                          <Package2 className="w-5 h-5 text-green-600" />
                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {item.productName}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.serialNumber || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {item?.category?.name || "-"}
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {item?.department?.name || "-"}
                    </td>

                    {/* VENDOR */}

                    <td className="px-6 py-5 text-sm text-gray-700">
                      {item?.vendor?.companyName || "-"}
                    </td>

                    {/* QTY */}

                    <td className="px-6 py-5">

                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {item.quantity}
                      </span>
                    </td>

                    {/* PROCUREMENT */}

                    <td className="px-6 py-5 text-sm text-gray-600">

                      {item.procurementDate
                        ? new Date(
                            item.procurementDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* WARRANTY */}

                    <td className="px-6 py-5 text-sm text-gray-600">

                      {item.warrantyExpiryDate
                        ? new Date(
                            item.warrantyExpiryDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* AMC */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.amcAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.amcAvailable
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-5">

                      <Link
                        href={`/dashboard/inventory/${item.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition"
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
                    className="py-16 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">

                        <Package2 className="w-9 h-9 text-gray-400" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-700">
                        No Inventory Found
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Try changing your filters
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