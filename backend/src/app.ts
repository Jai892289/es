import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import inventoryRoutes from "./routes/inventory.route";
import vendorRoutes from "./routes/vendor.route";
import complaintRoutes from "./routes/complaint.route";
import dashboardRoutes from "./routes/dashboard.route";
import projectRoutes from "./routes/project.route";
import userRoutes from "./routes/user.route"
import departmentRoutes from "./routes/department.route";
import analyticsRoutes from "./routes/analytics.route"
import inspectionRoutes
from "./routes/inspecction.route";


import { authMiddleware } from "./middleware/auth.middleware";
import { authorizeRoles } from "./middleware/role.middleware";

import { Role } from "@prisma/client";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/inspection",inspectionRoutes);



app.get("/", authMiddleware, authorizeRoles(Role.ADMIN),
  (req, res) => {
    res.send("API is running");
});

export default app;