"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Filter,
  Plus,
  Search,
} from "lucide-react";

export const projects = [
  {
    id: "PRJ-2026-001",
    name: "Rural Road Construction - Phase 1",
    category: "Infrastructure",
    scheme: "PMGSY",
    department: "Public Works",
    location: "Block-A, Panchayat-1",
    start: "2026-01-15",
    end: "2026-12-31",
    status: "Ongoing",
    budget: "₹45,00,000",
    progress: 65,
  },
  {
    id: "PRJ-2026-002",
    name: "Primary School Renovation",
    category: "Education",
    scheme: "SSA",
    department: "Education",
    location: "Ward-3, Municipality",
    start: "2025-11-01",
    end: "2026-03-31",
    status: "Completed",
    budget: "₹12,50,000",
    progress: 100,
  },
  {
    id: "PRJ-2026-003",
    name: "Water Supply Pipeline",
    category: "Water Supply",
    scheme: "Jal Jeevan Mission",
    department: "Water Resources",
    location: "District Central",
    start: "2026-02-01",
    end: "2026-08-31",
    status: "Delayed",
    budget: "₹85,00,000",
    progress: 35,
  },
  {
    id: "PRJ-2026-004",
    name: "Community Health Center Setup",
    category: "Healthcare",
    scheme: "NRHM",
    department: "Health & Family Welfare",
    location: "Block-B, Panchayat-5",
    start: "2026-06-01",
    end: "2027-05-31",
    status: "Pending",
    budget: "₹1,20,00,000",
    progress: 0,
  },
  {
    id: "PRJ-2026-005",
    name: "LED Street Light Installation",
    category: "Energy",
    scheme: "SAUBHAGYA",
    department: "Electricity",
    location: "Ward-1, Municipality",
    start: "2026-01-10",
    end: "2026-06-30",
    status: "Ongoing",
    budget: "₹22,00,000",
    progress: 78,
  },
];

