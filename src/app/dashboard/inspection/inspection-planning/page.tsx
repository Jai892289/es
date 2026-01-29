"use client"

import {
  Bell,
  Calendar,
  MapPin,
  User,
  Plus,
} from "lucide-react"

export default function InspectionPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Inspection Planning & Scheduling
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Schedule and manage inspections for projects, assets, and work phases
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

        <Reminder
          title="Road Construction Quality Check"
          id="INS-2026-003"
          due="Due in 2 hours"
        />

        <Reminder
          title="Building Safety Inspection - Ward 5"
          id="INS-2026-001"
          due="Due in 2 days"
        />
      </div>

      {/* INSPECTION LIST */}
      <InspectionCard
        id="INS-2026-001"
        status="Scheduled"
        priority="High"
        title="Building Safety Inspection - Ward 5"
        type="Project"
        subtitle="Municipal Building Construction"
        date="25 Jan 2026"
        time="10:00 AM"
        location="Ward 5, Municipal Building Site"
        phase="Foundation Work"
        assignee="Priya Sharma"
        role="Internal Staff"
      />

      <InspectionCard
        id="INS-2026-002"
        status="Scheduled"
        priority="Medium"
        title="Asset Verification - IT Equipment"
        type="Asset"
        subtitle="Desktop Computers (50 units)"
        date="26 Jan 2026"
        time="02:00 PM"
        location="IT Department, Main Office"
        phase="Physical Verification"
        assignee="External Audit Agency"
        role="External Agency"
      />

      <InspectionCard
        id="INS-2026-003"
        status="In Progress"
        priority="High"
        title="Road Construction Quality Check"
        type="Project"
        subtitle="Road Development Phase 2"
        date="24 Jan 2026"
        time="09:00 AM"
        location="MG Road Extension"
        phase="Surface Laying"
        assignee="Amit Patel"
        role="Internal Staff"
      />
    </div>
  )
}

/* ---------- REMINDER ---------- */
function Reminder({ title, id, due }: any) {
  return (
    <div className="bg-white border border-orange-200 rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-800">{title}</p>
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
    status === "In Progress"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700"

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">

      {/* HEADER */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-semibold text-gray-800">{id}</span>
        <span className={`px-3 py-0.5 rounded-full text-xs ${statusColor}`}>
          {status}
        </span>
        <span className={`px-3 py-0.5 rounded-full text-xs ${priorityColor}`}>
          {priority} Priority
        </span>
      </div>

      {/* TITLE */}
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">
          {type} • {subtitle}
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <Detail icon={<Calendar />} label="Date & Time">
          {date}
          <br />
          {time}
        </Detail>

        <Detail icon={<MapPin />} label="Location">
          {location}
          <br />
          <span className="text-xs text-gray-500">
            Phase: {phase}
          </span>
        </Detail>

        <Detail icon={<User />} label="Assigned To">
          {assignee}
          <br />
          <span className="text-xs text-gray-500">{role}</span>
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
function Detail({ icon, label, children }: any) {
  return (
    <div className="flex gap-2">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-gray-800">{children}</p>
      </div>
    </div>
  )
}
