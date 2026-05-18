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

export default function AssetCategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // GET CATEGORY
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

  // CREATE CATEGORY
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
    },
    {
      label: "Total Assets",
      value: totalAssets,
      highlight: true,
    },
    {
      label: "Total Value",
      value: `₹${totalAmount.toLocaleString()}`,
      green: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Asset Category Management
          </h2>

          <p className="text-sm text-gray-500">
            View and manage assets organized by categories
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium cursor-pointer px-5 py-3 rounded-xl transition"
        >
          + Add Category
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="text-sm text-gray-500">
              {s.label}
            </div>

            <div
              className={`text-3xl font-bold mt-1
              ${
                s.green
                  ? "text-green-600"
                  : s.highlight
                  ? "text-blue-600"
                  : "text-gray-800"
              }`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => {
          const Icon =
            Object.values(iconMap)[
              i % Object.values(iconMap).length
            ];

          return (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-100 text-blue-600">
                  <Icon className="w-5 h-5" />
                </div>

                <button className="text-blue-600 text-sm hover:underline">
                  View All
                </button>
              </div>

              {/* CONTENT */}
              <div className="mt-4">
                <div className="font-semibold text-gray-800">
                  {c.name}
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Total Assets:
                    </span>

                    <span className="font-medium">
                      {c.totalAssets}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Total Value:
                    </span>

                    <span className="font-medium">
                      ₹{c.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-1">
              Add Category
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Create new asset category
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700">
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
                  className="w-full mt-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter category name"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium text-gray-700">
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
                  className="w-full mt-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter description"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
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