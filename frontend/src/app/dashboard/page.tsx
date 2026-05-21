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
    <div className="min-h-screen bg-[#f5f7fb] overflow-hidden">

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
        className="max-w-[1300px] mx-auto space-y-4 overflow-hidden"
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

            <button className="text-sm text-emerald-600 font-medium whitespace-nowrap">
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
                    className="group min-w-[170px] bg-white border border-gray-100 hover:border-emerald-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                  >

                    <div className="flex items-start justify-between gap-2">

                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow shrink-0`}
                      >

                        <Icon className="w-5 h-5" />
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

          {overviewCards.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (
                <motion.div
                  key={item.label}
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
                    delay:
                      index * 0.05,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 hover:border-emerald-100 p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >

                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-r ${item.gradient} opacity-10 rounded-full blur-3xl`}
                  />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between gap-2">

                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow shrink-0`}
                      >

                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-semibold text-black whitespace-nowrap">
                        Analytics
                      </span>
                    </div>

                    <div className="mt-4 min-w-0">

                      <p className="text-xs text-black break-words">
                        {item.label}
                      </p>

                      <h2 className="text-2xl font-bold text-black mt-2 break-words">
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