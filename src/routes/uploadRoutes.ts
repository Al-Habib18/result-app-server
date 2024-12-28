/** @format */

const router = require("express").Router();
import { uploadController } from "@controllers/upload/index";

router.post("/", uploadController);

export default router;
