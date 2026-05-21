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

          <div>

            <div className="flex items-start gap-3">

              <motion.div
                whileHover={{
                  rotate: 4,
                }}
                className="w-16 h-16 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center"
              >

                <Laptop className="w-8 h-8" />
              </motion.div>

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/10 text-[11px] font-medium">

                  <Sparkles className="w-3 h-3" />

                  Premium Asset
                </div>

                <h1 className="text-2xl font-bold tracking-tight mt-3 leading-tight">
                  {data?.productName || "-"}
                </h1>

                <p className="text-green-50 mt-1 text-xs">
                  Serial :
                  {" "}
                  {data?.serialNumber || "-"}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

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

            <div className="flex flex-wrap gap-5 mt-5">

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

          <div className="grid grid-cols-2 gap-2 w-full xl:w-[280px]">

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
              title="Health"
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
              icon={ShieldCheck}
              label="Invoice"
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

            <InfoCard
              icon={CalendarDays}
              label="Created"
              value={
                data?.createdAt
                  ? new Date(
                      data.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />
          </div>

          {/* RELATION */}

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

              <ArrowUpRight className="w-4 h-4 text-black" />
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

            <div className="space-y-3">

              <Info
                label="Product"
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
                label="AMC"
                value={
                  data?.amcAvailable
                    ? "Yes"
                    : "No"
                }
              />

              <Info
                label="Invoice"
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
              y: -2,
            }}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >

            <h2 className="text-lg font-semibold text-black">
              Quick Actions
            </h2>

            <p className="text-xs text-black mt-1 mb-4">
              Asset operations
            </p>

            <div className="space-y-3">

              <ActionButton
                icon={
                  <MessageCircle className="w-4 h-4" />
                }
                text="Contact Vendor"
                className="from-emerald-500 to-green-600"
              />

              <ActionButton
                icon={
                  <AlertTriangle className="w-4 h-4" />
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

      <h2 className="text-2xl font-bold leading-none">
        {value}
      </h2>

      <p className="text-green-100 text-[11px] mt-1">
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
        y: -2,
      }}
      className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 border border-white/10"
    >

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">

          <Icon className="w-4 h-4 text-white" />
        </div>

        <div>

          <p className="text-[11px] text-green-50">
            {title}
          </p>

          <h3 className="text-sm font-semibold mt-1 text-white">
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
      className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
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
    <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/15 border border-white/10">

      {label}
    </span>
  )
}