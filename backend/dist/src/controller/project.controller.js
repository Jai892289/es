"use strict";
// controllers/project.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectByIdController = exports.getProjectsController = exports.createProjectController = void 0;
const project_service_1 = require("../services/project.service");
const createProjectController = async (req, res) => {
    try {
        const data = await (0, project_service_1.createProject)(req.body);
        res.status(201).json({
            message: "Project created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createProjectController = createProjectController;
const getProjectsController = async (req, res) => {
    try {
        const data = await (0, project_service_1.getProjects)();
        res.json({
            message: "Projects fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProjectsController = getProjectsController;
const getProjectByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, project_service_1.getProjectById)(id);
        res.json({
            message: "Project fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProjectByIdController = getProjectByIdController;
