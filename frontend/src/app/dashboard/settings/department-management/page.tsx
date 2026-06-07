"use client"

import {
  Plus,
  Search,
  Building2,
  Users,
  CheckCircle,
  AlertCircle,
  Activity,
  ShieldCheck,
  MapPin,
  FileText,
  User2,
  Hash,
  X,
  Package2,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import {
  createDepartmentApi,
  getDepartmentsApi ,
} from "@/lib/department.api"

export default function DepartmentManagementPage() {

  const [openModal, setOpenModal] =
    useState(false)

    const [search, setSearch] =
  useState("");

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
          await getDepartmentsApi ()

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


    const filteredDepartments =
  departments.filter(
    (dept: any) => {

      if (!search)
        return true;

      const searchText =
        search.toLowerCase();

      return (
        dept.name
          ?.toLowerCase()
          .includes(
            searchText
          ) ||
        dept.code
          ?.toLowerCase()
          .includes(
            searchText
          ) ||
        dept.adminName
          ?.toLowerCase()
          .includes(
            searchText
          ) ||
        dept.city
          ?.toLowerCase()
          .includes(
            searchText
          ) ||
        dept.state
          ?.toLowerCase()
          .includes(
            searchText
          ) ||
        dept.description
          ?.toLowerCase()
          .includes(
            searchText
          )
      );
    }
  );

  return (
    <div className="space-y-4 overflow-x-hidden">

      {/* HERO */}

   <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-5 text-white shadow-lg">

  {/* Background Glow */}

  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

  <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

    {/* LEFT */}

    <div>

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center">

          <Building2 className="w-7 h-7 text-white" />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-white">
            Department Management
          </h1>

          <p className="text-emerald-100 text-sm mt-1">
            Manage departments, staff & organizational assets
          </p>

        </div>

      </div>

      {/* QUICK STATS */}

      <div className="flex flex-wrap gap-6 mt-5">

        <div>

          <h2 className="text-3xl font-bold">
            {departments.length}
          </h2>

          <p className="text-xs text-emerald-100 mt-1">
            Departments
          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            {departments.reduce(
              (acc: number, item: any) =>
                acc + (item.totalAssets || 0),
              0
            )}
          </h2>

          <p className="text-xs text-emerald-100 mt-1">
            Assets
          </p>

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            {departments.reduce(
              (acc: number, item: any) =>
                acc + (item.totalStaff || 0),
              0
            )}
          </h2>

          <p className="text-xs text-emerald-100 mt-1">
            Staff
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT */}

    <div className="grid grid-cols-2 gap-3 xl:w-[280px]">

      <MiniCard
        icon={Building2}
        title="Departments"
        value={departments.length}
      />

      <MiniCard
        icon={ShieldCheck}
        title="Active"
        value={
          departments.filter(
            (d: any) => d.isActive
          ).length
        }
      />

      <MiniCard
        icon={Users}
        title="Staff"
        value={
          departments.reduce(
            (acc: number, item: any) =>
              acc + (item.totalStaff || 0),
            0
          )
        }
      />

      <MiniCard
        icon={Package2}
        title="Assets"
        value={
          departments.reduce(
            (acc: number, item: any) =>
              acc + (item.totalAssets || 0),
            0
          )
        }
      />

    </div>

  </div>

</div>

      {/* FILTER */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          {/* SEARCH */}

          <div className="relative w-full xl:w-[320px] min-w-0">

            <Search className="absolute left-3 top-3.5 w-4 h-4 text-black" />

            <input
              value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
              placeholder="Search departments..."
              className="
                w-full h-10 rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-3
                text-sm text-black
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
              "
            />
          </div>

          {/* ACTION */}

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="
              h-10 px-4 rounded-xl
              bg-gradient-to-r
              from-emerald-600
              to-green-600
              hover:opacity-95
              transition
              text-white text-sm font-medium
              flex items-center gap-2
              shadow-sm
              whitespace-nowrap cursor-pointer
            "
          >

            <Plus className="w-4 h-4" />

            Add Department
          </button>
        </div>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

        {pageLoading ? (

          <div className="col-span-full flex items-center justify-center py-12">

            <div className="text-center">

              <div className="w-12 h-12 border-[3px] border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />

              <p className="text-sm text-black mt-4">
                Loading departments...
              </p>
            </div>
          </div>

        ) : departments.length ===
          0 ? (

          <div className="col-span-full bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm overflow-hidden">

            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">

              <Building2 className="w-8 h-8 text-emerald-600" />
            </div>

            <h2 className="text-lg font-semibold text-black mt-4 break-words">
              No Departments Found
            </h2>

            <p className="text-sm text-black mt-2">
              Create your first department
            </p>
          </div>

        ) : (

          filteredDepartments.map(
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
                  id: d.id,
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

      {/* MODAL */}

      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">

          <div className="relative overflow-hidden w-full max-w-3xl rounded-xl bg-white shadow-xl border border-gray-100 max-h-[95vh] overflow-y-auto">

            {/* HERO */}

            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-4 text-white">

              <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-sm shrink-0">

                    <Building2 className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-semibold break-words ">
                      Create Department
                    </h2>

                    <p className="text-green-50 mt-1 text-xs break-words">
                      Add department structure
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center shrink-0"
                >

                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* BODY */}

            <div className="p-4 space-y-5 overflow-hidden">

              {/* BASIC */}

              <Section title="Basic Information">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

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
              </Section>

              {/* LOCATION */}

              <Section title="Location Details">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

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
              </Section>

              {/* DESCRIPTION */}

              <Section title="Department Description">

                <div>

                  <label className="text-sm font-medium text-black">
                    Description
                  </label>

                  <div className="relative mt-2">

                    <div className="absolute left-3 top-3">

                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>

                    <textarea
                      rows={4}
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
                      placeholder="Enter description..."
                      className="
                        w-full pl-10 p-3
                        border border-gray-200
                        rounded-xl
                        bg-gray-50
                        text-sm text-black
                        outline-none
                        resize-none
                        transition
                        focus:border-emerald-500
                        focus:bg-white
                      "
                    />
                  </div>
                </div>
              </Section>

              {/* FOOTER */}

              <div className="flex flex-col-reverse md:flex-row md:justify-end gap-2 pt-4 border-t border-gray-100">

                <button
                  onClick={() =>
                    setOpenModal(false)
                  }
                  className="
                    h-10 px-4
                    rounded-xl
                    border border-gray-200
                    bg-white
                    hover:bg-gray-100
                    transition
                    text-sm font-medium
                    text-black cursor-pointer
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
                    h-10 px-4
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    hover:opacity-95
                    text-white
                    text-sm font-medium
                    shadow-sm
                    transition
                    disabled:opacity-50 cursor-pointer
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
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 border border-white/10 overflow-hidden">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-sm shrink-0">

          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-green-50 break-words">
            {title}
          </p>

          <h3 className="text-lg font-bold mt-1 text-white break-words">
            {value}
          </h3>
        </div>
      </div>
    </div>
  )
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  children,
}: any) {

  return (
    <div className="space-y-4 overflow-hidden">

      <div>

        <h3 className="text-base font-semibold text-black break-words">
          {title}
        </h3>

        <div className="w-14 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-2" />
      </div>

      {children}
    </div>
  )
}

/* ---------------- DEPARTMENT CARD ---------------- */

function DepartmentCard({
  data,
}: any) {

  return (
    <div className="group relative overflow-hidden bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">

      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-start gap-3 min-w-0">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-sm shrink-0">

              <Building2 className="w-6 h-6" />
            </div>

            <div className="min-w-0">

              <h3 className="text-lg font-semibold text-black break-words">
                {data.name}
              </h3>

              <p className="text-xs text-black mt-1 break-words">
                Code: {data.code}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 text-[11px] font-medium whitespace-nowrap">

            {data.status}
          </span>
        </div>

        <p className="text-sm text-black leading-6 mt-4 break-words">
          {data.desc}
        </p>

        <p className="text-sm font-semibold text-black mt-4 break-all">
          Department ID : {data.id}
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4">

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
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center overflow-hidden">

      <p className="text-[10px] font-semibold uppercase tracking-wide text-black break-words">
        {title}
      </p>

      <h4 className="text-sm font-semibold text-black mt-2 break-words">
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
    <div className="min-w-0">

      <label className="text-sm font-medium text-black">
        {label}
      </label>

      <div className="relative mt-2">

        <div className="absolute left-3 top-1/2 -translate-y-1/2">

          <Icon className="w-4 h-4 text-emerald-600" />
        </div>

        <input
          {...props}
          className="
            w-full h-10
            rounded-xl
            border border-gray-200
            bg-gray-50
            pl-10 pr-3
            text-sm text-black
            outline-none
            transition
            focus:border-emerald-500
            focus:bg-white
          "
        />
      </div>
    </div>
  )
}