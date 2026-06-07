"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  motion,
} from "framer-motion";

import {
  Monitor,
  Smartphone,
  Laptop,
  Tv,
  Wifi,
  HardDrive,
  Printer,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Package2,
  ArrowUpRight,
  Layers3,
} from "lucide-react";

import { getDashboardAnalyticsApi } from "@/lib/dashboard.api";
import Link from "next/link";

const iconMap: any = {
  Laptop,
  Laptops: Laptop,
  Smartphone,
  Smartphones: Smartphone,
  Monitor,
  Monitors: Monitor,
  Tv,
  "LED Screens": Tv,
  Wifi,
  Routers: Wifi,
  HardDrive,
  "Hard Drives": HardDrive,
  Printer,
  Printers: Printer,
};

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-blue-500",
];

export default function DashboardPage() {

  const router = useRouter();
  const [showCategoriesModal, setShowCategoriesModal] =
    useState(false);

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);



  /* ---------------- AUTH ---------------- */

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, [router]);

  /* ---------------- FETCH ---------------- */

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const analytics =
          await getDashboardAnalyticsApi();

        setDashboardData(
          analytics.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);

  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const selectedData =
    selectedCategory === "ALL"
      ? dashboardData?.yearlyProcurement || []
      : dashboardData?.categories?.find(
        (c: any) =>
          c.name === selectedCategory
      )?.monthlyData || [];

  const selectedTotal =
    selectedCategory === "ALL"
      ? dashboardData?.overview
        ?.totalItemsProcured
      : dashboardData?.categories?.find(
        (c: any) =>
          c.name === selectedCategory
      )?.count || 0;

  const procurementChart =
    dashboardData?.yearlyProcurement || [];

  const complaints =
    dashboardData?.recentComplaints || [];

  /* ---------------- OVERVIEW ---------------- */

