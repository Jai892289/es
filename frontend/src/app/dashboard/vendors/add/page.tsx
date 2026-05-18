"use client"

import Link from "next/link"

import {
  ChevronLeft,
  ChevronDown,
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"

import {
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import toast from "react-hot-toast"

import {
  createVendorApi,
} from "@/lib/vendor.api"

import {
  useRouter,
} from "next/navigation"

export default function AddNewVendorPage() {

  const router = useRouter()

  const [form, setForm] =
    useState({
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

  const [loading, setLoading] =
    useState(false)

  /* ---------- HANDLE CHANGE ---------- */

  const handleChange = (
    field: string,
    value: string
  ) => {

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

    if (
      !form.vendor.companyName
    )
      return "Company Name is required"

    if (
      !form.vendor.contactNumber
    )
      return "Contact Number is required"

    if (!form.vendor.email)
      return "Email is required"

    return null
  }

  /* ---------- SUBMIT ---------- */

  const handleSubmit =
    async () => {

      const error =
        validate()

      if (error) {

        toast.error(error)

        return
      }

      try {

        setLoading(true)

        const payload = {
          vendor:
            form.vendor,
        }

        await createVendorApi(
          payload
        )

        toast.success(
          "Vendor created successfully"
        )

        setTimeout(() => {

          router.push(
            "/dashboard/vendors"
          )
        }, 1000)

      } catch (err: any) {

        toast.error(
          err.message ||
            "Something went wrong"
        )

      } finally {

        setLoading(false)
      }
    }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="space-y-7"
    >

      {/* BACK */}

      <Link
        href="/dashboard/vendors"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
      >

        <ChevronLeft className="w-4 h-4" />

        Back to Vendor List
      </Link>

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 shadow-2xl text-white"
      >

        {/* BLOBS */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-start gap-5">

              <motion.div
                whileHover={{
                  rotate: 6,
                  scale: 1.05,
                }}
                className="w-24 h-24 rounded-[30px] bg-white/15 backdrop-blur flex items-center justify-center shadow-xl"
              >

                <Building2 className="w-12 h-12" />
              </motion.div>

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/15 border border-white/10 backdrop-blur text-xs font-medium">

                  <Sparkles className="w-3.5 h-3.5" />

                  Vendor Management
                </div>

                <h1 className="text-4xl font-bold tracking-tight mt-4">
                  Add New Vendor
                </h1>

                <p className="text-green-50 mt-3 text-sm max-w-2xl">
                  Register vendor details,
                  company information &
                  contact details into the
                  procurement ecosystem
                </p>

                <div className="flex flex-wrap gap-4 mt-6">

                  <SoftBadge label="Enterprise Ready" />

                  <SoftBadge label="Secure Registration" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Verification"
              value="Enabled"
            />

            <MiniCard
              icon={Building2}
              title="Vendor Type"
              value="Business"
            />

            <MiniCard
              icon={MapPin}
              title="Location"
              value="India"
            />

            <MiniCard
              icon={Mail}
              title="Email"
              value="Required"
            />
          </div>
        </div>
      </motion.div>

      {/* FORM */}

      <motion.div
        whileHover={{
          y: -2,
        }}
        className="bg-white border border-gray-100 rounded-[36px] shadow-sm overflow-hidden"
      >

        {/* HEADER */}

        <div className="px-8 py-7 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Vendor Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fill all mandatory vendor
              details carefully
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-medium">

              New Registration
            </div>

            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* BODY */}

        <div className="p-8 space-y-10">

          {/* COMPANY */}

          <Section
            title="Company Information"
            subtitle="Basic company & organization details"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <Input
                icon={Building2}
                label="Company Name"
                value={
                  form.vendor
                    .companyName
                }
                onChange={(e: any) =>
                  handleChange(
                    "companyName",
                    e.target.value
                  )
                }
              />

              <Input
                icon={User}
                label="Full Name"
                value={
                  form.vendor.fullName
                }
                onChange={(e: any) =>
                  handleChange(
                    "fullName",
                    e.target.value
                  )
                }
              />

              <Input
                icon={ShieldCheck}
                label="GST Number"
                value={
                  form.vendor.gstNumber
                }
                onChange={(e: any) =>
                  handleChange(
                    "gstNumber",
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* CONTACT */}

          <Section
            title="Contact Information"
            subtitle="Primary communication & support details"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <Input
                icon={Phone}
                label="Contact Number"
                value={
                  form.vendor
                    .contactNumber
                }
                onChange={(e: any) =>
                  handleChange(
                    "contactNumber",
                    e.target.value
                  )
                }
              />

              <Input
                icon={Phone}
                label="WhatsApp Number"
                value={
                  form.vendor
                    .whatsappNumber
                }
                onChange={(e: any) =>
                  handleChange(
                    "whatsappNumber",
                    e.target.value
                  )
                }
              />

              <Input
                icon={Mail}
                label="Email Address"
                value={
                  form.vendor.email
                }
                onChange={(e: any) =>
                  handleChange(
                    "email",
                    e.target.value
                  )
                }
              />

              <div className="md:col-span-2 xl:col-span-3">

                <Input
                  icon={Globe}
                  label="Website"
                  value={
                    form.vendor.website
                  }
                  onChange={(e: any) =>
                    handleChange(
                      "website",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </Section>

          {/* ADDRESS */}

          <Section
            title="Address Information"
            subtitle="Vendor office & operational location"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <div className="md:col-span-2 xl:col-span-3">

                <Input
                  icon={MapPin}
                  label="Address Line 1"
                  value={
                    form.vendor
                      .addressLine1
                  }
                  onChange={(e: any) =>
                    handleChange(
                      "addressLine1",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="md:col-span-2 xl:col-span-3">

                <Input
                  icon={MapPin}
                  label="Address Line 2"
                  value={
                    form.vendor
                      .addressLine2
                  }
                  onChange={(e: any) =>
                    handleChange(
                      "addressLine2",
                      e.target.value
                    )
                  }
                />
              </div>

              <Select
                label="City"
                value={
                  form.vendor.city
                }
                onChange={(e: any) =>
                  handleChange(
                    "city",
                    e.target.value
                  )
                }
              />

              <Select
                label="State"
                value={
                  form.vendor.state
                }
                onChange={(e: any) =>
                  handleChange(
                    "state",
                    e.target.value
                  )
                }
              />

              <Input
                icon={MapPin}
                label="Pincode"
                value={
                  form.vendor
                    .pincode
                }
                onChange={(e: any) =>
                  handleChange(
                    "pincode",
                    e.target.value
                  )
                }
              />
            </div>
          </Section>

          {/* ACTIONS */}

          <div className="flex flex-col-reverse md:flex-row md:justify-end gap-4 pt-6 border-t border-gray-100">

            <button
              className="
                h-14 px-7 rounded-2xl
                border border-gray-200
                hover:bg-gray-100
                transition-all duration-300
                text-sm font-medium
              "
            >
              Cancel
            </button>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={
                handleSubmit
              }
              disabled={loading}
              className="
                h-14 px-8 rounded-2xl
                bg-gradient-to-r
                from-emerald-600
                to-green-600
                hover:from-emerald-700
                hover:to-green-700
                transition-all duration-300
                text-white text-sm font-medium
                shadow-xl shadow-emerald-500/20
                disabled:opacity-50
              "
            >
              {loading
                ? "Saving Vendor..."
                : "Save Vendor"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  subtitle,
  children,
}: any) {

  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>

        <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-4" />
      </div>

      {children}
    </div>
  )
}

/* ---------------- INPUT ---------------- */

function Input({
  icon: Icon,
  label,
  value,
  onChange,
}: any) {

  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-2">

        <div className="absolute left-4 top-1/2 -translate-y-1/2">

          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <input
          value={value}
          onChange={onChange}
          className="
            w-full h-14
            rounded-2xl
            border border-gray-200
            bg-gray-50
            pl-12 pr-4
            text-sm
            outline-none
            transition-all duration-300
            focus:border-emerald-500
            focus:bg-white
            focus:ring-4
            focus:ring-emerald-100
          "
        />
      </div>
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
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-2">

        <select
          value={value}
          onChange={onChange}
          className="
            w-full h-14
            rounded-2xl
            border border-gray-200
            bg-gray-50
            px-5 pr-12
            text-sm
            appearance-none
            outline-none
            transition-all duration-300
            focus:border-emerald-500
            focus:bg-white
            focus:ring-4
            focus:ring-emerald-100
          "
        >

          <option value="">
            Select
          </option>

          <option>
            Delhi
          </option>

          <option>
            Mumbai
          </option>

          <option>
            Kolkata
          </option>

          <option>
            Bengaluru
          </option>
        </select>

        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
      </div>
    </div>
  )
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10"
    >

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">

          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>

          <p className="text-sm text-green-50">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1 text-white">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------- BADGE ---------------- */

function SoftBadge({
  label,
}: any) {

  return (
    <span className="px-4 py-2 rounded-2xl text-sm font-medium bg-white/15 border border-white/10 backdrop-blur">

      {label}
    </span>
  )
}