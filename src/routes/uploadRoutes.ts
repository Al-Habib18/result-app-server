/** @format */
// import authenticate from "@middlewares/authenticate";
const router = require("express").Router();
import { uploadController } from "@controllers/upload/index";

router.post("/", /* authenticate, */ uploadController);

export default router;