const overviewCards = useMemo(
  () => [
    {
      label: "Total Procured",
      value:
        dashboardData?.overview?.totalItemsProcured || 0,
      icon: Package2,
      gradient: "from-emerald-500 to-green-600",
      href: "/dashboard/inventory",
    },

    {
      label: "Warranty Ending",
      value:
        dashboardData?.overview?.warrantyEndingSoon || 0,
      icon: ShieldCheck,
      gradient: "from-blue-500 to-cyan-500",
      href: "/dashboard/inventory",
    },

    {
      label: "Complaints",
      value:
        dashboardData?.overview?.pendingComplaints || 0,
      icon: AlertTriangle,
      gradient: "from-red-500 to-rose-500",
      href: "/dashboard/complaints/view-complaint",
    },

    {
      label: "AMC Renewals",
      value:
        dashboardData?.overview?.pendingAmcRenewals || 0,
      icon: Activity,
      gradient: "from-indigo-500 to-violet-500",
      href: "/dashboard/inventory",
    },
  ],
  [dashboardData]
);

  /* ---------------- LOADING ---------------- */

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

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
            className="w-12 h-12 border-[4px] border-emerald-500 border-t-transparent rounded-full mx-auto"
          />

          <p className="text-black mt-3 text-sm font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  bg-[#f5f7fb]">

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
          duration: 0.5,
        }}
        className="w-full mx-auto space-y-4 overflow-hidden"
      >

        {/* HERO */}
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="
    relative
    overflow-hidden
    rounded-[28px]
    bg-[#0f172a]
    border
    border-white/[0.06]
    shadow-xl
    p-5
    text-white
  "
>

  {/* Glow */}

  <div className="absolute top-0 right-0 h-52 w-52 bg-emerald-500/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 h-40 w-40 bg-cyan-500/10 rounded-full blur-3xl" />

  <div className="relative z-10">

    {/* Header */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div className="flex items-center gap-3">

        <div
          className="
            h-11 w-11
            rounded-xl
            bg-emerald-500/15
            border border-emerald-500/20
            flex items-center justify-center
          "
        >
          <Activity className="h-5 w-5 text-emerald-400" />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <h1 className="text-lg font-semibold">
              Asset Dashboard
            </h1>

            <span
              className="
                px-2 py-0.5
                rounded-full
                bg-emerald-500/10
                text-emerald-400
                text-[10px]
                font-medium
              "
            >
              LIVE
            </span>

          </div>

          <p className="text-sm text-slate-400 mt-1">
            Assets, complaints & warranty overview
          </p>

        </div>

      </div>

      <div
        className="
          px-3 py-2
          rounded-xl
          bg-white/[0.03]
          border border-white/[0.06]
        "
      >
        <div className="flex items-center gap-2">

          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

          <span className="text-xs text-slate-300">
            System Operational
          </span>

        </div>
      </div>

    </div>

    {/* KPI Cards */}

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3">

        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Assets
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {dashboardData?.overview?.totalItemsProcured || 0}
        </h2>

      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3">

        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Categories
        </p>

        <h2 className="text-2xl font-bold text-cyan-400 mt-2">
          {dashboardData?.categories?.length || 0}
        </h2>

      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3">

        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Complaints
        </p>

        <h2 className="text-2xl font-bold text-amber-400 mt-2">
          {dashboardData?.overview?.pendingComplaints || 0}
        </h2>

      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3">

        <p className="text-[11px] uppercase tracking-wider text-slate-500">
          Warranty Due
        </p>

        <h2 className="text-2xl font-bold text-rose-400 mt-2">
          {dashboardData?.overview?.warrantyEndingSoon || 0}
        </h2>

      </div>

    </div>

  </div>

</motion.div>
        {/* CATEGORY */}

<div className="space-y-3 ml-2">

  {/* Header */}

  <div className="flex items-center justify-between my-6">

    <div>
      <h2 className="text-xl font-semibold text-slate-900">
        Product Categories
      </h2>

      <p className="text-xs text-slate-500">
        Asset distribution across categories
      </p>
    </div>

    <button
      onClick={() => setShowCategoriesModal(true)}
      className="
        px-3
        py-1.5
        rounded-lg
        bg-emerald-50
        text-emerald-700
        text-xs
        font-medium
        hover:bg-emerald-100
        transition-all
      "
    >
      View All
    </button>

  </div>

  {/* Categories Grid */}

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

    {dashboardData?.categories?.map(
      (cat: any, i: number) => {

        const Icon =
          iconMap[cat.name] || Laptop;

        const gradient =
          gradients[i % gradients.length];

        return (
          <motion.div
            key={cat.name}
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: i * 0.05,
            }}
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-200/70
              bg-white
              p-3
              shadow-sm
              hover:shadow-lg
              transition-all
              cursor-pointer
            "
            onClick={()=>router.push("/dashboard/asset/asset-category")}
          >

            {/* Top Accent */}

            <div
              className={`
                absolute
                top-0
                left-0
                h-[3px]
                w-full
                bg-gradient-to-r
                ${gradient}
              `}
            />

            {/* Glow */}

            <div
              className={`
                absolute
                -top-8
                -right-8
                h-24
                w-24
                rounded-full
                bg-gradient-to-br
                ${gradient}
                opacity-10
                blur-2xl
              `}
            />

            <div className="relative z-10">

              {/* Top */}

              <div className="flex items-center justify-between">

                <div
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    ${gradient}
                    flex
                    items-center
                    justify-center
                    text-white
                    shadow
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className="
                    px-2
                    py-0.5
                    rounded-full
                    bg-emerald-50
                    text-emerald-700
                    text-[10px]
                    font-medium
                  "
                >
                  Active
                </span>

              </div>

              {/* Content */}

              <div className="mt-3">

                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-900
                    truncate
                  "
                >
                  {cat.name}
                </h3>

                <div className="mt-2 flex items-end justify-between">

                  <div>

                    <p className="text-[10px] text-slate-500">
                      Assets
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 leading-none mt-1">
                      {String(cat.count).padStart(2, "0")}
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-emerald-600
                      text-[11px]
                      font-medium
                    "
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        );
      }
    )}

  </div>

