"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { createComplaintApi } from "@/lib/complaint.api"
import { useRouter } from "next/navigation"

export default function RaiseComplaintPage() {
const router = useRouter()

const [form, setForm] = useState<any>({
title: "",
urgency: "",


fullName: "",
designation: "",
contactNumber: "",
email: "",
departmentName: "",
location: "",

vendorCompanyName: "",
vendorContactName: "",
vendorContactNumber: "",
vendorWhatsapp: "",
vendorEmail: "",
vendorLocation: "",

category: "",
productName: "",
otherProduct: "",
serialNumber: "",
amcContractNumber: "",
warrantyExpiryDate: "",
issueDate: "",
description: "",

sendWhatsapp: false,
sendEmail: false,


})

const [loading, setLoading] = useState(false)
const [attachments, setAttachments] = useState<any[]>([])
const handleChange = (key: string, value: any) => {
setForm((prev: any) => ({ ...prev, [key]: value }))
}

const handleFileUpload = (e: any) => {
  const files = Array.from(e.target.files)

  const mapped = files.map((file: any) => ({
    fileUrl: URL.createObjectURL(file), // temp preview
    fileType: file.type,
    file, // keep actual file if needed later
  }))

  setAttachments((prev) => [...prev, ...mapped])
}

const handleSubmit = async () => {
if (!form.title || !form.urgency || !form.fullName) {
alert("Please fill required fields")
return
}


try {
  setLoading(true)

  const payload = {
    complaint: {
      title: form.title,
      description: form.description,
      urgency: form.urgency,

      fullName: form.fullName,
      designation: form.designation,
      contactNumber: form.contactNumber,
      email: form.email,
      location: form.location,
      departmentName: form.departmentName,

      vendorCompanyName: form.vendorCompanyName,
      vendorContactName: form.vendorContactName,
      vendorContactNumber: form.vendorContactNumber,
      vendorWhatsapp: form.vendorWhatsapp,
       vendorEmail: form.vendorEmail,
    vendorLocation: form.vendorLocation, 

      category: form.category,
      productName: form.productName,
      otherProduct: form.otherProduct,
      serialNumber: form.serialNumber,
      amcContractNumber: form.amcContractNumber,

      warrantyExpiryDate: form.warrantyExpiryDate
        ? new Date(form.warrantyExpiryDate).toISOString()
        : null,

      issueDate: new Date(form.issueDate).toISOString(),

      sendWhatsapp: form.sendWhatsapp,
      sendEmail: form.sendEmail,
    },
 attachments: attachments.map((f) => ({
    fileUrl: f.fileUrl,   // ⚠️ temp for now
    fileType: f.fileType,
  }))

}
  

  await createComplaintApi(payload)

  alert("Complaint submitted successfully")
  router.push("/dashboard")

} catch (err: any) {
  console.error(err)
  alert(err.message || "Error submitting complaint")
} finally {
  setLoading(false)
}


}

return ( <div className="max-w-8xl mx-auto space-y-8">


  <h2 className="text-2xl text-green-600 font-medium">
    Raise Complaint
  </h2>

  {/* ---------------- DEPARTMENT ---------------- */}
  <Section title="Department Details">
    <Grid>
      <Input label="Complaint Title" onChange={(v:any)=>handleChange("title",v)} />
      <Select label="Urgency Level" onChange={(v:any)=>handleChange("urgency",v)} />

      <Input label="Full Name" onChange={(v:any)=>handleChange("fullName",v)} />
      <Input label="Designation" onChange={(v:any)=>handleChange("designation",v)} />

      <Input label="Contact Number" onChange={(v:any)=>handleChange("contactNumber",v)} />
      <Input label="Email" onChange={(v:any)=>handleChange("email",v)} />

      <Input label="Department Name" onChange={(v:any)=>handleChange("departmentName",v)} />
      <Input label="Location" onChange={(v:any)=>handleChange("location",v)} />
    </Grid>
  </Section>

  {/* ---------------- VENDOR ---------------- */}
 <Section title="Vendor Details">
  <Grid>
    <Input label="Company Name" onChange={(v:any)=>handleChange("vendorCompanyName",v)} />
    <Input label="Full Name" onChange={(v:any)=>handleChange("vendorContactName",v)} />

    <Input label="Contact Number" onChange={(v:any)=>handleChange("vendorContactNumber",v)} />
    <Input label="WhatsApp Number" onChange={(v:any)=>handleChange("vendorWhatsapp",v)} />

    {/* ✅ NEW FIELDS */}
    <Input label="Email" onChange={(v:any)=>handleChange("vendorEmail",v)} />
    <Input label="Location" onChange={(v:any)=>handleChange("vendorLocation",v)} />
  </Grid>
</Section>

  {/* ---------------- ISSUE ---------------- */}
  <Section title="Issue Details">
    <Grid>
      <Select label="Category" onChange={(v:any)=>handleChange("category",v)} />
      <Input label="Item / Product" onChange={(v:any)=>handleChange("productName",v)} />

      <Input label="Other Items / Products" onChange={(v:any)=>handleChange("otherProduct",v)} />

      <Input label="Serial Number" onChange={(v:any)=>handleChange("serialNumber",v)} />
      <Input label="AMC Contract Number" onChange={(v:any)=>handleChange("amcContractNumber",v)} />

      <Input type="date" label="Warranty Expiry Date" onChange={(v:any)=>handleChange("warrantyExpiryDate",v)} />
      <Input type="date" label="Date of Issue Occurrence" onChange={(v:any)=>handleChange("issueDate",v)} />
    </Grid>

    <Textarea
      label="Issue Description"
      onChange={(v:any)=>handleChange("description",v)}
    />
  </Section>

  {/* ---------------- ATTACHMENTS ---------------- */}
<div>
  <h3 className="text-blue-600 font-semibold mb-2">
    Attachments:
  </h3>

  <p className="text-sm text-gray-500 mb-3">
    Upload relevant documents such as invoices, previous complaints, or photos of the issue.
  </p>

  <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
    📎 Upload Image/File
    <input
      type="file"
      multiple
      onChange={handleFileUpload}
      className="hidden"
    />
  </label>

  {/* Preview */}
  <div className="mt-3 space-y-1">
    {attachments.map((file, i) => (
      <p key={i} className="text-xs text-gray-600">
        {file.file.name}
      </p>
    ))}
  </div>
</div>

  {/* ---------------- COMMUNICATION ---------------- */}
  <div className="flex items-center gap-6 text-sm">
    <span>Send Complaint to Vendor on</span>

    <Checkbox
      label="WhatsApp"
      checked={form.sendWhatsapp}
      onChange={()=>handleChange("sendWhatsapp", !form.sendWhatsapp)}
    />

    <Checkbox
      label="E-Mail"
      checked={form.sendEmail}
      onChange={()=>handleChange("sendEmail", !form.sendEmail)}
    />
  </div>

  {/* ---------------- ACTION ---------------- */}
  <div className="flex justify-end">
    <button
      onClick={handleSubmit}
      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
    >
      {loading ? "Submitting..." : "Submit your complaint"}
    </button>
  </div>
</div>


)
}

