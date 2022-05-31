// const aws = require("aws-sdk");
// var Minio = require("minio");
// const multer = require("multer");
// const multerS3 = require("multer-s3-transform");
// const sharp = require("sharp");
// var stream = require("stream");
// var path = require("path");

require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const sharp = require("sharp");
const sizeOf = require("image-size");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  limits: { fileSize: 5000000 },
});

// uploads a file to s3
function uploadFile(file, buffer, size) {
  console.log("file es", file);
  const fileStream = fs.createReadStream(file.path);
  // sharp(file.path).resize(400, 300).toFile(`${file.path}-${200}.jpg`);

  sizeOf(file.path, function (err, dimensions) {
    console.log("dimensions", dimensions.width, dimensions.height);
  });

  const uploadParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: size + "_" + file.filename,
    ContentType: file.mimetype,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

// const aws = require("aws-sdk");
// const { promisify } = require("util");
// const crypto = require("crypto");
// const randomBytes = promisify(crypto.randomBytes);

// require("dotenv").config();

// const region = "us-east-1";
// const bucketName = process.env.AWS_BUCKET_NAME;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_SECRET_KEY;

// console.log(region, bucketName, accessKeyId, secretAccessKey);

// const s3 = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: "v4",
// });

// async function generateUploadURL() {
//   const rawBytes = await randomBytes(16);
//   const imageName = rawBytes.toString("hex");

//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60,
//   };

//   const uploadURL = await s3.getSignedUrlPromise("putObject", params);
//   return uploadURL;
// }

// exports.generateUploadURL = generateUploadURL;
