"use client";

import { useState } from "react";
     import { useRouter } from "next/navigation";

export const projects = [
  {
    id: "PRJ-2026-001",
    name: "Rural Road Construction - Phase 1",
    category: "Infrastructure",
    scheme: "PMGSY",
    department: "Public Works",
    location: "Block-A, Panchayat-1",
    start: "2026-01-15",
    end: "2026-12-31",
    status: "Ongoing",
    budget: "₹45,00,000",
    progress: 65,
  },
  {
    id: "PRJ-2026-002",
    name: "Primary School Renovation",
    category: "Education",
    scheme: "SSA",
    department: "Education",
    location: "Ward-3, Municipality",
    start: "2025-11-01",
    end: "2026-03-31",
    status: "Completed",
    budget: "₹12,50,000",
    progress: 100,
  },
  {
    id: "PRJ-2026-003",
    name: "Water Supply Pipeline",
    category: "Water Supply",
    scheme: "Jal Jeevan Mission",
    department: "Water Resources",
    location: "District Central",
    start: "2026-02-01",
    end: "2026-08-31",
    status: "Delayed",
    budget: "₹85,00,000",
    progress: 35,
  },
  {
    id: "PRJ-2026-004",
    name: "Community Health Center Setup",
    category: "Healthcare",
    scheme: "NRHM",
    department: "Health & Family Welfare",
    location: "Block-B, Panchayat-5",
    start: "2026-06-01",
    end: "2027-05-31",
    status: "Pending",
    budget: "₹1,20,00,000",
    progress: 0,
  },
  {
    id: "PRJ-2026-005",
    name: "LED Street Light Installation",
    category: "Energy",
    scheme: "SAUBHAGYA",
    department: "Electricity",
    location: "Ward-1, Municipality",
    start: "2026-01-10",
    end: "2026-06-30",
    status: "Ongoing",
    budget: "₹22,00,000",
    progress: 78,
  },
];
export default function ProductTable() {
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) =>
    `${p.name} ${p.id} ${p.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

const router = useRouter();


  return (
    <div className="p-0">
      
      {/* 🔍 TOP BAR */}
      <div className="flex justify-between items-center mb-5 gap-4">
        
        {/* SEARCH */}
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by Project Name / ID / Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Filter
          </button>

       
<button
  onClick={() => router.push("/dashboard/project-management/new")}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
>
  + Add New Project
</button>

         
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          
          {/* HEADER */}
          <thead className="bg-green-500 text-white text-xs">
            <tr>
              <th className="p-4 text-left">Project ID</th>
              <th className="p-4 text-left">Project Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Dept</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Start</th>
              <th className="p-4 text-left">End</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Budget</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-green-50 transition"
              >
                <td className="p-3 text-xs whitespace-nowrap">{item.id}</td>

                <td className="p-3">
                  <div className="font-medium text-sm truncate max-w-[180px]">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.scheme}
                  </div>
                </td>

                <td className="p-3 text-xs">{item.category}</td>

                <td className="p-3 text-xs truncate max-w-[120px]">
                  {item.department}
                </td>

                <td className="p-3 text-xs truncate max-w-[140px]">
                  {item.location}
                </td>

                <td className="p-3 text-xs whitespace-nowrap">
                  {item.start}
                </td>

                <td className="p-3 text-xs whitespace-nowrap">
                  {item.end}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      item.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : item.status === "Delayed"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 text-xs whitespace-nowrap">
                  {item.budget}
                </td>

                {/* PROGRESS */}
                <td className="p-3 w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-green-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.progress}%
                    </span>
                  </div>
                </td>

                <td className="p-3">
                  <button className="text-blue-500 text-xs hover:underline">
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}