</div>


        {/* OVERVIEW */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-1">
 {overviewCards.map((item, index) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.label}
      href={item.href}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="
          cursor-pointer
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200/70
          bg-white
          p-5
          shadow-sm
          hover:shadow-xl
          transition-all cursor-pointer
        "
      >
        {/* Glow Effect */}

        <div
          className={`
            absolute
            -top-10
            -right-10
            w-36
            h-36
            bg-gradient-to-br
            ${item.gradient}
            opacity-10
            blur-3xl
            group-hover:opacity-20
            transition-all
          `}
        />

        {/* Top Row */}

        <div className="relative flex justify-between items-start">

          <div className="flex-1">

            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              {item.label}
            </p>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              {item.value}
            </h2>

          </div>

          <div
            className={`
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-br
              ${item.gradient}
              flex
              items-center
              justify-center
              text-white
              shadow-lg
              shrink-0
            `}
          >
            <Icon className="w-5 h-5" />
          </div>

        </div>

        {/* Bottom Row */}

        <div className="relative mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs text-gray-500">
              Updated now
            </span>

          </div>

          <div
            className="
              px-2.5
              py-1
              rounded-full
              bg-emerald-50
              text-emerald-700
              text-xs
              font-medium
            "
          >
            +12%
          </div>

        </div>
      </motion.div>
      </Link>
    );
  })}
</div>
      </motion.div>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

        {/* LEFT SIDE */}
<div
  className="
    bg-white
    rounded-3xl
    border
    border-slate-200/70
    shadow-sm
    p-5
  "
>

  {/* Header */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

    <div>
      <h2 className="text-lg font-semibold text-slate-900">
        Yearly Procurement
      </h2>

      <p className="text-xs text-slate-500 mt-1">
        Monthly procurement distribution by category
      </p>
    </div>

    <div className="flex gap-2 flex-wrap">

      <select
        className="
          h-9
          px-3
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
          outline-none
        "
      >
        <option>2026</option>
      </select>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
        className="
          h-9
          px-3
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
          outline-none
        "
      >
        <option value="ALL">
          All Categories
        </option>

        {dashboardData?.categories?.map(
          (category: any) => (
            <option
              key={category.name}
              value={category.name}
            >
              {category.name}
            </option>
          )
        )}
      </select>

    </div>

  </div>

  {/* Body */}

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">

    {/* Chart */}

    <div
      className="
        bg-slate-50
        rounded-2xl
        p-4
        border
        border-slate-100
      "
    >

      <div className="flex items-end justify-between h-[240px]">

        {selectedData?.map(
          (item: any) => {

            const maxValue = Math.max(
              ...dashboardData.yearlyProcurement.map(
                (m: any) => m.count
              )
            );

            return (
              <div
                key={item.month}
                className="
                  flex
                  flex-col
                  items-center
                  flex-1
                  group
                "
              >

                <span
                  className="
                    text-[11px]
                    font-semibold
                    text-slate-600
                    mb-2
                  "
                >
                   {item.count}
                </span>

                <div
                  className="
                    w-7
                    rounded-t-xl
                    bg-gradient-to-t
                    from-emerald-600
                    via-emerald-500
                    to-emerald-300
                    transition-all
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    height: `${
                      item.count > 0
                        ? Math.max(
                            (item.count / maxValue) *
                              180,
                            6
                          )
                        : 4
                    }px`,
                  }}
                />

                <span
                  className="
                    text-[11px]
                    text-slate-500
                    mt-2
                  "
                >
                  {item.month}
                </span>

              </div>
            );
          }
        )}

      </div>

    </div>

    {/* Summary Card */}

    <div
      className="
        relative
        overflow-hidden
        rounded-2xl mr-8
        bg-gradient-to-br
        from-emerald-600
        via-green-600
        to-teal-600
        text-white
        p-5
        flex
        flex-col
        justify-between
      "
    >

      {/* Glow */}

      <div
        className="
          absolute
          top-0
          right-0
          w-32
          h-32
          bg-white/10
          rounded-full
          blur-3xl
        "
      />

      <div
  className="
    relative
    z-10
    flex
    flex-col
    items-center
    text-center
    h-full
    justify-center
  "
