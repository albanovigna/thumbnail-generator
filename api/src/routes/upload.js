const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadImage = multer({
  storage,
  limits: { fileSize: 5000000 },
}).single("image");

router.post("/", (req, res) => {
  console.log("req body es", req.body);
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.status(400).json(err);
    }
    console.log(req.file);
    res.send("uploaded");
  });
});

module.exports = router;
