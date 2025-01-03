/** @format */
const router = require("express").Router();

import subjectRoutes from "@routes/subjectRoutes";
import userRoutes from "@routes/userRoutes";
import uploadRoutes from "@routes/uploadRoutes";
import upload from "@middlewares/multer";

router.use("/api/v1/subjects", subjectRoutes);

router.use("/api/v1/users", userRoutes);

router.use("/api/v1/upload", upload.single("file"), uploadRoutes);

export default router;
