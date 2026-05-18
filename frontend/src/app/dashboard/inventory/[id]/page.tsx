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
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f5f7fb]">

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
            className="w-20 h-20 border-[6px] border-emerald-500 border-t-transparent rounded-full mx-auto"
          />

          <p className="text-gray-500 mt-6 text-sm font-medium">
            Loading Inventory Details...
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="space-y-7"
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
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 shadow-2xl text-white"
      >

        {/* BLOBS */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-start gap-5">

              <motion.div
                whileHover={{
                  rotate: 6,
                  scale: 1.05,
                }}
                className="w-24 h-24 rounded-[30px] bg-white/15 backdrop-blur flex items-center justify-center shadow-xl"
              >

                <Laptop className="w-12 h-12" />
              </motion.div>

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/15 border border-white/10 backdrop-blur text-xs font-medium">

                  <Sparkles className="w-3.5 h-3.5" />

                  Premium Asset
                </div>

                <h1 className="text-4xl font-bold tracking-tight mt-4">
                  {data?.productName || "-"}
                </h1>

                <p className="text-green-50 mt-3 text-sm">
                  Serial Number :
                  {" "}
                  {data?.serialNumber || "-"}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">

                  <StatusBadge
                    active={
                      data?.amcAvailable
                    }
                  />

                  <SoftBadge
                    label={
                      data?.status ||
                      "ACTIVE"
                    }
                  />
                </div>
              </div>
            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-10 mt-10">

              <QuickStat
                value={
                  data?.quantity || 0
                }
                label="Quantity"
              />

              <QuickStat
                value={
                  data?.invoiceNumber ||
                  "-"
                }
                label="Invoice"
              />

              <QuickStat
                value={
                  data?.status ||
                  "N/A"
                }
                label="Status"
              />
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="AMC"
              value={
                data?.amcAvailable
                  ? "Active"
                  : "Inactive"
              }
            />

            <MiniCard
              icon={Activity}
              title="Asset Health"
              value="94%"
            />

            <MiniCard
              icon={Layers3}
              title="Category"
              value="IT Asset"
            />

            <MiniCard
              icon={Building2}
              title="Department"
              value="Assigned"
            />
          </div>
        </div>
      </motion.div>

      {/* CONTENT */}

      <div className="grid grid-cols-12 gap-7">

        {/* LEFT */}

        <div className="col-span-12 xl:col-span-8 space-y-7">

          {/* INFO GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            <InfoCard
              icon={Package2}
              label="Quantity"
              value={String(
                data?.quantity || "-"
              )}
            />

            <InfoCard
              icon={ShieldCheck}
              label="Invoice Number"
              value={
                data?.invoiceNumber ||
                "-"
              }
            />

            <InfoCard
              icon={Activity}
              label="Status"
              value={
                data?.status ||
                "-"
              }
            />

            <InfoCard
              icon={CalendarDays}
              label="Procurement Date"
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
              label="Warranty Expiry"
              value={
                data?.warrantyExpiryDate
                  ? new Date(
                      data.warrantyExpiryDate
                    ).toLocaleDateString()
                  : "-"
              }
            />

            <InfoCard
              icon={CalendarDays}
              label="Created At"
              value={
                data?.createdAt
                  ? new Date(
                      data.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />
          </div>

          {/* RELATION DETAILS */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-7">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Relation Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Linked references &
                  mapping information
                </p>
              </div>

              <ArrowUpRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-5">

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

        {/* RIGHT */}

        <div className="col-span-12 xl:col-span-4 space-y-7">

          {/* QUICK SUMMARY */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300"
          >

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Quick Summary
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Asset overview
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <Laptop className="w-7 h-7 text-emerald-600" />
              </div>
            </div>

            <div className="space-y-5">

              <Info
                label="Product Name"
                value={
                  data?.productName ||
                  "-"
                }
              />

              <Info
                label="Quantity"
                value={String(
                  data?.quantity || "-"
                )}
              />

              <Info
                label="AMC Available"
                value={
                  data?.amcAvailable
                    ? "Yes"
                    : "No"
                }
              />

              <Info
                label="Invoice Number"
                value={
                  data?.invoiceNumber ||
                  "-"
                }
              />
            </div>
          </motion.div>

          {/* ACTIONS */}

          <motion.div
            whileHover={{
              y: -3,
            }}
            className="bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300"
          >

            <h2 className="text-2xl font-bold text-gray-800">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Perform asset related operations
            </p>

            <div className="space-y-4">

              <ActionButton
                icon={
                  <MessageCircle className="w-5 h-5" />
                }
                text="Contact Vendor"
                className="from-emerald-500 to-green-600"
              />

              <ActionButton
                icon={
                  <AlertTriangle className="w-5 h-5" />
                }
                text="Raise Complaint"
                className="from-orange-500 to-amber-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------- QUICK STAT ---------------- */

function QuickStat({
  value,
  label,
}: any) {

  return (
    <div>

      <h2 className="text-5xl font-bold">
        {value}
      </h2>

      <p className="text-green-100 text-sm mt-1">
        {label}
      </p>
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
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10"
    >

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
    </motion.div>
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
        y: -5,
      }}
      className="group relative overflow-hidden bg-white border border-gray-100 hover:border-emerald-100 rounded-[28px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300"
    >

      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">

          <Icon className="w-7 h-7 text-emerald-600" />
        </div>

        <p className="text-sm text-gray-500 mt-5">
          {label}
        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-2 break-words">
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
    <div className="bg-gray-50 rounded-[24px] border border-gray-100 p-5">

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-3 text-sm font-semibold break-all text-gray-800 leading-7">
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
    <div className="border-b border-gray-100 pb-4 last:border-none last:pb-0">

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-gray-800 mt-2 break-words">
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
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`w-full h-14 rounded-2xl bg-gradient-to-r ${className} text-white text-sm font-medium shadow-lg flex items-center justify-center gap-3 transition-all duration-300`}
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
      className={`px-4 py-2 rounded-2xl text-sm font-medium ${
        active
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
    <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-white/15 border border-white/10 backdrop-blur">

      {label}
    </span>
  )
}