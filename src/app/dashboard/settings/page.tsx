"use client"

import { useState } from "react"
import { Plus, ChevronDown } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Vinod Gupta",
    email: "gupta.v@gmail.com",
    role: "Administrator",
    status: "Active",
    lastSeen: "Jan 28, 2025",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Pavan Das",
    email: "pavan.das@gmail.com",
    role: "Manager",
    status: "Active",
    lastSeen: "Feb 02, 2025",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Manjula Devi",
    email: "devi.manjula28@gmail.com",
    role: "Manager",
    status: "Active",
    lastSeen: "Feb 02, 2025",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Prachi Lal",
    email: "prachi.l@gmail.com",
    role: "Consultant",
    status: "Active",
    lastSeen: "Feb 03, 2025",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Sidhu Singh",
    email: "s.singh@gmail.com",
    role: "Consultant",
    status: "Deactivated",
    lastSeen: "",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
]

const tabs = ["All Users", "Administrators", "Managers", "Consultants"]

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("All Users")

  return (
    <div className="space-y-6">

      {/* TABS */}
      <div className="flex justify-center">
        <div className="flex border rounded-full overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm ${
                activeTab === tab
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">User Details</th>
              <th className="px-4 py-3 text-left">Joined date</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status / Activity</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 align-top"
              >
                <td className="px-4 py-3 font-medium">{u.id}</td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">Jan 02, 2025</td>

                <td className="px-4 py-3">{u.role}</td>

                <td className="px-4 py-3">
                  {u.status === "Active" ? (
                    <>
                      <p className="text-green-600 font-medium">Active</p>
                      <p className="text-xs text-gray-500">
                        Last seen on {u.lastSeen}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500 font-medium">Deactivated</p>
                  )}
                </td>

                <td className="px-4 py-3">
                  {u.status === "Active" ? (
                    <button className="px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-xs">
                      Change Role
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-xs">
                      Activate User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50 text-sm">
          <Plus className="w-4 h-4" />
          Add New User
        </button>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>1 / 16</span>
          <button className="flex items-center gap-1 text-green-600 hover:underline">
            Next Page <ChevronDown className="rotate-[-90deg] w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
