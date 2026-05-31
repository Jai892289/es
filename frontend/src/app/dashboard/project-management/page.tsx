"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Filter,
  Plus,
  Search,
} from "lucide-react";

import { getProjectsApi } from "@/lib/project.api";



export default function ProductTable() {

  const router = useRouter();

  const [projects, setProjects] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(true);

  const [search, setSearch] =
    useState("");

 const filtered = useMemo(() => {

  return projects.filter((p) =>
    `
      ${p.projectName}
      ${p.category}
      ${p.department}
      ${p.schemeName}
      ${p.location?.district}
      ${p.location?.state}
    `
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

}, [projects, search]);

  useEffect(() => {

  const fetchProjects =
    async () => {

      try {

        const res =
          await getProjectsApi();

        setProjects(
          res.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  fetchProjects();

}, []);

const completedCount =
  projects.filter(
    (p) =>
      p.status ===
      "Completed"
  ).length;

const ongoingCount =
  projects.filter(
    (p) =>
      p.status ===
      "Ongoing"
  ).length;

const pendingCount =
  projects.filter(
    (p) =>
      p.status ===
      "Pending"
  ).length;

  if (loading) {

  return (
    <div className="p-6">
      Loading projects...
    </div>
  );
}

  return (
    <div className="space-y-4 w-full overflow-x-hidden max-w-[1280px] mx-auto">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 shadow-sm">

        <div className="absolute right-0 top-0 w-[220px] h-[220px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:justify-between gap-4">

          {/* LEFT */}

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur border border-white/10 flex items-center justify-center shrink-0">

                <Building2 className="w-6 h-6 text-white" />
              </div>

              <div className="min-w-0">

                <h1 className="text-xl md:text-2xl font-bold text-white break-words">
                  Project Management
                </h1>

                <p className="text-white/90 mt-1 text-xs leading-5 break-words">
                  Monitor projects & execution progress
                </p>
              </div>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 max-w-2xl">

              <MiniCard
  title="Completed"
  value={String(completedCount)}
  color="from-emerald-500 to-green-500"
/>

<MiniCard
  title="Ongoing"
  value={String(ongoingCount)}
  color="from-blue-500 to-cyan-500"
/>

<MiniCard
  title="Pending"
  value={String(pendingCount)}
  color="from-orange-500 to-amber-500"
/>
            </div>
          </div>

          {/* RIGHT */}

          <div className="hidden xl:flex items-end">

            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-4 w-[200px] shadow-sm">

              <p className="text-xs text-white/80">
                Active Progress
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                78%
              </h2>

              <div className="mt-3 w-full h-2 bg-white/15 rounded-full overflow-hidden">

                <div className="w-[78%] h-full rounded-full bg-white" />
              </div>

              <p className="text-[11px] text-white/80 mt-2">
                Execution performance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 overflow-hidden">

        <div className="flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between">

          {/* SEARCH */}

          <div className="relative w-full xl:max-w-[320px]">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

            <input
              type="text"
              placeholder="Search project..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full h-10 rounded-xl border border-gray-200
                bg-gray-50
                pl-10 pr-3
                text-sm text-black
                outline-none
                transition-all
                focus:ring-2 focus:ring-emerald-100
                focus:border-emerald-500
                focus:bg-white
              "
            />
          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap items-center gap-2">

            {/* <button
              className="
                h-10 px-4 rounded-xl border border-gray-200
                bg-white text-black text-sm font-medium
                hover:border-emerald-500 hover:text-emerald-600
                transition
                flex items-center gap-2
                whitespace-nowrap
              "
            >
              <Filter className="w-4 h-4" />

              Filters
            </button> */}

            <button
              onClick={() =>
                router.push(
                  "/dashboard/project-management/new"
                )
              }
              className="
                h-10 px-4 rounded-xl
                bg-gradient-to-r from-emerald-500 to-green-500
                text-white text-sm font-semibold
                hover:opacity-95
                transition
                flex items-center gap-2
                whitespace-nowrap cursor-pointer
              "
            >
              <Plus className="w-4 h-4" />

              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="px-4 py-4 border-b border-gray-100">

          <h2 className="text-lg font-semibold text-black">
            Project Directory
          </h2>

          <p className="text-black mt-1 text-xs">
            Track project status & timelines
          </p>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[820px]">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr className="text-left text-[11px] uppercase tracking-wide text-black">

                <th className="px-4 py-3 font-semibold">
                  Project
                </th>

                <th className="px-4 py-3 font-semibold">
                  Category
                </th>

                <th className="px-4 py-3 font-semibold">
                  Department
                </th>

                {/* <th className="px-4 py-3 font-semibold">
                  Timeline
                </th> */}

                <th className="px-4 py-3 font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 font-semibold">
                  Budget
                </th>

                {/* <th className="px-4 py-3 font-semibold">
                  Progress
                </th> */}

                <th className="px-4 py-3 font-semibold text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filtered.map(
                (item, i) => (

                  <tr
                    key={i}
                    className="
                      border-b border-gray-100
                      hover:bg-emerald-50/30
                      transition
                    "
                  >

                    {/* PROJECT */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3 min-w-0">

                        <div
                          className="
                            w-10 h-10 rounded-xl
                            bg-gradient-to-br from-emerald-500 to-green-500
                            flex items-center justify-center
                            shrink-0
                          "
                        >

                          <Building2 className="w-4 h-4 text-white" />
                        </div>

                        <div className="min-w-0">

                          <h3 className="font-semibold text-black max-w-[220px] truncate text-sm">
                            {item.projectName}
                          </h3>

                          <div className="flex items-center gap-2 mt-1 flex-wrap">

                            <span className="text-[10px] text-black">
                              {item.projectId ||
item.id.slice(0, 8)}
                            </span>

                            <span className="w-1 h-1 rounded-full bg-gray-300" />

                            <span className="text-[10px] text-emerald-600 font-medium">
                              {item.schemeName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    {/* <td className="px-4 py-4">

                      <span
                        className="
                          px-3 py-1 rounded-full
                          bg-blue-50 text-blue-700
                          text-[11px] font-semibold
                          whitespace-nowrap
                        "
                      >
                        {item.category}
                      </span>
                    </td> */}

                    {/* DEPARTMENT */}

                    <td className="px-4 py-4">

                      <p className="font-medium text-black text-sm whitespace-nowrap">
                        {item.department}
                      </p>
                    </td>

                    {/* TIMELINE */}

                    <td className="px-4 py-4">

                      <div className="space-y-1 text-sm">

                        <div className="flex items-center gap-2 text-black whitespace-nowrap">

                          <CalendarDays className="w-4 h-4 text-emerald-500 shrink-0" />

                          {new Date(
  item.timeline?.startDate
).toLocaleDateString("en-GB")}
                        </div>

                        <p className="text-black text-[11px] whitespace-nowrap">
                          to {new Date(
  item.timeline?.endDate
).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-4 whitespace-nowrap">

                      <StatusBadge
                        status={
                          item.status
                        }
                      />
                    </td>

                    {/* BUDGET */}
{/* 
                    <td className="px-4 py-4">

                      <span className="font-semibold text-black text-sm whitespace-nowrap">
                        {item.budget}
                      </span>
                    </td> */}

                    {/* PROGRESS */}

                    <td className="px-4 py-4 min-w-[140px]">

                      <div className="space-y-2">

                        <div className="flex items-center justify-between text-[11px]">

                          <span className="text-black">
                            Completion
                          </span>

                          <span className="font-bold text-emerald-600">
                            {item.progress || 0}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                          <div
                            className="
                              h-full rounded-full
                              bg-gradient-to-r from-emerald-500 to-green-500
                            "
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* ACTION */}

                    <td className="px-4 py-4 text-right whitespace-nowrap">

                      <button
                        className="
                          inline-flex items-center gap-2
                          px-4 h-9 rounded-xl
                          bg-gray-900 text-white text-sm font-medium
                          hover:bg-emerald-600
                          transition cursor-pointer
                        "
                         onClick={() =>
    router.push(
      `/dashboard/project-management/${item.id}`
    )
  }
                      >
                        View

                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}

        <div className="px-4 py-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between border-t border-gray-100 overflow-hidden">

          <p className="text-sm text-black break-words">
            Showing {filtered.length} projects
          </p>

          <div className="flex items-center gap-2 flex-wrap">

            <button
              className="
                h-9 px-4 rounded-xl border border-gray-200
                text-sm font-medium text-black
                hover:border-emerald-500 hover:text-emerald-600
                transition
              "
            >
              Previous
            </button>

            <button
              className="
                h-9 px-4 rounded-xl
                bg-gradient-to-r from-emerald-500 to-green-500
                text-white text-sm font-semibold
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STATUS */

function StatusBadge({
  status,
}: {
  status: string;
}) {

  const styles =
    status === "Ongoing"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Delayed"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-black";

  return (
    <span
      className={`
        px-3 py-1 rounded-full
        text-[11px] font-semibold
        whitespace-nowrap
        ${styles}
      `}
    >
      {status}
    </span>
  );
}

/* MINI CARD */

function MiniCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="
        bg-white/10 backdrop-blur
        border border-white/10
        rounded-2xl
        p-4
        overflow-hidden
        hover:bg-white/15
        transition-all
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium text-white/75">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2 leading-none">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-12 h-12 rounded-xl
            bg-gradient-to-br ${color}
            flex items-center justify-center
            shrink-0
          `}
        >
          <Building2 className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}