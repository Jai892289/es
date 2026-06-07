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
import { getInventoryApi } from "@/lib/inventory.api";
  import { createProjectApi } from "@/lib/project.api";

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
const [selectedAsset, setSelectedAsset] =
  useState("");
  const [milestone, setMilestone] =
  useState({
    milestoneName: "",
    dueDate: "",
    budgetPercent: "",
  });

    const [approval, setApproval] =
  useState({
    levelName: "",
    order: 1,
  });

  const [inventoryItems, setInventoryItems] =
  useState<any[]>([]);

  useEffect(() => {

  const fetchInventory =
    async () => {

      try {

        const res =
          await getInventoryApi();

        setInventoryItems(
          res.data || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  fetchInventory();

}, []);

  
 const [form, setForm] = useState<any>({

  projectId: "",

  projectName: "",
  category: "",
  schemeName: "",
  projectType: "New",
  department: "",
  priorityLevel: "",

  location: {
    state: "",
    district: "",
    block: "",
    ward: "",
    address: "",
  },

  descriptionData: {
    description: "",
    scope: "",
    fileUrl: "",
  },

  timeline: {
    startDate: "",
    endDate: "",
  },

  budget: {
    totalBudget: "",
    fundingSource: "",
    expenseBreakdown: "",
  },

  vendor: {
    vendorName: "",
    companyName: "",
    contactDetails: "",
    contractValue: "",
    agreementFile: "",
  },

  assets: [],

  milestones: [],

  team: {
    projectManager: "",
    supervisor: "",
    departmentHead: "",
  },

  approvals: [],
});

  /* SESSION */

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

  /* NAVIGATION */

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

 

const [submitting, setSubmitting] =
  useState(false);

const handleSubmit = async () => {

  try {

    setSubmitting(true);

    await createProjectApi(form);

    sessionStorage.removeItem(
      "projectForm"
    );

    alert(
      "Project Created Successfully 🚀"
    );

    router.push(
      "/dashboard/project-management"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to create project"
    );

  } finally {

    setSubmitting(false);
  }
};

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="min-h-screen bg-[#f4f7fb] space-y-4 overflow-x-hidden"
    >

      {/* HERO */}

      <div
  className="
    relative
    overflow-hidden
    rounded-[28px]
    bg-gradient-to-br
    from-slate-900
    via-emerald-950
    to-slate-900
    border
    border-emerald-500/10
    p-5
    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    text-white
  "
>

  {/* Background Effects */}

  <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

  <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%)]" />

  <div className="relative z-10">

    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

      {/* LEFT */}

      <div className="flex-1">

        <div className="flex items-start gap-4">

          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-emerald-500/15
              backdrop-blur-xl
              border
              border-emerald-400/20
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Building2 className="h-7 w-7 text-emerald-300" />
          </div>

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                rounded-full
                bg-emerald-500/10
                border
                border-emerald-400/20
                text-[10px]
                font-medium
                text-emerald-300
              "
            >
              <Sparkles className="h-3 w-3" />
              Smart Workflow
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight">
              Create New Project
            </h1>

            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Create, monitor and manage infrastructure projects,
              approvals, budgets and execution workflows from a
              single platform.
            </p>

          </div>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">

            <p className="text-[11px] text-slate-400">
              Steps
            </p>

            <h3 className="text-xl font-bold mt-1">
              10
            </h3>

          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">

            <p className="text-[11px] text-slate-400">
              Workflow
            </p>

            <h3 className="text-xl font-bold mt-1 text-emerald-300">
              Smart
            </h3>

          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">

            <p className="text-[11px] text-slate-400">
              Approval
            </p>

            <h3 className="text-xl font-bold mt-1">
              Multi
            </h3>

          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">

            <p className="text-[11px] text-slate-400">
              Tracking
            </p>

            <h3 className="text-xl font-bold mt-1 text-emerald-300">
              Live
            </h3>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div
        className="
          xl:w-[240px]
          rounded-3xl
          bg-white/[0.04]
          border
          border-white/[0.06]
          backdrop-blur-xl
          p-4
        "
      >

        <p className="text-xs text-slate-400">
          Project Setup
        </p>

        <h2 className="text-4xl font-bold mt-2">
          100%
        </h2>

        <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

          <div className="h-full w-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />

        </div>

        <p className="text-xs text-slate-400 mt-3">
          Ready to create and configure project workflows
        </p>

      </div>

    </div>

  </div>

</div>

      {/* STEPPER */}

      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm overflow-hidden">

        <div className="flex flex-wrap gap-y-4">

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
                  className="flex items-center"
                >

                  <div className="flex flex-col items-center relative z-10">

                    <motion.div
                      whileHover={{
                        scale: 1.03,
                      }}
                      className={`
                        w-9 h-9 rounded-full
                        flex items-center justify-center
                        text-xs font-semibold
                        transition-all duration-300
                        ${
                          active
                            ? `
                              bg-gradient-to-r
                              from-emerald-500
                              to-green-600
                              text-white
                            `
                            : `
                              bg-gray-100
                              text-black
                              border border-gray-200
                            `
                        }
                      `}
                    >

                      {step >
                      current ? (

                        <Check className="w-4 h-4" />

                      ) : (
                        current
                      )}
                    </motion.div>

                    <span className="text-[10px] font-medium mt-2 whitespace-nowrap text-black">
                      {label}
                    </span>
                  </div>

                  {index !==
                    steps.length -
                      1 && (

                    <div
                      className={`
                        w-8 h-[2px]
                        rounded-full mx-2
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

      {/* FORM */}

      <motion.div
        layout
        className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
      >

        {/* HEADER */}

        <div className="px-4 py-4 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-black break-words">
              {
                steps[
                  step - 1
                ]
              }
            </h2>

            <p className="text-xs text-black mt-1">
              Complete the required information carefully
            </p>

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mt-3" />
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold whitespace-nowrap">

            Step {step} of{" "}
            {steps.length}
          </div>
        </div>

        {/* BODY */}

        <div className="p-4 overflow-hidden">

          <AnimatePresence
            mode="wait"
          >

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.25,
              }}
            >

              {/* STEP 1 */}

              {step === 1 && (

                <div className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                    <Input
                      label="Project Name"
                      value={form.projectName}
                      onChange={(e:any) =>
  setForm({
    ...form,
    projectName: e.target.value,
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
                     value={form.schemeName}
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          schemeName:
                            e
                              .target
                              .value,
                        })
                      }
                    />

                    <Select
                      label="Project Type"
                      value={
                        form.projectType
                      }
                      onChange={(
                        e: any
                      ) =>
                        setForm({
                          ...form,
                          projectType: e
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

                    <label className="text-sm font-semibold text-black">
                      Priority Level
                    </label>

                    <div className="flex flex-wrap gap-3 mt-3">

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
                                  priorityLevel:
                                    p,
                                }
                              )
                            }
                            className={`
                              px-4 h-10 rounded-xl text-sm font-medium transition-all
                              ${
                                form.priorityLevel ===
                                p
                                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                  : "bg-gray-100 text-black hover:bg-gray-200"
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

              {/* OTHER STEPS */}

             

              {step === 2 && (

  <div className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

      <Input
        label="State"
        value={form.location.state}
        onChange={(e:any) =>
          setForm({
            ...form,
            location: {
              ...form.location,
              state: e.target.value,
            },
          })
        }
      />

      <Input
        label="District"
        value={form.location.district}
        onChange={(e:any) =>
          setForm({
            ...form,
            location: {
              ...form.location,
              district: e.target.value,
            },
          })
        }
      />

      <Input
        label="Block"
        value={form.location.block}
        onChange={(e:any) =>
          setForm({
            ...form,
            location: {
              ...form.location,
              block: e.target.value,
            },
          })
        }
      />

      <Input
        label="Ward"
        value={form.location.ward}
        onChange={(e:any) =>
          setForm({
            ...form,
            location: {
              ...form.location,
              ward: e.target.value,
            },
          })
        }
      />

    </div>

    <Textarea
      label="Address"
      value={form.location.address}
      onChange={(e:any) =>
        setForm({
          ...form,
          location: {
            ...form.location,
            address: e.target.value,
          },
        })
      }
    />

  </div>
)}

{step === 3 && (

  <div className="space-y-4">

    <Textarea
      label="Project Description"
      value={
        form.descriptionData.description
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          descriptionData: {
            ...form.descriptionData,
            description:
              e.target.value,
          },
        })
      }
    />

    <Textarea
      label="Project Scope"
      value={
        form.descriptionData.scope
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          descriptionData: {
            ...form.descriptionData,
            scope:
              e.target.value,
          },
        })
      }
    />

  </div>
)}

{step === 4 && (

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <Input
      type="date"
      label="Start Date"
      value={
        form.timeline.startDate
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          timeline: {
            ...form.timeline,
            startDate:
              e.target.value,
          },
        })
      }
    />

    <Input
      type="date"
      label="End Date"
      value={
        form.timeline.endDate
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          timeline: {
            ...form.timeline,
            endDate:
              e.target.value,
          },
        })
      }
    />

  </div>
)}


