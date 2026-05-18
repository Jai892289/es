import { Request, Response } from "express";
import { createDepartment, deleteDepartment, getDepartments, getDepartmentStats, getSingleDepartment, updateDepartment } from "../services/department.services";


export const createDepartmentController =
  async (req: Request, res: Response) => {
    try {
      const department =
        await createDepartment(req.body);

      res.status(201).json({
        message:
          "Department created successfully",
        data: department,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getDepartmentsController =
  async (req: Request, res: Response) => {
    try {
      const departments =
        await getDepartments();

      res.status(200).json({
        message:
          "Departments fetched successfully",
        data: departments,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getSingleDepartmentController =
  async (req: any, res: Response) => {
    try {
      const department =
        await getSingleDepartment(
          req.params.id
        );

      res.status(200).json({
        message:
          "Department fetched successfully",
        data: department,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateDepartmentController =
  async (req: any, res: Response) => {
    try {
      const department =
        await updateDepartment(
          req.params.id,
          req.body
        );

      res.status(200).json({
        message:
          "Department updated successfully",
        data: department,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteDepartmentController =
  async (req: any, res: Response) => {
    try {
      await deleteDepartment(req.params.id);

      res.status(200).json({
        message:
          "Department deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getDepartmentStatsController =
  async (req: Request, res: Response) => {
    try {
      const stats =
        await getDepartmentStats();

      res.status(200).json({
        message:
          "Department stats fetched successfully",
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };