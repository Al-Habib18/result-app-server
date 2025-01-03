/** @format */

const router = require("express").Router();
import {
    userCreateController,
    userFindByIdController,
    userFindAllController,
    userUpdateByIdController,
    userDeleteByIdController,
} from "@controllers/users/index";

router.post("/", userCreateController);
router.get("/", userFindAllController);

router.put("/:id", userUpdateByIdController);
router.get("/:id", userFindByIdController);
router.delete("/:id", userDeleteByIdController);

export default router;
