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

    const [productFilter, setProductFilter] =
  useState("all")

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

  /* FILTER */

  // const filteredVendors =
  //   useMemo(() => {

  //     return vendors.filter(
  //       (v: any) =>
  //         v.companyName
  //           ?.toLowerCase()
  //           .includes(
  //             search.toLowerCase()
  //           )
  //     )
  //   }, [vendors, search])

    const filteredVendors = useMemo(() => {
  return vendors.filter((v: any) => {
    const matchesSearch =
      v.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase())

    const matchesProduct =
      productFilter === "all"
        ? true
        : productFilter === "with-products"
        ? (v.products?.length || 0) > 0
        : (v.products?.length || 0) === 0

    return (
      matchesSearch &&
      matchesProduct
    )
  })
}, [
  vendors,
  search,
  productFilter,
])

  /* STATS */

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

  /* LOADING */

  if (loading) {

    return (
      <div className="min-h-[50vh] flex items-center justify-center overflow-x-hidden">

        <div className="space-y-3 text-center">

          <div className="w-12 h-12 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="text-sm text-black">
            Loading Vendors...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">

                <Building2 className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl font-semibold leading-tight break-words">
                  Vendor Management 
                </h1>

                <p className="text-green-50 mt-1 text-xs break-words">
                  Manage suppliers & manufacturers
                </p>
              </div>
            </div>

            {/* QUICK STATS */}

            <div className="flex flex-wrap items-center gap-5 mt-4">

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  {
                    totalVendors
                  }
                </h2>

                <p className="text-green-100 text-[10px] mt-1">
                  Vendors
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold leading-none">
                  {
                    totalProducts
                  }
                </h2>

                <p className="text-green-100 text-[10px] mt-1">
                  Products
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-2 w-full xl:w-[220px]">

            <MiniCard
              icon={TrendingUp}
              title="Growth"
              value="92%"
            />

            <MiniCard
              icon={ShieldCheck}
              title="Trusted"
              value="98%"
            />
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

        <OverviewCard
          title="Total Vendors"
          value={totalVendors}
          icon={Users}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Products"
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

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="flex flex-wrap items-center gap-2">

            <select
  value={productFilter}
  onChange={(e) =>
    setProductFilter(e.target.value)
  }
  className="h-10 px-4 rounded-xl border border-gray-200 text-sm"
>
  <option value="all">
    All Vendors
  </option>

  <option value="with-products">
    With Products
  </option>

  <option value="without-products">
    No Products
  </option>
</select>

            {/* {[
              "Department",
              "Rating",
              "Credibility",
              "Product",
            ].map((f) => (

              <button
                key={f}
                className="
                  h-10 px-4 rounded-xl
                  border border-gray-200
                  bg-white
                  text-sm font-medium text-black
                  hover:bg-emerald-50
                  hover:border-emerald-500
                  hover:text-emerald-600
                  transition
                  flex items-center gap-2
                  whitespace-nowrap
                "
              >

                {f}

                <ChevronDown className="w-4 h-4" />
              </button>
            ))}

            <button
              className="
                h-10 px-4 rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                transition
                text-white text-sm font-medium
                whitespace-nowrap
              "
            >
              Apply
            </button> */}
          </div>

          {/* SEARCH */}

          <div className="relative w-full xl:w-[280px]">

            <Search className="absolute left-3 top-3 w-4 h-4 text-black" />

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
                w-full h-10 rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-3
                text-sm text-black
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
              "
            />
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 border-b border-gray-100">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Vendor Directory
            </h2>

            <p className="text-xs text-black mt-1">
              Supplier & manufacturer list
            </p>
          </div>

          <Link
            href="/dashboard/vendors/add"
            className="
              h-10 px-4 rounded-xl
              bg-gradient-to-r from-emerald-600 to-green-600
              hover:from-emerald-700 hover:to-green-700
              transition
              text-white text-sm font-medium
              flex items-center justify-center gap-2
              whitespace-nowrap
            "
          >

            <Plus className="w-4 h-4" />

            Add Vendor
          </Link>
        </div>

        {/* BODY */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

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
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-black whitespace-nowrap"
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

                      <td className="px-4 py-4">

                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-semibold text-black">
                          {index + 1}
                        </div>
                      </td>

                      {/* VENDOR */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

                            <Building2 className="w-5 h-5 text-emerald-600" />
                          </div>

                          <div className="min-w-0">

                            <h3 className="font-semibold text-sm text-black break-words">
                              {
                                v.companyName
                              }
                            </h3>

                            <p className="text-[10px] text-black mt-1">
                              Vendor
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CITY */}

                      <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                        {v.city ||
                          "-"}
                      </td>

                      {/* PRODUCTS */}

                      <td className="px-4 py-4">

                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 font-medium text-xs whitespace-nowrap">

                          <Package2 className="w-4 h-4" />

                          {v.products
                            ?.length ||
                            0}
                        </div>
                      </td>

                      {/* COMPLAINTS */}

                      <td className="px-4 py-4">

                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-700 font-medium text-xs whitespace-nowrap">

                          0
                        </div>
                      </td>

                      {/* RATING */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-1 whitespace-nowrap">

                          {Array.from({
                            length: 5,
                          }).map(
                            (
                              _,
                              i
                            ) => (

                              <Star
                                key={i}
                                className={`w-4 h-4 ${
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

                      <td className="px-4 py-4 whitespace-nowrap">

                        <Link
                          href={`/dashboard/vendors/${v.id}`}
                          className="
                            inline-flex items-center gap-2
                            h-9 px-4 rounded-xl
                            bg-gray-100 hover:bg-emerald-600
                            hover:text-white
                            transition
                            text-sm font-medium
                            text-black
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

          <div className="p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">

              <Building2 className="w-7 h-7 text-black" />
            </div>

            <h3 className="text-base font-semibold text-black">
              No Vendors Found
            </h3>

            <p className="text-sm text-black mt-1">
              No vendor matched your search
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-hidden">

        <div className="text-sm text-black break-words">
          Showing{" "}
          <span className="font-semibold">
            {
              filteredVendors.length
            }
          </span>{" "}
          vendors
        </div>

        <div className="flex items-center gap-2 flex-wrap">

          <button className="h-9 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium text-black">
            Previous
          </button>

          <button className="h-9 px-4 rounded-xl bg-emerald-600 text-white text-sm font-medium">
            1
          </button>

          <button className="h-9 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2 text-black">

            Next

            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* MINI CARD */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-xs text-green-50 break-words">
            {title}
          </p>

          <h3 className="text-lg font-bold mt-1 text-white break-words">
            {value}
          </h3>
        </div>
      </div>
    </div>
  )
}

/* OVERVIEW CARD */

function OverviewCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10 flex items-center justify-between">
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-black mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>

      </div>
    </div>
  );
}