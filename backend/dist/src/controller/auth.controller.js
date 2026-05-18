"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_services_1 = require("../services/auth.services");
const register = async (req, res) => {
    try {
        const user = await (0, auth_services_1.registerUser)(req.body);
        res.status(201).json({
            message: "User registered",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = await (0, auth_services_1.loginUser)(req.body);
        res.json({
            message: "Login successful",
            ...result,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.login = login;
