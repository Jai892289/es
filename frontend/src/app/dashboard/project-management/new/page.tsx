"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Building2,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const steps = [
  "Basic Details",
  "Location",
  "Description",
  "Timeline",
  "Budget",
  "Vendor",
  "Assets",
  "Milestones",
  "Assign Team",
  "Approval Flow",
];

export default function NewProjectPage() {

  const [step, setStep] =
    useState(1);

  const router =
    useRouter();

  const [milestone, setMilestone] =
    useState({
      name: "",
      date: "",
      percent: "",
    });

  const [form, setForm] =
    useState<any>({
      name: "",
      category: "",
      scheme: "",
      type: "New",
      department: "",
      priority: "",

      state: "",
      district: "",
      block: "",
      ward: "",
      address: "",

      description: "",
      scope: "",
      files: [],

      startDate: "",
      endDate: "",

      budget: "",
      funding: "",
      expense: "",

      vendorName: "",
      companyName: "",
      contact: "",
      contractValue: "",
      vendorFile: null,

      assets: [],

      milestones: [],

      projectManager: "",
      supervisor: "",
      departmentHead: "",

      approvals: [],
    });

  /* ---------------- SESSION ---------------- */

  useEffect(() => {

    const saved =
      sessionStorage.getItem(
        "projectForm"
      );

    if (saved) {

      setForm(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {

    sessionStorage.setItem(
      "projectForm",
      JSON.stringify(form)
    );

  }, [form]);

  /* ---------------- NAVIGATION ---------------- */

  const handleNext = () => {

    if (
      step < steps.length
    ) {

      setStep(step + 1);
    }
  };

  const handleBack = () => {

    if (step > 1) {

      setStep(step - 1);
    }
  };

  const handleSubmit = () => {

    console.log(
      "FINAL DATA:",
      form
    );

    sessionStorage.removeItem(
      "projectForm"
    );

    alert(
      "Project Created Successfully 🚀"
    );

    router.push(
      "/dashboard/project-management"
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="min-h-screen bg-[#f4f7fb] space-y-7"
    >

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 shadow-2xl text-white">

        {/* BLOBS */}

        <motion.div
          animate={{
            y: [0, -25, 0],
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
            y: [0, 20, 0],
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

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center shadow-xl">

                <Building2 className="w-10 h-10" />
              </div>

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/15 border border-white/10 backdrop-blur text-xs font-medium">

                  <Sparkles className="w-3.5 h-3.5" />

                  Smart Workflow
                </div>

                <h1 className="text-4xl  font-black tracking-tight mt-4">
                  Create New Project
                </h1>

                <p className="text-white/80 mt-3 max-w-2xl leading-7">
                  Create and manage government infrastructure projects,
                  approvals, budgeting, milestones & team workflows.
                </p>
              </div>
            </div>

            {/* MINI CARDS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <MiniCard
                title="Steps"
                value="10"
              />

              <MiniCard
                title="Workflow"
                value="Smart"
              />

              <MiniCard
                title="Approval"
                value="Multi"
              />

              <MiniCard
                title="Tracking"
                value="Live"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEPPER */}

      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[32px] p-7 shadow-xl overflow-x-auto">

        <div className="flex items-center min-w-[1100px]">

          {steps.map(
            (
              label,
              index
            ) => {

              const current =
                index + 1;

              const active =
                step >= current;

              return (
                <div
                  key={index}
                  className="flex items-center w-full"
                >

                  {/* STEP */}

                  <div className="flex flex-col items-center relative z-10">

                    <motion.div
                      whileHover={{
                        scale: 1.05,
                      }}
                      className={`
                        w-12 h-12
                        rounded-full
                        flex items-center justify-center
                        text-sm font-semibold
                        transition-all duration-300
                        ${
                          active
                            ? `
                              bg-gradient-to-r
                              from-emerald-500
                              to-green-600
                              text-white
                              shadow-lg shadow-emerald-500/30
                            `
                            : `
                              bg-gray-100
                              text-gray-500
                              border border-gray-200
                            `
                        }
                      `}
                    >

                      {step >
                      current ? (

                        <Check className="w-5 h-5" />

                      ) : (
                        current
                      )}
                    </motion.div>

                    <span className="text-[12px] font-medium mt-3 whitespace-nowrap text-gray-600">
                      {label}
                    </span>
                  </div>

                  {/* CONNECTOR */}

                  {index !==
                    steps.length -
                      1 && (

                    <div
                      className={`
                        flex-1 h-[3px]
                        rounded-full mx-2 relative top-[-15px]
                        ${
                          step >
                          current
                            ? "bg-gradient-to-r from-emerald-500 to-green-600"
                            : "bg-gray-200"
                        }
                      `}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* FORM CONTAINER */}

      <motion.div
        layout
        className="bg-white border border-gray-100 rounded-[36px] shadow-xl overflow-hidden"
      >

        {/* HEADER */}

        <div className="px-8 py-7 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              {
                steps[
                  step - 1
                ]
              }
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Complete the required information carefully
            </p>

            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-4" />
          </div>

          <div className="px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-semibold">

            Step {step} of{" "}
            {steps.length}
          </div>
        </div>

        {/* BODY */}

        <div className="p-8">

          <AnimatePresence
            mode="wait"
          >

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
            >

              {/* STEP 1 */}

              {step === 1 && (

                <div className="space-y-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <Input
                      label="Project Name"
                      value={
                        form.name
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          name: e
                            .target
                            .value,
                        })
                      }
                    />

                    <Select
                      label="Category"
                      value={
                        form.category
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          category:
                            e
                              .target
                              .value,
                        })
                      }
                      options={[
                        "Infrastructure",
                        "Education",
                        "Health",
                      ]}
                    />

                    <Input
                      label="Scheme Name"
                      value={
                        form.scheme
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          scheme:
                            e
                              .target
                              .value,
                        })
                      }
                    />

                    <Select
                      label="Project Type"
                      value={
                        form.type
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          type: e
                            .target
                            .value,
                        })
                      }
                      options={[
                        "New",
                        "Upgrade",
                      ]}
                    />

                    <Input
                      label="Department"
                      value={
                        form.department
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          department:
                            e
                              .target
                              .value,
                        })
                      }
                    />
                  </div>

                  {/* PRIORITY */}

                  <div>

                    <label className="text-sm font-semibold text-gray-700">
                      Priority Level
                    </label>

                    <div className="flex flex-wrap gap-4 mt-4">

                      {[
                        "Low",
                        "Medium",
                        "High",
                      ].map(
                        (
                          p
                        ) => (

                          <button
                            key={
                              p
                            }
                            onClick={() =>
                              setForm(
                                {
                                  ...form,
                                  priority:
                                    p,
                                }
                              )
                            }
                            className={`
                              px-6 h-12 rounded-2xl text-sm font-medium transition-all duration-300
                              ${
                                form.priority ===
                                p
                                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }
                            `}
                          >
                            {p}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}

              {step === 2 && (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  <Input
                    label="State"
                    value={
                      form.state
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        state:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  <Input
                    label="District"
                    value={
                      form.district
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        district:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  <Input
                    label="Block"
                    value={
                      form.block
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        block:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  <Input
                    label="Ward"
                    value={
                      form.ward
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        ward:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  <div className="md:col-span-2 xl:col-span-3">

                    <Textarea
                      label="Address"
                      value={
                        form.address
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          address:
                            e
                              .target
                              .value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 */}

              {step === 3 && (

                <div className="space-y-7">

                  <Textarea
                    label="Project Description"
                    value={
                      form.description
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        description:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  <Textarea
                    label="Scope / Objectives"
                    value={
                      form.scope
                    }
                    onChange={(
                      e: any
                    ) =>
                      setForm({
                        ...form,
                        scope:
                          e
                            .target
                            .value,
                      })
                    }
                  />

                  {/* FILE */}

                  <div>

                    <label className="text-sm font-semibold text-gray-700">
                      Upload Documents
                    </label>

                    <div className="
                      border-2 border-dashed border-gray-200
                      rounded-[28px]
                      p-10
                      text-center
                      bg-gradient-to-br from-gray-50 to-white
                      hover:border-emerald-400
                      hover:bg-emerald-50/30
                      transition-all duration-300
                      cursor-pointer mt-3
                    ">

                      <input
                        type="file"
                        multiple
                        className="hidden"
                        id="fileUpload"
                        onChange={(
                          e
                        ) =>
                          setForm(
                            {
                              ...form,
                              files:
                                Array.from(
                                  e
                                    .target
                                    .files ||
                                    []
                                ),
                            }
                          )
                        }
                      />

                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer"
                      >

                        <p className="text-lg font-semibold text-gray-700">
                          Upload DPR & Documents
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          Drag & drop or browse files
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — TIMELINE */}

{step === 4 && (

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <Input
      label="Start Date"
      type="date"
      value={form.startDate}
      onChange={(e: any) =>
        setForm({
          ...form,
          startDate: e.target.value,
        })
      }
    />

    <Input
      label="End Date"
      type="date"
      value={form.endDate}
      onChange={(e: any) =>
        setForm({
          ...form,
          endDate: e.target.value,
        })
      }
    />
  </div>
)}

{/* STEP 5 — BUDGET */}

{step === 5 && (

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    <Input
      label="Estimated Budget"
      value={form.budget}
      onChange={(e: any) =>
        setForm({
          ...form,
          budget: e.target.value,
        })
      }
    />

    <Input
      label="Funding Source"
      value={form.funding}
      onChange={(e: any) =>
        setForm({
          ...form,
          funding: e.target.value,
        })
      }
    />

    <Input
      label="Current Expense"
      value={form.expense}
      onChange={(e: any) =>
        setForm({
          ...form,
          expense: e.target.value,
        })
      }
    />
  </div>
)}

{/* STEP 6 — VENDOR */}

{step === 6 && (

  <div className="space-y-7">

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <Input
        label="Vendor Name"
        value={form.vendorName}
        onChange={(e: any) =>
          setForm({
            ...form,
            vendorName: e.target.value,
          })
        }
      />

      <Input
        label="Company Name"
        value={form.companyName}
        onChange={(e: any) =>
          setForm({
            ...form,
            companyName: e.target.value,
          })
        }
      />

      <Input
        label="Contact Number"
        value={form.contact}
        onChange={(e: any) =>
          setForm({
            ...form,
            contact: e.target.value,
          })
        }
      />

      <Input
        label="Contract Value"
        value={form.contractValue}
        onChange={(e: any) =>
          setForm({
            ...form,
            contractValue: e.target.value,
          })
        }
      />
    </div>

    {/* FILE */}

    <div>

      <label className="text-sm font-semibold text-gray-700">
        Vendor Agreement
      </label>

      <div className="
        border-2 border-dashed border-gray-200
        rounded-[28px]
        p-10
        text-center
        bg-gradient-to-br from-gray-50 to-white
        hover:border-emerald-400
        hover:bg-emerald-50/30
        transition-all duration-300
        cursor-pointer mt-3
      ">

        <input
          type="file"
          className="hidden"
          id="vendorFile"
          onChange={(e: any) =>
            setForm({
              ...form,
              vendorFile: e.target.files?.[0],
            })
          }
        />

        <label
          htmlFor="vendorFile"
          className="cursor-pointer"
        >

          <p className="text-lg font-semibold text-gray-700">
            Upload Vendor Agreement
          </p>

          <p className="text-sm text-gray-500 mt-2">
            PDF / DOC supported
          </p>
        </label>
      </div>
    </div>
  </div>
)}

{/* STEP 7 — ASSETS */}

{step === 7 && (

  <div className="space-y-6">

    <Textarea
      label="Asset Details"
      value={form.assets.join(", ")}
      onChange={(e: any) =>
        setForm({
          ...form,
          assets: e.target.value
            .split(",")
            .map((a: string) =>
              a.trim()
            ),
        })
      }
    />

    <div className="flex flex-wrap gap-3">

      {form.assets.map(
        (
          asset: string,
          i: number
        ) => (

          <div
            key={i}
            className="px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-700 text-sm font-medium"
          >
            {asset}
          </div>
        )
      )}
    </div>
  </div>
)}

{/* STEP 8 — MILESTONES */}

{step === 8 && (

  <div className="space-y-7">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <Input
        label="Milestone Name"
        value={milestone.name}
        onChange={(e: any) =>
          setMilestone({
            ...milestone,
            name: e.target.value,
          })
        }
      />

      <Input
        label="Target Date"
        type="date"
        value={milestone.date}
        onChange={(e: any) =>
          setMilestone({
            ...milestone,
            date: e.target.value,
          })
        }
      />

      <Input
        label="Completion %"
        value={milestone.percent}
        onChange={(e: any) =>
          setMilestone({
            ...milestone,
            percent: e.target.value,
          })
        }
      />
    </div>

    <button
      onClick={() => {

        if (!milestone.name)
          return

        setForm({
          ...form,
          milestones: [
            ...form.milestones,
            milestone,
          ],
        })

        setMilestone({
          name: "",
          date: "",
          percent: "",
        })
      }}
      className="
        h-12 px-6 rounded-2xl
        bg-gradient-to-r
        from-emerald-600
        to-green-600
        text-white font-medium
      "
    >
      Add Milestone
    </button>

    <div className="space-y-4">

      {form.milestones.map(
        (
          item: any,
          i: number
        ) => (

          <div
            key={i}
            className="p-5 rounded-2xl border border-gray-100 bg-gray-50"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.date}
                </p>
              </div>

              <div className="text-sm font-bold text-emerald-600">
                {item.percent}%
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </div>
)}

{/* STEP 9 — ASSIGN TEAM */}

{step === 9 && (

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    <Input
      label="Project Manager"
      value={form.projectManager}
      onChange={(e: any) =>
        setForm({
          ...form,
          projectManager: e.target.value,
        })
      }
    />

    <Input
      label="Supervisor"
      value={form.supervisor}
      onChange={(e: any) =>
        setForm({
          ...form,
          supervisor: e.target.value,
        })
      }
    />

    <Input
      label="Department Head"
      value={form.departmentHead}
      onChange={(e: any) =>
        setForm({
          ...form,
          departmentHead: e.target.value,
        })
      }
    />
  </div>
)}

{/* STEP 10 — APPROVAL */}

{step === 10 && (

  <div className="space-y-6">

    <Textarea
      label="Approval Workflow Notes"
      value={form.approvals.join("\n")}
      onChange={(e: any) =>
        setForm({
          ...form,
          approvals:
            e.target.value.split("\n"),
        })
      }
    />

    <div className="space-y-3">

      {form.approvals.map(
        (
          item: string,
          i: number
        ) => (

          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 text-emerald-700"
          >

            <Check className="w-5 h-5" />

            <span className="text-sm font-medium">
              {item}
            </span>
          </div>
        )
      )}
    </div>
  </div>
)}

              {/* OTHER STEPS PLACEHOLDER */}

              {step > 3 && (

                <div className="min-h-[350px] flex items-center justify-center">

                  <div className="text-center">

                    <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center mx-auto shadow-2xl">

                      <Building2 className="w-12 h-12" />
                    </div>

                    <h3 className="text-3xl font-bold text-gray-800 mt-8">
                      {
                        steps[
                          step - 1
                        ]
                      }
                    </h3>

                    <p className="text-gray-500 mt-3 max-w-lg leading-7">
                      Continue building the remaining workflow sections with the same premium UI pattern.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* FOOTER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-10 pt-8 border-t border-gray-100">

            <button
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
              Save Draft
            </button>

            <div className="flex gap-3">

              {step > 1 && (

                <button
                  onClick={
                    handleBack
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
                  Back
                </button>
              )}

              <button
                onClick={
                  step ===
                  steps.length
                    ? handleSubmit
                    : handleNext
                }
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
                  flex items-center gap-2
                "
              >

                {step ===
                steps.length
                  ? "Submit Project"
                  : "Continue"}

                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- MINI CARD ---------------- */

function MiniCard({
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

      <p className="text-sm text-green-50">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2 text-white">
        {value}
      </h3>
    </motion.div>
  );
}

/* ---------------- INPUT ---------------- */

function Input({
  label,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full h-14 mt-2
          rounded-2xl
          border border-gray-200
          bg-gray-50
          px-5
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
  );
}

/* ---------------- SELECT ---------------- */

function Select({
  label,
  options,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <select
        {...props}
        className="
          w-full h-14 mt-2
          rounded-2xl
          border border-gray-200
          bg-gray-50
          px-5
          text-sm
          outline-none
          transition-all duration-300
          focus:border-emerald-500
          focus:bg-white
          focus:ring-4
          focus:ring-emerald-100
        "
      >

        <option>
          Select Option
        </option>

        {options.map(
          (
            item: any
          ) => (

            <option
              key={item}
            >
              {item}
            </option>
          )
        )}
      </select>
    </div>
  );
}

/* ---------------- TEXTAREA ---------------- */

function Textarea({
  label,
  ...props
}: any) {

  return (
    <div>

      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        {...props}
        rows={5}
        className="
          w-full mt-2 p-5
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
  );
}