{step === 5 && (

  <div className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

      <Input
        label="Total Budget"
        type="number"
        value={
          form.budget.totalBudget
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            budget: {
              ...form.budget,
              totalBudget:
                e.target.value,
            },
          })
        }
      />

      <Input
        label="Funding Source"
        value={
          form.budget.fundingSource
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            budget: {
              ...form.budget,
              fundingSource:
                e.target.value,
            },
          })
        }
      />

    </div>

    <Textarea
      label="Expense Breakdown"
      value={
        form.budget.expenseBreakdown
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          budget: {
            ...form.budget,
            expenseBreakdown:
              e.target.value,
          },
        })
      }
    />

  </div>
)}


{step === 6 && (

  <div className="space-y-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

      <Input
        label="Vendor Name"
        value={
          form.vendor.vendorName
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            vendor: {
              ...form.vendor,
              vendorName:
                e.target.value,
            },
          })
        }
      />

      <Input
        label="Company Name"
        value={
          form.vendor.companyName
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            vendor: {
              ...form.vendor,
              companyName:
                e.target.value,
            },
          })
        }
      />

      <Input
        label="Contact Details"
        value={
          form.vendor.contactDetails
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            vendor: {
              ...form.vendor,
              contactDetails:
                e.target.value,
            },
          })
        }
      />

      <Input
        type="number"
        label="Contract Value"
        value={
          form.vendor.contractValue
        }
        onChange={(e:any) =>
          setForm({
            ...form,
            vendor: {
              ...form.vendor,
              contractValue:
                e.target.value,
            },
          })
        }
      />

    </div>

  </div>
)}


