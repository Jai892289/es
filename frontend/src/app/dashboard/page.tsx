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
        label:
          "Total Procured",

        value:
          dashboardData?.overview
            ?.totalItemsProcured || 0,

        icon: Package2,

        gradient:
          "from-emerald-500 to-green-600",
      },

      {
        label:
          "Warranty Ending",

        value:
          dashboardData?.overview
            ?.warrantyEndingSoon || 0,

        icon: ShieldCheck,

        gradient:
          "from-blue-500 to-cyan-500",
      },

      {
        label:
          "Complaints",

        value:
          dashboardData?.overview
            ?.pendingComplaints || 0,

        icon: AlertTriangle,

        gradient:
          "from-red-500 to-rose-500",
      },

      {
        label:
          "AMC Renewals",

        value:
          dashboardData?.overview
            ?.pendingAmcRenewals || 0,

        icon: Activity,

        gradient:
          "from-indigo-500 to-violet-500",
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
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 rounded-2xl p-5 shadow-md text-white"
        >

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* LEFT */}

            <div className="min-w-0">

              <div className="flex items-center gap-3">

                <motion.div
                  whileHover={{
                    rotate: 5,
                  }}
                  className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow shrink-0"
                >

                  <Activity className="w-6 h-6" />
                </motion.div>

                <div className="min-w-0">

                  <h1 className="text-xl font-semibold leading-tight break-words">
                    Asset Dashboard
                  </h1>

                  <p className="text-green-50 mt-1 text-xs break-words">
                    Real-time monitoring of assets & complaints
                  </p>
                </div>
              </div>

              {/* QUICK STATS */}

              <div className="flex flex-wrap items-center gap-5 mt-4">

                <div>

                  <h2 className="text-2xl font-bold leading-none">
                    {
                      dashboardData?.overview
                        ?.totalItemsProcured
                    }
                  </h2>

                  <p className="text-green-100 text-[11px] mt-1">
                    Total Assets
                  </p>
                </div>

                <div>

                  <h2 className="text-2xl font-bold leading-none">
                    {
                      dashboardData?.categories
                        ?.length
                    }
                  </h2>

                  <p className="text-green-100 text-[11px] mt-1">
                    Categories
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-2 w-full lg:w-[250px]">

              <MiniStat
                label="Health"
                value="94%"
              />

              <MiniStat
                label="Operational"
                value="89%"
              />

              <MiniStat
                label="Complaints"
                value={
                  dashboardData?.overview
                    ?.pendingComplaints || 0
                }
              />

              <MiniStat
                label="Warranty"
                value={
                  dashboardData?.overview
                    ?.warrantyEndingSoon || 0
                }
              />
            </div>
          </div>
        </motion.div>

        {/* CATEGORY */}

        <div className="overflow-hidden">

          <div className="flex items-center justify-between mb-3 gap-3">

            <h2 className="text-lg font-semibold text-black break-words">
              Product Categories
            </h2>

            <button
              onClick={() =>
                setShowCategoriesModal(true)
              }
              className="text-sm text-emerald-600 cursor-pointer font-medium whitespace-nowrap hover:text-emerald-700"
            >
              View All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">

            {dashboardData?.categories?.map(
              (cat: any, i: number) => {

                const Icon =
                  iconMap[cat.name] ||
                  Laptop;

                const gradient =
                  gradients[
                  i % gradients.length
                  ];

                return (
                  <motion.div
                    key={cat.name}
                    initial={{
                      opacity: 0,
                      y: 10,
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
                      y: -3,
                    }}
                    className="group min-w-[200px] bg-white border border-gray-100 hover:border-emerald-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >

                    <div className="flex items-start justify-between gap-2">

                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow shrink-0`}
                      >

                        <Icon className="w-5 h-5" />
                      </div>

                      {/* <ArrowUpRight className="w-4 h-4 text-black shrink-0" /> */}
                    </div>

                    <div className="mt-3 min-w-0">

                      <h3 className="text-sm font-semibold text-black break-words">
                        {cat.name}
                      </h3>

                      <div className="mt-3 flex items-end justify-between gap-2">

                        <h2 className="text-2xl font-bold text-black leading-none">
                          {String(
                            cat.count
                          ).padStart(2, "0")}
                        </h2>

                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium whitespace-nowrap">
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* OVERVIEW */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {overviewCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="relative overflow-hidden m-1 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${item.gradient} opacity-10 rounded-full blur-3xl`}
                />

                <div className="relative flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {item.label}
                    </p>

                    <h2 className="text-4xl font-bold text-black mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

  {/* LEFT SIDE */}
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

    

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-xl font-semibold text-blue-600">
        Yearly Procurement by Category
      </h2>

      <div className="flex gap-3">

        <select className="px-4 py-2 rounded-full bg-gray-100">
          <option>2026</option>
        </select>

        <select
  value={selectedCategory}
  onChange={(e) =>
    setSelectedCategory(e.target.value)
  }
  className="px-4 py-2 rounded-full bg-gray-100"
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

    <div className="flex gap-6">

      {/* CHART */}
      <div className="flex-1">

        <div className="flex items-end justify-between h-[260px]">

          {selectedData?.map(
            (item: any) => (
              <div
                key={item.month}
                className="flex flex-col items-center flex-1"
              >
                <span className="text-xs font-semibold mb-2">
                  {item.count}
                </span>

                <div
                  className="w-6 bg-emerald-500 rounded-t-md"
                  style={{
                    height: `${
                      item.count > 0
                        ? Math.max(
                            (item.count /
                              Math.max(
                                ...dashboardData.yearlyProcurement.map(
                                  (m: any) =>
                                    m.count
                                )
                              )) *
                              180,
                            5
                          )
                        : 2
                    }px`,
                  }}
                />

                <span className="text-xs mt-2">
                  {item.month}
                </span>
              </div>
            )
          )}

        </div>

      </div>

      {/* SUMMARY CARD */}
      <div className="w-[180px] bg-gray-50 rounded-3xl p-5 flex flex-col items-center justify-center">

        <Laptop className="w-10 h-10 text-indigo-500 mb-4" />

        <p className="text-center text-gray-500">
          Total Assets Procured
        </p>

        <h2 className="text-5xl font-bold text-emerald-500 mt-3">
          {
           selectedTotal
          }
        </h2>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}
 <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

  <h2 className="text-xl font-semibold text-blue-600 mb-8">
    Recent Complaints
  </h2>

  {complaints?.length > 0 ? (
    <>
      <div className="space-y-6">

        {complaints.slice(0, 5).map(
          (item: any, index: number) => (
            <div key={item.id || index}>

              <div className="flex items-start justify-between gap-4">

                <div className="flex-1">

                  <h3 className="text-[18px] font-medium text-[#24124d]">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-xs mt-2">
                    By {item.fullName || "System"}
                    {" | "}
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold text-white
                  ${
                    item.urgency === "HIGH"
                      ? "bg-red-500"
                      : item.urgency === "MEDIUM"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                >
                  {item.urgency}
                </span>

              </div>

              {index !== 4 &&
                index !== complaints.length - 1 && (
                  <div className="border-b border-gray-100 mt-5" />
              )}

            </div>
          )
        )}

      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">

        <Link
          href="/dashboard/complaints/view-complaint"
          className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition"
        >
          View All Complaints

          <span className="text-lg">
            →
          </span>
        </Link>

      </div>
    </>
  ) : (
    <div className="h-[320px] flex items-center justify-center text-gray-400">
      No Recent Complaints
    </div>
  )}

</div>

</div>


      {showCategoriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-semibold text-black">
                Product Categories
              </h2>

              <button
                onClick={() =>
                  setShowCategoriesModal(false)
                }
                className="text-gray-500 hover:text-black text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dashboardData?.categories?.map(
                  (cat: any, index: number) => {
                    const Icon =
                      iconMap[cat.name] || Laptop;

                    const gradient =
                      gradients[
                      index % gradients.length
                      ];

                    return (
                      <div
                        key={cat.name}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-emerald-300 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div>
                            <p className="font-semibold text-black">
                              {cat.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              Category
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-black">
                            {cat.count}
                          </p>

                          <p className="text-xs text-emerald-600">
                            Assets
                          </p>
                        </div>
                      </div>
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