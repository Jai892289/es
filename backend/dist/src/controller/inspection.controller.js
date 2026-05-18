"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveReport = exports.getDashboard = exports.getById = exports.getAll = exports.create = exports.deleteInspectionController = exports.updateInspectionStatusController = exports.updateInspectionController = exports.getUpcomingRemindersController = exports.getInspectionByIdController = exports.getAllInspectionsController = exports.createInspectionController = void 0;
const inspection_services_1 = require("../services/inspection.services");
const createInspectionController = async (req, res) => {
    try {
        const inspection = await (0, inspection_services_1.createInspection)(req.body);
        res.status(201).json({
            message: "Inspection created successfully",
            data: inspection,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createInspectionController = createInspectionController;
const getAllInspectionsController = async (req, res) => {
    try {
        const inspections = await (0, inspection_services_1.getAllInspections)(req.query);
        res.status(200).json({
            data: inspections,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAllInspectionsController = getAllInspectionsController;
const getInspectionByIdController = async (req, res) => {
    try {
        const inspection = await (0, inspection_services_1.getInspectionById)(req.params.id);
        res.status(200).json({
            data: inspection,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getInspectionByIdController = getInspectionByIdController;
const getUpcomingRemindersController = async (req, res) => {
    try {
        const reminders = await (0, inspection_services_1.getUpcomingReminders)();
        res.status(200).json({
            data: reminders,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getUpcomingRemindersController = getUpcomingRemindersController;
const updateInspectionController = async (req, res) => {
    try {
        const inspection = await (0, inspection_services_1.updateInspection)(req.params.id, req.body);
        res.status(200).json({
            message: "Inspection updated successfully",
            data: inspection,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateInspectionController = updateInspectionController;
const updateInspectionStatusController = async (req, res) => {
    try {
        const inspection = await (0, inspection_services_1.updateInspectionStatus)(req.params.id, req.body.status);
        res.status(200).json({
            message: "Status updated successfully",
            data: inspection,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateInspectionStatusController = updateInspectionStatusController;
const deleteInspectionController = async (req, res) => {
    try {
        await (0, inspection_services_1.deleteInspection)(req.params.id);
        res.status(200).json({
            message: "Inspection deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteInspectionController = deleteInspectionController;
const create = async (req, res) => {
    try {
        const report = await (0, inspection_services_1.createInspectionReport)(req.body);
        res.status(201).json({
            message: "Inspection report submitted",
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.create = create;
const getAll = async (_req, res) => {
    try {
        const reports = await (0, inspection_services_1.getInspectionReports)();
        res.json({
            data: reports,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAll = getAll;
const getById = async (req, res) => {
    try {
        const report = await (0, inspection_services_1.getInspectionReportById)(req.params.id);
        res.json({
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getById = getById;
const getDashboard = async (_req, res) => {
    try {
        const data = await (0, inspection_services_1.getSupervisorDashboard)();
        res.json({
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getDashboard = getDashboard;
const approveReport = async (req, res) => {
    try {
        const report = await (0, inspection_services_1.approveInspectionReport)(req.params.id, req.body);
        res.json({
            message: "Report status updated",
            data: report,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.approveReport = approveReport;
