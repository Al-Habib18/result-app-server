/** @format */
import "module-alias/register";
import morgan from "morgan";
import cors from "cors";
import express, { Application /* , Request, Response */ } from "express";

import path from "path";
import swaggerUI from "swagger-ui-express";
import YML from "yamljs";

import router from "@routes/index";

import deleteMany from "./deleteMany";

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

//TODO: remove this funtion later
app.delete("/delete", (_req, res) => {
    deleteMany();
    res.status(200).json({ message: "UP" });
});

export default app;