export default function ProductTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) =>
      `${p.name} ${p.id} ${p.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6 w-full overflow-hidden">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 md:p-8 shadow-xl">

  <div className="absolute right-0 top-0 w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl" />

  <div className="relative z-10 flex flex-col xl:flex-row xl:justify-between gap-8">

    {/* LEFT */}
    <div className="flex-1">

      {/* TITLE SECTION */}
      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">

          <Building2 className="w-8 h-8 text-white" />
        </div>

        <div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Project Management
          </h1>

          <p className="text-white/80 mt-2 max-w-2xl leading-7">
            Monitor infrastructure projects, track execution &
            manage progress seamlessly.
          </p>
        </div>
      </div>

      {/* STATS CARDS BELOW TITLE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-4xl">

        <MiniCard
          title="Completed"
          value="1"
          color="from-emerald-500 to-green-500"
        />

        <MiniCard
          title="Ongoing"
          value="2"
          color="from-blue-500 to-cyan-500"
        />

        <MiniCard
          title="Delayed"
          value="1"
          color="from-rose-500 to-pink-500"
        />
      </div>
    </div>

    {/* OPTIONAL RIGHT SIDE */}
    <div className="hidden xl:flex items-end">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 min-w-[260px] shadow-2xl">

        <p className="text-sm text-white/70">
          Active Progress
        </p>

        <h2 className="text-5xl font-black text-white mt-3">
          78%
        </h2>

        <div className="mt-5 w-full h-3 bg-white/15 rounded-full overflow-hidden">

          <div className="w-[78%] h-full rounded-full bg-white" />
        </div>

        <p className="text-xs text-white/70 mt-3">
          Infrastructure execution performance
        </p>
      </div>
    </div>
  </div>
</div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-4 md:p-5">

        <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

          {/* SEARCH */}
          <div className="relative w-full xl:max-w-[420px]">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search by Project Name / ID / Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full h-14 rounded-2xl border border-gray-200
              bg-[#f8fafc]
              pl-12 pr-4
              text-sm
              outline-none
              transition-all
              focus:ring-4 focus:ring-emerald-100
              focus:border-emerald-500
            "
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">

            <button
              className="
              h-12 px-5 rounded-2xl border border-gray-200
              bg-white text-gray-700 text-sm font-medium
              hover:border-emerald-500 hover:text-emerald-600
              transition-all duration-300
              flex items-center gap-2
            "
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() =>
                router.push("/dashboard/project-management/new")
              }
              className="
              h-12 px-5 rounded-2xl
              bg-gradient-to-r from-emerald-500 to-green-500
              text-white text-sm font-semibold
              shadow-lg shadow-emerald-100
              hover:scale-[1.02]
              transition-all duration-300
              flex items-center gap-2
            "
            >
              <Plus className="w-4 h-4" />
              Add New Project
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="px-6 md:px-8 pt-8 pb-6 border-b border-gray-100">
          <h2 className="text-3xl font-black text-gray-900">
            Project Directory
          </h2>

          <p className="text-gray-500 mt-2">
            Track project execution, status & timelines.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-[#fafbfc] border-b border-gray-100">

              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-5 font-semibold">
                  Project
                </th>

                <th className="px-6 py-5 font-semibold">
                  Category
                </th>

                <th className="px-6 py-5 font-semibold">
                  Department
                </th>

                <th className="px-6 py-5 font-semibold">
                  Location
                </th>

                <th className="px-6 py-5 font-semibold">
                  Timeline
                </th>

                <th className="px-6 py-5 font-semibold">
                  Status
                </th>

                <th className="px-6 py-5 font-semibold">
                  Budget
                </th>

                <th className="px-6 py-5 font-semibold">
                  Progress
                </th>

                <th className="px-6 py-5 font-semibold text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((item, i) => (

                <tr
                  key={i}
                  className="
                  border-b border-gray-100
                  hover:bg-emerald-50/40
                  transition-all duration-300
                "
                >

                  {/* PROJECT */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                        w-14 h-14 rounded-2xl
                        bg-gradient-to-br from-emerald-500 to-green-500
                        flex items-center justify-center
                        shadow-lg shadow-emerald-100
                      "
                      >
                        <Building2 className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 max-w-[220px] truncate">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-1">

                          <span className="text-xs text-gray-500">
                            {item.id}
                          </span>

                          <span className="w-1 h-1 rounded-full bg-gray-300" />

                          <span className="text-xs text-emerald-600 font-medium">
                            {item.scheme}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-5">

                    <span
                      className="
                      px-4 py-2 rounded-full
                      bg-blue-50 text-blue-600
                      text-xs font-semibold
                    "
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* DEPARTMENT */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.department}
                      </p>
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td className="px-6 py-5">
                    <p className="text-gray-700">
                      {item.location}
                    </p>
                  </td>

                  {/* TIMELINE */}
                  <td className="px-6 py-5">

                    <div className="space-y-1 text-sm">

                      <div className="flex items-center gap-2 text-gray-700">
                        <CalendarDays className="w-4 h-4 text-emerald-500" />
                        {item.start}
                      </div>

                      <p className="text-gray-400 text-xs">
                        to {item.end}
                      </p>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">

                    <StatusBadge status={item.status} />
                  </td>

                  {/* BUDGET */}
                  <td className="px-6 py-5">

                    <span className="font-semibold text-gray-800">
                      {item.budget}
                    </span>
                  </td>

                  {/* PROGRESS */}
                  <td className="px-6 py-5 min-w-[180px]">

                    <div className="space-y-2">

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          Completion
                        </span>

                        <span className="font-bold text-emerald-600">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">

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
                  <td className="px-6 py-5 text-right">

                    <button
                      className="
                      inline-flex items-center gap-2
                      px-5 h-11 rounded-2xl
                      bg-gray-900 text-white text-sm font-medium
                      hover:bg-emerald-600
                      transition-all duration-300
                    "
                    >
                      View
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-6 md:px-8 py-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing {filtered.length} projects
          </p>

          <div className="flex items-center gap-3">

            <button
              className="
              h-11 px-5 rounded-2xl border border-gray-200
              text-sm font-medium text-gray-700
              hover:border-emerald-500 hover:text-emerald-600
              transition-all
            "
            >
              Previous
            </button>

            <button
              className="
              h-11 px-5 rounded-2xl
              bg-gradient-to-r from-emerald-500 to-green-500
              text-white text-sm font-semibold
              shadow-lg shadow-emerald-100
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

/* STATUS BADGE */

function StatusBadge({ status }: { status: string }) {

  const styles =
    status === "Ongoing"
      ? "bg-emerald-50 text-emerald-600"
      : status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Delayed"
      ? "bg-red-100 text-red-600"
      : "bg-gray-100 text-gray-600";

  return (
    <span
      className={`
      px-4 py-2 rounded-full
      text-xs font-bold
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
      bg-white/10 backdrop-blur-md
      border border-white/10
      rounded-3xl
      p-5
      shadow-lg
    "
    >
      <div className="flex items-start justify-between">

        <div
          className={`
          w-14 h-14 rounded-2xl
          bg-gradient-to-br ${color}
          flex items-center justify-center
          shadow-lg
        `}
        >
          <Building2 className="w-6 h-6 text-white" />
        </div>

        <ArrowRight className="w-5 h-5 text-white/60" />
      </div>

      <div className="mt-6">

        <p className="text-white/80 text-sm">
          {title}
        </p>

        <h2 className="text-5xl font-black text-white mt-2">
          {value}
        </h2>
      </div>
    </div>
  );
}