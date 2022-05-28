const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");

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

router.post("/", async (req, res) => {
  console.log("req body es", req.body);
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.status(400).json(err);
    }
    console.log(req.file);
    sharp(req.file.path)
      .resize(512, 512)
      .jpeg()
      .toBuffer()
      .then((data) => {
        const base64Data = data.toString("base64");

        // const blobData = `data:${contentType};base64,${base64Data}`

        res.status(202).json({
          b64Data: base64Data,
          contentType: "image/jpeg",
          extension: "jpeg",
        });
        // res.send(base64Data)
      })
      .catch((err) => console.log(err));

    // res.send("uploaded");
  });
});

module.exports = router;
