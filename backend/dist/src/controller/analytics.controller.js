"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsController = void 0;
const analytics_services_1 = require("../services/analytics.services");
const getAnalyticsController = async (req, res) => {
    try {
        const analytics = await (0, analytics_services_1.getAnalyticsData)(req.query);
        res.status(200).json({
            message: "Analytics fetched successfully",
            data: analytics,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getAnalyticsController = getAnalyticsController;
