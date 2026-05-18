"use client"

import {
  Plus,
  Search,
  Building2,
  Users,
  CheckCircle,
  AlertCircle,
  Pencil,
  ArrowUpRight,
  Activity,
  ShieldCheck,
} from "lucide-react"

const stats = [
  {
    title: "Total Departments",
    value: "10",
    icon: Building2,
    gradient:
      "from-blue-500 to-cyan-500",
  },
  {
    title: "Total Staff",
    value: "966",
    icon: Users,
    gradient:
      "from-emerald-500 to-green-600",
  },
  {
    title: "Total Assets",
    value: "14,250",
    icon: CheckCircle,
    gradient:
      "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Active Depts",
    value: "10",
    icon: AlertCircle,
    gradient:
      "from-orange-500 to-amber-500",
  },
]

const departments = [
  {
    name: "Advertisement",
    code: "ADV",
    desc:
      "Manages all advertising and promotional activities",
    admin: "Suresh Mehta",
    staff: 45,
    assets: 320,
    status: "Active",
  },
  {
    name: "Building / Nirman",
    code: "BLD",
    desc:
      "Oversees construction and building projects",
    admin: "Priya Sharma",
    staff: 120,
    assets: 1850,
    status: "Active",
  },
  {
    name: "Finance",
    code: "FIN",
    desc:
      "Financial management and budgeting",
    admin: "Rajesh Kumar",
    staff: 78,
    assets: 890,
    status: "Active",
  },
]

export default function DepartmentManagementPage() {

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

                <Building2 className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Department Management
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Manage departments, administrators & organizational resources
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  10
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Departments
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  14K+
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Managed Assets
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Active Departments"
              value="10"
            />

            <MiniCard
              icon={Users}
              title="Total Staff"
              value="966"
            />

            <MiniCard
              icon={Activity}
              title="System Health"
              value="Stable"
            />
          </div>
        </div>
      </div>

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* SEARCH */}

        <div className="relative w-full xl:w-[420px]">

          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

          <input
            placeholder="Search departments..."
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* ACTION */}

        <button className="h-12 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg">

          <Plus className="w-4 h-4" />

          Add Department
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map(
          (
            s,
            i
          ) => (

            <StatsCard
              key={i}
              title={s.title}
              value={s.value}
              icon={s.icon}
              gradient={s.gradient}
            />
          )
        )}
      </div>

      {/* DEPARTMENT GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {departments.map(
          (
            d,
            i
          ) => (

            <DepartmentCard
              key={i}
              data={d}
            />
          )
        )}
      </div>
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

/* ---------------- STATS CARD ---------------- */

function StatsCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-8 h-8" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

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

/* ---------------- DEPARTMENT CARD ---------------- */

function DepartmentCard({
  data,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* GLOW */}

      <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* TOP */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">

              <Building2 className="w-8 h-8" />
            </div>

            <div>

              <h3 className="text-2xl font-bold text-gray-800">
                {data.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Department Code:
                {" "}
                {data.code}
              </p>
            </div>
          </div>

          <span className="px-4 py-2 rounded-2xl bg-green-100 text-green-700 text-xs font-medium">

            {data.status}
          </span>
        </div>

        {/* DESC */}

        <p className="text-sm text-gray-600 leading-7 mt-6">
          {data.desc}
        </p>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-4 mt-8">

          <InfoCard
            title="Admin"
            value={data.admin}
          />

          <InfoCard
            title="Staff"
            value={data.staff}
          />

          <InfoCard
            title="Assets"
            value={data.assets}
          />
        </div>

        {/* ACTION */}

        <button className="mt-8 h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg">

          <Pencil className="w-4 h-4" />

          Edit Department
        </button>
      </div>
    </div>
  )
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
  title,
  value,
}: any) {

  return (
    <div className="bg-gray-50 rounded-[24px] p-4 border border-gray-100 text-center">

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <h4 className="text-sm font-semibold text-gray-800 mt-3 break-words">
        {value}
      </h4>
    </div>
  )
}