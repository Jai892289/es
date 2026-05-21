import { Request, Response } from "express";
import { approveAssetTransfer, createAssetMapping, createAssetReplacement, createAssetTransfer, createCategory, createInventory, getAssetReplacements, getAssetStatusAnalytics, getAssetTransfers, getCategory, getDepartmentWiseAssetMappings, getInventory, getInventorybyId, getUserWiseAssetMappings } from "../services/inventory.services";

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
    const data = await getInventory(req.query);

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


export const createProductCategoryController = async (req:Request, res:Response) => {
  try {
    const data = await createCategory(req.body);

    res.status(201).json({
      message: "Inventory created",
      data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductCategoryController = async (req: Request, res: Response) => {
  try {
    const data = await getCategory();
    console.log(data)

    res.json({
      message: "Category fetched",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAssetStatusAnalyticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAssetStatusAnalytics();

    res.status(200).json({
      message: "Asset status analytics fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};


// CREATE TRANSFER
export const createAssetTransferController = async (
  req: Request,
  res: Response
) => {
  try {

    const data = await createAssetTransfer(req.body);

    res.status(201).json({
      message: "Asset transfer created successfully",
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET TRANSFERS
export const getAssetTransfersController = async (
  req: Request,
  res: Response
) => {
  try {

    const data = await getAssetTransfers();

    res.status(200).json({
      message: "Asset transfers fetched successfully",
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// APPROVE TRANSFER
export const approveAssetTransferController = async (
  req: Request,
  res: Response
) => {
  try {

    const { id }:any = req.params;

    const { approvedBy } = req.body;

    const data = await approveAssetTransfer(
      id,
      approvedBy
    );

    res.status(200).json({
      message: "Asset transfer approved successfully",
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// CREATE MAPPING
export const createAssetMappingController = async (
  req: Request,
  res: Response
) => {
  try {

    const data = await createAssetMapping(req.body);

    res.status(201).json({
      message: "Asset mapping created successfully",
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// USER-WISE
export const getUserWiseAssetMappingsController = async (
  req: Request,
  res: Response
) => {
  try {

    const data = await getUserWiseAssetMappings();

    res.status(200).json({
      message: "User-wise asset mappings fetched",
      data,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// DEPARTMENT-WISE
export const getDepartmentWiseAssetMappingsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const data =
        await getDepartmentWiseAssetMappings();

      res.status(200).json({
        message:
          "Department-wise asset mappings fetched",
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


// CREATE REPLACEMENT
export const createAssetReplacementController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const data =
        await createAssetReplacement(req.body);

      res.status(201).json({
        message:
          "Asset replacement created successfully",
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });

    }
  };



// GET REPLACEMENTS
export const getAssetReplacementsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const data =
        await getAssetReplacements();

      res.status(200).json({
        message:
          "Asset replacements fetched successfully",
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        message: error.message,
      });

    }
  };