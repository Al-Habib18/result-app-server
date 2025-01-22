/** @format */
import authenticate from "@middlewares/authenticate";
import ownership from "@middlewares/ownership";
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

router.post("/", authenticate, /* admin */ userCreateController);
router.get("/", authenticate, /* admin */ userFindAllController);

router.put("/:id", authenticate, ownership, userUpdateByIdController);
router.get("/:id", authenticate, ownership, userFindByIdController);
router.delete("/:id", authenticate, ownership, userDeleteByIdController);

router.put(
    "/update/:id",
    authenticate,
    /*TODO: admin */ userUpdateAllDataController
);

router.get(
    "/search/phone/:phone",
    authenticate,
    /*TODO: admin */ findUserByPhoneController
);
router.get(
    "/search/email/:email",
    authenticate,
    /*TODO: admin */ findUserByEmailController
);

export default router;
