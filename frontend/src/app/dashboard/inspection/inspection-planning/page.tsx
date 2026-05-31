"use client"

import { useEffect, useState } from "react"
import {  BarChart3 } from "lucide-react";

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

import { createInspectionReportApi, getInspectionsApi } from "@/lib/inspection.api"

export default function InspectionPage() {

  const [inspections, setInspections] =
    useState<any[]>([])

    const [openScheduleModal,
  setOpenScheduleModal] =
  useState(false);

const [inspectionForm,
  setInspectionForm] =
  useState({

    title: "",

    description: "",

    type: "GENERAL",

    priority: "MEDIUM",

    status: "SCHEDULED",

    scheduledDate: "",

    reminderDate: "",

    location: "",

    inspectorName: "",

    remarks: "",

    projectId: "",

    productId: "",
  });

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


const handleCreateInspection =
  async () => {

    try {

      const res =
        await createInspectionReportApi(
          inspectionForm
        );

      console.log(
        "SUCCESS",
        res
      );

      // refresh table
      await fetchInspections();

      // close modal
      setOpenScheduleModal(
        false
      );

      // reset form
      setInspectionForm({
        title: "",
        description: "",
        type: "GENERAL",
        priority: "MEDIUM",
        status: "SCHEDULED",
        scheduledDate: "",
        reminderDate: "",
        location: "",
        inspectorName: "",
        remarks: "",
        projectId: "",
        productId: "",
      });

    } catch (error) {

      console.error(
        "ERROR",
        error
      );
    }
  };

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white shadow-sm">

        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-sm shrink-0">

                <ClipboardCheck className="w-6 h-6" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl md:text-2xl font-bold break-words">
                  Inspection Planning
                </h1>

                <p className="text-green-50 mt-1 text-xs leading-5 break-words">
                  Schedule & manage inspections efficiently
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">

              <div>

                <h2 className="text-2xl font-bold break-words">
                  {inspections.length}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Total Inspections
                </p>
              </div>

              <div>

                <h2 className="text-2xl font-bold break-words">
                  {completed}
                </h2>

                <p className="text-green-100 text-[11px] mt-1">
                  Completed
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-3 w-full xl:w-[310px]">

            <MiniCard
              icon={ShieldCheck}
              title="Compliance"
              value="98%"
            />

            <MiniCard
              icon={Activity}
              title="Pending"
              value={pending}
            />
          </div>
        </div>
      </div>

      {/* ACTION BAR */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* LEFT */}

          {/* <div className="flex flex-wrap gap-2">

            <button className="h-10 px-4 rounded-xl bg-emerald-600 text-white text-sm font-medium shadow-sm whitespace-nowrap">
              List View
            </button>

            <button className="h-10 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-sm font-medium text-black whitespace-nowrap">
              Calendar View
            </button>
          </div> */}

          {/* RIGHT */}

          <div className="flex flex-wrap gap-2">

             <button
  onClick={() =>
    setOpenScheduleModal(
      true
    )
  }
  className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-white text-sm cursor-pointer font-medium flex items-center gap-2 shadow-sm whitespace-nowrap"
>

            {/* <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-95 transition text-white text-sm font-medium flex items-center gap-2 shadow-sm whitespace-nowrap"> */}

              <Plus className="w-4 h-4" />

              Schedule Inspection
            </button>

           
          </div>
        </div>
      </div>

      {/* OVERVIEW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

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

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">

            <Bell className="w-5 h-5 text-orange-600" />
          </div>

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              Upcoming Reminders
            </h2>

            <p className="text-xs text-black mt-1">
              Scheduled inspections requiring attention
            </p>
          </div>
        </div>

        {reminders.length ===
        0 ? (

          <div className="bg-white rounded-xl p-4 text-center text-sm text-black border border-orange-100">
            No upcoming reminders
          </div>

        ) : (

          <div className="space-y-3">

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

        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-black shadow-sm">
          Loading inspections...
        </div>

      ) : inspections.length ===
        0 ? (

        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-sm text-black shadow-sm">
          No inspections found
        </div>

      ) : (

        <div className="space-y-4">

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


      {openScheduleModal && (

  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

    <div className="bg-white rounded-2xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-semibold">
          Schedule Inspection
        </h2>

        <button
          onClick={() =>
            setOpenScheduleModal(
              false
            )
          }
        >
          ✕
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <InputField
          label="Title"
          value={
            inspectionForm.title
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              title: v,
            })
          }
        />

        <InputField
          label="Inspector"
          value={
            inspectionForm.inspectorName
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              inspectorName: v,
            })
          }
        />

        <InputField
          label="Type"
          value={
            inspectionForm.type
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              type: v,
            })
          }
        />

        <InputField
          label="Priority"
          value={
            inspectionForm.priority
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              priority: v,
            })
          }
        />

        <InputField
          type="datetime-local"
          label="Scheduled Date"
          value={
            inspectionForm.scheduledDate
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              scheduledDate: v,
            })
          }
        />

        <InputField
          type="datetime-local"
          label="Reminder Date"
          value={
            inspectionForm.reminderDate
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              reminderDate: v,
            })
          }
        />

      </div>

      <div className="mt-4">

        <InputField
          label="Location"
          value={
            inspectionForm.location
          }
          onChange={(v) =>
            setInspectionForm({
              ...inspectionForm,
              location: v,
            })
          }
        />

      </div>

      <div className="mt-4">

        <textarea
          rows={4}
          value={
            inspectionForm.description
          }
          onChange={(e) =>
            setInspectionForm({
              ...inspectionForm,
              description:
                e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Description"
        />

      </div>

      <div className="mt-4">

        <textarea
          rows={3}
          value={
            inspectionForm.remarks
          }
          onChange={(e) =>
            setInspectionForm({
              ...inspectionForm,
              remarks:
                e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Remarks"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() =>
            setOpenScheduleModal(
              false
            )
          }
          className="h-10 px-4 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={
            handleCreateInspection
          }
          className="h-10 px-4 rounded-xl bg-emerald-600 text-white"
        >
          Schedule Inspection
        </button>

      </div>

    </div>

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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-sm shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-green-50 break-words">
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

/* ---------------- OVERVIEW CARD ---------------- */


function OverviewCard({
  title,
  value,
  gradient,
  icon: Icon = BarChart3,
}: any) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      
      <div
        className={`absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-r ${gradient} opacity-10 blur-2xl`}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${gradient} text-white shadow-sm`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-gray-500 truncate">
            {title}
          </p>

          <h2 className="text-xl font-bold leading-tight text-gray-900">
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REMINDER ---------------- */

function Reminder({
  title,
  id,
  due,
}: any) {

  return (
    <div className="bg-white border border-orange-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-sm transition overflow-hidden">

      <div className="min-w-0">

        <p className="font-semibold text-sm text-black break-words">
          {title}
        </p>

        <p className="text-xs text-black mt-1 break-words">
          Inspection ID: {id}
        </p>
      </div>

      <span className="inline-flex items-center px-3 py-2 rounded-xl bg-orange-100 text-orange-700 text-xs font-medium whitespace-nowrap">
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
    <div className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">

      {/* TOP */}

      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">

        <div className="space-y-3 min-w-0">

          <div className="flex flex-wrap gap-2 items-center">

            <span className="font-semibold text-black text-sm break-words">
              {id}
            </span>

            <span
              className={`px-3 py-1 rounded-xl text-[11px] font-medium ${statusColor}`}
            >
              {status}
            </span>

            <span
              className={`px-3 py-1 rounded-xl text-[11px] font-medium ${priorityColor}`}
            >
              {priority}
            </span>
          </div>

          <div className="min-w-0">

            <h3 className="text-lg font-semibold text-black break-words">
              {title}
            </h3>

            <p className="text-black mt-1 text-xs break-words">
              {type} • {subtitle}
            </p>
          </div>
        </div>

        {/* <div className="flex gap-2 flex-wrap">

          <button className="h-9 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition text-blue-700 text-sm font-medium whitespace-nowrap">
            Edit
          </button>

          <button className="h-9 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition text-orange-700 text-sm font-medium whitespace-nowrap">
            Reminder
          </button>
        </div> */}
      </div>

      {/* DETAILS */}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

        <Detail
          icon={<Calendar className="w-4 h-4" />}
          label="Date & Time"
        >
          {date}
          <br />
          {time}
        </Detail>

        <Detail
          icon={<MapPin className="w-4 h-4" />}
          label="Location"
        >
          {location}

          <div className="text-[11px] text-black mt-1 break-words">
            Phase: {phase}
          </div>
        </Detail>

        <Detail
          icon={<User className="w-4 h-4" />}
          label="Assigned To"
        >
          {assignee}

          <div className="text-[11px] text-black mt-1 break-words">
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
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 overflow-hidden">

      <div className="flex gap-3">

        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-black shrink-0">

          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[10px] font-semibold uppercase tracking-wide text-black break-words">
            {label}
          </p>

          <div className="text-black mt-2 text-sm leading-5 break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


function InputField({
  label,
  value,
  onChange,
  type = "text",
}: any) {

  return (
    <div>

      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full h-10 border border-gray-200 rounded-xl px-3"
      />

    </div>
  );
}