"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createProject = async (data) => {
    const project = await prisma_1.default.project.create({
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
                create: data.assets.map((item) => ({
                    productId: item.productId,
                })),
            },
            // milestones
            milestones: {
                create: data.milestones.map((item) => ({
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
                create: data.approvals.map((item) => ({
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
exports.createProject = createProject;
const getProjects = async () => {
    return prisma_1.default.project.findMany({
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
exports.getProjects = getProjects;
const getProjectById = async (id) => {
    return prisma_1.default.project.findUnique({
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
exports.getProjectById = getProjectById;
