/** @format */
const router = require("express").Router();

const subjectRoutes = require("./subjectRoutes");
const uploadRoutes = require("./uploadRoutes");
import upload from "@middlewares/multer";

router.use("/api/v1/subjects", subjectRoutes);
router.use("/api/v1/upload", upload.single("file"), uploadRoutes);

export default router;
