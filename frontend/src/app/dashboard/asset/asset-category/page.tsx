"use client";

import { useEffect, useState } from "react";

import {
  Layers3,
  Wallet,
  Package2,
  X,
  Plus,
} from "lucide-react";

import {
  createCategoryApi,
  getCategoryApi,
} from "@/lib/category.api";

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
      label: "Categories",
      value: categories.length,
      icon: Layers3,
      color: "bg-blue-100 text-blue-600",
    },

    {
      label: "Assets",
      value: totalAssets,
      icon: Package2,
      color: "bg-green-100 text-green-600",
    },

    {
      label: "Value",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: Wallet,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-4">

      {/* ---------------- HERO ---------------- */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 text-white shadow-md">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Layers3 className="w-6 h-6" />
              </div>

              <div>

                <h1 className="text-xl font-semibold leading-none">
                  Asset Categories
                </h1>

                <p className="text-green-50 text-xs mt-1">
                  Manage inventory categories
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-4 flex-wrap">

              <div>

                <p className="text-2xl font-bold leading-none">
                  {categories.length}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Categories
                </p>
              </div>

              <div>

                <p className="text-2xl font-bold leading-none">
                  {totalAssets}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Assets
                </p>
              </div>

              <div>

                <p className="text-2xl font-bold leading-none">
                  ₹{totalAmount.toLocaleString()}
                </p>

                <p className="text-[11px] text-green-100 mt-1">
                  Value
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="h-10 px-4 rounded-xl cursor-pointer bg-white text-green-600 hover:bg-green-50 transition text-sm font-semibold shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {stats.map((s, i) => {

          const Icon = s.icon;

          return (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs text-black">
                    {s.label}
                  </p>

                  <h3 className="text-2xl font-bold text-black mt-1">
                    {s.value}
                  </h3>
                </div>

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* ---------------- CATEGORY GRID ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {categories.map((c, i) => {

          const gradient =
            gradientList[
              i % gradientList.length
            ];

          return (
            <div
              key={c.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >

              {/* TOP */}

              <div
                className={`bg-gradient-to-r ${gradient} p-4 text-white relative overflow-hidden`}
              >

                <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                <div className="relative z-10">

                  <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">

                    <Layers3 className="w-5 h-5" />
                  </div>

                  <div className="mt-3">

                    <h3 className="text-lg font-semibold leading-tight">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-3">

                <div className="grid grid-cols-2 gap-2">

                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-[11px] uppercase tracking-wide text-black">
                      Assets
                    </p>

                    <h4 className="text-xl font-bold text-black mt-1">
                      {c.totalAssets || 0}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-[11px] uppercase tracking-wide text-black">
                      Value
                    </p>

                    <h4 className="text-xl font-bold text-green-600 mt-1">
                      ₹
                      {(
                        c.totalAmount || 0
                      ).toLocaleString()}
                    </h4>
                  </div>
                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">

                  <p className="text-[11px] text-black">
                    Category ID
                  </p>

                  <p className="text-xs font-medium text-black truncate max-w-[140px]">
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

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-xl">

            {/* CLOSE */}

            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-black" />
            </button>

            {/* HEADER */}

            <div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">

                <Plus className="w-6 h-6 text-green-600" />
              </div>

              <h2 className="text-xl font-semibold text-black">
                Create Category
              </h2>

              <p className="text-xs text-black mt-1">
                Add a new asset category
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 mt-5"
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-medium text-black">
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
                  className="w-full h-11 mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition"
                  placeholder="Enter category name"
                />
              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="text-sm font-medium text-black">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black outline-none focus:border-green-500 focus:bg-white transition resize-none"
                  placeholder="Enter description"
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-95 text-white font-semibold text-sm transition shadow-sm"
              >
                {loading
                  ? "Creating..."
                  : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}