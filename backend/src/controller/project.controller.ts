// controllers/project.controller.ts

import { Request, Response } from "express";

import {
  createProject,
  getProjectById,
  getProjects,
} from "../services/project.service";





export const createProjectController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await createProject(req.body);

    res.status(201).json({
      message: "Project created successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};





export const getProjectsController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getProjects();

    res.json({
      message: "Projects fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};





export const getProjectByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id }: any = req.params;

    const data = await getProjectById(id);

    res.json({
      message: "Project fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};