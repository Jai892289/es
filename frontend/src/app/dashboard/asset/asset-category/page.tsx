"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Building2,
  Book,
  Laptop,
  Printer,
  Dumbbell,
  Zap,
  PencilRuler,
  Car,
  Trees,
  X,
  Plus,
  ArrowUpRight,
  Layers3,
  Wallet,
  Package2,
} from "lucide-react";

import {
  createCategoryApi,
  getCategoryApi,
} from "@/lib/category.api";

const iconMap: any = {
  Box,
  Building2,
  Book,
  Laptop,
  Printer,
  Dumbbell,
  Zap,
  PencilRuler,
  Car,
  Trees,
};

const gradientList = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-purple-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-indigo-500 to-blue-500",
];

export default function AssetCategoryPage() {

  const [categories, setCategories] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  /* ---------------- FETCH ---------------- */

  const fetchCategories = async () => {

    try {

      const res: any = await getCategoryApi();

      setCategories(res?.data || []);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- CREATE ---------------- */

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createCategoryApi(formData);

      setFormData({
        name: "",
        description: "",
      });

      setOpenModal(false);

      fetchCategories();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  /* ---------------- STATS ---------------- */

  const totalAssets = categories.reduce(
    (sum, item) => sum + (item.totalAssets || 0),
    0
  );

  const totalAmount = categories.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const stats = [
    {
      label: "Total Categories",
      value: categories.length,
      icon: Layers3,
      color: "bg-blue-100 text-blue-600",
    },

    {
      label: "Total Assets",
      value: totalAssets,
      icon: Package2,
      color: "bg-green-100 text-green-600",
    },

    {
      label: "Total Value",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: Wallet,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[32px] p-8 text-white shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Layers3 className="w-8 h-8" />
              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  Asset Categories
                </h1>

                <p className="text-green-50 text-sm mt-1">
                  Organize and manage inventory assets efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-7">

              <div>

                <p className="text-3xl font-bold">
                  {categories.length}
                </p>

                <p className="text-sm text-green-100">
                  Categories
                </p>
              </div>

              <div>

                <p className="text-3xl font-bold">
                  {totalAssets}
                </p>

                <p className="text-sm text-green-100">
                  Total Assets
                </p>
              </div>

              <div>

                <p className="text-3xl font-bold">
                  ₹{totalAmount.toLocaleString()}
                </p>

                <p className="text-sm text-green-100">
                  Asset Value
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="px-6 py-3 rounded-2xl cursor-pointer bg-white text-green-600 hover:bg-green-50 transition text-sm font-semibold shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {stats.map((s, i) => {

          const Icon = s.icon;

          return (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {s.label}
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-2">
                    {s.value}
                  </h3>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- CATEGORY GRID ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {categories.map((c, i) => {

          const Icon =
            Object.values(iconMap)[
              i % Object.values(iconMap).length
            ];

          const gradient =
            gradientList[
              i % gradientList.length
            ];

          return (
            <div
              key={c.id}
              className="group bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* TOP */}

              <div
                className={`bg-gradient-to-r ${gradient} p-6 text-white relative overflow-hidden`}
              >

                <div className="absolute right-0 top-0 w-28 h-28 bg-white/10 rounded-full blur-2xl" />

                <div className="flex items-start justify-between relative z-10">

                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Layers3 className="w-8 h-8" />

                    {/* <Icon className="w-6 h-6" /> */}
                  </div>

                  {/* <button className="flex items-center gap-1 text-sm font-medium hover:underline">
                    View

                    <ArrowUpRight className="w-4 h-4" />
                  </button> */}
                </div>

                <div className="mt-2 relative z-10">

                  <h3 className="text-2xl font-bold">
                    {c.name}
                  </h3>

                  {/* <p className="text-sm text-white/80 mt-2 line-clamp-2">
                    {c.description ||
                      "No description available"}
                  </p> */}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-2">

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-2xl p-4">

                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Total Assets
                    </p>

                    <h4 className="text-2xl font-bold text-gray-800 mt-2">
                      {c.totalAssets || 0}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-2">

                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Total Value
                    </p>

                    <h4 className="text-2xl font-bold text-green-600 mt-2">
                      ₹
                      {(
                        c.totalAmount || 0
                      ).toLocaleString()}
                    </h4>
                  </div>
                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between mt-3 pt-2 px-3 border-t border-gray-100">

                  

                    <p className="text-xs text-gray-500">
                      Category ID
                    </p>

                    <p className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                      {c.id}
                    </p>
                  

              
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- MODAL ---------------- */}

      {openModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 relative shadow-2xl">

            {/* CLOSE */}

            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-5 top-5 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* HEADER */}

            <div>

              <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center mb-5">

                <Plus className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Create Category
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Add a new asset category to organize inventory
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 mt-8"
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  Category Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full h-14 mt-2 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none focus:border-green-500 focus:bg-white transition"
                  placeholder="Enter category name"
                />
              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full mt-2 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none focus:border-green-500 focus:bg-white transition resize-none"
                  placeholder="Enter description"
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-95 text-white font-semibold text-sm transition shadow-lg"
              >
                {loading
                  ? "Creating Category..."
                  : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}