import { Request, Response } from "express";
import { createComplaint, getComplaint } from "../services/complaint.services";

export const createComplaintController = async (req: Request, res: Response) => {
  try {
    const data = await createComplaint(req.body);

    res.status(201).json({
      message: "Complaint created successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComplaintController = async (req: Request, res: Response) => {
  try {
    const data = await getComplaint()
    res.status(201).json({
      message: "Fetch All Complaint",
      data
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message });

  }
}
