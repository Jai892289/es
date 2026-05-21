"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronDown,
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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* ---------------- ICON MAP ---------------- */

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

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("Laptop");

  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState(false);

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

  /* ---------------- CHART ---------------- */

  const chartData =
    dashboardData?.yearlyProcurement?.map(
      (item: any) => item.count
    ) || Array(12).fill(0);

  const complaints =
    dashboardData?.recentComplaints || [];

  const maxValue =
    Math.max(...chartData, 10);

  const total =
    chartData.reduce(
      (a: number, b: number) => a + b,
      0
    );

  const overviewCards = useMemo(
    () => [
      {
        label:
          "Total Items Procured",

        value:
          dashboardData?.overview
            ?.totalItemsProcured || 0,

        icon: Package2,

        gradient:
          "from-emerald-500 to-green-600",
      },

      {
        label:
          "Warranty Ending Soon",

        value:
          dashboardData?.overview
            ?.warrantyEndingSoon || 0,

        icon: ShieldCheck,

        gradient:
          "from-blue-500 to-cyan-500",
      },

      {
        label:
          "Pending Complaints",

        value:
          dashboardData?.overview
            ?.pendingComplaints || 0,

        icon: AlertTriangle,

        gradient:
          "from-red-500 to-rose-500",
      },

      {
        label:
          "Pending AMC Renewals",

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
            className="w-20 h-20 border-[6px] border-emerald-500 border-t-transparent rounded-full mx-auto"
          />

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType:
                "reverse",
            }}
            className="text-gray-500 mt-6 text-sm font-medium"
          >
            Loading Dashboard...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="max-w-[1600px] mx-auto space-y-7"
      >

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 rounded-[36px] p-4 shadow-xl text-white"
        >

          {/* FLOATING BLOBS */}

          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-5">

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.05,
                  }}
                  className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg"
                >

                  <Activity className="w-10 h-10" />
                </motion.div>

                <div>

                  <h1 className="text-3xl font-bold tracking-tight">
                    Asset Intelligence Dashboard
                  </h1>

                  <p className="text-green-50 mt-2 text-sm">
                    Real-time monitoring of assets,
                    procurement, warranty &
                    complaints
                  </p>
                </div>
              </div>

              {/* QUICK STATS */}

              <div className="flex flex-wrap items-center gap-10 mt-10">

                <div>

                  <motion.h2
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3,
                    }}
                    className="text-5xl font-bold"
                  >
                    {
                      dashboardData?.overview
                        ?.totalItemsProcured
                    }
                  </motion.h2>

                  <p className="text-green-100 text-sm mt-1">
                    Total Assets
                  </p>
                </div>

                <div>

                  <motion.h2
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.4,
                    }}
                    className="text-5xl font-bold"
                  >
                    {
                      dashboardData?.categories
                        ?.length
                    }
                  </motion.h2>

                  <p className="text-green-100 text-sm mt-1">
                    Categories
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-4 min-w-[320px]">

              <MiniStat
                label="Asset Health"
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

        {/* CATEGORY STRIP */}

        <div>

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-bold text-gray-800">
              Product Categories
            </h2>

            <button className="text-sm text-emerald-600 font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">

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
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                    className="group min-w-[230px] bg-white border border-gray-100 hover:border-emerald-100 rounded-[28px] p-5 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >

                    <div className="flex items-start justify-between">

                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
                      >

                        <Icon className="w-7 h-7" />
                      </div>

                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
                    </div>

                    <div className="mt-3">

                      <h3 className="text-lg font-semibold text-gray-800">
                        {cat.name}
                      </h3>

                      <div className="mt-3 flex items-end justify-between">

                        <h2 className="text-4xl font-bold text-gray-900">
                          {String(
                            cat.count
                          ).padStart(2, "0")}
                        </h2>

                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">
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

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2">

          {overviewCards.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                    duration: 0.45,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative overflow-hidden bg-white rounded-[30px] border border-gray-100 hover:border-emerald-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-300"
                >

                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${item.gradient} opacity-10 rounded-full blur-3xl`}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between">

                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg`}
                      >

                        <Icon className="w-8 h-8" />
                      </div>

                      <span className="text-xs font-semibold text-gray-400">
                        Analytics
                      </span>
                    </div>

                    <div className="mt-4">

                      <p className="text-sm text-gray-500">
                        {item.label}
                      </p>

                      <h2 className="text-5xl font-bold text-gray-900 mt-3">
                        {item.value}
                      </h2>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

      </motion.div>
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
        y: -4,
        scale: 1.02,
      }}
      className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10"
    >

      <p className="text-sm text-green-50">
        {label}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </motion.div>
  );
}