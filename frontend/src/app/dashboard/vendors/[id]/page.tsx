"use client"

import Link from "next/link"
import { ChevronLeft, Building2, MapPin, Phone, Mail, Globe } from "lucide-react"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVendorByIdApi } from "@/lib/vendor.api";

export default function VendorDetailsPage() {
const { id } = useParams();

const [data, setData] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
if (!id) return;


const fetchData = async () => {
  try {
    const res = await getVendorByIdApi(id as string);
    setData(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

fetchData();


}, [id]);

if (loading) return <p>Loading...</p>;
if (!data) return <p>No Vendor Found</p>;

return ( <div className="space-y-6">


  {/* BACK */}
  <Link
    href="/dashboard/vendors"
    className="flex items-center gap-2 text-sm text-green-600 hover:underline"
  >
    <ChevronLeft className="w-4 h-4" />
    Back to Vendors
  </Link>

  <div className="max-w-8xl mx-auto bg-white rounded-xl border shadow-sm">

    {/* HEADER */}
    <div className="flex items-center gap-4 p-6 border-b">
      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
        <Building2 className="text-green-600" />
      </div>

      <div>
        <h2 className="text-lg font-semibold">{data.companyName}</h2>
        <p className="text-sm text-gray-500">
          {data.city}, {data.state}
        </p>
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6 space-y-6">

      {/* CONTACT */}
      <Section title="Contact Information">
        <Info icon={<Phone />} label="Phone" value={data.contactNumber} />
        <Info icon={<Phone />} label="WhatsApp" value={data.whatsappNumber || "-"} />
        <Info icon={<Mail />} label="Email" value={data.email} />
        <Info icon={<Globe />} label="Website" value={data.website || "-"} />
      </Section>

      {/* ADDRESS */}
      <Section title="Address Details">
        <Info
          icon={<MapPin />}
          label="Address"
          value={`${data.addressLine1 || ""} ${data.addressLine2 || ""}

${data.city || ""}, ${data.state || ""} ${data.pincode || ""}`}
/> </Section>


      {/* BUSINESS */}
      <Section title="Business Details">
        <Info label="Contact Person" value={data.fullName || "-"} />
        <Info label="GST Number" value={data.gstNumber || "-"} />
      </Section>

    </div>
  </div>
</div>


);
}

/* ---------- SECTION ---------- */

function Section({ title, children }: any) {
return ( <div> <h3 className="text-sm font-semibold text-green-600 mb-3">{title}</h3> <div className="space-y-3">{children}</div> </div>
);
}

/* ---------- INFO ---------- */

function Info({ label, value, icon }: any) {
return ( <div className="flex items-start gap-3 border-b pb-2">
{icon && <div className="text-gray-400 mt-0.5">{icon}</div>}


  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-800 break-words">
      {value}
    </p>
  </div>
</div>


);
}
