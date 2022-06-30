const { Router } = require("express");
const router = Router();
const { removeFile } = require("../s3");

router.post("/", async (req, res) => {
  try {
    const urls = req.body;
    await removeFile(urls);
    res.send("object remove successfully");
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: "error" });
  }
});

module.exports = router;
