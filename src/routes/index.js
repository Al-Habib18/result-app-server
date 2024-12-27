/** @format */
const router = require("express").Router();
// const upload = require("./../midlware/index");

const subjectRoutes = require("./subjectRoutes");
// const uploadRoutes = require("./uploadRoutes");

router.use("/api/v1/subjects", subjectRoutes);
// router.use("/api/v1/upload", upload.single("file"), uploadRoutes);

module.exports = router;
