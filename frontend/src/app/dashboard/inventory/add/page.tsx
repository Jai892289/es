"use client"

import Link from "next/link"

import {
  ChevronLeft,
  ChevronDown,
  Building2,
  Truck,
  Package2,
  Save,
} from "lucide-react"

import { useState } from "react"

import { createInventoryApi } from "@/lib/inventory.api"

import { useRouter } from "next/navigation"

import toast from "react-hot-toast"

export default function AddProductInventoryPage() {

  /* ---------------- STATE ---------------- */

  const [form, setForm] = useState({
    department: {
      name: "",
      purpose: "",
      location: "",
      city: "",
      state: "",
      pincode: "",
    },

    vendor: {
      companyName: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      website: "",
    },

    product: {
      productName: "",
      category: "",
      quantity: "",
      serialNumber: "",
      procurementDate: "",
      warrantyExpiryDate: "",
      amcAvailable: "",
      invoiceNumber: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleChange = (
    section: "department" | "vendor" | "product",
    field: string,
    value: string
  ) => {

    setForm((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  /* ---------------- VALIDATE ---------------- */

  const validateForm = () => {

    const errors = []

    if (!form.department.name) {
      errors.push("Department name is required")
    }

    if (!form.vendor.companyName) {
      errors.push("Vendor company is required")
    }

    if (!form.product.productName) {
      errors.push("Product name is required")
    }

    if (!form.product.quantity) {
      errors.push("Quantity is required")
    }

    if (
      form.product.quantity &&
      isNaN(Number(form.product.quantity))
    ) {
      errors.push("Quantity must be a number")
    }

    return errors
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {

    try {

      setLoading(true)

      const errors = validateForm()

      if (errors.length > 0) {

        errors.forEach((err) => toast.error(err))

        return
      }

      const payload = {

        department: {
          ...form.department,
        },

        vendor: {
          ...form.vendor,
        },

        product: {
          ...form.product,

          quantity: Number(form.product.quantity),

          warrantyExpiryDate:
            form.product.warrantyExpiryDate || null,
        },
      }

      await createInventoryApi(payload)

      toast.success("Inventory created successfully ✅")

      router.push("/dashboard/inventory")

    } catch (err: any) {

      console.log(err)

      toast.error(
        err?.response?.data?.message ||
          "Something went wrong"
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="space-y-7">

      {/* ---------------- HERO ---------------- */}

      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[32px] p-8 text-white shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">

                <Package2 className="w-8 h-8" />
              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  Add Inventory Product
                </h1>

                <p className="text-green-50 text-sm mt-1">
                  Add products, vendors and department assets
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/inventory"
            className="px-5 py-3 rounded-2xl bg-white text-green-600 hover:bg-green-50 transition text-sm font-semibold"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>

      {/* ---------------- FORM ---------------- */}

      <div className="mx-auto grid grid-cols-12 gap-6">

        {/* ---------------- LEFT ---------------- */}

        <div className="col-span-8 space-y-6">

          {/* ---------------- DEPARTMENT ---------------- */}

          <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Building2 className="w-5 h-5 text-blue-600" />
              </div>

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Department Details
                </h2>

                <p className="text-sm text-gray-500">
                  Add department information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">

              <Input
                label="Department Name"
                value={form.department.name}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "name",
                    e.target.value
                  )
                }
              />

              <Input
                label="Purpose"
                value={form.department.purpose}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "purpose",
                    e.target.value
                  )
                }
              />

              <Input
                label="Location"
                value={form.department.location}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "location",
                    e.target.value
                  )
                }
              />

              <Input
                label="City"
                value={form.department.city}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "city",
                    e.target.value
                  )
                }
              />

              <Input
                label="State"
                value={form.department.state}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "state",
                    e.target.value
                  )
                }
              />

              <Input
                label="Pincode"
                value={form.department.pincode}
                onChange={(e: any) =>
                  handleChange(
                    "department",
                    "pincode",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* ---------------- PRODUCT ---------------- */}

          <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                <Package2 className="w-5 h-5 text-green-600" />
              </div>

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Product Details
                </h2>

                <p className="text-sm text-gray-500">
                  Add inventory product information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">

              <Input
                label="Product Name"
                value={form.product.productName}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "productName",
                    e.target.value
                  )
                }
              />

              <Input
                label="Category"
                value={form.product.category}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "category",
                    e.target.value
                  )
                }
              />

              <Input
                label="Quantity"
                value={form.product.quantity}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "quantity",
                    e.target.value
                  )
                }
              />

              <Input
                label="Serial Number"
                value={form.product.serialNumber}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "serialNumber",
                    e.target.value
                  )
                }
              />

              <Input
                type="date"
                label="Procurement Date"
                value={form.product.procurementDate}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "procurementDate",
                    e.target.value
                  )
                }
              />

              <Input
                type="date"
                label="Warranty Expiry"
                value={form.product.warrantyExpiryDate}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "warrantyExpiryDate",
                    e.target.value
                  )
                }
              />

              <Select
                label="AMC Available"
                value={form.product.amcAvailable}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "amcAvailable",
                    e.target.value
                  )
                }
              />

              <Input
                label="Invoice Number"
                value={form.product.invoiceNumber}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "invoiceNumber",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT ---------------- */}

        <div className="col-span-4 space-y-6">

          {/* ---------------- VENDOR ---------------- */}

          <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Truck className="w-5 h-5 text-orange-600" />
              </div>

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Vendor Details
                </h2>

                <p className="text-sm text-gray-500">
                  Add supplier information
                </p>
              </div>
            </div>

            <div className="space-y-5">

              <Input
                label="Company Name"
                value={form.vendor.companyName}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "companyName",
                    e.target.value
                  )
                }
              />

              <Input
                label="Contact Number"
                value={form.vendor.contactNumber}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "contactNumber",
                    e.target.value
                  )
                }
              />

              <Input
                label="WhatsApp Number"
                value={form.vendor.whatsappNumber}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "whatsappNumber",
                    e.target.value
                  )
                }
              />

              <Input
                label="Email"
                value={form.vendor.email}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "email",
                    e.target.value
                  )
                }
              />

              <Input
                label="Website"
                value={form.vendor.website}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "website",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* ---------------- ACTION CARD ---------------- */}

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[28px] p-7 text-white shadow-lg">

            <h3 className="text-xl font-bold">
              Ready to Save?
            </h3>

            <p className="text-green-50 text-sm mt-2 leading-relaxed">
              Your inventory data will be securely stored
              and available across the system dashboard.
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 h-12 rounded-2xl bg-white text-green-600 hover:bg-green-50 transition font-semibold flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />

              {loading
                ? "Saving Product..."
                : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function Input({
  label,
  type = "text",
  value,
  onChange,
}: any) {

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-green-500 focus:bg-white transition"
      />
    </div>
  )
}

/* ---------------- SELECT ---------------- */

function Select({
  label,
  value,
  onChange,
}: any) {

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={onChange}
          className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm appearance-none outline-none focus:border-green-500 focus:bg-white transition"
        >
          <option value="">
            Select
          </option>

          <option>
            Yes
          </option>

          <option>
            No
          </option>
        </select>

        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>
    </div>
  )
}