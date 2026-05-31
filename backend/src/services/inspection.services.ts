import prisma from "../config/prisma";

export const createInspection =
  async (data: any) => {

    const count =
      await prisma.inspection.count();

    const inspection =
      await prisma.inspection.create({
        data: {
          inspectionId:
        `INS-2026-00${count + 1}`,

      title: data.title,

      notes:
        data.description,

      type: data.type,

      priority:
        data.priority,

      status:
        data.status,

      scheduledDate:
        new Date(
          data.scheduledDate
        ),

      reminderDate:
        data.reminderDate
          ? new Date(
              data.reminderDate
            )
          : null,

      location:
        data.location,

      inspectorName:
        data.inspectorName,
        },

        include: {
          project: true,
          product: true,
        },
      });

    return inspection;
  };

export const getAllInspections =
  async (filters: any) => {

    const {
      type,
      status,
      projectId,
      productId,
    } = filters;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (projectId) {
      where.projectId = projectId;
    }

    if (productId) {
      where.productId = productId;
    }

    const inspections =
      await prisma.inspection.findMany({
        where,

        include: {
          project: true,
          product: true,
        },

        orderBy: {
          scheduledDate: "asc",
        },
      });

    return inspections;
  };

export const getInspectionById =
  async (id: string) => {

    return prisma.inspection.findUnique({
      where: { id },

      include: {
        project: true,
        product: true,
      },
    });
  };

export const getUpcomingReminders =
  async () => {

    return prisma.inspection.findMany({
      where: {
        scheduledDate: {
          gte: new Date(),
        },
      },

      include: {
        project: true,
        product: true,
      },

      orderBy: {
        scheduledDate: "asc",
      },

      take: 5,
    });
  };

export const updateInspection =
  async (
    id: string,
    data: any
  ) => {

    return prisma.inspection.update({
      where: { id },

      data: {
        title: data.title,

        description:
          data.description,

        type: data.type,

        priority:
          data.priority,

        status:
          data.status,

        scheduledDate:
          data.scheduledDate
            ? new Date(
                data.scheduledDate
              )
            : undefined,

        reminderDate:
          data.reminderDate
            ? new Date(
                data.reminderDate
              )
            : undefined,

        location:
          data.location,

        inspectorName:
          data.inspectorName,

        remarks:
          data.remarks,

        projectId:
          data.projectId,

        productId:
          data.productId,
      },

      include: {
        project: true,
        product: true,
      },
    });
  };

export const updateInspectionStatus =
  async (
    id: string,
    status: any
  ) => {

    return prisma.inspection.update({
      where: { id },

      data: {
        status,
      },
    });
  };

export const deleteInspection =
  async (id: string) => {

    return prisma.inspection.delete({
      where: { id },
    });
  };



// inspection report


export const createInspectionReport = async (
  data: any
) => {

  const report =
    await prisma.inspectionReport.create({
      data: {
        inspectionId: data.inspectionId,

        observation: data.observation,

        complianceStatus:
          data.complianceStatus,

        recommendation:
          data.recommendation,

        inspectionResult:
          data.inspectionResult,

        latitude: data.latitude,

        longitude: data.longitude,

        address: data.address,

        photoUrls: data.photoUrls || [],

        videoUrls: data.videoUrls || [],

        signatureUrl:
          data.signatureUrl,

        status:
          data.status || "SUBMITTED",
      },

      include: {
        inspection: true,
      },
    });

  return report;
};

export const getInspectionReports =
  async () => {

    return prisma.inspectionReport.findMany({
      include: {
        inspection: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const getInspectionReportById =
  async (id: string) => {

    return prisma.inspectionReport.findUnique({
      where: { id },

      include: {
        inspection: true,
      },
    });
  };



// supervisor approval


export const getSupervisorDashboard =
  async () => {

    const pending =
      await prisma.inspectionReport.count({
        where: {
          supervisorStatus: "PENDING",
        },
      });

    const approved =
      await prisma.inspectionReport.count({
        where: {
          supervisorStatus: "APPROVED",
        },
      });

    const rejected =
      await prisma.inspectionReport.count({
        where: {
          supervisorStatus: "REJECTED",
        },
      });

    const reports =
      await prisma.inspectionReport.findMany({

        include: {
          inspection: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return {
      stats: {
        pending,
        approved,
        rejected,
      },

      reports,
    };
  };

export const approveInspectionReport =
  async (
    id: string,
    data: any
  ) => {

    return prisma.inspectionReport.update({
      where: { id },

      data: {
        supervisorStatus:
          data.status,

        supervisorComment:
          data.comment,

        approvedBy:
          data.approvedBy,

        approvedAt:
          new Date(),
      },
    });
  };