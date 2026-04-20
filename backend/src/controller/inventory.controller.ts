import { Request, Response } from "express";
import { createInventory, getInventory, getInventorybyId } from "../services/inventory.services";

export const createInventoryController = async (req:Request, res:Response) => {
  try {
    const data = await createInventory(req.body);

    res.status(201).json({
      message: "Inventory created",
      data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getInventoryController = async (req: Request, res: Response) => {
  try {
    const data = await getInventory();

    res.json({
      message: "Inventory fetched",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInventoryControllerbyId = async (req: Request, res: Response) => {
  try {
    const { id }:any = req.params; 

    const data = await getInventorybyId(id);

    res.json({
      message: "Inventory fetched",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
