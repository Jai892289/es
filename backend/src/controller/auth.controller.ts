import { Request, Response } from "express";
import { registerUser, loginUser,  activateUser,
  deactivateUser , updateUser} from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};



export const updateUserController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id }:any =
        req.params;

      const user =
        await updateUser(
          id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "User updated successfully",
        data: user,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const deactivateUserController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id }:any =
        req.params;

      const user =
        await deactivateUser(
          id
        );

      res.status(200).json({
        success: true,
        message:
          "User deactivated successfully",
        data: user,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const activateUserController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { id }:any =
        req.params;

      const user =
        await activateUser(
          id
        );

      res.status(200).json({
        success: true,
        message:
          "User activated successfully",
        data: user,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message:
          error.message,
      });
    }
  };