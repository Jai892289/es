"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5002;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
