"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsSummaryController = exports.getDashboardAnalyticsController = void 0;
const dashboard_services_1 = require("../services/dashboard.services");
const getDashboardAnalyticsController = async (req, res) => {
    try {
        const data = await (0, dashboard_services_1.getDashboardAnalytics)();
        res.status(200).json({
            message: "Dashboard analytics fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getDashboardAnalyticsController = getDashboardAnalyticsController;
const getReportsSummaryController = async (req, res) => {
    try {
        const data = await (0, dashboard_services_1.getReportsSummary)(req.query);
        res.status(200).json({
            message: "Reports summary fetched successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getReportsSummaryController = getReportsSummaryController;
