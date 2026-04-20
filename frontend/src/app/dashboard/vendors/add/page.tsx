"use client"

import { ChevronLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { createVendorApi } from "@/lib/vendor.api"
import { useRouter } from "next/navigation";

export default function AddNewVendorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    vendor: {
      companyName: "",
      fullName: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      website: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      gstNumber: "",
    },
  })

  const [loading, setLoading] = useState(false)

  /* ---------- HANDLE CHANGE ---------- */

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      vendor: {
        ...prev.vendor,
        [field]: value,
      },
    }))
  }

  /* ---------- VALIDATION ---------- */

  const validate = () => {
    if (!form.vendor.companyName) return "Company Name is required"
    if (!form.vendor.contactNumber) return "Contact Number is required"
    if (!form.vendor.email) return "Email is required"
    return null
  }

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        vendor: form.vendor,
      };

      await createVendorApi(payload);

      toast.success("Vendor created successfully");

      // ✅ redirect after short delay (so user sees toast)
      setTimeout(() => {
        router.push("/dashboard/vendors");
      }, 1000);

    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (<div className="space-y-8">


    {/* BACK LINK */}
    <Link
      href="/dashboard/vendors"
      className="flex items-center gap-2 text-sm text-green-600 hover:underline"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Vendor List
    </Link>

    {/* TITLE */}
    <h2 className="text-2xl font-medium text-green-600 text-center">
      Add New Vendor
    </h2>

    {/* FORM */}
    <div className="max-w-8xl mx-auto space-y-6">

      <h3 className="text-sm font-semibold text-blue-600">
        Vendor Details:
      </h3>

      <div className="grid grid-cols-2 gap-6">

        <Input label="Company Name"
          value={form.vendor.companyName}
          onChange={(e:any) => handleChange("companyName", e.target.value)}
        />

        <Input label="Full Name"
          value={form.vendor.fullName}
          onChange={(e:any) => handleChange("fullName", e.target.value)}
        />

        <Input label="Contact Number"
          value={form.vendor.contactNumber}
          onChange={(e:any) => handleChange("contactNumber", e.target.value)}
        />

        <Input label="WhatsApp Number"
          value={form.vendor.whatsappNumber}
          onChange={(e:any) => handleChange("whatsappNumber", e.target.value)}
        />

        <Input label="Email"
          value={form.vendor.email}
          onChange={(e:any) => handleChange("email", e.target.value)}
        />

        <Input label="Website"
          value={form.vendor.website}
          onChange={(e:any) => handleChange("website", e.target.value)}
        />

        <Input label="Address Line 1"
          value={form.vendor.addressLine1}
          onChange={(e:any) => handleChange("addressLine1", e.target.value)}
        />

        <Input label="Address Line 2"
          value={form.vendor.addressLine2}
          onChange={(e:any) => handleChange("addressLine2", e.target.value)}
        />

        <Select label="City"
          value={form.vendor.city}
          onChange={(e:any) => handleChange("city", e.target.value)}
        />

        <Select label="State"
          value={form.vendor.state}
          onChange={(e:any) => handleChange("state", e.target.value)}
        />

        <Input label="Pincode"
          value={form.vendor.pincode}
          onChange={(e:any) => handleChange("pincode", e.target.value)}
        />

        <Input label="GST Number"
          value={form.vendor.gstNumber}
          onChange={(e:any) => handleChange("gstNumber", e.target.value)}
        />
      </div>

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
          {loading ? "Saving..." : "Save Vendor"}
        </button>
      </div>
    </div>
  </div>


  )
}

/* ---------- INPUT ---------- */
function Input({ label, value, onChange }: any) {
  return (<div className="space-y-1"> <label className="text-sm text-gray-700">{label}</label> <input
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
  > <option value="">Select</option> <option>Delhi</option> <option>Mumbai</option> </select>

    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
  </div>
  </div>


  )
}
