const express = require("express");

const router = express.Router();

router.get("/pdata1.json", (req, res) => {
  res.send("pdata1");
});

router.get("/pdata2.json", (req, res) => {
  res.send("pdata2");
});

module.exports = router;
