"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentStatsController = exports.deleteDepartmentController = exports.updateDepartmentController = exports.getSingleDepartmentController = exports.getDepartmentsController = exports.createDepartmentController = void 0;
const department_services_1 = require("../services/department.services");
const createDepartmentController = async (req, res) => {
    try {
        const department = await (0, department_services_1.createDepartment)(req.body);
        res.status(201).json({
            message: "Department created successfully",
            data: department,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createDepartmentController = createDepartmentController;
const getDepartmentsController = async (req, res) => {
    try {
        const departments = await (0, department_services_1.getDepartments)();
        res.status(200).json({
            message: "Departments fetched successfully",
            data: departments,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getDepartmentsController = getDepartmentsController;
const getSingleDepartmentController = async (req, res) => {
    try {
        const department = await (0, department_services_1.getSingleDepartment)(req.params.id);
        res.status(200).json({
            message: "Department fetched successfully",
            data: department,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getSingleDepartmentController = getSingleDepartmentController;
const updateDepartmentController = async (req, res) => {
    try {
        const department = await (0, department_services_1.updateDepartment)(req.params.id, req.body);
        res.status(200).json({
            message: "Department updated successfully",
            data: department,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateDepartmentController = updateDepartmentController;
const deleteDepartmentController = async (req, res) => {
    try {
        await (0, department_services_1.deleteDepartment)(req.params.id);
        res.status(200).json({
            message: "Department deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteDepartmentController = deleteDepartmentController;
const getDepartmentStatsController = async (req, res) => {
    try {
        const stats = await (0, department_services_1.getDepartmentStats)();
        res.status(200).json({
            message: "Department stats fetched successfully",
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getDepartmentStatsController = getDepartmentStatsController;