>

  <div
    className="
      w-12
      h-12
      rounded-xl
      bg-white/15
      backdrop-blur
      flex
      items-center
      justify-center
    "
  >
    <Laptop className="w-6 h-6" />
  </div>

  <p className="text-white/80 text-sm mt-4">
    Total Procured
  </p>

  <h2 className="text-3xl font-bold mt-2">
    {selectedTotal}
  </h2>

</div>

      <div className="relative z-10 mt-6">

        <div
          className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            bg-white/10
            text-xs
          "
        >
          <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          Live Data
        </div>

      </div>

    </div>

  </div>

</div>


        {/* RIGHT SIDE */}
        <div
  className="
    bg-white
    rounded-3xl
    border
    border-slate-200/70
    shadow-sm
    overflow-hidden
  "
>

  {/* Header */}

  <div
    className="
      flex
      items-center
      justify-between
      px-5
      py-4
      border-b
      border-slate-100
    "
  >

    <div>

      <h2 className="text-lg font-semibold text-slate-900">
        Recent Complaints
      </h2>

      <p className="text-xs text-slate-500 mt-1">
        Latest submitted issues and requests
      </p>

    </div>

    <div
      className="
        px-3
        py-1
        rounded-full
        bg-red-50
        text-red-600
        text-xs
        font-medium
      "
    >
      {complaints?.length || 0} Active
    </div>

  </div>

  {complaints?.length > 0 ? (

    <>

      <div className="p-4 space-y-3">

        {complaints
          .slice(0, 5)
          .map(
            (
              item: any,
              index: number
            ) => {

              const badgeColor =
                item.urgency === "HIGH"
                  ? "bg-red-50 text-red-600 border-red-100"
                  : item.urgency ===
                    "MEDIUM"
                    ? "bg-orange-50 text-orange-600 border-orange-100"
                    : "bg-blue-50 text-blue-600 border-blue-100";

              return (

                <motion.div
                  key={
                    item.id ||
                    index
                  }
                  whileHover={{
                    x: 4,
                  }}
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                    p-3
                    rounded-2xl
                    border
                    border-slate-100
                    hover:border-emerald-200
                    hover:bg-slate-50
                    transition-all
                  "
                >

                  <div className="flex gap-3 flex-1">

                    {/* Status Dot */}

                    <div
                      className={`
                        mt-2
                        h-2.5
                        w-2.5
                        rounded-full
                        ${
                          item.urgency ===
                          "HIGH"
                            ? "bg-red-500"
                            : item.urgency ===
                              "MEDIUM"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }
                      `}
                    />

                    <div className="min-w-0 flex-1">

                      <h3
                        className="
                          text-sm
                          font-semibold
                          text-slate-900
                          truncate
                        "
                      >
                        {item.title}
                      </h3>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >

                        <span>
                          {item.fullName ||
                            "System"}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month:
                                "short",
                              day: "2-digit",
                            }
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Priority Badge */}

                  <span
                    className={`
                      px-2.5
                      py-1
                      rounded-full
                      text-[11px]
                      font-semibold
                      border
                      whitespace-nowrap
                      ${badgeColor}
                    `}
                  >
                    {item.urgency}
                  </span>

                </motion.div>

              );
            }
          )}

      </div>

      {/* Footer */}

      <div
        className="
          px-5
          py-4
          border-t
          border-slate-100
          bg-slate-50/50
        "
      >

        <Link
          href="/dashboard/complaints/view-complaint"
          className="
            flex
            items-center
            justify-center
            gap-2
            text-sm
            font-medium
            text-emerald-600
            hover:text-emerald-700
            transition
          "
        >
          View All Complaints

          <span>
            →
          </span>

        </Link>

      </div>

    </>

  ) : (

    <div
      className="
        h-[250px]
        flex
        flex-col
        items-center
        justify-center
        text-slate-400
      "
    >

      <div className="text-4xl mb-3">
        📭
      </div>

      <p className="text-sm">
        No Recent Complaints
      </p>

    </div>

  )}

