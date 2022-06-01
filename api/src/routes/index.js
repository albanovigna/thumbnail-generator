const { Router } = require("express");
const express = require("express");
const router = Router();
const upload = require("./upload");
const download = require("./download");

router.use("/upload", upload);
router.use("/download", download);

module.exports = router;
