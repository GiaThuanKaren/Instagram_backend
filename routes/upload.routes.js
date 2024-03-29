const express = require("express");
const UploadController = require("../controllers/upload/upload.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();
let storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});

router.post(
  "/upload_single",
  upload.single("tenfile"),
  UploadController.uploadSingleFile
);
router.post("/upload_multi", upload.array("tenfile"), UploadController.uploadMultipleFile);

router.post("/testfile", upload.any(), (req, res, ext) => {
  console.log(req.files)
  return res.json("khsdklfhklsdhfkh1123")
})
// router.post("/uploadfile_withoutcreadential",upload.single("tenfile")Upload)


module.exports = router;