{step === 7 && (

  <div className="space-y-4">

    <div className="flex gap-3">

      <select
        value={selectedAsset}
        onChange={(e) =>
          setSelectedAsset(
            e.target.value
          )
        }
        className="flex-1 h-10 border border-gray-200 rounded-xl px-3"
      >
        <option value="">
          Select Asset
        </option>

        {inventoryItems.map(
          (item:any) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.productName}
            </option>
          )
        )}
      </select>

      <button
        onClick={() => {

          if (!selectedAsset)
            return;

          setForm({
            ...form,
            assets: [
              ...form.assets,
              {
                productId:
                  selectedAsset,
              },
            ],
          });

          setSelectedAsset("");
        }}
        className="h-10 px-4 rounded-xl bg-emerald-600 text-white"
      >
        Add
      </button>

    </div>

    <div className="space-y-2">

      {form.assets.map(
        (
          item:any,
          index:number
        ) => (

          <div
            key={index}
            className="flex items-center justify-between border rounded-xl p-3"
          >

            <span>
              {form.assets.map((item:any,index:number)=>{

  const product =
    inventoryItems.find(
      (p:any)=>
        p.id === item.productId
    );

  return (

    <div
      key={index}
      className="flex items-center justify-between border rounded-xl p-3"
    >

      <div>

        <p className="font-medium">
          {product?.productName}
        </p>

        <p className="text-xs text-gray-500">
          {product?.productId}
        </p>

      </div>

      <button
        className="text-red-600"
      >
        Remove
      </button>

    </div>
  );
})}
              {/* {item.productId} */}
            </span>

            <button
              onClick={() =>
                setForm({
                  ...form,
                  assets:
                    form.assets.filter(
                      (_:any,i:number) =>
                        i !== index
                    ),
                })
              }
              className="text-red-600"
            >
              Remove
            </button>

          </div>
        )
      )}

    </div>

  </div>
)}

{step === 8 && (

  <div className="space-y-4">

    <div className="grid md:grid-cols-3 gap-3">

      <Input
        label="Milestone Name"
        value={
          milestone.milestoneName
        }
        onChange={(e:any) =>
          setMilestone({
            ...milestone,
            milestoneName:
              e.target.value,
          })
        }
      />

      <Input
        type="date"
        label="Due Date"
        value={
          milestone.dueDate
        }
        onChange={(e:any) =>
          setMilestone({
            ...milestone,
            dueDate:
              e.target.value,
          })
        }
      />

      <Input
        type="number"
        label="Budget %"
        value={
          milestone.budgetPercent
        }
        onChange={(e:any) =>
          setMilestone({
            ...milestone,
            budgetPercent:
              e.target.value,
          })
        }
      />

    </div>

    <button
      onClick={() => {

        setForm({
          ...form,
          milestones: [
            ...form.milestones,
            {
              ...milestone,
              budgetPercent:
                Number(
                  milestone.budgetPercent
                ),
            },
          ],
        });

        setMilestone({
          milestoneName: "",
          dueDate: "",
          budgetPercent: "",
        });
      }}
      className="h-10 px-4 rounded-xl bg-emerald-600 text-white"
    >
      Add Milestone
    </button>

  </div>
)}

