/** @format */

const router = require("express").Router();
import {
    userCreateController,
    userFindByIdController,
    userFindAllController,
    userUpdateByIdController,
    userDeleteByIdController,
    findUserByEmailController,
    findUserByPhoneController,
} from "@controllers/users/index";

router.post("/", userCreateController);
router.get("/", userFindAllController);

router.put("/:id", userUpdateByIdController);
router.get("/:id", userFindByIdController);
router.delete("/:id", userDeleteByIdController);

router.get("/search/phone/:phone", findUserByPhoneController);
router.get("/search/email/:email", findUserByEmailController);

export default router;
