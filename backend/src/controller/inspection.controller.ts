import {
  Request,
  Response,
} from "express";

import {
  createInspection,
  getAllInspections,
  getInspectionById,
  getUpcomingReminders,
  updateInspection,
  updateInspectionStatus,
  deleteInspection,
  createInspectionReport,
  getInspectionReports,
  getInspectionReportById,
    getSupervisorDashboard,
  approveInspectionReport,
} from "../services/inspection.services"






export const createInspectionController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const inspection =
        await createInspection(
          req.body
        );

      res.status(201).json({
        message:
          "Inspection created successfully",

        data: inspection,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getAllInspectionsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const inspections =
        await getAllInspections(
          req.query
        );

      res.status(200).json({
        data: inspections,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getInspectionByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const inspection =
        await getInspectionById(
          req.params.id
        );

      res.status(200).json({
        data: inspection,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getUpcomingRemindersController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const reminders =
        await getUpcomingReminders();

      res.status(200).json({
        data: reminders,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateInspectionController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const inspection =
        await updateInspection(
          req.params.id,
          req.body
        );

      res.status(200).json({
        message:
          "Inspection updated successfully",

        data: inspection,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateInspectionStatusController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const inspection =
        await updateInspectionStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json({
        message:
          "Status updated successfully",

        data: inspection,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteInspectionController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      await deleteInspection(
        req.params.id
      );

      res.status(200).json({
        message:
          "Inspection deleted successfully",
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };




export const create =
  async (req: Request, res: Response) => {

    try {

      const report =
        await createInspectionReport(
          req.body
        );

      res.status(201).json({
        message:
          "Inspection report submitted",

        data: report,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getAll =
  async (_req: Request, res: Response) => {

    try {

      const reports =
        await getInspectionReports();

      res.json({
        data: reports,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getById =
  async (req: Request, res: Response) => {

    try {

      const report =
        await getInspectionReportById(
          req.params.id
        );

      res.json({
        data: report,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };





export const getDashboard =
  async (
    _req: Request,
    res: Response
  ) => {

    try {

      const data =
        await getSupervisorDashboard();

      res.json({
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

export const approveReport =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const report =
        await approveInspectionReport(
          req.params.id,
          req.body
        );

      res.json({
        message:
          "Report status updated",

        data: report,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });
    }
  };