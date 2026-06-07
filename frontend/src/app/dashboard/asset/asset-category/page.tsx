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
  motion,
} from "framer-motion";
import {
  createCategoryApi,
  getCategoryApi,
} from "@/lib/category.api";
import { useRouter } from "next/navigation";

const gradientList = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-purple-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-indigo-500 to-blue-500",
];

export default function AssetCategoryPage() {
  const router = useRouter();

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

      <div
        className="
    relative
    overflow-hidden
    rounded-[28px]
    bg-[#0f172a]
    border
    border-slate-800
    shadow-xl
    p-5
  "
      >

        {/* Ambient Glow */}

        <div
          className="
      absolute
      top-0
      right-0
      h-48
      w-48
      rounded-full
      bg-emerald-500/10
      blur-3xl
    "
        />

        <div
          className="
      absolute
      bottom-0
      left-0
      h-32
      w-32
      rounded-full
      bg-cyan-500/5
      blur-3xl
    "
        />

        <div className="relative z-10">

          {/* Top */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div className="flex items-center gap-3">

              <div
                className="
            h-11
            w-11
            rounded-xl
            bg-emerald-500/15
            border
            border-emerald-500/20
            flex
            items-center
            justify-center
          "
              >
                <Layers3 className="h-5 w-5 text-emerald-400" />
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-lg font-semibold text-white">
                    Asset Categories
                  </h1>

                  <span
                    className="
                px-2
                py-0.5
                rounded-full
                bg-emerald-500/10
                text-emerald-400
                text-[10px]
                font-medium
              "
                  >
                    Active
                  </span>

                </div>

                <p className="text-sm text-slate-400 mt-1">
                  Organize and manage inventory categories
                </p>

              </div>

            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="
          h-10
          px-4
          rounded-xl
          bg-white
          text-slate-900
          text-sm
          font-medium
          flex
          items-center
          gap-2
          hover:bg-slate-100
          transition-all cursor-pointer
        "
            >
              <Plus className="h-4 w-4" />
              Add Category
            </button>

          </div>

          {/* Stats */}

          <div
            className="
        grid
        grid-cols-3
        gap-3
        mt-5
      "
          >

            <div
              className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
            >
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Categories
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {categories.length}
              </h3>
            </div>

            <div
              className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
            >
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Assets
              </p>

              <h3 className="text-2xl font-bold text-white mt-2">
                {totalAssets}
              </h3>
            </div>

            <div
              className="
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/[0.06]
          p-4
        "
            >
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Asset Value
              </p>

              <h3 className="text-2xl font-bold text-white mt-2 truncate">
                ₹{totalAmount.toLocaleString()}
              </h3>
            </div>

          </div>

        </div>

      </div>



      {/* ---------------- CATEGORY GRID ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {categories.map((c, i) => {

          const gradient =
            gradientList[i % gradientList.length];

          return (
            <motion.div
              key={c.id}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
          group
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-emerald-600
          via-green-600
          to-teal-600
          border
          border-white/10
          shadow-xl
          hover:shadow-emerald-500/20
          transition-all
          duration-300
        "
            >

              {/* Decorative Glow */}

              <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />

              <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-black/10 rounded-full blur-3xl" />

              <div
                className={`
            absolute
            top-0
            right-0
            h-40
            w-40
            rounded-full
            bg-gradient-to-br
            ${gradient}
            opacity-10
            blur-3xl
          `}
              />

              <div className="relative z-10 p-4">

                {/* Header */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                  h-11
                  w-11
                  rounded-xl
                  bg-gradient-to-br
                  ${gradient}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  group-hover:rotate-6
                  transition-transform
                  duration-300
                `}
                    >
                      <Layers3 className="h-5 w-5 text-white" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-white text-base">
                        {c.name}
                      </h3>

                      <p className="text-xs text-white/70 mt-0.5">
                        Asset Category
                      </p>

                    </div>

                  </div>

                  <span
                    className="
                px-2.5
                py-1
                rounded-full
                bg-white/15
                backdrop-blur-xl
                border
                border-white/10
                text-[10px]
                text-white
                font-medium
              "
                  >
                    {c.products?.length || 0} Products
                  </span>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 gap-3 mt-4">

                  <div
                    className="
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                p-3
              "
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/70">
                      Assets
                    </p>

                    <h4 className="text-2xl font-bold text-white mt-2">
                      {c.totalAssets || 0}
                    </h4>
                  </div>

                  <div
                    className="
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                p-3
              "
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/70">
                      Value
                    </p>

                    <h4 className="text-lg font-bold text-white mt-2 truncate">
                      ₹{(c.totalAmount || 0).toLocaleString()}
                    </h4>
                  </div>

                </div>

                {/* Footer */}

                <div
                  className="
              flex
              items-center
              justify-between
              mt-4
              pt-4
              border-t
              border-white/10
            "
                >

                  <div>

                    <p className="text-xs text-white/70">
                      Category Inventory
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      {c.totalAssets || 0} Assets
                    </p>

                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory(c);
                      setOpenProductsModal(true);
                    }}
                    className="
                px-4
                py-2
                rounded-full
                bg-white
                text-emerald-700
                text-xs
                font-semibold
                hover:bg-emerald-50
                hover:scale-105
                transition-all
                shadow-lg
                cursor-pointer
              "
                  >
                    View Products
                  </button>

                </div>

              </div>

            </motion.div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

          <div
            className="
        w-full
        max-w-7xl
        max-h-[92vh]
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-[0_25px_80px_rgba(0,0,0,0.25)]
      "
          >

            {/* HEADER */}

            <div
              className="
          sticky
          top-0
          z-20
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
                flex
                items-center
                justify-center
                border
                border-white/10
              "
                  >
                    <Layers3 className="h-7 w-7" />
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {selectedCategory.name}
                    </h2>

                    <p className="text-sm text-white/80 mt-1">
                      {selectedCategory.products?.length || 0} Products Available
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setOpenProductsModal(false)
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

            </div>

            {/* BODY */}

            <div className="p-6 overflow-y-auto max-h-[calc(92vh-100px)]">

              {selectedCategory.products?.length ? (

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {selectedCategory.products.map(
                    (product: any) => (

                     <motion.div
  key={product.id}
  whileHover={{
    y: -4,
    scale: 1.01,
  }}
  onClick={() =>
    router.push(
      `/dashboard/inventory/${product.id}`
    )
  }
  className="
    group
    cursor-pointer
    rounded-3xl
    border
    border-gray-100
    bg-white
    p-5
    shadow-sm
    hover:shadow-xl
    hover:border-emerald-300
    transition-all
  "
>

                        {/* Product Header */}

                        <div className="flex items-start justify-between">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                          h-12
                          w-12
                          rounded-2xl
                          bg-gradient-to-br
                          from-emerald-500
                          to-green-600
                          flex
                          items-center
                          justify-center
                          text-white
                          font-bold
                          shadow-lg
                        "
                            >
                              {product.productName
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <h3 className="font-semibold text-lg text-slate-900">
                                {product.productName}
                              </h3>

                              <p className="text-xs text-slate-500 mt-1">
                                {product.status || "Active"}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${product.amcAvailable
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                              }`}
                          >
                            {product.amcAvailable
                              ? "AMC Active"
                              : "No AMC"}
                          </span>

                        </div>

                        {/* Product Details */}

                        <div className="mt-5 space-y-3">

                          <ProductRow
                            label="Quantity"
                            value={product.quantity || "-"}
                          />

                          <ProductRow
                            label="Serial Number"
                            value={
                              product.serialNumber ||
                              "-"
                            }
                          />

                          <ProductRow
                            label="Invoice"
                            value={
                              product.invoiceNumber ||
                              "-"
                            }
                          />

                          <ProductRow
                            label="Unit Price"
                            value={
                              product.unitPrice
                                ? `₹${Number(
                                  product.unitPrice
                                ).toLocaleString()}`
                                : "-"
                            }
                          />

                          <ProductRow
                            label="Status"
                            value={
                              product.status || "-"
                            }
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

                      </motion.div>

                    )
                  )}

                </div>

              ) : (

                <div className="py-24 text-center">

                  <div
                    className="
                h-20
                w-20
                mx-auto
                rounded-3xl
                bg-emerald-100
                flex
                items-center
                justify-center
              "
                  >
                    <Layers3 className="h-10 w-10 text-emerald-600" />
                  </div>

                  <h3 className="text-xl font-semibold mt-6 text-slate-800">
                    No Products Found
                  </h3>

                  <p className="text-slate-500 mt-2">
                    This category currently doesn't contain any products.
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