/* ---------- UI COMPONENTS ---------- */

function Section({ title, children }: any) {
return ( <div> <h3 className="text-blue-600 font-semibold mb-4">{title}:</h3>
{children} </div>
)
}

function Grid({ children }: any) {
return <div className="grid grid-cols-2 gap-4">{children}</div>
}

function Input({ label, onChange, type="text" }: any) {
return ( <div> <label className="text-sm text-gray-600">{label}</label>
<input
type={type}
onChange={(e)=>onChange(e.target.value)}
className="w-full h-10 px-4 border rounded-lg"
/> </div>
)
}

function Select({ label, onChange }: any) {
return ( <div> <label className="text-sm text-gray-600">{label}</label> <div className="relative">
<select
onChange={(e)=>onChange(e.target.value)}
className="w-full h-10 px-4 pr-10 border rounded-lg appearance-none"
> <option value="">Select</option> <option value="LOW">Low</option> <option value="MEDIUM">Medium</option> <option value="HIGH">High</option> </select> <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-green-600" /> </div> </div>
)
}

function Textarea({ label, onChange }: any) {
return ( <div className="mt-4"> <label className="text-sm text-gray-600">{label}</label>
<textarea
rows={4}
onChange={(e)=>onChange(e.target.value)}
className="w-full border rounded-lg p-3"
/> </div>
)
}

function Checkbox({ label, checked, onChange }: any) {
return ( <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" checked={checked} onChange={onChange} />
{label} </label>
)
}
