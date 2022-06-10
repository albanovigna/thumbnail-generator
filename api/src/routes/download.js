const { Router } = require("express");
const router = Router();
const { getFileStream } = require("../s3");

router.get("/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const x = await getFileStream(key);
    res.send(x.Body);
  } catch (e) {
    res.status(400).json({ err: "error" });
  }
});

module.exports = router;
