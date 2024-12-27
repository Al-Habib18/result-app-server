/** @format */

const router = require("express").Router();
import {
    createController,
    findAllController,
    findByCodeController,
    findByNameController,
    findByIdController,
    deleteByCodeController,
    deleteByIdController,
    updateByIdController,
    updateByCodeController,
} from "@controllers/subject/index";

router.post("/", createController);
router.get("/", findAllController);

router.get("/search/codes/:code", findByCodeController);
router.get("/search/names/:name", findByNameController);

router.put("/:id", updateByIdController);
router.put("/update/codes/:code", updateByCodeController);

router.get("/:id", findByIdController);
router.delete("/:id", deleteByIdController);
router.delete("/delete/:code", deleteByCodeController);

module.exports = router;