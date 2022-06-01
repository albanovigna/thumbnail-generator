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
}).single("image");

const arrayFiles = [
  [400, 300],
  [160, 120],
  [120, 120],
];

router.post("/", uploadImage, async (req, res) => {
  const file = req.file;
  const images = [];
  console.log(file);
  // apply filter
  // resize

  // arrayFiles.map((size) => {
  await sharp(file.path)
    .resize(400, 300)
    .toBuffer()
    .then(async (data) => {
      const result = await uploadFile(file, data, 400);
      images.push(result);
    });
  await sharp(file.path)
    .resize(160, 120)
    .toBuffer()
    .then(async (data) => {
      const result = await uploadFile(file, data, 160);
      images.push(result);
    });
  await sharp(file.path)
    .resize(120, 120)
    .toBuffer()
    .then(async (data) => {
      const result = await uploadFile(file, data, 120);
      images.push(result);
    });
  // });

  // const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(images);
  res.json(images);
});

// router.post("/", async (req, res) => {
//   console.log("req body es", req.body);
//   uploadImage(req, res, async (err) => {
//     if (err) {
//       err.message = "The file is so heavy for my service";
//       return res.status(400).json(err);
//     }
//     console.log(req.file);
//     const resize = ([size, other]) =>
//       sharp(req.file.path)
//         .resize(size, other)
//         .toFile(`${req.file.path}-${size}.jpg`);
//     Promise.all(arrayFiles.map(resize)).then(async (data) => {
//       // });
//       data.map(
//         (d, i) => (d.name = `${req.file.filename}-${arrayFiles[i][0]}.jpg`)
//       );
//       // const result = await uploadFile(req.file);
//       // res.send({ imagePath: `/images/${result.Key}` });
//       res.json(data);
//     });
//     // console.log(arrayFiles);

//     // sharp(req.file.path)
//     //   .resize(512, 512)
//     //   .jpeg()
//     //   .toBuffer()
//     //   .then((data) => {
//     //     const base64Data = data.toString("base64");
//     //     // const blobData = `data:${contentType};base64,${base64Data}`
//     //     res.status(202).json({
//     //       b64Data: base64Data,
//     //       contentType: "image/jpeg",
//     //       extension: "jpeg",
//     //     });
//     //     // res.send(base64Data)
//     //   })
//     //   .catch((err) => console.log(err));
//     // res.send(arrayFiles);
//     // res.send("uploaded");
//   });
// });

module.exports = router;
