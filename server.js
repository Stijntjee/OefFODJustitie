require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const fs = require("fs");
const https = require("https");

const app = express();
const port = process.env.PORT;

const publicRouter = require("./routes/publicRouter");
const protectedRouter = require("./routes/protectedRouter");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/public", publicRouter);
app.use("/protected", protectedRouter);

const opts = {
  key: fs.readFileSync("/home/stijn/keys/privatekey.key"),
  cert: fs.readFileSync("/home/stijn/keys/ss_cert.crt"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fs.readFileSync("/home/stijn/keys/ss_cert.crt")],
};

const httpsServer = https.createServer(opts, app);
httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port " + port);
});
