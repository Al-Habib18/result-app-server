/** @format */

const router = require("express").Router();
import {
    registerController,
    loginController,
    logoutController,
    refreshController,
    verifyTokenController,
} from "@controllers/auth/index";

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);
router.post("/verify-token", verifyTokenController);

export default router;
