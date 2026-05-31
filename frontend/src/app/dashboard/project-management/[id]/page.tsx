"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Building2,
  CalendarDays,
  MapPin,
  Wallet,
  Users,
  Briefcase,
  Target,
  CheckCircle2,
} from "lucide-react";

import { getProjectByIdApi } from "@/lib/project.api";

export default function ProjectDetailsPage() {

  const { id } = useParams();

  const [project, setProject] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchProject =
      async () => {

        try {

          const res =
            await getProjectByIdApi(
              id as string
            );

          setProject(
            res.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchProject();

  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        Project not found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-6">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-white">
                {project.projectName}
              </h1>

              <p className="text-white/90 mt-2">
                {project.category} • {project.schemeName}
              </p>

              <p className="text-white/90">
                {project.department}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">

              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                {project.status}
              </span>

              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm">
                {project.priorityLevel}
              </span>

            </div>
          </div>

          {/* KPI */}

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

            <KpiCard
              title="Budget"
              value={`₹${project.budget?.totalBudget?.toLocaleString() || 0}`}
            />

            <KpiCard
              title="Progress"
              value={`${project.progress}%`}
            />

            <KpiCard
              title="Milestones"
              value={project.milestones?.length || 0}
            />

            <KpiCard
              title="Assets"
              value={project.assets?.length || 0}
            />

          </div>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <SectionCard
          icon={Building2}
          title="Project Information"
        >

          <Info
            label="Project Type"
            value={project.projectType}
          />

          <Info
            label="Category"
            value={project.category}
          />

          <Info
            label="Scheme"
            value={project.schemeName}
          />

          <Info
            label="Department"
            value={project.department}
          />

          <Info
            label="Priority"
            value={project.priorityLevel}
          />

          <Info
            label="Status"
            value={project.status}
          />

        </SectionCard>

        <SectionCard
          icon={CalendarDays}
          title="Timeline"
        >

          <Info
            label="Start Date"
            value={new Date(
              project.timeline?.startDate
            ).toLocaleDateString("en-GB")}
          />

          <Info
            label="End Date"
            value={new Date(
              project.timeline?.endDate
            ).toLocaleDateString("en-GB")}
          />

          <div className="pt-4">

            <div className="flex justify-between text-sm mb-2">

              <span>Progress</span>

              <span>
                {project.progress}%
              </span>
            </div>

            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>
          </div>

        </SectionCard>

        <SectionCard
          icon={MapPin}
          title="Location"
        >

          <Info
            label="State"
            value={project.location?.state}
          />

          <Info
            label="District"
            value={project.location?.district}
          />

          <Info
            label="Block"
            value={project.location?.block}
          />

          <Info
            label="Ward"
            value={project.location?.ward}
          />

          <Info
            label="Address"
            value={project.location?.address}
          />

        </SectionCard>

        <SectionCard
          icon={Wallet}
          title="Budget Details"
        >

          <Info
            label="Funding Source"
            value={project.budget?.fundingSource}
          />

          <div className="pt-4">

            <p className="text-sm text-black">
              Total Budget
            </p>

            <h2 className="text-3xl font-bold text-emerald-600 mt-2">
              ₹
              {project.budget?.totalBudget?.toLocaleString()}
            </h2>
          </div>

        </SectionCard>

        <SectionCard
          icon={Users}
          title="Team"
        >

          <Info
            label="Project Manager"
            value={project.team?.projectManager || "-"}
          />

          <Info
            label="Department Head"
            value={project.team?.departmentHead || "-"}
          />

          <Info
            label="Supervisor"
            value={project.team?.supervisor || "-"}
          />

        </SectionCard>

        <SectionCard
          icon={Briefcase}
          title="Vendor"
        >

          <Info
            label="Vendor Name"
            value={project.vendor?.vendorName || "-"}
          />

          <Info
            label="Company"
            value={project.vendor?.companyName || "-"}
          />

          <Info
            label="Contact"
            value={project.vendor?.contactDetails || "-"}
          />

        </SectionCard>

      </div>

      {/* DESCRIPTION */}

      <SectionCard
        icon={Target}
        title="Project Description"
      >

        <Info
          label="Scope"
          value={project.description?.scope}
        />

        <Info
          label="Description"
          value={project.description?.description}
        />

      </SectionCard>

      {/* MILESTONES */}

      <SectionCard
        icon={CheckCircle2}
        title="Milestones"
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Milestone
                </th>

                <th className="text-left py-3">
                  Due Date
                </th>

                <th className="text-left py-3">
                  Budget %
                </th>

                <th className="text-left py-3">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {project.milestones?.map(
                (m: any) => (

                  <tr
                    key={m.id}
                    className="border-b"
                  >

                    <td className="py-3">
                      {m.milestoneName}
                    </td>

                    <td className="py-3">
                      {new Date(
                        m.dueDate
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>

                    <td className="py-3">
                      {m.budgetPercent}%
                    </td>

                    <td className="py-3">
                      {m.status}
                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>

      </SectionCard>

    </div>
  );
}

function KpiCard({
  title,
  value,
}: any) {

  return (
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
      <p className="text-white/80 text-xs">
        {title}
      </p>

      <h2 className="text-2xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
}: any) {

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <h2 className="font-semibold text-lg">
          {title}
        </h2>

      </div>

      {children}
    </div>
  );
}

function Info({
  label,
  value,
}: any) {

  return (
    <div className="flex justify-between py-2 border-b border-gray-100">

      <span className="text-black text-sm">
        {label}
      </span>

      <span className="font-medium text-black text-sm text-right">
        {value || "-"}
      </span>

    </div>
  );
}