/** @format */

const router = require("express").Router();
import {
    registerController,
    loginController,
    logoutController,
    refreshController,
} from "@controllers/auth/index";

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);

export default router;
