import { Request, Response } from "express";
import { getDashboardAnalytics, getReportsSummary } from "../services/dashboard.services";




export const getDashboardAnalyticsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const data =
        await getDashboardAnalytics();

      res.status(200).json({
        message:
          "Dashboard analytics fetched successfully",
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


  export const getReportsSummaryController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const data =
        await getReportsSummary(req.query);

      res.status(200).json({
        message:
          "Reports summary fetched successfully",
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });

    }
  };