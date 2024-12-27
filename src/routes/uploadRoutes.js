/** @format */

const router = require("express").Router();
import { uploadController } from "@controllers/upload/index";
import upload from "../middlewares/multer";

router.post("/", uploadController);

module.exports = router;
