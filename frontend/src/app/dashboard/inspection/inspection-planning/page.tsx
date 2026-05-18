"use client"

import { useEffect, useState } from "react"

import {
  Bell,
  Calendar,
  MapPin,
  User,
  Plus,
} from "lucide-react"

import { getInspectionsApi } from "@/lib/inspection.api"

export default function InspectionPage() {
  const [inspections, setInspections] =
    useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInspections()
  }, [])

  const fetchInspections = async () => {
    try {
      setLoading(true)

      const response = await getInspectionsApi()

      setInspections(response?.data || [])
    } catch (error) {
      console.log("Inspection Error", error)
    } finally {
      setLoading(false)
    }
  }

  // UPCOMING REMINDERS
  const reminders = inspections.filter(
    (item: any) => item.status === "SCHEDULED"
  )

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Inspection Planning & Scheduling
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Schedule and manage inspections
            for projects, assets, and work phases
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Inspection
        </button>
      </div>

      {/* VIEW + FILTER BAR */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm">
            List View
          </button>

          <button className="border px-4 py-1.5 rounded-md text-sm">
            Calendar View
          </button>
        </div>

        <div className="flex gap-3">
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>All Types</option>
          </select>

          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>All Status</option>
          </select>
        </div>
      </div>

      {/* UPCOMING REMINDERS */}
      <div className="border border-orange-200 bg-orange-50 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-orange-700 font-medium">
          <Bell className="w-5 h-5" />
          Upcoming Reminders
        </div>

        {reminders.length === 0 ? (
          <p className="text-sm text-gray-600">
            No upcoming reminders
          </p>
        ) : (
          reminders.map((item: any) => (
            <Reminder
              key={item.id}
              title={item.title}
              id={item.inspectionId}
              due={`Scheduled on ${new Date(
                item.scheduledDate
              ).toLocaleDateString("en-GB")}`}
            />
          ))
        )}
      </div>

      {/* INSPECTION LIST */}
      {loading ? (
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          Loading...
        </div>
      ) : inspections.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          No inspections found
        </div>
      ) : (
        inspections.map((item: any) => (
          <InspectionCard
            key={item.id}
            id={item.inspectionId}
            status={item.status}
            priority={item.priority}
            title={item.title}
            type={item.type}
            subtitle={item.notes || "Inspection"}
            date={new Date(
              item.scheduledDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            time={new Date(
              item.scheduledDate
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            location={item.location}
            phase={item.type}
            assignee={item.inspectorName}
            role={
              item.project
                ? "Project Inspection"
                : item.product
                ? "Asset Inspection"
                : "General Inspection"
            }
          />
        ))
      )}
    </div>
  )
}

/* ---------- REMINDER ---------- */

function Reminder({
  title,
  id,
  due,
}: any) {
  return (
    <div className="bg-white border border-orange-200 rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-800">
          {title}
        </p>

        <p className="text-xs text-gray-500">
          Inspection ID: {id}
        </p>
      </div>

      <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
        {due}
      </span>
    </div>
  )
}

/* ---------- INSPECTION CARD ---------- */

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
    status === "IN_PROGRESS"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700"

  const priorityColor =
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : priority === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      {/* HEADER */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-semibold text-gray-800">
          {id}
        </span>

        <span
          className={`px-3 py-0.5 rounded-full text-xs ${statusColor}`}
        >
          {status}
        </span>

        <span
          className={`px-3 py-0.5 rounded-full text-xs ${priorityColor}`}
        >
          {priority} Priority
        </span>
      </div>

      {/* TITLE */}
      <div>
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {type} • {subtitle}
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
          <br />

          <span className="text-xs text-gray-500">
            Phase: {phase}
          </span>
        </Detail>

        <Detail icon={<User />} label="Assigned To">
          {assignee}
          <br />

          <span className="text-xs text-gray-500">
            {role}
          </span>
        </Detail>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm">
          Edit Schedule
        </button>

        <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm">
          Send Reminder
        </button>
      </div>
    </div>
  )
}

/* ---------- DETAIL BLOCK ---------- */

function Detail({
  icon,
  label,
  children,
}: any) {
  return (
    <div className="flex gap-2">
      <div className="text-gray-500 mt-0.5">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-gray-800">
          {children}
        </p>
      </div>
    </div>
  )
}