import { Request, Response } from "express";
import { getAnalyticsData } from "../services/analytics.services";


export const getAnalyticsController =
  async (req: Request, res: Response) => {
    try {
      const analytics =
        await getAnalyticsData(
          req.query
        );

      res.status(200).json({
        message:
          "Analytics fetched successfully",

        data: analytics,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };