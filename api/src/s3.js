require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

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
  const uploadParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: size + "_" + uuidv4() + "_" + file.filename,
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

  return s3.getObject(downloadParams).promise();
}
exports.getFileStream = getFileStream;

// remove files from s3
function removeFile(fileKey) {
  console.log(fileKey, "fk es");
  const removeParams = {
    Bucket: bucketName,
    Delete: {
      Objects: fileKey,
    },
  };
  return s3.deleteObjects(removeParams).promise();
}
exports.removeFile = removeFile;

// list files from s3
function listFiles() {
  const listParams = {
    Bucket: bucketName,
  };
  return s3.listObjectsV2(listParams).promise();
}
exports.listFiles = listFiles;
