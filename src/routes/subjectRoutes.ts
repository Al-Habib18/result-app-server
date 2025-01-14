/** @format */

import authenticate from "@middlewares/authenticate";
const router = require("express").Router();
import {
    createController,
    findAllController,
    deleteAllController,
    findByCodeController,
    // findByNameController,deleteByCodeController,    updateByCodeController,
    findByIdController,
    deleteByIdController,
    updateByIdController,
    addRollsController,
    removeRollsController,
} from "@controllers/subject/index";

router.post("/", /* authenticate, */ createController);
router.get("/", /* authenticate,  */ findAllController);
router.delete("/", /* authenticate, */ deleteAllController);

router.get("/search/codes/:code", /*  authenticate, */ findByCodeController);
// router.get("/search/names/:name", authenticate, findByNameController);

router.put("/:id", authenticate, updateByIdController);
// router.put("/update/codes/:code", authenticate, updateByCodeController);

router.get("/:id", /* authenticate, */ findByIdController);
router.delete("/:id", authenticate, deleteByIdController);
// router.delete("/delete/:code", authenticate, deleteByCodeController);

router.put("/:code/add-rolls", authenticate, addRollsController);
router.put("/:code/remove-rolls", authenticate, removeRollsController);

export default router;
