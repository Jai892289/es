import { Request, Response } from "express";

import {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsersController = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getSingleUser(req.params.id);

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteUser(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};