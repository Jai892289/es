"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getSingleUserController = exports.getUsersController = exports.createUserController = void 0;
const user_service_1 = require("../services/user.service");
const createUserController = async (req, res) => {
    try {
        const user = await (0, user_service_1.createUser)(req.body);
        res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createUserController = createUserController;
const getUsersController = async (req, res) => {
    try {
        const users = await (0, user_service_1.getUsers)();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getUsersController = getUsersController;
const getSingleUserController = async (req, res) => {
    try {
        const user = await (0, user_service_1.getSingleUser)(req.params.id);
        res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getSingleUserController = getSingleUserController;
const updateUserController = async (req, res) => {
    try {
        const user = await (0, user_service_1.updateUser)(req.params.id, req.body);
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    try {
        await (0, user_service_1.deleteUser)(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteUserController = deleteUserController;
