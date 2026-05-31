"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  FileText,
  Package2,
  CheckCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVendorByIdApi } from "@/lib/vendor.api";

export default function VendorDetailsPage() {
  const { id } = useParams();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData =
      async () => {
        try {
          const res =
            await getVendorByIdApi(
              id as string
            );

          setData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-black">
            Loading Vendor...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-black">
          No Vendor Found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* BACK */}

      <Link
        href="/dashboard/vendors"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Vendors
      </Link>

      {/* HERO */}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6 text-white shadow-sm">
        <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl font-bold break-words">
                {data.companyName}
              </h1>

              <p className="text-green-50 mt-1">
                {data.city},{" "}
                {data.state}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-[300px]">
            <MiniCard
              icon={Package2}
              title="Products"
              value={
                data.products
                  ?.length || 0
              }
            />

            <MiniCard
              icon={FileText}
              title="GST"
              value={
                data.gstNumber
                  ? "Yes"
                  : "No"
              }
            />

            <MiniCard
              icon={Globe}
              title="Website"
              value={
                data.website
                  ? "Yes"
                  : "No"
              }
            />

            <MiniCard
              icon={CheckCircle}
              title="Status"
              value="Active"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* CONTACT */}

        <Section title="Contact Information">
          <Info
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={
              data.contactNumber
            }
          />

          <Info
            icon={<Phone className="w-4 h-4" />}
            label="WhatsApp"
            value={
              data.whatsappNumber ||
              "-"
            }
          />

          <Info
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={
              data.email || "-"
            }
          />

          <Info
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={
              data.website || "-"
            }
          />
        </Section>

        {/* BUSINESS */}

        <Section title="Business Details">
          <Info
            icon={<User className="w-4 h-4" />}
            label="Contact Person"
            value={
              data.fullName ||
              "-"
            }
          />

          <Info
            icon={
              <FileText className="w-4 h-4" />
            }
            label="GST Number"
            value={
              data.gstNumber ||
              "-"
            }
          />
        </Section>

        {/* ADDRESS */}

        <div className="xl:col-span-2">
          <Section title="Address Details">
            <Info
              icon={<MapPin className="w-4 h-4" />}
              label="Address"
              value={`${data.addressLine1 || ""}
${data.addressLine2 || ""}
${data.city || ""}, ${
                data.state || ""
              } ${data.pincode || ""}`}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* MINI CARD */
/* -------------------------------- */

function MiniCard({
  icon: Icon,
  title,
  value,
}: any) {
  return (
    <div className="bg-white/15 backdrop-blur border border-white/10 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] text-green-50">
            {title}
          </p>

          <h3 className="text-lg font-bold text-white mt-1 truncate">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* SECTION */
/* -------------------------------- */

function Section({
  title,
  children,
}: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-base font-semibold text-black mb-5">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* INFO */
/* -------------------------------- */

function Info({
  label,
  value,
  icon,
}: any) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-black mt-1 whitespace-pre-line break-words">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}