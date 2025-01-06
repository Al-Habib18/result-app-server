/** @format */
import authenticate from "@middlewares/authenticate";
const router = require("express").Router();
import {
    userCreateController,
    userFindByIdController,
    userFindAllController,
    userUpdateByIdController,
    userDeleteByIdController,
    findUserByEmailController,
    findUserByPhoneController,
    userUpdateAllDataController,
} from "@controllers/users/index";

router.post("/", authenticate, userCreateController);
router.get("/", authenticate, userFindAllController);

router.put("/:id", authenticate, userUpdateByIdController);
router.get("/:id", authenticate, userFindByIdController);
router.delete("/:id", authenticate, userDeleteByIdController);

router.put("/update/:id", authenticate, userUpdateAllDataController);

router.get("/search/phone/:phone", authenticate, findUserByPhoneController);
router.get("/search/email/:email", authenticate, findUserByEmailController);

export default router;
