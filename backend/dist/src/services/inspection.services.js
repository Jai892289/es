"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveInspectionReport = exports.getSupervisorDashboard = exports.getInspectionReportById = exports.getInspectionReports = exports.createInspectionReport = exports.deleteInspection = exports.updateInspectionStatus = exports.updateInspection = exports.getUpcomingReminders = exports.getInspectionById = exports.getAllInspections = exports.createInspection = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createInspection = async (data) => {
    const count = await prisma_1.default.inspection.count();
    const inspection = await prisma_1.default.inspection.create({
        data: {
            inspectionId: `INS-2026-00${count + 1}`,
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            status: data.status,
            scheduledDate: new Date(data.scheduledDate),
            reminderDate: data.reminderDate
                ? new Date(data.reminderDate)
                : null,
            location: data.location,
            inspectorName: data.inspectorName,
            remarks: data.remarks,
            projectId: data.projectId || null,
            productId: data.productId || null,
        },
        include: {
            project: true,
            product: true,
        },
    });
    return inspection;
};
exports.createInspection = createInspection;
const getAllInspections = async (filters) => {
    const { type, status, projectId, productId, } = filters;
    const where = {};
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
    const inspections = await prisma_1.default.inspection.findMany({
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
exports.getAllInspections = getAllInspections;
const getInspectionById = async (id) => {
    return prisma_1.default.inspection.findUnique({
        where: { id },
        include: {
            project: true,
            product: true,
        },
    });
};
exports.getInspectionById = getInspectionById;
const getUpcomingReminders = async () => {
    return prisma_1.default.inspection.findMany({
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
exports.getUpcomingReminders = getUpcomingReminders;
const updateInspection = async (id, data) => {
    return prisma_1.default.inspection.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority,
            status: data.status,
            scheduledDate: data.scheduledDate
                ? new Date(data.scheduledDate)
                : undefined,
            reminderDate: data.reminderDate
                ? new Date(data.reminderDate)
                : undefined,
            location: data.location,
            inspectorName: data.inspectorName,
            remarks: data.remarks,
            projectId: data.projectId,
            productId: data.productId,
        },
        include: {
            project: true,
            product: true,
        },
    });
};
exports.updateInspection = updateInspection;
const updateInspectionStatus = async (id, status) => {
    return prisma_1.default.inspection.update({
        where: { id },
        data: {
            status,
        },
    });
};
exports.updateInspectionStatus = updateInspectionStatus;
const deleteInspection = async (id) => {
    return prisma_1.default.inspection.delete({
        where: { id },
    });
};
exports.deleteInspection = deleteInspection;
// inspection report
const createInspectionReport = async (data) => {
    const report = await prisma_1.default.inspectionReport.create({
        data: {
            inspectionId: data.inspectionId,
            observation: data.observation,
            complianceStatus: data.complianceStatus,
            recommendation: data.recommendation,
            inspectionResult: data.inspectionResult,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            photoUrls: data.photoUrls || [],
            videoUrls: data.videoUrls || [],
            signatureUrl: data.signatureUrl,
            status: data.status || "SUBMITTED",
        },
        include: {
            inspection: true,
        },
    });
    return report;
};
exports.createInspectionReport = createInspectionReport;
const getInspectionReports = async () => {
    return prisma_1.default.inspectionReport.findMany({
        include: {
            inspection: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getInspectionReports = getInspectionReports;
const getInspectionReportById = async (id) => {
    return prisma_1.default.inspectionReport.findUnique({
        where: { id },
        include: {
            inspection: true,
        },
    });
};
exports.getInspectionReportById = getInspectionReportById;
// supervisor approval
const getSupervisorDashboard = async () => {
    const pending = await prisma_1.default.inspectionReport.count({
        where: {
            supervisorStatus: "PENDING",
        },
    });
    const approved = await prisma_1.default.inspectionReport.count({
        where: {
            supervisorStatus: "APPROVED",
        },
    });
    const rejected = await prisma_1.default.inspectionReport.count({
        where: {
            supervisorStatus: "REJECTED",
        },
    });
    const reports = await prisma_1.default.inspectionReport.findMany({
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
exports.getSupervisorDashboard = getSupervisorDashboard;
const approveInspectionReport = async (id, data) => {
    return prisma_1.default.inspectionReport.update({
        where: { id },
        data: {
            supervisorStatus: data.status,
            supervisorComment: data.comment,
            approvedBy: data.approvedBy,
            approvedAt: new Date(),
        },
    });
};
exports.approveInspectionReport = approveInspectionReport;
