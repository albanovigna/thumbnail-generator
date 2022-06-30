const { Router } = require("express");
const router = Router();
const { removeFile, listFiles } = require("../s3");

router.post("/", async (req, res) => {
  try {
    const result = await listFiles();
    const arrayUrls = result.Contents.map((content) => {
      const obj = {
        Key: content.Key,
      };
      return obj;
    });
    await removeFile(arrayUrls);
    res.send("object remove successfully");
  } catch (e) {
    console.log(e);
    res.status(400).json({ err: "error" });
  }
});

module.exports = router;
