"use client"

import Link from "next/link"

import {
  ChevronLeft,
  Laptop,
  MessageCircle,
  AlertTriangle,
  ShieldCheck,
  Package2,
  CalendarDays,
  Building2,
  Layers3,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

import { useParams } from "next/navigation"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import { getInventoryByIdApi } from "@/lib/inventory.api"

export default function InventoryProductDetailsPage() {

  const { id } = useParams()

  const [data, setData] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    if (!id) return

    const fetchData =
      async () => {

        try {

          const res =
            await getInventoryByIdApi(
              id as string
            )

          setData(
            res?.data
          )

        } catch (err) {

          console.error(
            "FETCH INVENTORY ERROR => ",
            err
          )

        } finally {

          setLoading(false)
        }
      }

    fetchData()

  }, [id])

  if (loading) {

    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f5f7fb]">

        <div className="text-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-14 h-14 border-[4px] border-emerald-500 border-t-transparent rounded-full mx-auto"
          />

          <p className="text-black mt-3 text-sm">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-4"
    >

      {/* BACK */}

      <Link
        href="/dashboard/inventory"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
      >

        <ChevronLeft className="w-4 h-4" />

        Back to Inventory
      </Link>

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-5 shadow-md text-white"
      >

        {/* BG */}

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-44 h-44 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          {/* LEFT */}

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <Laptop className="w-10 h-10" />
            </div>

            <div className="flex-1">

              <div className="flex items-center gap-2 mb-2">
                <StatusBadge active={data?.amcAvailable} />
                <SoftBadge label={data?.status || "ACTIVE"} />
              </div>

              <h1 className="text-3xl font-bold">
                {data?.productName}
              </h1>

              <p className="text-green-100 mt-1">
                Serial No: {data?.serialNumber}
              </p>

              <p className="text-green-100 text-sm mt-2">
                {data?.department?.name}
                {" • "}
                {data?.vendor?.companyName}
              </p>

            </div>
          </div>

        </div>
      </motion.div>

      {/* CONTENT */}

      <div className="grid grid-cols-12 gap-4">

        {/* LEFT */}

        <div className="col-span-12 xl:col-span-8 space-y-4">

          {/* INFO GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">

            <InfoCard
              icon={Package2}
              label="Quantity"
              value={String(
                data?.quantity || "-"
              )}
            />

            <InfoCard
              icon={CalendarDays}
              label="Procurement"
              value={
                data?.procurementDate
                  ? new Date(
                    data.procurementDate
                  ).toLocaleDateString()
                  : "-"
              }
            />

            <InfoCard
              icon={ShieldCheck}
              label="Warranty"
              value={
                data?.warrantyExpiryDate
                  ? new Date(
                    data.warrantyExpiryDate
                  ).toLocaleDateString()
                  : "-"
              }
            />

          </div>

<motion.div
  whileHover={{ y: -2 }}
  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
>
  <h2 className="text-lg font-semibold mb-4">
    Product Details
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    <Spec label="Asset Name" value={data?.assetName} />
    <Spec label="Product Name" value={data?.productName} />
    <Spec label="Brand Name" value={data?.brandName} />

    <Spec label="Model Number" value={data?.modelNumber} />
    <Spec label="Serial Number" value={data?.serialNumber} />
    <Spec label="Invoice Number" value={data?.invoiceNumber} />

    <Spec label="Category ID" value={data?.categoryId} />
    <Spec label="Quantity" value={data?.quantity} />
    <Spec label="AMC Available" value={data?.amcAvailable ? "Yes" : "No"} />

    <Spec label="AMC Number" value={data?.amcNumber} />
    <Spec label="Status" value={data?.status || "-"} />
    <Spec label="Initial Status" value={data?.initialStatus || "-"} />

  </div>

  {/* Dates */}
  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">
      Important Dates
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      <Spec
        label="Purchase Date"
        value={
          data?.purchaseDate
            ? new Date(data.purchaseDate).toLocaleDateString()
            : "-"
        }
      />

      <Spec
        label="Procurement Date"
        value={
          data?.procurementDate
            ? new Date(data.procurementDate).toLocaleDateString()
            : "-"
        }
      />

      <Spec
        label="Warranty Expiry"
        value={
          data?.warrantyExpiryDate
            ? new Date(data.warrantyExpiryDate).toLocaleDateString()
            : "-"
        }
      />

      <Spec
        label="AMC Expiry"
        value={
          data?.amcExpiryDate
            ? new Date(data.amcExpiryDate).toLocaleDateString()
            : "-"
        }
      />

    </div>
  </div>

  {/* Stock Summary */}
  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">
      Stock Distribution
    </h3>

    <div className="grid md:grid-cols-5 gap-4">

      <Spec
        label="In Stock"
        value={data?.inStock}
      />

      <Spec
        label="In Use"
        value={data?.inUse}
      />

      <Spec
        label="In Repair"
        value={data?.inRepair}
      />

      <Spec
        label="Damaged"
        value={data?.damaged}
      />

      <Spec
        label="Retired"
        value={data?.retired}
      />

    </div>
  </div>

  {/* Description */}
  <div className="mt-6">
    <label className="text-sm font-semibold text-gray-700">
      Product Description
    </label>

    <div className="mt-2 p-4 bg-gray-50 rounded-xl border text-sm text-gray-700">
      {data?.productDescription || "-"}
    </div>
  </div>

  {/* System Info */}
  <div className="mt-6">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">
      System Information
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      <Spec
        label="Created At"
        value={
          data?.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "-"
        }
      />

      <Spec
        label="Updated At"
        value={
          data?.updatedAt
            ? new Date(data.updatedAt).toLocaleString()
            : "-"
        }
      />

    </div>
  </div>

</motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">
              Department Details
            </h2>

            <div className="grid md:grid-cols-2 gap-3">


              <Spec
                label="Department Name"
                value={data?.department?.name}
              />

              <Spec
                label="Purpose"
                value={data?.department?.purpose}
              />

              <Spec
                label="Location"
                value={data?.department?.location}
              />

              <Spec
                label="City"
                value={data?.department?.city}
              />

              <Spec
                label="State"
                value={data?.department?.state}
              />

              <Spec
                label="Pincode"
                value={data?.department?.pincode}
              />

              <Spec
  label="Admin Name"
  value={data?.department?.adminName || "-"}
/>

<Spec
  label="Department Code"
  value={data?.department?.code || "-"}
/>

<Spec
  label="Description"
  value={data?.department?.description || "-"}
/>

<Spec
  label="Total Assets"
  value={data?.department?.totalAssets ?? 0}
/>

<Spec
  label="Total Staff"
  value={data?.department?.totalStaff ?? 0}
/>

<Spec
  label="Status"
  value={
    data?.department?.isActive
      ? "Active"
      : "Inactive"
  }
/>

            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-4">
              Vendor Details
            </h2>

            <div className="grid md:grid-cols-2 gap-3">

              <Spec
                label="Company Name"
                value={data?.vendor?.companyName}
              />

              <Spec
                label="Contact Number"
                value={data?.vendor?.contactNumber}
              />

              <Spec
                label="WhatsApp Number"
                value={data?.vendor?.whatsappNumber}
              />

              <Spec
                label="Email"
                value={data?.vendor?.email}
              />

              <Spec
  label="Full Name"
  value={data?.vendor?.fullName || "-"}
/>

<Spec
  label="Website"
  value={data?.vendor?.website || "-"}
/>

<Spec
  label="GST Number"
  value={data?.vendor?.gstNumber || "-"}
/>

<Spec
  label="Address Line 1"
  value={data?.vendor?.addressLine1 || "-"}
/>

<Spec
  label="Address Line 2"
  value={data?.vendor?.addressLine2 || "-"}
/>

<Spec
  label="City"
  value={data?.vendor?.city || "-"}
/>

<Spec
  label="State"
  value={data?.vendor?.state || "-"}
/>

<Spec
  label="Pincode"
  value={data?.vendor?.pincode || "-"}