</div>

      </div>


   {showCategoriesModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      className="
        w-full
        max-w-4xl
        bg-white
        rounded-[32px]
        shadow-[0_25px_80px_rgba(0,0,0,0.25)]
        overflow-hidden
      "
    >

      {/* Premium Header */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-emerald-600
          via-green-600
          to-teal-600
          px-6
          py-5
          text-white
        "
      >

        <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-white/15
                backdrop-blur-xl
                border border-white/10
                flex items-center justify-center
              "
            >
              <Layers3 className="h-7 w-7" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Product Categories
              </h2>

              <p className="text-sm text-white/80 mt-1">
                Browse all inventory categories
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setShowCategoriesModal(false)
            }
            className="
              h-11
              w-11
              rounded-xl
              bg-white/15
              hover:bg-white/20
              transition-all
              cursor-pointer
              flex
              items-center
              justify-center
              text-lg
            "
          >
            ✕
          </button>

        </div>

        {/* Quick Stats */}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/10">

            <p className="text-xs text-white/70">
              Categories
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {dashboardData?.categories?.length || 0}
            </h3>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/10">

            <p className="text-xs text-white/70">
              Total Assets
            </p>

            <h3 className="text-2xl font-bold mt-1">
              {dashboardData?.categories?.reduce(
                (acc: number, item: any) =>
                  acc + item.count,
                0
              )}
            </h3>

          </div>

          <div className="hidden sm:block bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/10">

            <p className="text-xs text-white/70">
              Status
            </p>

            <h3 className="text-2xl font-bold mt-1">
              Active
            </h3>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 max-h-[70vh] overflow-y-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {dashboardData?.categories?.map(
            (cat: any, index: number) => {

              const Icon =
                iconMap[cat.name] || Laptop;

              const gradient =
                gradients[
                  index % gradients.length
                ];

              return (
                <motion.div
                  key={cat.name}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-100
                    bg-white
                    p-4
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                  "
                >

                  <div
                    className={`
                      absolute
                      top-0
                      right-0
                      h-24
                      w-24
                      rounded-full
                      bg-gradient-to-br
                      ${gradient}
                      opacity-10
                      blur-2xl
                    `}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            h-12
                            w-12
                            rounded-2xl
                            bg-gradient-to-br
                            ${gradient}
                            flex
                            items-center
                            justify-center
                            text-white
                            shadow-lg
                          `}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-900">
                            {cat.name}
                          </h3>

                          <p className="text-xs text-slate-500">
                            Category
                          </p>

                        </div>

                      </div>

                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-emerald-100
                          text-emerald-700
                          text-xs
                          font-medium
                        "
                      >
                        Active
                      </span>

                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">

                      <div>

                        <p className="text-xs text-slate-500">
                          Assets
                        </p>

                        <h3 className="text-3xl font-bold text-slate-900 mt-1">
                          {cat.count}
                        </h3>

                      </div>

                      <div className="text-right">

                        <p className="text-xs text-slate-500">
                          Inventory
                        </p>

                        <p className="text-sm font-medium text-emerald-600 mt-1">
                          Available
                        </p>

                      </div>

                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

      </div>

    </motion.div>

  </div>
)}
    </div>
  );
}

/* MINI STAT */

function MiniStat({
  label,
  value,
}: any) {

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="bg-white/15 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden"
    >

      <p className="text-[11px] text-white break-words">
        {label}
      </p>

      <h3 className="text-lg font-bold mt-1 break-words">
        {value}
      </h3>
    </motion.div>
  );
}