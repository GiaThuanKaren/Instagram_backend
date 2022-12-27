const express = require("express");
const UploadController = require("../controllers/upload/upload.controller");
const router = express.Router();

router.post("/upload_single", UploadController.uploadSingleFile);
router.post("/upload_multi", UploadController.uploadMultipleFile);

module.exports = router;