/>

            </div>
          </motion.div>

        </div>

        {/* RIGHT */}

        <div className="col-span-12 xl:col-span-4 space-y-4">

          {/* SUMMARY */}

          <motion.div
            whileHover={{
              y: -2,
            }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-lg font-semibold text-black">
                  Quick Summary
                </h2>

                <p className="text-xs text-black mt-1">
                  Asset overview
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">

                <Laptop className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

  <SummaryCard
    label="Product"
    value={data?.productName}
  />

  <SummaryCard
    label="Department"
    value={data?.department?.name}
  />

  <SummaryCard
    label="Vendor"
    value={data?.vendor?.companyName}
  />

  <SummaryCard
    label="Quantity"
    value={data?.quantity}
  />

  <SummaryCard
    label="AMC"
    value={
      data?.amcAvailable
        ? "Available"
        : "Not Available"
    }
  />

  <SummaryCard
    label="Warranty"
    value={
      data?.warrantyExpiryDate
        ? new Date(
            data.warrantyExpiryDate
          ).toLocaleDateString()
        : "-"
    }
  />

</div>
          </motion.div>


          <motion.div
            whileHover={{
              y: -2,
            }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-lg font-semibold text-black">
                  Relation Details
                </h2>

                <p className="text-xs text-black mt-1">
                  Linked references
                </p>
              </div>

              {/* <ArrowUpRight className="w-4 h-4 text-black" /> */}
            </div>

            <div className="grid md:grid-cols-2 gap-3">

              

              <Spec
                label="Product ID"
                value={data?.id}
              />

              <Spec
                label="Department ID"
                value={
                  data?.departmentId
                }
              />

              <Spec
                label="Vendor ID"
                value={
                  data?.vendorId
                }
              />

              <Spec
                label="Category ID"
                value={
                  data?.categoryId
                }
              />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}


function SummaryCard({
  label,
  value,
}: any) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">

      <p className="text-[11px] uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <h3 className="mt-1 text-sm font-semibold text-gray-900 break-words">
        {value || "-"}
      </h3>

    </div>
  )
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
  icon: Icon,
  label,
  value,
}: any) {

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="group relative overflow-hidden bg-white border border-gray-100 hover:border-emerald-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
    >

      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <p className="text-xs text-black mt-3">
          {label}
        </p>

        <h3 className="text-sm font-semibold text-black mt-1 break-words leading-6">
          {value}
        </h3>
      </div>
    </motion.div>
  )
}

/* ---------------- SPEC ---------------- */

function Spec({
  label,
  value,
}: any) {

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-3">

      <p className="text-[11px] font-medium uppercase tracking-wide text-black">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold break-all text-black leading-6">
        {value || "-"}
      </p>
    </div>
  )
}

/* ---------------- INFO ---------------- */

function Info({
  label,
  value,
}: any) {

  return (
    <div className="border-b border-gray-100 pb-3 last:border-none last:pb-0">

      <p className="text-[11px] font-medium uppercase tracking-wide text-black">
        {label}
      </p>

      <p className="text-sm font-semibold text-black mt-1 break-words">
        {value}
      </p>
    </div>
  )
}

/* ---------------- ACTION ---------------- */

function ActionButton({
  icon,
  text,
  className,
}: any) {

  return (
    <motion.button
      whileHover={{
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`w-full h-11 rounded-xl bg-gradient-to-r ${className} text-white text-sm font-medium shadow-sm flex items-center justify-center gap-2 transition-all duration-300`}
    >

      {icon}

      {text}
    </motion.button>
  )
}

/* ---------------- BADGE ---------------- */

function StatusBadge({
  active,
}: any) {

  return (
    <span
      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${active
          ? "bg-white text-emerald-700"
          : "bg-red-100 text-red-700"
        }`}
    >
      {active
        ? "AMC Active"
        : "No AMC"}
    </span>
  )
}

function SoftBadge({
  label,
}: any) {

  return (
    <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/15 border border-white/10">

      {label}
    </span>
  )
}