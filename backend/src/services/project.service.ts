
import prisma from "../config/prisma";

export const createProject = async (data: any) => {
  const project = await prisma.project.create({
    data: {
      // basic
      projectId: data.projectId,
      projectName: data.projectName,
      category: data.category,
      schemeName: data.schemeName,
      projectType: data.projectType,
      department: data.department,
      priorityLevel: data.priorityLevel,

      // location
      location: {
        create: {
          state: data.location.state,
          district: data.location.district,
          block: data.location.block,
          ward: data.location.ward,
          address: data.location.address,
        },
      },

      // description
      description: {
        create: {
          description: data.descriptionData.description,
          scope: data.descriptionData.scope,
          fileUrl: data.descriptionData.fileUrl,
        },
      },

      // timeline
      timeline: {
        create: {
          startDate: new Date(data.timeline.startDate),
          endDate: new Date(data.timeline.endDate),
        },
      },

      // budget
      budget: {
        create: {
          totalBudget: Number(data.budget.totalBudget),
          fundingSource: data.budget.fundingSource,
          expenseBreakdown: data.budget.expenseBreakdown,
        },
      },

      // vendor
      vendor: {
        create: {
          vendorName: data.vendor.vendorName,
          companyName: data.vendor.companyName,
          contactDetails: data.vendor.contactDetails,
          contractValue: Number(data.vendor.contractValue),
          agreementFile: data.vendor.agreementFile,
        },
      },

      // assets
      assets: {
        create: data.assets.map((item: any) => ({
          productId: item.productId,
        })),
      },

      // milestones
      milestones: {
        create: data.milestones.map((item: any) => ({
          milestoneName: item.milestoneName,
          dueDate: new Date(item.dueDate),
          budgetPercent: Number(item.budgetPercent),
        })),
      },

      // team
      team: {
        create: {
          projectManager: data.team.projectManager,
          supervisor: data.team.supervisor,
          departmentHead: data.team.departmentHead,
        },
      },

      // approvals
      approvals: {
        create: data.approvals.map((item: any) => ({
          levelName: item.levelName,
          order: item.order,
        })),
      },
    },

    include: {
      location: true,
      description: true,
      timeline: true,
      budget: true,
      vendor: true,
      assets: {
        include: {
          product: true,
        },
      },
      milestones: true,
      team: true,
      approvals: true,
    },
  });

  return project;
};





export const getProjects = async () => {
  return prisma.project.findMany({
    include: {
      location: true,
      timeline: true,
      budget: true,
      milestones: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};





export const getProjectById = async (id: string) => {
  return prisma.project.findUnique({
    where: {
      id,
    },

    include: {
      location: true,
      description: true,
      timeline: true,
      budget: true,
      vendor: true,

      assets: {
        include: {
          product: true,
        },
      },

      milestones: true,

      team: true,

      approvals: true,
    },
  });
};