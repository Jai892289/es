"use client"

import { useEffect, useState } from "react"

import {
  ChevronDown,
  Upload,
  Building2,
  ShieldAlert,
  User2,
  Package2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from "lucide-react"

import { createComplaintApi, getComplaintApi } from "@/lib/complaint.api"

import { useRouter } from "next/navigation"

export default function RaiseComplaintPage() {



const [complaints, setComplaints] =
  useState<any[]>([]);

  const [selectedComplaint, setSelectedComplaint] =
  useState<any>(null);

const [showModal, setShowModal] =
  useState(false);

const handleViewComplaints =
  async () => {


    try {
      const response =
        await getComplaintApi();

      console.log(
        "Complaint Response",
        response
      );

      setComplaints(
        response.data || []
      );

    } catch (error) {
      console.log(
        "Complaint Error",
        error
      );
    }
  };

  useEffect(()=>{
    handleViewComplaints()
  },[])



  return (
    <div className="space-y-4 overflow-x-hidden">

<div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-xl font-semibold text-blue-600">
      Recent Complaints
    </h2>

  
  </div>

  {complaints?.length > 0 ? (

    <div className="space-y-6">

     {complaints.slice(0, 5).map((item: any) => (
  <div
    key={item.id}
    className="group relative overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
  >

    {/* Top Accent */}
    <div
      className={`absolute top-0 left-0 h-1 w-full
      ${
        item.urgency === "HIGH"
          ? "bg-red-500"
          : item.urgency === "MEDIUM"
          ? "bg-orange-500"
          : "bg-emerald-500"
      }`}
    />

    {/* Header */}
    <div className="flex justify-between items-start mb-5">

      <div>

        <h3 className="text-xl font-bold text-slate-800">
          {item.title}
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          Complaint ID: {item.id.slice(0, 8)}
        </p>

      </div>

      <div className="flex gap-2">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            item.urgency === "HIGH"
              ? "bg-red-100 text-red-700"
              : item.urgency === "MEDIUM"
              ? "bg-orange-100 text-orange-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {item.urgency}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            item.status === "RESOLVED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>

      </div>

    </div>

    {/* Description */}
    <div className="bg-white rounded-2xl p-4 border border-slate-100 mb-5">

      <p className="text-sm text-slate-600 leading-relaxed">
        {item.description}
      </p>

    </div>

    {/* Details Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <InfoCard
        label="Raised By"
        value={item.fullName}
      />

      <InfoCard
        label="Department"
        value={item.departmentName}
      />

      <InfoCard
        label="Product"
        value={item.productName}
      />

      <InfoCard
        label="Serial No."
        value={item.serialNumber}
      />

      <InfoCard
        label="Vendor"
        value={item.vendorCompanyName}
      />

      <InfoCard
        label="Contact"
        value={item.contactNumber}
      />

      <InfoCard
        label="Issue Date"
        value={
          item.issueDate
            ? new Date(
                item.issueDate
              ).toLocaleDateString()
            : "-"
        }
      />

      <InfoCard
        label="Warranty"
        value={
          item.warrantyExpiryDate
            ? new Date(
                item.warrantyExpiryDate
              ).toLocaleDateString()
            : "-"
        }
      />

    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">

      <div className="flex items-center gap-2 text-xs text-slate-500">

        <Calendar className="w-4 h-4" />

        {new Date(
          item.createdAt
        ).toLocaleDateString()}
      </div>

      <button
  onClick={() => {
    setSelectedComplaint(item);
    setShowModal(true);
  }}
  className="text-blue-600 cursor-pointer font-medium text-sm hover:text-blue-700"
>
  View Details →
</button>

    </div>

  </div>
))}

    </div>

  ) : (

    <div className="h-[300px] flex flex-col items-center justify-center">

      <AlertTriangle className="w-10 h-10 text-gray-300" />

      <p className="text-gray-500 mt-3">
        No Complaints Found
      </p>

    </div>

  )}

</div>

{showModal && selectedComplaint && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">

      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Complaint Details
          </h2>

          <p className="text-sm text-slate-500">
            Complaint ID: {selectedComplaint.id}
          </p>
        </div>

        <button
          onClick={() => {
            setShowModal(false);
            setSelectedComplaint(null);
          }}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200"
        >
          ✕
        </button>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="grid md:grid-cols-3 gap-4">

          <InfoCard
            label="Title"
            value={selectedComplaint.title}
          />

          <InfoCard
            label="Urgency"
            value={selectedComplaint.urgency}
          />

          <InfoCard
            label="Status"
            value={selectedComplaint.status}
          />

          <InfoCard
            label="Raised By"
            value={selectedComplaint.fullName}
          />

          <InfoCard
            label="Designation"
            value={selectedComplaint.designation}
          />

          <InfoCard
            label="Contact Number"
            value={selectedComplaint.contactNumber}
          />

          <InfoCard
            label="Email"
            value={selectedComplaint.email}
          />

          <InfoCard
            label="Department"
            value={selectedComplaint.departmentName}
          />

          <InfoCard
            label="Location"
            value={selectedComplaint.location}
          />

          <InfoCard
            label="Vendor"
            value={selectedComplaint.vendorCompanyName}
          />

          <InfoCard
            label="Vendor Contact"
            value={selectedComplaint.vendorContactName}
          />

          <InfoCard
            label="Vendor Phone"
            value={selectedComplaint.vendorContactNumber}
          />

          <InfoCard
            label="Vendor Email"
            value={selectedComplaint.vendorEmail}
          />

          <InfoCard
            label="Product"
            value={selectedComplaint.productName}
          />

          <InfoCard
            label="Category"
            value={selectedComplaint.category}
          />

          <InfoCard
            label="Serial Number"
            value={selectedComplaint.serialNumber}
          />

          <InfoCard
            label="AMC Contract"
            value={selectedComplaint.amcContractNumber}
          />

          <InfoCard
            label="Issue Date"
            value={
              selectedComplaint.issueDate
                ? new Date(
                    selectedComplaint.issueDate
                  ).toLocaleDateString()
                : "-"
            }
          />

          <InfoCard
            label="Warranty Expiry"
            value={
              selectedComplaint.warrantyExpiryDate
                ? new Date(
                    selectedComplaint.warrantyExpiryDate
                  ).toLocaleDateString()
                : "-"
            }
          />

          <InfoCard
            label="Created At"
            value={
              new Date(
                selectedComplaint.createdAt
              ).toLocaleString()
            }
          />

        </div>

        {/* Description */}
        <div className="mt-6">

          <h3 className="font-semibold text-lg mb-3">
            Description
          </h3>

          <div className="bg-slate-50 rounded-2xl p-5 border">
            {selectedComplaint.description}
          </div>

        </div>

      </div>

    </div>

  </div>
)}
      
    </div>
  )
}

const InfoCard = ({
  label,
  value,
}: any) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-3">

    <p className="text-[11px] uppercase tracking-wide text-slate-400">
      {label}
    </p>

    <p className="text-sm font-semibold text-slate-700 mt-1 truncate">
      {value || "-"}
    </p>

  </div>
);