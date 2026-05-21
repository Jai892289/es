"use client"

import {
  ChevronDown,
  Plus,
  Star,
  Search,
  ArrowUpRight,
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  Package2,
  Activity,
  Eye,
} from "lucide-react"

import Link from "next/link"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { getVendorsApi } from "@/lib/vendor.api"

export default function VendorsPage() {

  const [vendors, setVendors] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  useEffect(() => {

    const fetchVendors =
      async () => {

        try {

          const res =
            await getVendorsApi()

          setVendors(
            res.data || []
          )

        } catch (err) {

          console.error(err)

        } finally {

          setLoading(false)
        }
      }

    fetchVendors()

  }, [])

  /* ---------------- FILTERED ---------------- */

  const filteredVendors =
    useMemo(() => {

      return vendors.filter(
        (v: any) =>
          v.companyName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
    }, [vendors, search])

  /* ---------------- STATS ---------------- */

  const totalVendors =
    vendors.length

  const totalProducts =
    vendors.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        (item.products?.length ||
          0),
      0
    )

  const topRated =
    vendors.length

  if (loading) {

    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="space-y-4 text-center">

          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-gray-500">
            Loading Vendors...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 text-white shadow-xl">

        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <Building2 className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Vendor Management
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Track manufacturers, suppliers & vendor performance
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    totalVendors
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Vendors
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    totalProducts
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Products Managed
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={TrendingUp}
              title="Vendor Growth"
              value="92%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Trusted Vendors"
              value="98%"
            />

                  </div>
        </div>
      </div>

      {/* ---------------- OVERVIEW ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Total Vendors"
          value={totalVendors}
          icon={Users}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Supplied Products"
          value={totalProducts}
          icon={Package2}
          gradient="from-blue-500 to-cyan-500"
        />

        <OverviewCard
          title="Top Rated"
          value={topRated}
          icon={Star}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      {/* ---------------- FILTER BAR ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* LEFT */}

        <div className="flex items-center gap-3 flex-wrap">

          {[
            "By Department",
            "By Rating",
            "By Credibility",
            "By Product",
          ].map((f) => (

            <button
              key={f}
              className="
                h-12 px-5 rounded-2xl
                border border-gray-200
                bg-white
                text-sm font-medium text-gray-700
                hover:bg-emerald-50
                hover:border-emerald-500
                hover:text-emerald-600
                transition
                flex items-center gap-2
              "
            >

              {f}

              <ChevronDown className="w-4 h-4" />
            </button>
          ))}

          <button
            className="
              h-12 px-5 rounded-2xl
              bg-emerald-600
              hover:bg-emerald-700
              transition
              text-white text-sm font-medium
              shadow-lg
            "
          >
            Apply Filter
          </button>
        </div>

        {/* SEARCH */}

        <div className="relative w-full xl:w-[320px]">

          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full h-14 rounded-2xl
              border border-gray-200
              bg-gray-50
              pl-12 pr-4
              text-sm
              outline-none
              transition
              focus:border-emerald-500
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-100
            "
          />
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Vendor Directory
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete supplier & manufacturer list
            </p>
          </div>

          <Link
            href="/dashboard/vendors/add"
            className="
              h-12 px-5 rounded-2xl
              bg-gradient-to-r from-emerald-600 to-green-600
              hover:from-emerald-700 hover:to-green-700
              transition
              text-white text-sm font-medium
              flex items-center gap-2
              shadow-lg
            "
          >

            <Plus className="w-4 h-4" />

            Add Vendor
          </Link>
        </div>

        {/* BODY */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                {[
                  "#",
                  "Vendor",
                  "City",
                  "Products",
                  "Complaints",
                  "Rating",
                  "Action",
                ].map((head) => (

                  <th
                    key={head}
                    className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {filteredVendors.map(
                (
                  v,
                  index
                ) => {

                  const rating = 5

                  return (
                    <tr
                      key={v.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      {/* INDEX */}

                      <td className="px-8 py-6">

                        <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                          {index + 1}
                        </div>
                      </td>

                      {/* VENDOR */}

                      <td className="px-8 py-6">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                            <Building2 className="w-7 h-7 text-emerald-600" />
                          </div>

                          <div>

                            <h3 className="font-semibold text-gray-800">
                              {
                                v.companyName
                              }
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                              Vendor / Manufacturer
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CITY */}

                      <td className="px-8 py-6 text-gray-700">
                        {v.city ||
                          "-"}
                      </td>

                      {/* PRODUCTS */}

                      <td className="px-8 py-6">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-700 font-medium text-sm">

                          <Package2 className="w-4 h-4" />

                          {v.products
                            ?.length ||
                            0}
                        </div>
                      </td>

                      {/* COMPLAINTS */}

                      <td className="px-8 py-6">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-50 text-red-700 font-medium text-sm">

                          0
                        </div>
                      </td>

                      {/* RATING */}

                      <td className="px-8 py-6">

                        <div className="flex items-center gap-1">

                          {Array.from({
                            length: 5,
                          }).map(
                            (
                              _,
                              i
                            ) => (

                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i <
                                  rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            )
                          )}
                        </div>
                      </td>

                      {/* ACTION */}

                      <td className="px-8 py-6">

                        <Link
                          href={`/dashboard/vendors/${v.id}`}
                          className="
                            inline-flex items-center gap-2
                            h-11 px-5 rounded-2xl
                            bg-gray-100 hover:bg-emerald-600
                            hover:text-white
                            transition
                            text-sm font-medium
                            text-gray-700
                          "
                        >

                          <Eye className="w-4 h-4" />

                          Details
                        </Link>
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}

        {filteredVendors.length ===
          0 && (

          <div className="p-16 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">

              <Building2 className="w-10 h-10 text-gray-400" />
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Vendors Found
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              No vendor matched your search
            </p>
          </div>
        )}
      </div>

      {/* ---------------- FOOTER ---------------- */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {
              filteredVendors.length
            }
          </span>{" "}
          vendors
        </div>

        <div className="flex items-center gap-3">

          <button className="h-11 px-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium">
            Previous
          </button>

          <button className="h-11 px-5 rounded-2xl bg-emerald-600 text-white shadow-lg text-sm font-medium">
            1
          </button>

          <button className="h-11 px-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2">

            Next

            <ArrowUpRight className="w-4 h-4" />
          </button>
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
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">

          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">
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