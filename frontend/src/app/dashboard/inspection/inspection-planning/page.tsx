"use client"

import { useEffect, useState } from "react"

import {
  Bell,
  Calendar,
  MapPin,
  User,
  Plus,
  ShieldCheck,
  Activity,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react"

import { getInspectionsApi } from "@/lib/inspection.api"

export default function InspectionPage() {

  const [inspections, setInspections] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchInspections()
  }, [])

  const fetchInspections =
    async () => {

      try {

        setLoading(true)

        const response =
          await getInspectionsApi()

        setInspections(
          response?.data || []
        )

      } catch (error) {

        console.log(
          "Inspection Error",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  const reminders =
    inspections.filter(
      (item: any) =>
        item.status ===
        "SCHEDULED"
    )

  const completed =
    inspections.filter(
      (item: any) =>
        item.status ===
        "COMPLETED"
    ).length

  const pending =
    inspections.filter(
      (item: any) =>
        item.status ===
        "SCHEDULED"
    ).length

  return (
    <div className="space-y-7">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <ClipboardCheck className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Inspection Planning
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Schedule, monitor & manage all inspections efficiently
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {inspections.length}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Inspections
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {completed}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Completed
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Compliance Rate"
              value="98%"
            />

            <MiniCard
              icon={Activity}
              title="Pending"
              value={pending}
            />

            <MiniCard
              icon={Bell}
              title="Reminders"
              value={reminders.length}
            />
          </div>
        </div>
      </div>

      {/* ACTION BAR */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        <div className="flex flex-wrap gap-3">

          <button className="h-12 px-5 rounded-2xl bg-emerald-600 text-white text-sm font-medium shadow-lg">
            List View
          </button>

          <button className="h-12 px-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium">
            Calendar View
          </button>
        </div>

        <div className="flex flex-wrap gap-3">

          <select className="h-12 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none">

            <option>
              All Types
            </option>
          </select>

          <select className="h-12 px-4 rounded-2xl border border-gray-200 bg-white text-sm outline-none">

            <option>
              All Status
            </option>
          </select>

          <button className="h-12 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg">

            <Plus className="w-4 h-4" />

            Schedule Inspection
          </button>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <OverviewCard
          title="Total Inspections"
          value={inspections.length}
          gradient="from-emerald-500 to-green-600"
        />

        <OverviewCard
          title="Upcoming"
          value={pending}
          gradient="from-orange-500 to-amber-500"
        />

        <OverviewCard
          title="Completed"
          value={completed}
          gradient="from-blue-500 to-cyan-500"
        />
      </div>

      {/* REMINDERS */}

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-[30px] p-7 shadow-sm">

        <div className="flex items-center gap-3 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

            <Bell className="w-7 h-7 text-orange-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Upcoming Reminders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Scheduled inspections requiring attention
            </p>
          </div>
        </div>

        {reminders.length ===
        0 ? (

          <div className="bg-white rounded-2xl p-6 text-center text-gray-500 border border-orange-100">

            No upcoming reminders
          </div>
        ) : (

          <div className="space-y-4">

            {reminders.map(
              (item: any) => (

                <Reminder
                  key={item.id}
                  title={item.title}
                  id={item.inspectionId}
                  due={`Scheduled on ${new Date(
                    item.scheduledDate
                  ).toLocaleDateString(
                    "en-GB"
                  )}`}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* INSPECTIONS */}

      {loading ? (

        <div className="bg-white border border-gray-100 rounded-[30px] p-12 text-center text-gray-500 shadow-sm">

          Loading inspections...
        </div>

      ) : inspections.length ===
        0 ? (

        <div className="bg-white border border-gray-100 rounded-[30px] p-12 text-center text-gray-500 shadow-sm">

          No inspections found
        </div>

      ) : (

        <div className="space-y-6">

          {inspections.map(
            (item: any) => (

              <InspectionCard
                key={item.id}
                id={item.inspectionId}
                status={item.status}
                priority={item.priority}
                title={item.title}
                type={item.type}
                subtitle={
                  item.notes ||
                  "Inspection"
                }
                date={new Date(
                  item.scheduledDate
                ).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
                time={new Date(
                  item.scheduledDate
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute:
                      "2-digit",
                  }
                )}
                location={
                  item.location
                }
                phase={item.type}
                assignee={
                  item.inspectorName
                }
                role={
                  item.project
                    ? "Project Inspection"
                    : item.product
                    ? "Asset Inspection"
                    : "General Inspection"
                }
              />
            )
          )}
        </div>
      )}
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
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <ArrowUpRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-emerald-600 transition" />

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

/* ---------------- REMINDER ---------------- */

function Reminder({
  title,
  id,
  due,
}: any) {

  return (
    <div className="bg-white border border-orange-100 rounded-[24px] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition">

      <div>

        <p className="font-semibold text-gray-800">
          {title}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Inspection ID: {id}
        </p>
      </div>

      <span className="inline-flex items-center px-4 py-2 rounded-2xl bg-orange-100 text-orange-700 text-sm font-medium">
        {due}
      </span>
    </div>
  )
}

/* ---------------- INSPECTION CARD ---------------- */

function InspectionCard({
  id,
  status,
  priority,
  title,
  type,
  subtitle,
  date,
  time,
  location,
  phase,
  assignee,
  role,
}: any) {

  const statusColor =
    status ===
    "IN_PROGRESS"
      ? "bg-orange-100 text-orange-700"
      : status ===
        "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700"

  const priorityColor =
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : priority ===
        "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"

  return (
    <div className="group bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* TOP */}

      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">

        <div className="space-y-4">

          <div className="flex flex-wrap gap-3 items-center">

            <span className="font-semibold text-gray-800 text-lg">
              {id}
            </span>

            <span
              className={`px-4 py-2 rounded-2xl text-xs font-medium ${statusColor}`}
            >
              {status}
            </span>

            <span
              className={`px-4 py-2 rounded-2xl text-xs font-medium ${priorityColor}`}
            >
              {priority}
              {" "}Priority
            </span>
          </div>

          <div>

            <h3 className="text-2xl font-bold text-gray-800">
              {title}
            </h3>

            <p className="text-gray-500 mt-2">
              {type} • {subtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-3">

          <button className="h-11 px-5 rounded-2xl bg-blue-50 hover:bg-blue-100 transition text-blue-600 text-sm font-medium">
            Edit Schedule
          </button>

          <button className="h-11 px-5 rounded-2xl bg-orange-50 hover:bg-orange-100 transition text-orange-600 text-sm font-medium">
            Send Reminder
          </button>
        </div>
      </div>

      {/* DETAILS */}

      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">

        <Detail
          icon={<Calendar />}
          label="Date & Time"
        >
          {date}
          <br />
          {time}
        </Detail>

        <Detail
          icon={<MapPin />}
          label="Location"
        >
          {location}

          <div className="text-xs text-gray-500 mt-1">
            Phase: {phase}
          </div>
        </Detail>

        <Detail
          icon={<User />}
          label="Assigned To"
        >
          {assignee}

          <div className="text-xs text-gray-500 mt-1">
            {role}
          </div>
        </Detail>
      </div>
    </div>
  )
}

/* ---------------- DETAIL ---------------- */

function Detail({
  icon,
  label,
  children,
}: any) {

  return (
    <div className="bg-gray-50 rounded-[24px] p-5 border border-gray-100">

      <div className="flex gap-4">

        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-600">

          {icon}
        </div>

        <div>

          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {label}
          </p>

          <div className="text-gray-800 mt-2 text-sm leading-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}