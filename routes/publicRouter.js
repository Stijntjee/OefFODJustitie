const express = require("express");

const router = express.Router();

router.get("/data.json", (req, res) => {
  const data = { name: "pikachu", color: "yellow" };
  res.send(data);
});

module.exports = router;
