"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComplaintController = exports.createComplaintController = void 0;
const complaint_services_1 = require("../services/complaint.services");
const createComplaintController = async (req, res) => {
    try {
        const data = await (0, complaint_services_1.createComplaint)(req.body);
        res.status(201).json({
            message: "Complaint created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createComplaintController = createComplaintController;
const getComplaintController = async (req, res) => {
    try {
        const data = await (0, complaint_services_1.getComplaint)();
        res.status(201).json({
            message: "Fetch All Complaint",
            data
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getComplaintController = getComplaintController;
