/** @format */

const router = require("express").Router();
const uploadController = require("../controllers/pdfUpload");

router.post("/", uploadController);

module.exports = router;
