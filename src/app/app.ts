/** @format */
import "module-alias/register";
import morgan from "morgan";
import cors from "cors";
import express, { Application, Request, Response } from "express";

import path from "path";
import swaggerUI from "swagger-ui-express";
import YML from "yamljs";

import router from "@routes/index";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// use cors
app.use(cors());

// use routes
app.use(router);

// SwaggerUI
const swaggerDocs = YML.load(path.join(__dirname, "../docs", "swagger.yaml"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Check Health
app.get("/health", (_req, res) => {
    res.status(200).json({ message: "UP" });
});
app.use((err: any, _req: Request, res: Response) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});
export default app;
