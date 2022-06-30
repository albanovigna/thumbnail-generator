const { Router } = require("express");
const express = require("express");
const router = Router();
const upload = require("./upload");
const download = require("./download");
const remove = require("./remove");

router.use("/upload", upload);
router.use("/download", download);
router.use("/remove", remove);

module.exports = router;
