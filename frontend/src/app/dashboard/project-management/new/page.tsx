"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [milestone, setMilestone] = useState({
        name: "",
        date: "",
        percent: "",
    });

    const [form, setForm] = useState({
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

    // ✅ Load from session
    useEffect(() => {
        const saved = sessionStorage.getItem("projectForm");
        if (saved) setForm(JSON.parse(saved));
    }, []);

    // ✅ Save to session
    useEffect(() => {
        sessionStorage.setItem("projectForm", JSON.stringify(form));
    }, [form]);

    const handleNext = () => {
        if (step < steps.length) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        console.log("FINAL DATA:", form);
        sessionStorage.removeItem("projectForm");
        alert("Project Created Successfully 🚀");
        router.push("/dashboard/project-management")
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <h1 className="text-2xl font-semibold mb-1">Add New Project</h1>
            <p className="text-sm text-gray-500 mb-6">
                Create a new government project
            </p>

            {/* STEPPER */}
            <div className="bg-white rounded-xl p-6 shadow mb-6">
                <div className="flex items-center">
                    {steps.map((label, index) => {
                        const current = index + 1;

                        return (
                            <div key={index} className="flex items-center w-full">

                                {/* STEP */}
                                <div className="flex flex-col items-center z-10">
                                    <div
                                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${step >= current
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {current}
                                    </div>

                                    <span className="text-xs mt-2 whitespace-nowrap">
                                        {label}
                                    </span>
                                </div>

                                {/* CONNECTOR */}
                                {index !== steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-[2px] mx-2 relative top-[-12px] ${step > current ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-xl p-6 shadow">

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 1: Basic Details</h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div className="col-span-2">
                                <label className="text-sm">Project Name *</label>
                                <input
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Category *</label>
                                <select
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({ ...form, category: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                >
                                    <option>Select Category</option>
                                    <option>Infrastructure</option>
                                    <option>Education</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">Scheme Name</label>
                                <input
                                    value={form.scheme}
                                    onChange={(e) =>
                                        setForm({ ...form, scheme: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Project Type *</label>
                                <select
                                    value={form.type}
                                    onChange={(e) =>
                                        setForm({ ...form, type: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                >
                                    <option>New</option>
                                    <option>Upgrade</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm">Department *</label>
                                <input
                                    value={form.department}
                                    onChange={(e) =>
                                        setForm({ ...form, department: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* PRIORITY */}
                        <div className="mt-4">
                            <label className="text-sm">Priority Level</label>
                            <div className="flex gap-4 mt-2 text-sm">
                                {["Low", "Medium", "High"].map((p) => (
                                    <label key={p} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={form.priority === p}
                                            onChange={() =>
                                                setForm({ ...form, priority: p })
                                            }
                                        />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 2: Location</h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div>
                                <label className="text-sm">State</label>
                                <input
                                    value={form.state}
                                    onChange={(e) =>
                                        setForm({ ...form, state: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm">District *</label>
                                <input
                                    value={form.district}
                                    onChange={(e) =>
                                        setForm({ ...form, district: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Block *</label>
                                <input
                                    value={form.block}
                                    onChange={(e) =>
                                        setForm({ ...form, block: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Ward / Panchayat *</label>
                                <input
                                    value={form.ward}
                                    onChange={(e) =>
                                        setForm({ ...form, ward: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="text-sm">Address</label>
                                <textarea
                                    rows={3}
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="mt-5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
                            💡 You can also select location using map picker.
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 3: Description</h2>

                        {/* DESCRIPTION */}
                        <div className="mb-5">
                            <label className="text-sm font-medium">
                                Project Description
                            </label>
                            <textarea
                                rows={4}
                                value={form.description || ""}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                placeholder="Provide detailed description of the project"
                            />
                        </div>

                        {/* SCOPE */}
                        <div className="mb-5">
                            <label className="text-sm font-medium">
                                Scope / Objectives
                            </label>
                            <textarea
                                rows={4}
                                value={form.scope || ""}
                                onChange={(e) =>
                                    setForm({ ...form, scope: e.target.value })
                                }
                                className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                placeholder="Define project scope and objectives"
                            />
                        </div>

                        {/* FILE UPLOAD */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                File Upload
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    id="fileUpload"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            files: Array.from(e.target.files || []),
                                        })
                                    }
                                />

                                <label htmlFor="fileUpload" className="cursor-pointer">
                                    <p className="text-sm text-gray-600">
                                        Upload DPR, approvals, or related documents
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Click to browse or drag and drop files here
                                    </p>
                                </label>
                            </div>

                            {/* FILE LIST */}
                            {form.files?.length > 0 && (
                                <div className="mt-3 text-sm text-gray-600">
                                    {form.files.map((file: any, i: number) => (
                                        <div key={i}>📄 {file.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 4: Timeline</h2>

                        <div className="grid grid-cols-2 gap-5">

                            {/* START DATE */}
                            <div>
                                <label className="text-sm font-medium">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.startDate || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, startDate: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            </div>

                            {/* END DATE */}
                            <div>
                                <label className="text-sm font-medium">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={form.endDate || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, endDate: e.target.value })
                                    }
                                    min={form.startDate} // 🔥 prevents invalid selection
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            </div>
                        </div>

                        {/* VALIDATION MESSAGE */}
                        {form.endDate && form.startDate && form.endDate < form.startDate && (
                            <p className="text-red-500 text-sm mt-3">
                                End date cannot be before start date
                            </p>
                        )}
                    </>
                )}

                {step === 5 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 5: Budget</h2>

                        {/* TOTAL BUDGET */}
                        <div className="mb-5">
                            <label className="text-sm font-medium">
                                Total Budget (₹) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={form.budget || ""}
                                onChange={(e) =>
                                    setForm({ ...form, budget: e.target.value })
                                }
                                className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                placeholder="Enter total budget"
                            />

                            {/* formatted preview */}
                            {form.budget && (
                                <p className="text-sm text-gray-500 mt-1">
                                    ₹ {Number(form.budget).toLocaleString("en-IN")}
                                </p>
                            )}
                        </div>

                        {/* FUNDING SOURCE */}
                        <div className="mb-5">
                            <label className="text-sm font-medium">Funding Source</label>
                            <input
                                value={form.funding || ""}
                                onChange={(e) =>
                                    setForm({ ...form, funding: e.target.value })
                                }
                                className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                placeholder="e.g., Central Government, State Government"
                            />
                        </div>

                        {/* EXPENSE BREAKDOWN */}
                        <div>
                            <label className="text-sm font-medium">
                                Expense Breakdown (Optional)
                            </label>
                            <textarea
                                rows={4}
                                value={form.expense || ""}
                                onChange={(e) =>
                                    setForm({ ...form, expense: e.target.value })
                                }
                                className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                placeholder="Provide breakdown of major expenses"
                            />
                        </div>

                        {/* VALIDATION */}
                        {form.budget && Number(form.budget) <= 0 && (
                            <p className="text-red-500 text-sm mt-2">
                                Budget must be greater than 0
                            </p>
                        )}
                    </>
                )}

                {step === 6 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 6: Vendor</h2>

                        <div className="grid grid-cols-2 gap-5">

                            {/* VENDOR NAME */}
                            <div>
                                <label className="text-sm font-medium">
                                    Vendor Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={form.vendorName || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, vendorName: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter vendor name"
                                />
                            </div>

                            {/* COMPANY NAME */}
                            <div>
                                <label className="text-sm font-medium">Company Name</label>
                                <input
                                    value={form.companyName || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, companyName: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* CONTACT */}
                            <div className="col-span-2">
                                <label className="text-sm font-medium">Contact Details</label>
                                <input
                                    value={form.contact || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, contact: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Phone number, email, etc."
                                />
                            </div>

                            {/* CONTRACT VALUE */}
                            <div className="col-span-2">
                                <label className="text-sm font-medium">
                                    Contract Value (₹)
                                </label>
                                <input
                                    type="number"
                                    value={form.contractValue || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, contractValue: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter contract value"
                                />

                                {/* formatted preview */}
                                {form.contractValue && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        ₹ {Number(form.contractValue).toLocaleString("en-IN")}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* FILE UPLOAD */}
                        <div className="mt-5">
                            <label className="text-sm font-medium mb-2 block">
                                Agreement Upload
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="vendorFile"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            vendorFile: e.target.files?.[0] || null,
                                        })
                                    }
                                />

                                <label htmlFor="vendorFile" className="cursor-pointer">
                                    <p className="text-sm text-gray-600">
                                        Upload vendor agreement or contract
                                    </p>
                                </label>
                            </div>

                            {/* FILE PREVIEW */}
                            {form.vendorFile && (
                                <div className="mt-2 text-sm text-gray-600">
                                    📄 {form.vendorFile.name}
                                </div>
                            )}
                        </div>

                        {/* VALIDATION */}
                        {!form.vendorName && (
                            <p className="text-red-500 text-sm mt-3">
                                Vendor name is required
                            </p>
                        )}
                    </>
                )}

                {step === 7 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 7: Asset Allocation</h2>

                        {/* INFO BOX */}
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
                            Select assets that will be allocated to this project (e.g., vehicles, machinery, equipment)
                        </div>

                        {/* ASSET LIST */}
                        <div className="border rounded-lg p-4 space-y-3">
                            {[
                                { id: "EXC-001", name: "Excavator" },
                                { id: "BLD-002", name: "Bulldozer" },
                                { id: "CMX-003", name: "Concrete Mixer" },
                                { id: "TRK-004", name: "Truck" },
                            ].map((asset) => (
                                <label
                                    key={asset.id}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.assets?.includes(asset.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setForm({
                                                    ...form,
                                                    assets: [...(form.assets || []), asset.id],
                                                });
                                            } else {
                                                setForm({
                                                    ...form,
                                                    assets: form.assets.filter((a: string) => a !== asset.id),
                                                });
                                            }
                                        }}
                                    />
                                    <span className="text-sm">
                                        {asset.name} - {asset.id}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* SELECTED ASSETS */}
                        {form.assets?.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-1">Selected Assets:</p>
                                <div className="flex flex-wrap gap-2">
                                    {form.assets.map((a: string) => (
                                        <span
                                            key={a}
                                            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}


                {step === 8 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 8: Milestones</h2>

                        {/* INFO */}
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
                            Add project milestones to track progress. You can add multiple milestones.
                        </div>

                        {/* INPUT ROW */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <input
                                placeholder="Milestone Name"
                                value={milestone.name}
                                onChange={(e) =>
                                    setMilestone({ ...milestone, name: e.target.value })
                                }
                                className="p-2.5 border rounded-lg"
                            />

                            <input
                                type="date"
                                value={milestone.date}
                                onChange={(e) =>
                                    setMilestone({ ...milestone, date: e.target.value })
                                }
                                className="p-2.5 border rounded-lg"
                            />

                            <input
                                type="number"
                                placeholder="Budget %"
                                value={milestone.percent}
                                onChange={(e) =>
                                    setMilestone({ ...milestone, percent: e.target.value })
                                }
                                className="p-2.5 border rounded-lg"
                            />
                        </div>

                        {/* ADD BUTTON */}
                        <button
                            onClick={() => {
                                if (!milestone.name || !milestone.date) return;

                                setForm({
                                    ...form,
                                    milestones: [...(form.milestones || []), milestone],
                                });

                                setMilestone({ name: "", date: "", percent: "" });
                            }}
                            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
                        >
                            + Add Milestone
                        </button>

                        {/* LIST */}
                        {form.milestones?.length > 0 && (
                            <div className="space-y-2">
                                {form.milestones.map((m: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center border p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{m.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {m.date} • {m.percent || 0}%
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                const updated = form.milestones.filter(
                                                    (_: any, index: number) => index !== i
                                                );
                                                setForm({ ...form, milestones: updated });
                                            }}
                                            className="text-red-500 text-xs"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {step === 9 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 9: Assign Team</h2>

                        <div className="space-y-5">

                            {/* PROJECT MANAGER */}
                            <div>
                                <label className="text-sm font-medium">
                                    Project Manager <span className="text-red-500">*</span>
                                </label>
                                <input
                                    value={form.projectManager || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, projectManager: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter project manager name"
                                />
                            </div>

                            {/* SUPERVISOR */}
                            <div>
                                <label className="text-sm font-medium">Supervisor</label>
                                <input
                                    value={form.supervisor || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, supervisor: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter supervisor name"
                                />
                            </div>

                            {/* DEPARTMENT HEAD */}
                            <div>
                                <label className="text-sm font-medium">Department Head</label>
                                <input
                                    value={form.departmentHead || ""}
                                    onChange={(e) =>
                                        setForm({ ...form, departmentHead: e.target.value })
                                    }
                                    className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="Enter department head name"
                                />
                            </div>
                        </div>

                        {/* VALIDATION */}
                        {!form.projectManager && (
                            <p className="text-red-500 text-sm mt-4">
                                Project Manager is required
                            </p>
                        )}
                    </>
                )}

                {step === 10 && (
                    <>
                        <h2 className="font-semibold mb-4">Step 10: Approval Flow</h2>

                        {/* INFO */}
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
                            Define the approval hierarchy for this project. The project will be sent to each level sequentially.
                        </div>

                        {/* APPROVAL LEVELS */}
                        <div className="space-y-3">
                            {[
                                "Block Development Officer",
                                "District Project Officer",
                                "Chief Engineer",
                                "Department Secretary",
                            ].map((role, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-3">

                                        {/* STEP NUMBER */}
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                            {index + 1}
                                        </div>

                                        <span className="text-sm font-medium">{role}</span>
                                    </div>

                                    {/* TOGGLE */}
                                    <input
                                        type="checkbox"
                                        checked={form.approvals?.includes(role)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setForm({
                                                    ...form,
                                                    approvals: [...(form.approvals || []), role],
                                                });
                                            } else {
                                                setForm({
                                                    ...form,
                                                    approvals: form.approvals.filter(
                                                        (a: string) => a !== role
                                                    ),
                                                });
                                            }
                                        }}
                                        className="w-5 h-5 accent-green-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* VALIDATION */}
                        {(!form.approvals || form.approvals.length === 0) && (
                            <p className="text-red-500 text-sm mt-3">
                                At least one approval level is required
                            </p>
                        )}
                    </>
                )}

                {/* FOOTER */}
                <div className="flex justify-between mt-8">
                    <button className="px-4 py-2 border rounded-lg text-sm">
                        Save as Draft
                    </button>

                    <div className="flex gap-2">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="px-4 py-2 border rounded-lg text-sm"
                            >
                                Back
                            </button>
                        )}

                        <button
                            onClick={
                                step === steps.length ? handleSubmit : handleNext
                            }
                            className="px-5 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                        >
                            {step === steps.length ? "Submit" : "Next →"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}