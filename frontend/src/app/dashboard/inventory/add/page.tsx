"use client"

import Link from "next/link"
import { ChevronLeft, ChevronDown } from "lucide-react"
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

  const validateForm = () => {
    const errors = []

    if (!form.department.name) errors.push("Department name is required")
    if (!form.vendor.companyName) errors.push("Vendor company is required")
    if (!form.product.productName) errors.push("Product name is required")
    if (!form.product.quantity) errors.push("Quantity is required")

    if (form.product.quantity && isNaN(Number(form.product.quantity))) {
      errors.push("Quantity must be a number")
    }

    return errors
  }
  /* ---------------- SUBMIT ---------------- */

  const router = useRouter()

  const handleSubmit = async () => {
    try {

      const errors = validateForm()

      if (errors.length > 0) {
        errors.forEach((err) => toast.error(err))
        return
      }

      const payload = {
        department: form.department,
        vendor: form.vendor,
        product: {
          ...form.product,
          quantity: Number(form.product.quantity),
        },
      }

      await createInventoryApi(payload)

      toast.success("Inventory created successfully ✅")

      // redirect to previous page
      router.push("/dashboard/inventory")

    } catch (err: any) {
      console.error(err.message)
      toast.error(err?.response?.data?.message || "Something went wrong")
    }
  }

  return (<div className="space-y-8">


    {/* BACK */}
    <Link
      href="/dashboard/inventory"
      className="flex items-center gap-2 text-sm text-green-600 hover:underline"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Inventory
    </Link>

    {/* TITLE */}
    <h2 className="text-2xl font-medium text-green-600 text-center">
      Add Product to Inventory
    </h2>

    <div className="max-w-4xl mx-auto space-y-8">

      {/* DEPARTMENT */}
      <section>
        <h3 className="text-sm font-semibold text-blue-600 mb-4">
          Department Details:
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <Input label="Department Name"
            value={form.department.name}
            onChange={(e:any) => handleChange("department", "name", e.target.value)}
          />

          <Input label="Purpose"
            value={form.department.purpose}
            onChange={(e:any) => handleChange("department", "purpose", e.target.value)}
          />

          <Input label="Location"
            value={form.department.location}
            onChange={(e:any) => handleChange("department", "location", e.target.value)}
          />

          <Input label="City"
            value={form.department.city}
            onChange={(e:any) => handleChange("department", "city", e.target.value)}
          />

          <Input label="State"
            value={form.department.state}
            onChange={(e:any) => handleChange("department", "state", e.target.value)}
          />

          <Input label="Pincode"
            value={form.department.pincode}
            onChange={(e:any) => handleChange("department", "pincode", e.target.value)}
          />
        </div>
      </section>

      {/* VENDOR */}
      <section>
        <h3 className="text-sm font-semibold text-blue-600 mb-4">
          Vendor Details:
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <Input label="Company Name"
            value={form.vendor.companyName}
            onChange={(e:any) => handleChange("vendor", "companyName", e.target.value)}
          />

          <Input label="Contact Number"
            value={form.vendor.contactNumber}
            onChange={(e:any) => handleChange("vendor", "contactNumber", e.target.value)}
          />

          <Input label="WhatsApp Number"
            value={form.vendor.whatsappNumber}
            onChange={(e:any) => handleChange("vendor", "whatsappNumber", e.target.value)}
          />

          <Input label="Email"
            value={form.vendor.email}
            onChange={(e:any) => handleChange("vendor", "email", e.target.value)}
          />

          <Input label="Website"
            value={form.vendor.website}
            onChange={(e:any) => handleChange("vendor", "website", e.target.value)}
          />
        </div>
      </section>

      {/* PRODUCT */}
      <section>
        <h3 className="text-sm font-semibold text-blue-600 mb-4">
          Product Details:
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <Input label="Product Name"
            value={form.product.productName}
            onChange={(e:any) => handleChange("product", "productName", e.target.value)}
          />

          <Input label="Category"
            value={form.product.category}
            onChange={(e:any) => handleChange("product", "category", e.target.value)}
          />

          <Input label="Quantity"
            value={form.product.quantity}
            onChange={(e:any) => handleChange("product", "quantity", e.target.value)}
          />

          <Input label="Serial Number"
            value={form.product.serialNumber}
            onChange={(e:any) => handleChange("product", "serialNumber", e.target.value)}
          />

          <Input type="date" label="Procurement Date"
            value={form.product.procurementDate}
            onChange={(e:any) => handleChange("product", "procurementDate", e.target.value)}
          />

          <Input type="date" label="Warranty Expiry Date"
            value={form.product.warrantyExpiryDate}
            onChange={(e:any) => handleChange("product", "warrantyExpiryDate", e.target.value)}
          />

          <Select label="AMC Available"
            value={form.product.amcAvailable}
            onChange={(e:any) => handleChange("product", "amcAvailable", e.target.value)}
          />

          <Input label="Invoice Number"
            value={form.product.invoiceNumber}
            onChange={(e:any) => handleChange("product", "invoiceNumber", e.target.value)}
          />
        </div>
      </section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 pt-6">
        <button className="px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100 text-sm">
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 text-sm disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

      </div>
    </div>
  </div>


  )
}

/* ---------- INPUT ---------- */

function Input({ label, type = "text", value, onChange }: any) {
  return (
  <div className="space-y-1"> <label className="text-sm text-gray-700">{label}</label> 
  <input
    type={type}
    value={value}
    onChange={onChange}
    className="w-full h-10 px-4 rounded-lg border bg-white text-sm
     focus:outline-none focus:ring-2 focus:ring-green-500/30"
  /> </div>
  )
}

/* ---------- SELECT ---------- */

function Select({ label, value, onChange }: any) {
  return (<div className="space-y-1"> <label className="text-sm text-gray-700">{label}</label> <div className="relative"> <select
    value={value}
    onChange={onChange}
    className="w-full h-10 px-4 pr-10 rounded-lg border bg-white text-sm appearance-none
       focus:outline-none focus:ring-2 focus:ring-green-500/30"
  > <option value="">Select</option> <option>Yes</option> <option>No</option> </select>

    
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
  </div>
  </div>


  )
}
