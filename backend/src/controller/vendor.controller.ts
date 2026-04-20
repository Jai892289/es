import { Request, Response } from "express";
import { createVendor, getAllVendor, getVendorbyId } from "../services/vendor.services";

export const createVendorController = async (req: Request, res: Response) => {
  try {
    const data = await createVendor(req.body);

    res.status(201).json({
      message: "Vendor Created",
      data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getVendorController = async (req: Request, res: Response) => {
  try {
    const data = await getAllVendor()
    res.status(201).json({
      message: "Fetch All Vendor",
      data
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message });

  }
}

export const getVendorbyIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const data = await getVendorbyId(id)

    res.status(201).json({
      message: "Venodr found",
      data
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}