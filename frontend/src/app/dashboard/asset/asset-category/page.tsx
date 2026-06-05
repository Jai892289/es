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

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
const [openProductsModal, setOpenProductsModal] = useState(false);

console.log("selectedCategory", selectedCategory)
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

  <p className="text-xs text-gray-500">
    {c.products?.length || 0} Products
  </p>

  <button
  onClick={() => {
  console.log("Selected:", c);
  setSelectedCategory(c);
  setOpenProductsModal(true);
}}
  className="p-2 text-xs rounded-2xl cursor-pointer bg-green-600 text-white"
>
  View Products
</button>

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

  
{openProductsModal && selectedCategory && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-xl">

      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            {selectedCategory.name}
          </h2>

          <p className="text-sm text-gray-500">
            {selectedCategory.products?.length || 0} Products
          </p>
        </div>

        <button
          onClick={() =>
            setOpenProductsModal(false)
          }
          className="w-10 h-10 cursor-pointer rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          ✕
        </button>

      </div>

      {/* Body */}
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-90px)]">

        {selectedCategory.products?.length ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {selectedCategory.products.map(
              (product: any) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
                >

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="font-semibold text-lg">
                      {product.productName}
                    </h3>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.amcAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.amcAvailable
                        ? "AMC"
                        : "No AMC"}
                    </span>

                  </div>

                  <div className="space-y-3">

                    <ProductRow
                      label="Quantity"
                      value={product.quantity}
                    />

                    <ProductRow
                      label="Serial Number"
                      value={product.serialNumber}
                    />

                    <ProductRow
                      label="Invoice"
                      value={product.invoiceNumber}
                    />

                    <ProductRow
                      label="Unit Price"
                      value={
                        product.unitPrice
                          ? `₹${product.unitPrice}`
                          : "-"
                      }
                    />

                    <ProductRow
                      label="Status"
                      value={product.status}
                    />

                    <ProductRow
                      label="Procurement Date"
                      value={
                        product.procurementDate
                          ? new Date(
                              product.procurementDate
                            ).toLocaleDateString()
                          : "-"
                      }
                    />

                    <ProductRow
                      label="Warranty Expiry"
                      value={
                        product.warrantyExpiryDate
                          ? new Date(
                              product.warrantyExpiryDate
                            ).toLocaleDateString()
                          : "-"
                      }
                    />

                  </div>

                </div>
              )
            )}

          </div>

        ) : (

          <div className="py-20 text-center">

            <h3 className="text-lg font-semibold text-gray-700">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              This category does not contain any products.
            </p>

          </div>

        )}

      </div>
    </div>
  </div>
)}
    </div>
  );
}


const Row = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => (
  <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2">

    <span className="text-sm text-gray-500">
      {label}
    </span>

    <span className="text-sm font-medium text-right break-all">
      {value || "-"}
    </span>

  </div>
);

const ProductRow = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => (
  <div className="flex justify-between items-start gap-4 border-b border-gray-100 pb-2">

    <span className="text-sm text-gray-500">
      {label}
    </span>

    <span className="text-sm font-medium text-right break-all">
      {value || "-"}
    </span>

  </div>
);