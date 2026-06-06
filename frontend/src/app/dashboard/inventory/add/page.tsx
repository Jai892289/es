"use client"

import Link from "next/link"

import {
  ChevronLeft,
  ChevronDown,
  Building2,
  Truck,
  Package2,
  Save,
  File
} from "lucide-react"
// test
import { useState, useEffect } from "react"
import { getDepartmentsApi } from "@/lib/department.api";

import { createInventoryApi } from "@/lib/inventory.api"

import { useRouter } from "next/navigation"

import toast from "react-hot-toast"
import { getVendorsApi } from "@/lib/vendor.api";
import { getCategoryApi } from "@/lib/category.api";

export default function AddProductInventoryPage() {

  /* ---------------- STATE ---------------- */

  const [form, setForm] = useState({
      departmentId: "",
  vendorId: "",
  categoryId: "",
    department: {
      name: "",
      purpose: "",
      fullName: "",
      designation: "",
      contactNumber: "",
      email: "",
      location: "",
      city: "",
      state: "",
      pincode: "",
    },

    vendor: {
      companyName: "",
      fullName: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      location: "",
    },

 product: {
  category: "",
  productName: "",
  otherProduct: "",
  quantity: "",

  inStock: "",
  inUse: "",
  inRepair: "",
  damaged: "",

  serialNumber: "",

  assetName: "",
  invoiceNumber: "",
  purchaseDate: "",
  brandName: "",
  modelNumber: "",

  amcAvailable: "",
  amcExpiryDate: "",
  amcNumber: "",
  warrantyExpiryDate: "",
  procurementDate: "",
  productDescription: "",
},

    attachments: [],
  })

  const [loading, setLoading] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [departments, setDepartments] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
const [categories, setCategories] =
  useState<any[]>([]);
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

if (!form.departmentId){      errors.push("Department name is required")
    }

    if (!form.vendor.companyName) {
      errors.push("Vendor company is required")
    }

    // if (!form.product.productName) {
    //   errors.push("Product name is required")
    // }

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

      // const payload = {

      //   department: {
      //     ...form.department,
      //   },

      //   vendor: {
      //     ...form.vendor,
      //   },

      //   product: {
      //     ...form.product,

      //     quantity: Number(form.product.quantity),

      //     warrantyExpiryDate:
      //       form.product.warrantyExpiryDate || null,
      //   },
      // }

      const payload = {

  departmentId: form.departmentId,

  vendorId: form.vendorId,

  categoryId: form.categoryId,

  product: {
    ...form.product,

    quantity: Number(form.product.quantity),

    warrantyExpiryDate:
      form.product.warrantyExpiryDate || null,
  },
};

console.log("payload", payload)
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

  useEffect(() => {
    loadDepartments();
    loadVendors();
    loadCategories();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await getDepartmentsApi();

      console.log(response);

      setDepartments(response.data || response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  };

  const loadVendors = async () => {
  try {
    const response = await getVendorsApi();

    setVendors(response.data || response);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load vendors");
  }
};

const loadCategories = async () => {
  try {
    const response = await getCategoryApi();

    setCategories(response.data || []);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load categories");
  }
};

console.log("vendors", vendors)

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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Department   </label>


                <select
                  value={form.department.name}
                  onChange={(e) => {
  const department = departments.find(
    (d) => d.id === e.target.value
  );

  if (!department) return;

  const user = department.users?.[0];

 setForm((prev) => ({
  ...prev,

  departmentId: department.id,

  department: {
    ...prev.department,

    name: department.name || "",
    purpose: department.purpose || "",
    location: department.location || "",
    city: department.city || "",
    state: department.state || "",
    pincode: department.pincode || "",

    fullName:
      user?.name ||
      department.adminName ||
      "",

    designation:
      user?.designation || "",

    contactNumber:
      user?.mobileNumber || "",

    email:
      user?.email || "",
  },
}));
}}
                  className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4"
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map((dept) => (
                    <option
                      key={dept.id}
                      value={dept.id}
                    >
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Purpose"
                value={form.department.purpose}
                onChange={(e: any) =>
                  handleChange("department", "purpose", e.target.value)
                }
              />

              {/* Row 2 */}
              <Input
                label="Department Name"
                value={form.department.fullName}
                onChange={(e: any) =>
                  handleChange("department", "fullName", e.target.value)
                }
              />

              <Input
                label="Designation"
                value={form.department.designation}
                onChange={(e: any) =>
                  handleChange("department", "designation", e.target.value)
                }
              />

              {/* Row 3 */}
              <Input
                label="Contact Number"
                value={form.department.contactNumber}
                onChange={(e: any) =>
                  handleChange("department", "contactNumber", e.target.value)
                }
              />

              <Input
                label="Email"
                value={form.department.email}
                onChange={(e: any) =>
                  handleChange("department", "email", e.target.value)
                }
              />

              {/* Row 4 */}
              <Input
                label="Location"
                value={form.department.location}
                onChange={(e: any) =>
                  handleChange("department", "location", e.target.value)
                }
              />

              <Input
                label="City"
                value={form.department.city}
                onChange={(e: any) =>
                  handleChange("department", "city", e.target.value)
                }
              />

              {/* Row 5 */}
              <Input
                label="State"
                value={form.department.state}
                onChange={(e: any) =>
                  handleChange("department", "state", e.target.value)
                }
              />

              <Input
                label="Pincode"
                value={form.department.pincode}
                onChange={(e: any) =>
                  handleChange("department", "pincode", e.target.value)
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

              {/* Row 1 */}
             <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Category
  </label>

  <select
    value={form.categoryId}
    onChange={(e) => {
      const category = categories.find(
        (c) => c.id === e.target.value
      );

      if (!category) return;

      setForm((prev) => ({
        ...prev,

        categoryId: category.id,

        product: {
          ...prev.product,

          category: category.name,
        },
      }));
    }}
    className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4"
  >
    <option value="">
      Select Category
    </option>

    {categories.map((category) => (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    ))}
  </select>
</div>

              <Input
                label="Item / Product"
                value={form.product.productName}
                onChange={(e: any) =>
                  handleChange("product", "productName", e.target.value)
                }
              />

              {/* Row 2 */}
              <Input
                label="Other Product"
                value={form.product.otherProduct}
                onChange={(e: any) =>
                  handleChange("product", "otherProduct", e.target.value)
                }
              />

              <Input
                label="Quantity"
                value={form.product.quantity}
                onChange={(e: any) =>
                  handleChange("product", "quantity", e.target.value)
                }
              />

              {/* Row 3 */}
              <Input
                label="Serial Number"
                value={form.product.serialNumber}
                onChange={(e: any) =>
                  handleChange("product", "serialNumber", e.target.value)
                }
              />

              <Select
                label="AMC"
                value={form.product.amcAvailable}
                onChange={(e: any) =>
                  handleChange("product", "amcAvailable", e.target.value)
                }
              />

              {/* Row 4 */}
              <Input
                type="date"
                label="AMC Expiry Date"
                value={form.product.amcExpiryDate}
                onChange={(e: any) =>
                  handleChange("product", "amcExpiryDate", e.target.value)
                }
              />

              <Input
                label="AMC Number"
                value={form.product.amcNumber}
                onChange={(e: any) =>
                  handleChange("product", "amcNumber", e.target.value)
                }
              />

              {/* Row 5 */}
              <Input
                type="date"
                label="Warranty Expiry Date"
                value={form.product.warrantyExpiryDate}
                onChange={(e: any) =>
                  handleChange(
                    "product",
                    "warrantyExpiryDate",
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

              
              {/* Asset Name */}
<Input
label="Asset Name"
value={form.product.assetName}
onChange={(e: any) =>
handleChange(
"product",
"assetName",
e.target.value
)
}
/>

{/* Invoice Number */}
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

{/* Purchase Date */}
<Input
type="date"
label="Purchase Date"
value={form.product.purchaseDate}
onChange={(e: any) =>
handleChange(
"product",
"purchaseDate",
e.target.value
)
}
/>

{/* Warranty Date */}
<Input
type="date"
label="Warranty Date"
value={form.product.warrantyExpiryDate}
onChange={(e: any) =>
handleChange(
"product",
"warrantyExpiryDate",
e.target.value
)
}
/>

{/* Brand / Manufacturer */}
<Input
label="Brand / Manufacturer Name"
value={form.product.brandName}
onChange={(e: any) =>
handleChange(
"product",
"brandName",
e.target.value
)
}
/>

{/* Model Number */}
<Input
label="Model Number"
value={form.product.modelNumber}
onChange={(e: any) =>
handleChange(
"product",
"modelNumber",
e.target.value
)
}
/>

{/* Initial Status */}

{/* ================= STOCK DISTRIBUTION ================= */}

<div className="col-span-2">

  <div className="flex items-center justify-between mb-4">

    <h3 className="text-base font-semibold text-gray-800">
      Stock Distribution
    </h3>

    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
      Total Quantity : {form.product.quantity || 0}
    </span>

  </div>

  <div className="grid grid-cols-2 gap-5">

    <Input
      label="In Stock"
      value={form.product.inStock}
      onChange={(e: any) =>
        handleChange(
          "product",
          "inStock",
          e.target.value
        )
      }
    />

    <Input
      label="In Use"
      value={form.product.inUse}
      onChange={(e: any) =>
        handleChange(
          "product",
          "inUse",
          e.target.value
        )
      }
    />

    <Input
      label="In Repair"
      value={form.product.inRepair}
      onChange={(e: any) =>
        handleChange(
          "product",
          "inRepair",
          e.target.value
        )
      }
    />

    <Input
      label="Damaged"
      value={form.product.damaged}
      onChange={(e: any) =>
        handleChange(
          "product",
          "damaged",
          e.target.value
        )
      }
    />

  </div>

  {/* Summary */}

  <div className="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-5">

    <div className="flex justify-between items-center py-2 border-b border-gray-200">

      <span className="text-sm text-gray-600">
        Total Quantity
      </span>

      <span className="font-semibold">
        {Number(form.product.quantity || 0)}
      </span>

    </div>

    <div className="flex justify-between items-center py-2 border-b border-gray-200">

      <span className="text-sm text-gray-600">
        Allocated
      </span>

      <span className="font-semibold">
        {
          Number(form.product.inStock || 0) +
          Number(form.product.inUse || 0) +
          Number(form.product.inRepair || 0) +
          Number(form.product.damaged || 0)
        }
      </span>

    </div>

    <div className="flex justify-between items-center py-2">

      <span className="text-sm text-gray-600">
        Remaining
      </span>

      <span
        className={`font-semibold ${
          Number(form.product.quantity || 0) -
            (
              Number(form.product.inStock || 0) +
              Number(form.product.inUse || 0) +
              Number(form.product.inRepair || 0) +
              Number(form.product.damaged || 0)
            ) ===
          0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {
          Number(form.product.quantity || 0) -
          (
            Number(form.product.inStock || 0) +
            Number(form.product.inUse || 0) +
            Number(form.product.inRepair || 0) +
            Number(form.product.damaged || 0)
          )
        }
      </span>

    </div>

  </div>

</div>


              {/* Product Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>

                <textarea
                  rows={6}
                  maxLength={500}
                  value={form.product.productDescription}
                  onChange={(e: any) =>
                    handleChange(
                      "product",
                      "productDescription",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-500 focus:bg-white transition resize-none"
                />

                <p className="mt-2 text-sm text-gray-500">
                  {form.product.productDescription.length}/500
                </p>
              </div>



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

            <div className="grid  gap-5">

              <div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Select Vendor
  </label>

  <select
    value={form.vendor.companyName}
    onChange={(e) => {
      const vendor = vendors.find(
        (v) => v.id === e.target.value
      );

      if (!vendor) return;

      setForm((prev) => ({
  ...prev,

  vendorId: vendor.id,

  vendor: {
    ...prev.vendor,

    companyName: vendor.companyName || "",
    fullName: vendor.fullName || "",
    contactNumber:
      vendor.contactNumber || "",

    whatsappNumber:
      vendor.whatsappNumber || "",

    email: vendor.email || "",

    location:
      vendor.location ||
      vendor.addressLine1 ||
      "",
  },
}));
    }}
    className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4"
  >
    <option value="">
      Select Vendor
    </option>

    {vendors.map((vendor) => (
      <option
        key={vendor.id}
        value={vendor.id}
      >
        {vendor.companyName}
      </option>
    ))}
  </select>
</div>

              {/* Row 1 */}
              {/* <Input
                label="Company Name"
                value={form.vendor.companyName}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "companyName",
                    e.target.value
                  )
                }
              /> */}

              <Input
                label="Full Name"
                value={form.vendor.fullName}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "fullName",
                    e.target.value
                  )
                }
              />

              {/* Row 2 */}
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

              {/* Row 3 */}
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
                label="Location"
                value={form.vendor.location}
                onChange={(e: any) =>
                  handleChange(
                    "vendor",
                    "location",
                    e.target.value
                  )
                }
              />

            </div>
          </div>



          <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

                <File className="w-5 h-5 text-orange-600" />
              </div>

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Attachments
                </h2>

                <p className="text-sm text-gray-500">
                  Upload relevant documents
                </p>
              </div>
            </div>
            <div className="mt-8">


              <label className="inline-flex items-center gap-3 px-5 py-3 border border-amber-300 rounded-2xl cursor-pointer hover:bg-gray-50">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21.44 11.05L12.25 20.24a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 11-2.82-2.83l8.48-8.48" />
                </svg>

                <span className="font-medium">
                  Upload Image/File
                </span>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(
                      e.target.files || []
                    )

                    setAttachments(files)
                  }}
                />

              </label>
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-amber-100 rounded-xl"
                    >
                      <span className="text-xs truncate">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setAttachments((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="w-6 h-6 rounded-full bg-red-100 cursor-pointer text-red-600 hover:bg-red-200 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

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