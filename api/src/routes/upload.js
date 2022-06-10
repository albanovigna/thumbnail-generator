const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const { uploadFile } = require("../s3");
require("dotenv").config();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadImage = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetypes = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetypes && extname) {
      return cb(null, true);
    }
    cb("El archivo tiene que ser jpg o png");
  },
}).single("image");

const filesDimensions = [
  [400, 300],
  [160, 120],
  [120, 120],
];

const resize = async (file, dimensions, images) => {
  for (const size of dimensions) {
    await sharp(file.path)
      .resize(size[0], size[1], {
        fit: "fill",
      })
      .toBuffer()
      .then(async (data) => {
        const result = await uploadFile(file, data, size[0]);
        images.push(result);
      });
  }
};

router.post("/", uploadImage, async (req, res) => {
  const file = req.file;
  const images = [];
  await resize(file, filesDimensions, images);
  await unlinkFile(file.path);
  res.json(images);
});

module.exports = router;
