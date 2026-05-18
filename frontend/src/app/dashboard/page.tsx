"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ChevronDown,
  Monitor,
  Smartphone,
  Laptop,
  Tv,
  Wifi,
  HardDrive,
  Printer,
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

// ICON MAPPING
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

export default function DashboardPage() {
  const router = useRouter();

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedYear, setSelectedYear] =
    useState("2024");

  const [selectedCategory, setSelectedCategory] =
    useState("Laptop");

  const [showYearDropdown, setShowYearDropdown] =
    useState(false);

  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState(false);

  // AUTH CHECK
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // FETCH DASHBOARD
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const analytics =
          await getDashboardAnalyticsApi();

        console.log(
          "dashboardData",
          analytics
        );

        // SAVE ONLY DATA
        setDashboardData(analytics.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // CHART DATA
  const chartData =
    dashboardData?.yearlyProcurement?.map(
      (item: any) => item.count
    ) || Array(12).fill(0);

  // COMPLAINTS
  const complaints =
    dashboardData?.recentComplaints || [];

  // MAX VALUE
  const maxValue =
    Math.max(...chartData, 10);

  // TOTAL
  const total =
    chartData.reduce(
      (a: number, b: number) => a + b,
      0
    );

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden p-3">
      <div className="max-w-8xl mx-auto">

        {/* PRODUCT CATEGORIES */}

        <div className="mb-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-2 flex justify-center">
            Product Categories
          </h2>

          <div className="w-full">
            <div className="flex gap-4">

              {dashboardData?.categories?.map(
                (cat: any) => {

                  const Icon =
                    iconMap[cat.name] ||
                    Laptop;

                  return (
                    <div
                      key={cat.name}
                      className="
                      group flex items-center gap-3
                      bg-white border border-gray-200
                      rounded-2xl p-2
                      flex-shrink-0
                      transition-all duration-300
                      cursor-pointer
                      hover:bg-emerald-600
                      hover:text-white
                      hover:shadow-xl
                      hover:-translate-y-1
                    "
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-white/20">
                        <Icon className="w-7 h-7 text-emerald-600 group-hover:text-white" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-white">
                          {cat.name}
                        </p>

                        <p className="text-lg font-bold text-gray-500 group-hover:text-white">
                          {String(cat.count).padStart(
                            2,
                            "0"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}

            </div>
          </div>
        </div>

        {/* OVERVIEW */}

        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex justify-center">
          Overview
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {[
            {
              label:
                "Total Items Procured",

              value:
                dashboardData?.overview
                  ?.totalItemsProcured || 0,

              color: "text-emerald-600",
            },

            {
              label:
                "Warranty Ending Soon",

              value:
                dashboardData?.overview
                  ?.warrantyEndingSoon || 0,

              color: "text-blue-600",
            },

            {
              label:
                "Pending Complaints",

              value:
                dashboardData?.overview
                  ?.pendingComplaints || 0,

              color: "text-red-500",
            },

            {
              label:
                "Pending AMC Renewals",

              value:
                dashboardData?.overview
                  ?.pendingAmcRenewals || 0,

              color: "text-indigo-600",
            },
          ].map((item) => (

            <div
              key={item.label}
              className="
              bg-white text-center rounded-2xl
              border border-gray-200 p-6
              transition-all duration-300
              hover:shadow-2xl
              hover:-translate-y-2
              hover:scale-[1.03]
              cursor-pointer
            "
            >
              <p className="text-sm text-gray-600 mb-3">
                {item.label}
              </p>

              <h2
                className={`text-6xl font-bold ${item.color}`}
              >
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* LOWER SECTION */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* CHART */}

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

            <div className="flex justify-between items-center mb-6">

              <h3 className="font-semibold text-blue-600">
                Yearly Procurement
                <br />
                by Category
              </h3>

              <div className="flex gap-3 relative">

                {/* YEAR DROPDOWN */}

                {/* <div className="relative">

                  <button
                    onClick={() =>
                      setShowYearDropdown(
                        !showYearDropdown
                      )
                    }
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    {selectedYear}

                    <ChevronDown size={16} />
                  </button>

                  {showYearDropdown && (
                    <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg border z-20">

                      {[
                        "2022",
                        "2023",
                        "2024",
                        "2025",
                      ].map((year) => (

                        <div
                          key={year}
                          onClick={() => {
                            setSelectedYear(
                              year
                            );

                            setShowYearDropdown(
                              false
                            );
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}

                {/* CATEGORY DROPDOWN */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setShowCategoryDropdown(
                        !showCategoryDropdown
                      )
                    }
                    className="bg-gray-100 cursor-pointer px-4 py-2 rounded-full text-sm flex items-center gap-2"
                  >
                    {selectedCategory}

                    <ChevronDown size={16} />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute right-0 p-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-2 z-20">

                      {dashboardData?.categories?.map(
                        (cat: any) => {

                          const Icon =
                            iconMap[cat.name] ||
                            Laptop;

                          return (
                            <div
                              key={cat.name}
                              onClick={() => {
                                setSelectedCategory(
                                  cat.name
                                );

                                setShowCategoryDropdown(
                                  false
                                );
                              }}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                            >
                              <Icon size={18} />

                              {cat.name}
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* BAR CHART */}

            <div className="flex items-end gap-4 h-64">

              {chartData.map(
                (val: number, i: number) => (

                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="h-48 w-full flex flex-col justify-end items-center">

                      {val > 0 ? (
                        <>
                          <span className="text-xs font-semibold mb-1">
                            {val}
                          </span>

                          <div
                            style={{
                              height: `${(val / maxValue) * 100
                                }%`,
                            }}
                            className="
                            w-7 bg-emerald-500
                            rounded-t-xl
                            transition-all duration-500
                            hover:bg-emerald-600
                          "
                          />
                        </>
                      ) : (
                        <div className="w-7 h-1 bg-gray-300 rounded-full" />
                      )}
                    </div>

                    <span className="text-xs text-gray-500 mt-2">
                      {months[i]}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* TOTAL */}

            <div className="mt-6 pt-6 border-t flex items-center gap-4">

              <div className="bg-indigo-50 p-4 rounded-xl">
                <Laptop className="text-indigo-600" />
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Total {selectedCategory} Procured {" "}
                  {/* {selectedYear} */}
                </p>

                <p className="text-3xl font-bold text-emerald-600">
                  {total}
                </p>
              </div>
            </div>

          </div>

          {/* RECENT COMPLAINTS */}

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">

            <h3 className="font-semibold mb-6 text-blue-600">
              Recent Complaints
            </h3>

            <div className="space-y-4">

              {complaints.length > 0 ? (
                complaints.map(
                  (c: any, i: number) => (

                    <div
                      key={i}
                      className="
                      p-4 bg-gray-50 rounded-xl
                      border border-gray-200
                      hover:bg-gray-100
                      transition duration-300
                      group cursor-pointer
                    "
                    >
                      <div className="flex justify-between items-start gap-3">

                        <p className="text-sm font-medium text-gray-800 leading-snug">
                          {c.title}
                        </p>

                        <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-md">
                          {c.priority || "High"}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        By{" "}
                        {c.createdBy?.name ||
                          "User"}{" "}
                        |{" "}
                        {new Date(
                          c.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="text-sm text-gray-500">
                  No complaints found
                </div>
              )}

            </div>

            <button
              className="
              mt-6 w-full text-sm
              text-emerald-600 font-medium
              flex items-center justify-start gap-1
              hover:underline group
            "
            >
              View all complaints

              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}