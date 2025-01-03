/** @format */

import multer from "multer";

const upload = multer({ dest: "uploads/" }); //TODO: set the max file size

export default upload;
