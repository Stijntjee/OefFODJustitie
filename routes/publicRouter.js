const express = require("express");

const router = express.Router();

router.get("/data.json", (req, res) => {
  res.send("data");
});

module.exports = router;