{step === 9 && (

  <div className="grid md:grid-cols-3 gap-3">

    <Input
      label="Project Manager"
      value={
        form.team.projectManager
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          team: {
            ...form.team,
            projectManager:
              e.target.value,
          },
        })
      }
    />

    <Input
      label="Supervisor"
      value={
        form.team.supervisor
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          team: {
            ...form.team,
            supervisor:
              e.target.value,
          },
        })
      }
    />

    <Input
      label="Department Head"
      value={
        form.team.departmentHead
      }
      onChange={(e:any) =>
        setForm({
          ...form,
          team: {
            ...form.team,
            departmentHead:
              e.target.value,
          },
        })
      }
    />

  </div>
)}

{step === 10 && (

  <div className="space-y-4">

    <div className="grid md:grid-cols-2 gap-3">

      <Input
        label="Level Name"
        value={
          approval.levelName
        }
        onChange={(e:any) =>
          setApproval({
            ...approval,
            levelName:
              e.target.value,
          })
        }
      />

      <Input
        label="Order"
        type="number"
        value={approval.order}
        onChange={(e:any) =>
          setApproval({
            ...approval,
            order:
              Number(
                e.target.value
              ),
          })
        }
      />

    </div>

    <button
      onClick={() => {

        setForm({
          ...form,
          approvals: [
            ...form.approvals,
            approval,
          ],
        });

        setApproval({
          levelName: "",
          order: 1,
        });
      }}
      className="h-10 px-4 rounded-xl bg-emerald-600 text-white"
    >
      Add Approval
    </button>

  </div>
)}
            </motion.div>
          </AnimatePresence>

          {/* FOOTER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-5 pt-4 border-t border-gray-100">

            <button
              className="
                h-10 px-4
                rounded-xl
                border border-gray-200
                bg-white
                hover:bg-gray-100
                transition-all
                text-sm font-medium
                text-black
              "
            >
              Save Draft
            </button>

            <div className="flex gap-2 flex-wrap">

              {step > 1 && (

                <button
                  onClick={
                    handleBack
                  }
                  className="
                    h-10 px-4
                    rounded-xl
                    border border-gray-200
                    bg-white
                    hover:bg-gray-100
                    transition-all
                    text-sm font-medium
                    text-black
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
                  h-10 px-5
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-600
                  to-green-600
                  hover:opacity-95
                  text-white
                  font-medium
                  shadow-sm
                  transition-all
                  active:scale-[0.98]
                  flex items-center gap-2
                "
              >

                {step ===
                steps.length
                  ? "Submit Project"
                  : "Continue"}

                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* MINI CARD */

function MiniCard({
  title,
  value,
}: any) {

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        bg-white/10 backdrop-blur
        border border-white/10
        rounded-xl
        p-3
        shadow-sm
        overflow-hidden
      "
    >

      <p className="text-xs text-green-50 break-words">
        {title}
      </p>

      <h3 className="text-xl font-bold mt-1 text-white break-words">
        {value}
      </h3>
    </motion.div>
  );
}

/* INPUT */

function Input({
  label,
  ...props
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-sm font-semibold text-black">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full h-10 mt-2
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-3
          text-sm text-black
          outline-none
          transition-all
          focus:border-emerald-500
          focus:bg-white
        "
      />
    </div>
  );
}

/* SELECT */

function Select({
  label,
  options,
  ...props
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-sm font-semibold text-black">
        {label}
      </label>

      <select
        {...props}
        className="
          w-full h-10 mt-2
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-3
          text-sm text-black
          outline-none
          transition-all
          focus:border-emerald-500
          focus:bg-white
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

/* TEXTAREA */

function Textarea({
  label,
  ...props
}: any) {

  return (
    <div className="min-w-0">

      <label className="text-sm font-semibold text-black">
        {label}
      </label>

      <textarea
        {...props}
        rows={4}
        className="
          w-full mt-2 p-3
          border border-gray-200
          rounded-xl
          bg-gray-50
          text-sm text-black
          outline-none
          transition-all
          resize-none
          focus:border-emerald-500
          focus:bg-white
        "
      />
    </div>
  );
}