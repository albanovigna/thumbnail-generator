const { Router } = require("express");

const router = Router();
const upload = require("./upload");

router.use("/upload", upload);

module.exports = router;
