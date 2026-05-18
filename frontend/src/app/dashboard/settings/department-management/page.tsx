"use client"

import {
  Plus,
  Search,
  Building2,
  Users,
  CheckCircle,
  AlertCircle,
  Pencil,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  MapPin,
  FileText,
  User2,
  Hash,
  X,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import {
  createDepartmentApi,
  getComplaintApi,
} from "@/lib/department.api"

const stats = [
  {
    title: "Total Departments",
    value: "10",
    icon: Building2,
    gradient:
      "from-blue-500 to-cyan-500",
  },

  {
    title: "Total Staff",
    value: "966",
    icon: Users,
    gradient:
      "from-emerald-500 to-green-600",
  },

  {
    title: "Total Assets",
    value: "14,250",
    icon: CheckCircle,
    gradient:
      "from-purple-500 to-fuchsia-500",
  },

  {
    title: "Active Depts",
    value: "10",
    icon: AlertCircle,
    gradient:
      "from-orange-500 to-amber-500",
  },
]

export default function DepartmentManagementPage() {

  const [openModal, setOpenModal] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [pageLoading, setPageLoading] =
    useState(true)

  const [departments, setDepartments] =
    useState<any[]>([])

  const [departmentForm, setDepartmentForm] =
    useState({
      name: "",
      purpose: "",
      location: "",
      city: "",
      state: "",
      pincode: "",

      code: "",
      description: "",
      adminName: "",

      totalStaff: "",
      totalAssets: "",
    })

  /* ---------------- FETCH ---------------- */

  useEffect(() => {

    fetchDepartments()

  }, [])

  const fetchDepartments =
    async () => {

      try {

        setPageLoading(true)

        const response =
          await getComplaintApi()

        setDepartments(
          response?.data || []
        )

      } catch (error) {

        console.log(
          "GET DEPARTMENT ERROR",
          error
        )

      } finally {

        setPageLoading(false)
      }
    }

  /* ---------------- CREATE ---------------- */

  const handleCreateDepartment =
    async () => {

      try {

        setLoading(true)

        await createDepartmentApi({
          ...departmentForm,

          totalStaff:
            Number(
              departmentForm.totalStaff
            ) || 0,

          totalAssets:
            Number(
              departmentForm.totalAssets
            ) || 0,
        })

        setOpenModal(false)

        setDepartmentForm({
          name: "",
          purpose: "",
          location: "",
          city: "",
          state: "",
          pincode: "",

          code: "",
          description: "",
          adminName: "",

          totalStaff: "",
          totalAssets: "",
        })

        await fetchDepartments()

      } catch (error) {

        console.log(
          "CREATE DEPARTMENT ERROR",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  return (
    <div className="space-y-7">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white shadow-xl">

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">

                <Building2 className="w-10 h-10" />
              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight">
                  Department Management
                </h1>

                <p className="text-green-50 mt-2 text-sm">
                  Manage departments, administrators & organizational resources
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-10 mt-10">

              <div>

                <h2 className="text-5xl font-bold">
                  {departments.length}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Total Departments
                </p>
              </div>

              <div>

                <h2 className="text-5xl font-bold">
                  {
                    departments.reduce(
                      (
                        acc: number,
                        item: any
                      ) =>
                        acc +
                        (item.totalAssets ||
                          0),
                      0
                    )
                  }
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Managed Assets
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 gap-4 min-w-[320px]">

            <MiniCard
              icon={ShieldCheck}
              title="Active Departments"
              value={
                departments.length
              }
            />

            <MiniCard
              icon={Users}
              title="Total Staff"
              value={
                departments.reduce(
                  (
                    acc: number,
                    item: any
                  ) =>
                    acc +
                    (item.totalStaff ||
                      0),
                  0
                )
              }
            />

            <MiniCard
              icon={Activity}
              title="System Health"
              value="Stable"
            />
          </div>
        </div>
      </div>

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-[30px] p-5 shadow-sm flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* SEARCH */}

        <div className="relative w-full xl:w-[420px]">

          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

          <input
            placeholder="Search departments..."
            className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* ACTION */}

        <button
          onClick={() =>
            setOpenModal(true)
          }
          className="h-12 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center gap-2 shadow-lg"
        >

          <Plus className="w-4 h-4" />

          Add Department
        </button>
      </div>

      {/* STATS */}
{/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map(
          (
            s,
            i
          ) => (

            <StatsCard
              key={i}
              title={s.title}
              value={s.value}
              icon={s.icon}
              gradient={s.gradient}
            />
          )
        )}
      </div> */}

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {pageLoading ? (

          <div className="col-span-full flex items-center justify-center py-20">

            <div className="text-center">

              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />

              <p className="text-sm text-gray-500 mt-5">
                Loading departments...
              </p>
            </div>
          </div>

        ) : departments.length === 0 ? (

          <div className="col-span-full bg-white border border-gray-100 rounded-[32px] p-16 text-center shadow-sm">

            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">

              <Building2 className="w-12 h-12 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              No Departments Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first department to get started
            </p>
          </div>

        ) : (

          departments.map(
            (
              d: any,
              i: number
            ) => (

              <DepartmentCard
                key={d.id || i}
                data={{
                  name: d.name,
                  code: d.code,
                  desc:
                    d.description ||
                    "No description available",
                    id:d.id,
                  admin:
                    d.adminName ||
                    "N/A",
                  staff:
                    d.totalStaff || 0,
                  assets:
                    d.totalAssets || 0,
                  status: "Active",
                }}
              />
            )
          )
        )}
      </div>

      {/* ---------------- CREATE MODAL ---------------- */}

      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="relative overflow-hidden w-full max-w-5xl rounded-[36px] bg-white shadow-2xl border border-gray-100 max-h-[95vh] overflow-y-auto">

            {/* HERO */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-8 text-white">

              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center justify-between">

                <div className="flex items-center gap-5">

                  <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur flex items-center justify-center shadow-xl">

                    <Building2 className="w-10 h-10" />
                  </div>

                  <div>

                    <h2 className="text-4xl font-bold tracking-tight">
                      Create Department
                    </h2>

                    <p className="text-green-50 mt-2 text-sm">
                      Add new department & organizational structure
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                >

                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* BODY */}

            <div className="p-8 space-y-10">

              {/* BASIC */}

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  Basic Information
                </h3>

                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-4 mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  <InputField
                    icon={Building2}
                    label="Department Name"
                    value={
                      departmentForm.name
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        name:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={Hash}
                    label="Department Code"
                    value={
                      departmentForm.code
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        code:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={User2}
                    label="Admin Name"
                    value={
                      departmentForm.adminName
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        adminName:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={Users}
                    label="Total Staff"
                    type="number"
                    value={
                      departmentForm.totalStaff
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        totalStaff:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={CheckCircle}
                    label="Total Assets"
                    type="number"
                    value={
                      departmentForm.totalAssets
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        totalAssets:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={Activity}
                    label="Purpose"
                    value={
                      departmentForm.purpose
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        purpose:
                          e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* LOCATION */}

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  Location Details
                </h3>

                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-4 mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  <InputField
                    icon={MapPin}
                    label="Location"
                    value={
                      departmentForm.location
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        location:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={MapPin}
                    label="City"
                    value={
                      departmentForm.city
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        city:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={MapPin}
                    label="State"
                    value={
                      departmentForm.state
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        state:
                          e.target.value,
                      })
                    }
                  />

                  <InputField
                    icon={MapPin}
                    label="Pincode"
                    value={
                      departmentForm.pincode
                    }
                    onChange={(e: any) =>
                      setDepartmentForm({
                        ...departmentForm,
                        pincode:
                          e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  Department Description
                </h3>

                <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-4 mb-8" />

                <div>

                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>

                  <div className="relative mt-2">

                    <div className="absolute left-4 top-5">

                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>

                    <textarea
                      rows={6}
                      value={
                        departmentForm.description
                      }
                      onChange={(e) =>
                        setDepartmentForm({
                          ...departmentForm,
                          description:
                            e.target.value,
                        })
                      }
                      placeholder="Enter department description..."
                      className="
                        w-full pl-12 p-5
                        border border-gray-200
                        rounded-2xl
                        bg-gray-50
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
              </div>

              {/* FOOTER */}

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="
                    h-14 px-7
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    hover:bg-gray-100
                    transition-all duration-300
                    text-sm font-medium
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleCreateDepartment
                  }
                  disabled={loading}
                  className="
                    h-14 px-8
                    rounded-2xl
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    hover:from-emerald-700
                    hover:to-green-700
                    text-white
                    font-medium
                    shadow-xl shadow-emerald-500/20
                    transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Creating..."
                    : "Create Department"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <div className="bg-white/15 backdrop-blur rounded-2xl px-5 py-4 border border-white/10">

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
    </div>
  )
}

/* ---------------- STATS CARD ---------------- */

function StatsCard({
  title,
  value,
  icon: Icon,
  gradient,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div
        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${gradient} opacity-10 rounded-full blur-3xl`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
          >

            <Icon className="w-8 h-8" />
          </div>

          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition" />
        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-3">
            {value}
          </h2>
        </div>
      </div>
    </div>
  )
}

/* ---------------- DEPARTMENT CARD ---------------- */

function DepartmentCard({
  data,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-lg">

              <Building2 className="w-8 h-8" />
            </div>

            <div>

              <h3 className="text-2xl font-bold text-gray-800">
                {data.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Department Code: {data.code}
              </p>

              
            </div>
          </div>

          

          <span className="px-4 py-2 rounded-2xl bg-green-100 text-green-700 text-xs font-medium">

            {data.status}
          </span>  
      

          
        </div>

        <p className="text-sm text-gray-600 leading-7 mt-6">
          {data.desc}
        </p>

           <p className="text-sm text-gray-600 leading-7 mt-6 font-bold">

 Department Id : {data.id}         
        </p>

            
        

        <div className="grid grid-cols-3 gap-4 mt-8">

          <InfoCard
            title="Admin"
            value={data.admin}
          />

          <InfoCard
            title="Staff"
            value={data.staff}
          />

          <InfoCard
            title="Assets"
            value={data.assets}
          />
        </div>
        

        {/* <button className="mt-8 h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg">

          <Pencil className="w-4 h-4" />

          Edit Department
        </button> */}
      </div>
    </div>
  )
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
  title,
  value,
}: any) {

  return (
    <div className="bg-gray-50 rounded-[24px] p-4 border border-gray-100 text-center">

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {title}
      </p>

      <h4 className="text-sm font-semibold text-gray-800 mt-3 break-words">
        {value}
      </h4>
    </div>
  )
}

/* ---------------- INPUT FIELD ---------------- */

function InputField({
  icon: Icon,
  label,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative mt-2">

        <div className="absolute left-4 top-1/2 -translate-y-1/2">

          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <input
          {...props}
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